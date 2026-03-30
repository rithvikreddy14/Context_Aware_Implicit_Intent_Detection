import os
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage

class MistralEngine:
    def __init__(self):
        self.api_key = os.getenv("MISTRAL_API_KEY")
        if self.api_key and self.api_key != "your_mistral_api_key_here":
            self.client = MistralClient(api_key=self.api_key)
        else:
            self.client = None
            print("Warning: No valid Mistral API key found. Refinement will return mock data.")

    def refine_text(self, text):
        if not self.client:
            return "This is a mock refined text. Please add a valid Mistral API key in your .env file to see real AI rewrites."

        prompt = f"""
        You are a professional communication expert. The following text has a highly critical or negative tone. 
        Rewrite it to be polite, professional, and constructive while preserving the core meaning. 
        Return ONLY the rewritten text, with no introductory or concluding remarks.
        
        Text to rewrite: "{text}"
        """

        try:
            messages = [ChatMessage(role="user", content=prompt)]
            chat_response = self.client.chat(
                model="mistral-small-latest",
                messages=messages,
            )
            return chat_response.choices[0].message.content.strip()
        except Exception as e:
            print(f"Mistral API Error: {e}")
            return "Error connecting to Mistral AI. Please try again later."