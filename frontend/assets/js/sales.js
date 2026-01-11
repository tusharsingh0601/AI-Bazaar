/**
 * AI Bazaar - Sales & Billing Logic
 * Handles cart management, GST calculations, and Voice-to-Bill simulation
 */

let cart = [];
const GST_RATE = 0.12; // Assuming a flat 12% for the demo

// 1. Function to Add Item to Cart
function addToCart(name, price, qty = 1) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qty += qty;
    } else {
        cart.push({
            id: Date.now(),
            name: name,
            price: price,
            qty: qty
        });
    }
    updateUI();
}

// 2. Calculate Totals
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const gst = subtotal * GST_RATE;
    const total = subtotal + gst;

    return {
        subtotal: subtotal.toFixed(2),
        gst: gst.toFixed(2),
        total: total.toFixed(2)
    };
}

// 3. Update the UI Table and Summary
function updateUI() {
    const cartBody = document.querySelector("#cartItems");
    if (!cartBody) return;

    cartBody.innerHTML = "";

    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td>
                <div class="qty-control">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            </td>
            <td>₹${item.price}</td>
            <td>₹${(item.price * item.qty).toFixed(2)}</td>
            <td><button class="text-danger" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button></td>
        `;
        cartBody.appendChild(row);
    });

    const totals = calculateTotals();
    document.querySelector("#subtotal").innerText = `₹${totals.subtotal}`;
    document.querySelector("#tax").innerText = `₹${totals.gst}`;
    document.querySelector("#grandTotal").innerText = `₹${totals.total}`;
}

// 4. Change Quantity or Remove
function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) removeFromCart(id);
    }
    updateUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateUI();
}

/**
 * 5. VOICE AI SIMULATION (For Hackathon Demo)
 * Use this to show how the AI "listens" and adds items
 */
function startVoiceBilling() {
    const btn = document.querySelector("#startVoiceBilling");
    const status = document.querySelector("#voiceStatus");

    btn.classList.add("listening");
    status.classList.remove("hidden");
    status.innerHTML = `<div class="mic-wave"><span></span><span></span><span></span></div><p>Listening for items...</p>`;

    // Mocking the AI "hearing" items after 2 seconds
    setTimeout(() => {
        status.innerHTML = `<p><i class="fas fa-check-circle"></i> AI Heard: "2kg Sugar and 1L Milk"</p>`;
        addToCart("Sugar (1kg)", 45, 2);
        addToCart("Milk (1L)", 60, 1);

        setTimeout(() => {
            status.classList.add("hidden");
            btn.classList.remove("listening");
        }, 2000);
    }, 2000);
}

// 6. Checkout / WhatsApp Integration Simulation
function finishSale() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    const totals = calculateTotals();
    alert(`Success! Bill for ₹${totals.total} sent to customer via WhatsApp.`);
    cart = [];
    updateUI();
}

// Initialize listeners
document.addEventListener('DOMContentLoaded', () => {
    const voiceBtn = document.querySelector("#startVoiceBilling");
    if (voiceBtn) voiceBtn.addEventListener('click', startVoiceBilling);
});