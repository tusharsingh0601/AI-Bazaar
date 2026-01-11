// API handler module

class APIClient {
    constructor() {
        this.baseURL = 'http://localhost:8000/api/v1';
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const token = auth.getToken();

        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // GET request
    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    // POST request
    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // PUT request
    put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // DELETE request
    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // Mock data for demo purposes (when backend is not available)
    getMockData(type) {
        const mockData = {
            products: [
                { id: 1, name: 'Laptop', sku: 'LPT-001', price: 45000, stock: 15, category: 'Electronics' },
                { id: 2, name: 'Mouse', sku: 'MSE-001', price: 500, stock: 50, category: 'Accessories' },
                { id: 3, name: 'Keyboard', sku: 'KBD-001', price: 1500, stock: 30, category: 'Accessories' },
                { id: 4, name: 'Monitor', sku: 'MON-001', price: 15000, stock: 10, category: 'Electronics' },
                { id: 5, name: 'Headphones', sku: 'HPH-001', price: 2000, stock: 25, category: 'Accessories' }
            ],
            sales: [
                { id: 1, date: new Date(), total: 47000, items: 3, customer: 'John Doe' },
                { id: 2, date: new Date(Date.now() - 86400000), total: 15000, items: 1, customer: 'Jane Smith' },
                { id: 3, date: new Date(Date.now() - 172800000), total: 4000, items: 2, customer: 'Bob Wilson' }
            ],
            analytics: {
                totalRevenue: 125000,
                totalSales: 45,
                totalProducts: 156,
                lowStock: 8,
                revenueGrowth: 12.5,
                salesGrowth: 8.3
            }
        };

        return mockData[type] || [];
    }
}

// Create global API instance
window.api = new APIClient();