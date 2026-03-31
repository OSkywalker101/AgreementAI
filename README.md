# SEBRI - Standardized Evidence-Backed Rental Infrastructure

SEBRI is a professional rental agreement generation platform that uses Gemini AI to create court-ready contracts and SHA-256 hashing to secure inventory evidence.

## Features
- **Wizard-Driven Onboarding**: Multi-step data collection for Lessors and Lessees.
- **AI-Powered Generation**: Uses the Gemini 1.5 Flash model with a "Gold Standard" reference agreement.
- **Evidence Protection**: Digital Certificate of Condition with tamper-proof SHA-256 fingerprints.
- **Professional PDF Output**: High-fidelity legal document rendering using Puppeteer.

---

## How to Run

### 1. Prerequisites
- **Node.js** (v18 or higher recommended).
- **Gemini API Key** (Get one from [Google AI Studio](https://aistudio.google.com/)).

### 2. Backend Setup
1. Navigate to the `server/` directory.
2. Create a `.env` file and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node index.js
   ```
   *The server will run on http://localhost:5000.*

### 3. Frontend Setup
1. Navigate to the root directory (`AgrementAI`).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the provided Local URL (e.g., `http://localhost:5173`) in your browser.

---

## Project Structure
- `/src`: React frontend logic and design system.
- `/server`: Node.js Express API, Gemini integration, and PDF rendering.
- `/brain`: Design artifacts and system specifications.

## Technology Stack
- **Frontend**: Vite + React + Vanilla CSS
- **Backend**: Node.js + Express
- **AI**: Google Gemini API
- **PDF Rendering**: Puppeteer
