import torch
import os
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch.nn.functional as F

class BertProcessor:
    _instance = None

    def __new__(cls):
        # Singleton pattern to prevent loading the model multiple times
        if cls._instance is None:
            cls._instance = super(BertProcessor, cls).__new__(cls)
            cls._instance.initialize_model()
        return cls._instance

    def initialize_model(self):
        use_local = os.getenv("USE_LOCAL_MODEL", "False").lower() == "true"
        
        if use_local:
            # Load your fine-tuned model from the local directory
            self.model_path = "./models/bert-tone-model"
        else:
            # Fallback for testing: A pre-trained 3-class RoBERTa/BERT model
            print("Loading fallback HuggingFace model for testing...")
            self.model_path = "cardiffnlp/twitter-roberta-base-sentiment-latest"

        try:
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_path)
            self.model = AutoModelForSequenceClassification.from_pretrained(self.model_path)
            self.model.eval() # Set to evaluation mode
            print(f"Model successfully loaded from: {self.model_path}")
        except Exception as e:
            print(f"Error loading model: {e}")
            raise e

    def analyze_sentences(self, sentences):
        results = []
        counts = {"critical": 0, "neutral": 0, "positive": 0}

        for text in sentences:
            inputs = self.tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
            
            with torch.no_grad():
                outputs = self.model(**inputs)
                probs = F.softmax(outputs.logits, dim=-1)
                conf, pred_idx = torch.max(probs, dim=1)
            
            # Map standard 3-class outputs (0: Negative/Critical, 1: Neutral, 2: Positive)
            # Adjust these if your specific fine-tuned model uses different label mappings!
            label_map = {0: "critical", 1: "neutral", 2: "positive"}
            label = label_map.get(pred_idx.item(), "neutral")
            confidence = conf.item()
            
            counts[label] += 1
            results.append({
                "text": text,
                "label": label,
                "confidence": round(confidence, 4)
            })

        # Calculate percentages
        total = len(sentences)
        summary = {}
        if total > 0:
            summary = {
                "critical_percent": (counts["critical"] / total) * 100,
                "neutral_percent": (counts["neutral"] / total) * 100,
                "positive_percent": (counts["positive"] / total) * 100
            }

        return results, summary