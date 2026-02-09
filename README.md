# NexR - AI Emergency Response System

An MVP for emergency reporting with AI classification and real-time status tracking.

## Components
- **Frontend**: React (Vite)
- **Backend**: Node.js (Express, WebSocket)

## Setup
1. `npm install` in both `frontend` and `backend`.
2. `node server.js` in backend.
3. `npm run dev` in frontend.



# 🚨 NexR — AI-Powered Emergency Response Platform

**NexR** is an AI-powered emergency reporting platform designed to eliminate confusion, hesitation, and response delays during critical situations. In moments of panic, users should not have to decide *who* to call or *what* to say. NexR enables users to report emergencies once—while AI intelligently analyzes the situation, determines severity, and routes the request to the appropriate emergency services.

> **When seconds matter, one report is enough.**

---

## 📌 Problem Statement

In real-world emergencies such as road accidents, fires, or medical crises:
- People panic and hesitate
- Emergency numbers are unclear or unknown
- Information shared is incomplete or unstructured
- Critical response time is lost

These delays can lead to severe consequences and loss of life.

---

## 💡 Solution Overview

NexR provides a **single, intelligent emergency reporting interface** where users can:
- Enter a short text description
- Upload supporting images or videos
- Share their live location
- Submit the report with one click

Using **AI-driven multimodal analysis**, NexR automatically:
- Classifies the emergency type  
  *(Police / Ambulance / Fire — multi-label supported)*
- Determines the severity level  
  *(Low / Medium / High / Critical)*
- Generates a structured, responder-ready alert with timestamp
- Displays real-time response status to the user

---

## 🧠 System Architecture

User (Text / Image / Video / Location)
↓
NexR Frontend
(React SPA)
↓
Backend API Layer
(Node.js + Express)
↓
AI Analysis Engine
(Text NLP + Vision Heuristics)
↓
Emergency Classification & Severity
↓
Structured Alert Generator
↓
Emergency Response Simulation
↓
Real-Time Status Updates (SSE)
↓
User UI


---

## ✨ Key Features

### 🚨 One-Tap Emergency Reporting
A single action replaces multiple emergency calls. Users report once—AI decides everything else.

### 🧠 AI-Based Emergency Classification
Automatically identifies required responders:
- Police
- Ambulance
- Fire Station  
Supports **multiple services for a single incident**.

### ⚠️ Intelligent Severity Detection
Deterministic AI logic categorizes incidents into:
- Low
- Medium
- High
- Critical  
Enables priority-based response.

### 🖼️ Multimodal Input Processing
- **Text**: NLP-based keyword & intent analysis  
- **Images/Videos**: Lightweight vision heuristics  
- **Fusion Engine**: Combines signals for better accuracy

### 📄 Structured, Responder-Ready Alerts
Each alert includes:
- ISO 8601 timestamp (IST)
- Emergency type(s)
- Severity level
- Location
- Concise incident summary

### ⏱️ Real-Time Response Status Tracking
Users can transparently track progress:
Request Received → Preparing → Team Dispatched
→ On the Way → Action in Progress → Resolved


### 🔍 Explainable AI
Rule-based, interpretable AI logic ensures trust and auditability—crucial for public safety systems.

---

## 🧪 AI Decision Logic

### Text Intelligence
- Keyword and intent-based NLP
- Detects indicators such as:
  - Fire, smoke, injury, accident, unconsciousness, explosion

### Image Intelligence
- Lightweight color and brightness heuristics
- Identifies fire-like or injury-like visual cues

### Fusion Strategy
- Aggregates confidence scores from all inputs
- Applies deterministic thresholds

### Severity Mapping
| Score Range | Severity |
|------------|----------|
| 0–24       | Low      |
| 25–49      | Medium   |
| 50–74      | High     |
| 75+        | Critical |

Designed for **speed, clarity, and extensibility**.

---

## 🛠️ Technology Stack

### Frontend
- React (Single Page Application)
- HTML / CSS (Responsive, mobile-first UI)
- Browser Geolocation API
- Server-Sent Events (SSE)

### Backend
- Node.js + Express
- Multer (media uploads)
- Luxon (timezone-aware timestamps)
- SSE for real-time communication

### Infrastructure
- Docker
- Docker Compose
- Fully local and open-source (no paid APIs)

---

## 🚀 Getting Started

### Prerequisites
- Docker
- Docker Compose

### Run the Application
```bash
docker-compose up --build
Frontend: http://localhost:8080

Backend: http://localhost:3000

🔎 API Overview
Report an Emergency
curl -X POST http://localhost:3000/report \
  -F "text=Car crash with fire and injured people" \
  -F "coords=13.0827,80.2707" \
  -F "media=@image.jpg"
Sample Response
{
  "timestamp": "2026-02-09T10:42:18+05:30",
  "emergency_type": ["Ambulance", "Fire", "Police"],
  "severity": "Critical",
  "location": "13.0827,80.2707",
  "incident_summary": "Car crash with active fire and injured persons"
}
👥 Potential Users
General public and citizens

Tourists and travelers

Emergency responders (Police, Fire, Ambulance)

Hospitals and trauma centers

Government and smart city authorities

Educational institutions

Enterprises and industrial facilities

Disaster relief NGOs

🌱 Future Enhancements
Voice-based emergency reporting

Multi-language support (Tamil, Hindi, English)

Live GPS tracking

Responder dashboard

AI chatbot for calming users

Integration with government emergency systems

🏆 Why NexR Stands Out
Removes decision-making under panic

AI-first, multimodal emergency intelligence

Real-time transparency builds trust

Clean, extensible architecture

Designed for real-world impact

📜 License
MIT License

🙌 Credits
Built with ❤️ during a Vibe Coding Hackathon
Product Name: NexR

Smart emergencies need smarter responses.


---

If you want next (optional but powerful):
- 📊 **Architecture diagram (Mermaid)**
- 🎤 **2-minute demo narration**
- 🧑‍⚖️ **Judge Q&A cheat sheet**
- 📄 **IEEE-style technical documentation**

Just say **next** 🚀
