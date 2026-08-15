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

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);

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
      }
    }
    fetchOrders();
  }, []);
 
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (total, order) => total + order.totalAmount,
    0,
  );

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "pending",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "delivered",
  ).length;

  const processingOrders = orders.filter(
(order) => order.orderStatus === "processing"
).length;

const shippedOrders = orders.filter(
(order) => order.orderStatus === "shipped"
).length;

const cancelledOrders = orders.filter(
(order) => order.orderStatus === "cancelled"
).length;
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900"> Admin Dashbord </h1>
            <p className="mt-2 text-gray-600">Manage your.</p>
          </div>
          <Link
            href="/order"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
             Orders
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {totalOrders}
            </h2>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              ${totalRevenue.toFixed(2)}
            </h2>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Pending Orders</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {pendingOrders}
            </h2>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Delivered Orders
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {deliveredOrders}
            </h2>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Processing Orders
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {processingOrders}
            </h2>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Shipped Orders
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {shippedOrders}
            </h2>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Cancelled Orders
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {cancelledOrders}
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}
