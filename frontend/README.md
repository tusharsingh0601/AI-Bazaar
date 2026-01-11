# 🏪 AI Bazaar: The Voice-First Shop Copilot

**AI Bazaar** is an intelligent, multilingual shop management platform designed to help 60M+ Indian MSMEs (Micro, Small, and Medium Enterprises) transition from manual paper registers to a digital-first economy.



## 🚀 The Problem
Small shopkeepers in India often face:
- **Complexity:** Standard ERP/POS software is too complex for non-tech-savvy users.
- **Language Barriers:** Most tools are English-only.
- **Stock-outs:** Lack of data leads to running out of essential items unexpectedly.
- **GST Compliance:** Manual billing makes tax filing a nightmare.

## ✨ Our Solution
AI Bazaar uses a **Voice-First** approach powered by AI to make shop management as easy as talking to a friend.

### Key Features:
* 🎙️ **Hinglish Voice Billing:** Add items to a bill using natural speech (e.g., *"Do kilo cheeni add karo"*). Powered by OpenAI Whisper.
* 🔮 **AI Demand Forecasting:** Predicts when you will run out of stock based on seasonal trends and sales history.
* 📄 **Instant GST Invoices:** One-click PDF generation with HSN code auto-lookup.
* 📲 **WhatsApp Integration:** Send digital receipts directly to customers' phones.
* 📊 **Business Insights:** Real-time visual reports on profit, revenue, and high-demand categories.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3 (Glassmorphism UI), JavaScript (ES6+).
- **Backend:** Python (FastAPI/Flask) or Node.js.
- **AI/ML:** OpenAI GPT-4o (for forecasting), Whisper (for Speech-to-Text).
- **Database:** PostgreSQL or MongoDB.
- **APIs:** WhatsApp Business API, Razorpay (for digital payments).

## 📂 Project Structure
```text
ai-bazaar/
├── assets/
│   ├── css/          # Custom Indigo-Glass styles
│   ├── js/           # API handlers & Voice logic
│   └── img/          # UI Icons and Branding
├── pages/
│   ├── dashboard.html # Main Hub
│   ├── sales.html     # Voice POS Interface
│   ├── inventory.html # Stock Management
│   ├── reports.html   # AI Analytics
│   └── settings.html  # Shop Configuration
├── login.html         # Multilingual Auth
└── register.html      # Two-step Merchant Onboarding