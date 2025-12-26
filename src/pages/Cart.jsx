import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeItem = (id) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, c) => sum + c.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Shopping Cart</h1>
        <p className="text-gray-600 mb-8">Review and manage your selected courses</p>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some courses to get started!</p>
            <Link
              to="/courses"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-sky-500 transition-all duration-300 hover:shadow-md"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {cart.map((c) => (
                  <div key={c.id} className="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-lg"></div>
                        <div>
                          <h3 className="font-bold text-gray-900">{c.title}</h3>
                          <p className="text-gray-600 text-sm">{c.level} Level</p>
                          <p className="text-gray-600 text-sm">{c.lessonsCount} Lessons</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <span className="text-xl font-bold text-indigo-600">${c.price}</span>
                        <button
                          onClick={() => removeItem(c.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="p-6">
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-medium flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Clear Cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="text-emerald-600">-$0.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-indigo-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-emerald-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-emerald-600 transition-all duration-300 mb-4 shadow hover:shadow-md">
                  Proceed to Checkout
                </button>
                
                <p className="text-center text-gray-500 text-sm">
                  {cart.length} course{cart.length !== 1 ? 's' : ''} in cart
                </p>
                
                <Link
                  to="/courses"
                  className="block text-center text-indigo-600 hover:text-sky-500 font-medium mt-4"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;