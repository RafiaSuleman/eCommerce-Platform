"use client";

import { useEffect, useState } from "react";

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  products: Product[];
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  orderDate: string;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/order");

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, orderStatus: string) => {
    try {
      const response = await fetch("/api/order", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          orderStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus } : order,
        ),
      );
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        <p className="mt-2 text-gray-600">Manage your orders and store.</p>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Orders</h2>

          {loading ? (
            <p className="mt-6 text-gray-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="mt-6 text-gray-500">No orders found.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-xl border border-gray-200 p-5"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {order.customerName}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {order.customerEmail}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="font-bold text-gray-900">
                        ${order.totalAmount}
                      </p>

                      <p className="text-sm text-green-600">
                        {order.paymentStatus}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm font-medium text-gray-700">
                      Products:
                    </p>

                    <ul className="mt-2 space-y-1">
                      {order.products.map((product, index) => (
                        <li
                          key={`${order._id}-${index}`}
                          className="text-sm text-gray-600"
                        >
                          {product.name} × {product.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex flex-col justify-between gap-2 border-t pt-4 text-sm md:flex-row">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">Order Status:</span>

                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <p className="text-gray-500">
                      {new Date(order.orderDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
