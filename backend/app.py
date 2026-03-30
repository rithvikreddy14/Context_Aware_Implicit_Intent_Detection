import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from utils import split_into_sentences
from services.bert_processor import BertProcessor
from services.mistral_engine import MistralEngine

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Crucial: Enable CORS so React (running on port 5173) can communicate with Flask (port 5000)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize AI Services
print("Initializing AI Engines...")
bert_engine = BertProcessor()
mistral_engine = MistralEngine()
print("Engines Ready.")

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "Tone Analyzer API"}), 200

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided"}), 400

    raw_text = data['text']
    
    try:
        sentences = split_into_sentences(raw_text)
        if not sentences:
             return jsonify({"sentences": [], "summary": {"critical_percent": 0, "neutral_percent": 0, "positive_percent": 0}})

        results, summary = bert_engine.analyze_sentences(sentences)
        
        return jsonify({
            "sentences": results,
            "summary": summary
        }), 200

    except Exception as e:
        print(f"Analysis Error: {e}")
        return jsonify({"error": "Failed to process text"}), 500

@app.route('/refine', methods=['POST'])
def refine():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided"}), 400

    try:
        refined_text = mistral_engine.refine_text(data['text'])
        return jsonify({"refined_text": refined_text}), 200
    except Exception as e:
        print(f"Refinement Error: {e}")
        return jsonify({"error": "Failed to refine text"}), 500

if __name__ == '__main__':
    port = int(os.getenv("FLASK_PORT", 5000))
    # Run server (debug=False is recommended when testing heavy ML models to avoid double-loading)
    app.run(host='0.0.0.0', port=port, debug=False)