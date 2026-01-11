/**
 * AI Bazaar - Inventory Logic
 * Handles stock updates, search filtering, and low-stock alerts
 */

// 1. Sample Data (In a real app, this comes from a database/API)
let inventoryData = [
    { id: "SKU-001", name: "Basmati Rice", category: "Grains", price: 110, stock: 45, unit: "kg" },
    { id: "SKU-002", name: "Refined Oil", category: "Grocery", price: 145, stock: 8, unit: "ltr" },
    { id: "SKU-003", name: "Toor Dal", category: "Pulses", price: 160, stock: 25, unit: "kg" },
    { id: "SKU-004", name: "Tata Salt", category: "Grocery", price: 28, stock: 3, unit: "pkt" },
    { id: "SKU-005", name: "Amul Butter", category: "Dairy", price: 56, stock: 12, unit: "pkt" }
];

const LOW_STOCK_THRESHOLD = 10;

// 2. Main Render Function
function renderInventory(data = inventoryData) {
    const tbody = document.querySelector("#inventory-table-body");
    if (!tbody) return;

    tbody.innerHTML = ""; // Clear existing rows

    data.forEach(item => {
        const isLowStock = item.stock < LOW_STOCK_THRESHOLD;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td><strong>${item.name}</strong></td>
            <td>${item.category}</td>
            <td>₹${item.price}</td>
            <td>
                <span class="stock-value ${isLowStock ? 'text-danger' : ''}">
                    ${item.stock} ${item.unit}
                </span>
                ${isLowStock ? '<i class="fas fa-exclamation-triangle alert-icon"></i>' : ''}
            </td>
            <td>
                <button class="action-btn edit" onclick="updateStock('${item.id}', 10)">
                    <i class="fas fa-plus-circle"></i>
                </button>
                <button class="action-btn delete" onclick="deleteItem('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 3. Search & Filter Logic
function filterInventory() {
    const searchTerm = document.querySelector("#inventory-search").value.toLowerCase();
    const filtered = inventoryData.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    renderInventory(filtered);
}

// 4. Update Stock Function
function updateStock(id, amount) {
    const item = inventoryData.find(i => i.id === id);
    if (item) {
        item.stock += amount;
        alert(`AI Assistant: Added ${amount} to ${item.name}. New stock: ${item.stock}`);
        renderInventory();
    }
}

// 5. Delete Item Function
function deleteItem(id) {
    if (confirm("Are you sure you want to remove this item?")) {
        inventoryData = inventoryData.filter(item => item.id !== id);
        renderInventory();
    }
}

// Initialize when page is ready
document.addEventListener('DOMContentLoaded', () => {
    renderInventory();

    // Attach search listener
    const searchInput = document.querySelector("#inventory-search");
    if (searchInput) {
        searchInput.addEventListener('input', filterInventory);
    }
});