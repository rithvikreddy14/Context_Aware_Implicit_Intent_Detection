# 🎯 Context-Aware Text Tone Analyzer

> An end-to-end AI-powered full-stack application that detects **sarcasm**, **implicit criticism**, and nuanced sentence-level tone, then rewrites harsh text into polished professional alternatives.

![GitHub Repo Banner](https://img.shields.io/badge/AI-Hybrid%20NLP-blueviolet?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Backend](https://img.shields.io/badge/Backend-Flask-black?style=for-the-badge&logo=flask)
![Model](https://img.shields.io/badge/Model-Fine--Tuned%20BERT-yellow?style=for-the-badge)
![Deployment](https://img.shields.io/badge/Deploy-Vercel%20%2B%20Render-00C7B7?style=for-the-badge)

---

## ✨ Overview

The **Context-Aware Text Tone Analyzer** goes beyond traditional sentiment analysis by understanding how a sentence *actually sounds* in professional communication.

Instead of assigning a single vague sentiment score to an entire paragraph, this system performs **sentence-by-sentence contextual analysis** using a fine-tuned **BERT-based classifier**. It identifies tones such as:

- 😊 Positive
- 😐 Neutral
- ⚠️ Critical
- 🙃 Sarcastic / implicitly harsh

When a sentence is flagged as overly critical or sarcastic, the application automatically uses the **Mistral AI Engine** to generate a more diplomatic, professional rewrite.

This makes the project not just a diagnostic NLP tool, but an **actionable communication assistant** for workplace writing, feedback refinement, email reviews, and professional messaging.

---

## 🚀 Core Features

### 🧠 Deep Contextual Analysis
- Uses a **custom fine-tuned BERT model** to understand semantic relationships, context shifts, and subtle negative intent.
- Designed to detect not just direct criticism, but also **sarcasm and implicit hostility** that basic polarity models often miss.

### 🪓 Sentence-by-Sentence Breakdown
- Splits input text into individual sentences.
- Analyzes each sentence independently for higher precision.
- Prevents the common failure of assigning one inaccurate tone score to an entire document.

### 📊 Interactive SaaS Dashboard
- Built with a modern **React + Tailwind CSS** interface.
- Presents results through clean, intuitive visualizations such as:
  - Overall Tone Gauge
  - Tone Distribution Donut Chart
  - Sentence Confidence Bar Graphs
  - Context-aware sentence highlighting

### ✍️ Generative Professional Rewrites
- Any sentence classified as overly critical is routed to the **Mistral API**.
- Generates a more polite, constructive, and professional version while preserving the original intent.

### 📄 Exportable Reports
- Includes **PDF export support** using `html2canvas` and `jsPDF`.
- Users can download their analysis results for review, documentation, or sharing.

### 🔁 Local + Cloud Fallback Architecture
- Supports **two inference modes**:
  - Local custom fine-tuned model
  - Cloud fallback model from Hugging Face
- Controlled using environment variables for easier testing and deployment.

---

## 🖼️ Screenshots

### Analysis Dashboard
![Analysis Dashboard](https://github.com/rithvikreddy14/Context_Aware_Implicit_Intent_Detection/blob/main/prediction.png)


---

## 🏗️ Tech Stack

### Frontend
- **React.js** (via Vite)
- **Tailwind CSS** for responsive modern styling
- **Recharts** for visual analytics
- **lucide-react** for icons
- **html2canvas** + **jsPDF** for PDF report exporting

### Backend
- **Python 3.12**
- **Flask**
- **Flask-CORS**
- **PyTorch**
- **Hugging Face Transformers**
- **datasets**
- **NLTK** for sentence tokenization
- **mistralai==0.4.2** for rewrite generation

### Infrastructure
- **Vercel** for frontend hosting
- **Render** for backend deployment using Gunicorn

---

## 🧩 System Architecture

The project follows a sequential **6-stage microservices-lite pipeline**:

### 1. 📥 Data Module
Handles raw user input, text normalization, and preprocessing.

### 2. 🤖 AI Intelligence Module
Performs:
- BERT tokenization
- Context embedding generation
- Sentence-level classification
- Confidence score estimation

### 3. 🛠️ Refinement Module
Detects negative or overly critical content and sends flagged text to the **Mistral AI API** for rewriting.

### 4. 📈 Prediction Module
Aggregates sentence labels, calculates percentages, and applies threshold-based tone logic.

### 5. 🧪 Analysis Module
Validates predictions, confidence scores, and performance outputs before returning the payload.

### 6. 🌐 Web Interface Module
Displays the analyzed results in the React dashboard with charts, highlighting, and exports.

---

## 📁 Suggested Monorepo Structure

```bash
Context-Aware-Tone-Analyzer/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── .env
│   ├── models/
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── .env
│   └── ...
│
└── README.md
```


---

## ⚙️ Installation

### Prerequisites
Make sure the following are installed:

- **Node.js** v16+
- **Python** 3.10 to 3.12
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/rithvikreddy14/Context_Aware_Implicit_Intent_Detection
cd Context_Aware_Implicit_Intent_Detection
```

### 2. Set Up the Backend

```bash
cd backend
python -m venv venv
```

#### Activate the virtual environment

**Windows**
```bash
venv\Scripts\activate
```

**Mac/Linux**
```bash
source venv/bin/activate
```

#### Install backend dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Configuration

You must configure environment variables for both frontend and backend.

### Backend: `backend/.env`

```env
# Set to True to use your custom fine-tuned BERT model stored in /models/
# Set to False to use the Hugging Face cloud fallback model
USE_LOCAL_MODEL=True

# Your Mistral AI API key
MISTRAL_API_KEY=your_mistral_api_key_here
```

### Frontend: `frontend/.env`

```env
# URL of your backend Flask server
VITE_API_URL=http://127.0.0.1:5000
```

---

## ▶️ Running the Project Locally

To run the full application locally, use **two terminal windows**.

### Terminal 1: Start the Backend

```bash
cd backend
python app.py
```

### Terminal 2: Start the Frontend

```bash
cd frontend
npm run dev
```

Then open:

```bash
http://localhost:5173
```

Paste any text into the input field and click **Run Tone Analysis**.

---

## 🔌 API Documentation

The Flask backend exposes a primary endpoint for analysis.

### Endpoint

```http
POST /analyze
Content-Type: application/json
```

### Request Body

```json
{
  "text": "The new dashboard interface is visually stunning. However, the loading times are completely unacceptable and broke my workflow yesterday."
}
```

### Example Response

```json
{
  "summary": {
    "critical_percent": 50.0,
    "neutral_percent": 0.0,
    "positive_percent": 50.0,
    "dominant_tone": "critical"
  },
  "sentences": [
    {
      "text": "The new dashboard interface is visually stunning.",
      "label": "positive",
      "confidence": 0.98,
      "refined_text": null
    },
    {
      "text": "However, the loading times are completely unacceptable and broke my workflow yesterday.",
      "label": "critical",
      "confidence": 0.89,
      "refined_text": "The loading times are currently impacting my workflow and require optimization."
    }
  ]
}
```

---

## ✅ Testing Strategy

To test the architecture without loading the large custom model weights:

1. Open `backend/.env`
2. Change:

```env
USE_LOCAL_MODEL=False
```

3. Restart the Flask server

This forces the backend to use the fallback Hugging Face model:

```bash
cardiffnlp/twitter-roberta-base-sentiment
```

This is useful for:
- Verifying API connectivity
- Testing UI rendering
- Validating full-stack integration without heavy local model files

---

## ☁️ Deployment

The app is structured as a **monorepo**, which makes cloud deployment straightforward.

### Backend Deployment on Render

Create a new **Web Service** connected to your GitHub repository and configure:

- **Root Directory:** `backend`
- **Environment Variable:** `PYTHON_VERSION=3.12.0`
- **Build Command:**

```bash
pip install -r requirements.txt
```

- **Start Command:**

```bash
gunicorn app:app
```

### Frontend Deployment on Vercel

Import the GitHub repo into **Vercel** and configure:

- **Root Directory:** `frontend`
- **Framework Preset:** `Vite`
- **Environment Variable:**

```env
VITE_API_URL=<Your_Render_URL>
```

> Do **not** include a trailing slash in `VITE_API_URL`.

### CORS Reminder

Make sure your Flask backend CORS settings in `app.py` allow requests from your deployed Vercel domain.

---

## 🛣️ Roadmap

Planned future improvements:

- **Attention Map Visualization** — highlight which words influenced the BERT prediction most strongly.
- **Inference Batching** — use Redis/Celery for faster processing of longer documents.
- **User-Adjustable Sensitivity** — add a threshold slider to control how aggressively sentences are flagged.
- **Authentication + History** — allow users to save previous analyses.
- **Team Collaboration** — enable shared feedback review workflows for teams.

---

## 🌟 Why This Project Stands Out

This project is strong for portfolios, internships, and AI/full-stack roles because it demonstrates:

- **NLP model integration in production workflows**
- **Hybrid AI architecture** combining classification + generation
- **Real-world UI/UX thinking** instead of model-only experimentation
- **Deployment readiness** with cloud hosting and fallback strategy
- **Practical business value** in communication refinement and professional writing support

It shows the ability to build a system that is not only technically interesting, but also genuinely useful.

---

## 🧠 Example Use Cases

- Reviewing workplace emails before sending
- Rewriting blunt customer support responses
- Improving internal feedback communication
- Refining performance review language
- Assisting students and professionals with polished writing

---

## 📌 Future Enhancements for GitHub Presentation

To make the repository look even better, consider adding:

- A custom banner image at the top
- Real application screenshots or GIF demos
- Badges for license, stars, issues, and build status
- A short architecture diagram
- Demo video link
- Live project links for frontend and backend

---



## 🙌 Acknowledgements

Built using the amazing open-source ecosystem around:

- Hugging Face Transformers
- PyTorch
- Flask
- React
- Tailwind CSS
- Recharts
- Mistral AI

---


## 🏁 Final Note

The **Context-Aware Text Tone Analyzer** bridges the gap between traditional NLP diagnostics and actionable generative AI assistance. By combining contextual sentence classification with professional rewrite generation, it transforms tone analysis into a tool users can actively apply in real communication workflows.
