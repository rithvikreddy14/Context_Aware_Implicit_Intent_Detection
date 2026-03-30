import nltk
import logging

def split_into_sentences(text):
    """Safely splits a paragraph into individual sentences."""
    try:
        nltk.data.find('tokenizers/punkt')
    except LookupError:
        logging.info("Downloading NLTK punkt tokenizer...")
        nltk.download('punkt', quiet=True)
        
    # Handle empty or whitespace-only text
    if not text or not text.strip():
        return []
        
    return nltk.sent_tokenize(text)