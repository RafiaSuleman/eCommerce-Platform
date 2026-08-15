"use client";
import Link from "next/link";
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

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";

    case "cancelled":
      return "bg-red-100 text-red-800";

    case "processing":
      return "bg-blue-100 text-blue-800";

    case "delivered":
      return "bg-green-100 text-green-800";

    case "shipped":
      return "bg-purple-100 text-purple-800";
  }
};
export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
  const filteredOrders = orders.filter((order) => {
    const search = searchQuery.toLowerCase().trim();

    const matchesSearch =
      order.customerName.toLowerCase().includes(search) ||
      order.customerEmail.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900"> Orders </h1>
            <p className="mt-2 text-gray-600">Manage your orders and store.</p>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Orders</h2>
          <div className="mt-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name or email..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mt-3 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {loading ? (
            <p className="mt-6 text-gray-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="mt-6 text-gray-500">No orders found.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {filteredOrders.map((order) => (
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

                    <span
                      className={`flex justify-center items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(order.orderStatus)}`}
                    >
                      {order.orderStatus}
                    </span>
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
