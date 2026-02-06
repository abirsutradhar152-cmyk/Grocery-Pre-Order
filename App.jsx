import React, { useState } from "react";
import './App.css';


// Grocery items (can be fetched from backend later)
const ITEMS = [
  { id: 1, name: "Rice (1 kg)", price: 60 },
  { id: 2, name: "Wheat Flour (1 kg)", price: 45 },
  { id: 3, name: "Milk (1 L)", price: 55 },
  { id: 4, name: "Eggs (12 pcs)", price: 75 },
  { id: 5, name: "Sugar (1 kg)", price: 50 }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");

  const addToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white text-center py-4">
          <h1 className="text-3xl font-bold">🛒 Smart Grocery Pre‑Order</h1>
          <p className="text-sm opacity-90">
            Order from home • Collect without waiting
          </p>
        </div>

        {/* Content */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Customer Section */}
          <div className="bg-gray-50 rounded-xl p-5 shadow-inner">
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              👨‍👩‍👦 Customer Panel
            </h2>

            <input
              type="text"
              placeholder="Enter your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <div className="space-y-3">
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white p-3 rounded-lg shadow"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Owner Section */}
          <div className="bg-gray-50 rounded-xl p-5 shadow-inner">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              🧑‍💼 Shop Owner Panel
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                No orders placed yet
              </p>
            ) : (
              <>
                <div className="bg-white rounded-lg p-4 shadow mb-4">
                  <p className="font-semibold mb-2">
                    Customer: {customerName || "Not provided"}
                  </p>
                  <ul className="space-y-1">
                    {cart.map((item) => (
                      <li key={item.id} className="text-sm">
                        {item.name} × {item.qty}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center bg-green-100 rounded-lg p-3">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-green-700">₹{total}</span>
                </div>

                <p className="text-xs text-gray-600 mt-3">
                  ✔ Pack items in advance to save customer time
                </p>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 text-center text-xs text-gray-600 py-3">
          Made with ❤️ using React & JavaScript
        </div>
      </div>
    </div>
  );
}


