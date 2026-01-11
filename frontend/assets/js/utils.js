// Utility functions for AI Bazaar - SaaS Edition

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(amount);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(new Date(date));
}

// Format time
function formatTime(date) {
    return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(new Date(date));
}

// Show toast notification - SaaS Style
function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';

    toast.innerHTML = `
        <span style="font-size: 1.25rem;">${icon}</span>
        <div style="flex: 1; font-weight: 500; font-size: 0.875rem;">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize Global AI Chat Widget
function initGlobalAI() {
    const widget = document.createElement('div');
    widget.id = 'globalAIChat';
    widget.innerHTML = `
        <style>
            #globalAIChat {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                z-index: 2000;
            }
            .chat-bubble {
                width: 60px;
                height: 60px;
                background: var(--primary);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: var(--shadow-lg);
                transition: var(--transition);
            }
            .chat-bubble:hover { transform: scale(1.1); }
            
            .chat-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 500px;
                background: var(--bg-card);
                border: 1px solid var(--border);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                display: none;
                flex-direction: column;
                overflow: hidden;
                animation: slideUp 0.3s ease-out;
            }
            @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            
            .chat-header {
                background: var(--primary);
                color: white;
                padding: 1.25rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .chat-body { flex: 1; padding: 1.5rem; overflow-y: auto; background: var(--bg-main); }
            .chat-input-area { padding: 1rem; border-top: 1px solid var(--border); display: flex; gap: 0.5rem; align-items: center; }
            .mic-btn { font-size: 1.25rem; cursor: pointer; color: var(--text-muted); padding: 0.5rem; }
            .mic-btn.active { color: var(--error); animation: pulse-red 1s infinite; }
            @keyframes pulse-red { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        </style>
        <div class="chat-window" id="aiWindow">
            <div class="chat-header">
                <div style="font-weight: 700;">AI Bazaar Assistant</div>
                <div style="cursor: pointer;" onclick="document.getElementById('aiWindow').style.display='none'">✕</div>
            </div>
            <div class="chat-body" id="chatLines">
                <div class="card mb-4" style="padding: 1rem; background: white; font-size: 0.875rem;">
                    Hello! I'm your AI Copilot. You can talk to me or type a command to manage your shop.
                </div>
            </div>
            <div class="chat-input-area">
                <span class="mic-btn" id="chatMic">🎤</span>
                <input type="text" class="input" placeholder="Type a command..." style="margin: 0;" id="chatInput">
            </div>
        </div>
        <div class="chat-bubble" onclick="const w=document.getElementById('aiWindow'); w.style.display = w.style.display==='flex' ? 'none' : 'flex'">💬</div>
    `;
    document.body.appendChild(widget);

    const mic = document.getElementById('chatMic');
    const input = document.getElementById('chatInput');
    let listening = false;

    mic.onclick = () => {
        listening = !listening;
        mic.classList.toggle('active', listening);
        if (listening) {
            input.placeholder = "Listening...";
        } else {
            input.placeholder = "Type a command...";
            const val = "Show sales report"; // Simulating some speech
            input.value = val;
            setTimeout(() => {
                showToast(`Command detected: "${val}"`, "success");
                input.value = "";
            }, 1000);
        }
    };
}

// Export functions
window.utils = {
    formatCurrency,
    formatDate,
    formatTime,
    showToast,
    initGlobalAI,
    generateId: () => Date.now().toString(36) + Math.random().toString(36).substr(2)
};