/**
 * AI Bazaar - Core Dashboard Logic
 * Handles SPA routing, UI interactions, and AI simulations
 */

document.addEventListener('DOMContentLoaded', () => {
    const dynamicContainer = document.getElementById('dynamic-container');
    const navLinks = document.querySelectorAll('.nav-link');

    // Store the initial dashboard overview content to return to it later
    const initialOverviewHTML = dynamicContainer.innerHTML;

    /**
     * 1. SPA ROUTING ENGINE
     * Intercepts clicks to load sub-pages without refreshing
     */
    navLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();

            const targetPage = link.getAttribute('data-target');

            // UI Update: Toggle Active Class
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Routing Logic
            if (targetPage === 'overview') {
                dynamicContainer.innerHTML = initialOverviewHTML;
                initCharts(); // Re-init charts if you have any on overview
            } else {
                await loadSubPage(targetPage);
            }
        });
    });

    async function loadSubPage(pageUrl) {
        try {
            // Show a sleek loader while fetching
            dynamicContainer.innerHTML = `
                <div class="loader-container">
                    <div class="loader-spinner"></div>
                    <p>AI Bazaar is fetching ${pageUrl}...</p>
                </div>
            `;

            const response = await fetch(pageUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const html = await response.text();

            // Use a slight delay to make the AI transition feel natural
            setTimeout(() => {
                dynamicContainer.innerHTML = html;
                window.scrollTo(0, 0);
            }, 300);

        } catch (error) {
            console.error("Failed to load page:", error);
            dynamicContainer.innerHTML = `
                <div class="glass-card error-card">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Page Not Found</h3>
                    <p>Make sure "<strong>${pageUrl}</strong>" is in the same folder as dashboard.html</p>
                </div>
            `;
        }
    }

    /**
     * 2. VOICE ASSISTANT SIMULATION
     * Adds a "listening" effect to the sidebar for the hackathon demo
     */
    const simulateVoiceAssistant = () => {
        const statusText = document.querySelector('.voice-text span');
        const indicator = document.querySelector('.voice-indicator');

        if (statusText) {
            const messages = ["Listening...", "Processing...", "Calculating GST...", "Stock predicted!"];
            let i = 0;
            setInterval(() => {
                statusText.innerText = messages[i];
                i = (i + 1) % messages.length;

                // Toggle a pulse effect
                indicator.style.boxShadow = i % 2 === 0 ? "0 0 15px var(--primary-color)" : "none";
            }, 3000);
        }
    };

    /**
     * 3. SEARCH BAR INTERACTION
     * Simple filter for table rows on the current page
     */
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(term) ? '' : 'none';
            });
        });
    }

    // Initialize simulation
    simulateVoiceAssistant();
});

/**
 * Global function to handle "Bill Print" or "WhatsApp" triggers
 */
function handleAction(actionType, id) {
    alert(`${actionType} triggered for ${id}. In a real app, this would connect to the WhatsApp Business API.`);
}