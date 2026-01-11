/**
 * AI Bazaar - Voice Command Engine
 * Uses Web Speech API for real-time multilingual recognition
 */

const VoiceAssistant = {
    recognition: null,
    isListening: false,

    init: function () {
        // Check browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("Browser does not support Speech Recognition.");
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false; // Stops after one command
        this.recognition.interimResults = false; // Only final result
        this.recognition.lang = 'hi-IN'; // Default to Hindi-English (Hinglish)

        // Event: When AI starts listening
        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUI(true);
        };

        // Event: When AI captures speech
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log("AI Heard:", transcript);
            this.processCommand(transcript);
        };

        // Event: When AI stops listening
        this.recognition.onend = () => {
            this.isListening = false;
            this.updateUI(false);
        };
    },

    toggle: function () {
        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    },

    updateUI: function (active) {
        const indicator = document.querySelector('.voice-indicator');
        const statusText = document.querySelector('.voice-text span');

        if (active) {
            indicator.classList.add('listening-active');
            statusText.innerText = "Listening...";
        } else {
            indicator.classList.remove('listening-active');
            statusText.innerText = "Tap to Speak";
        }
    },

    /**
     * COMMAND PROCESSOR
     * Matches keywords to dashboard functions
     */
    processCommand: function (text) {
        Utils.showToast(`Heard: "${text}"`, 'success');

        // Logic for Billing (Hinglish support)
        if (text.includes('add') || text.includes('milao') || text.includes('lelo')) {
            // Simplified logic: If user says "Add Sugar", we call the cart function
            if (text.includes('sugar') || text.includes('chini')) {
                if (typeof addToCart === "function") addToCart("Sugar (1kg)", 45, 1);
            }
            if (text.includes('milk') || text.includes('dudh')) {
                if (typeof addToCart === "function") addToCart("Milk (1L)", 60, 1);
            }
        }

        // Logic for Navigation
        if (text.includes('inventory') || text.includes('stock')) {
            loadSubPage('inventory.html');
        }

        if (text.includes('bill') || text.includes('sale')) {
            loadSubPage('billing.html');
        }
    }
};

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    VoiceAssistant.init();

    // Attach to the sidebar mic button
    const micBtn = document.querySelector('.voice-indicator');
    if (micBtn) {
        micBtn.addEventListener('click', () => VoiceAssistant.toggle());
    }
});