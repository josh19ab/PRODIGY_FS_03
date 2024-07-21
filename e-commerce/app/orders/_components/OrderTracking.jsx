"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "../../_utils/GlobalApi";
import SkeletalOrder from "./SkeletalOrders";
import { IndianRupee } from "lucide-react";
import OrderDetailsModal from "./OrderDetailsModal";

const OrderTracking = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const response = await GlobalApi.getUserOrders(
          user.primaryEmailAddress.emailAddress
        );
        setOrders(response.data.data);
        console.log("Orders fetched", response.data.data);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {loading ? (
        <SkeletalOrder />
      ) : (
        <div>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="mt-10">
              <div className="overflow-hidden rounded-lg shadow">
                <table className="w-full divide-y-2 divide-gray-200 bg-gray-50 text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 text-left w-1/4">
                        Order ID
                      </th>
                      <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 text-left w-1/4">
                        Date
                      </th>
                      <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 text-left w-1/4">
                        No. of products
                      </th>
                      <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 text-left w-1/4">
                        Amount
                      </th>
                      <th className="px-2 py-2"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td
                          className="whitespace-nowrap px-2 py-2 font-medium text-gray-900"
                          data-label="Order ID"
                        >
                          {order.id}
                        </td>
                        <td
                          className="whitespace-nowrap px-2 py-2 text-gray-700"
                          data-label="Date"
                        >
                          {order.attributes.createdAt.slice(0, 10)}
                        </td>
                        <td
                          className="whitespace-nowrap px-2 py-2 text-gray-700 "
                          data-label="No. of products"
                        >
                          {order.attributes.products.data.length}
                        </td>
                        <td
                          className="whitespace-nowrap px-2 py-2 text-gray-700"
                          data-label="Amount"
                        >
                          <IndianRupee className="w-3 h-3 inline" />
                          {order.attributes.amount}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2">
                          <button
                            className="inline-block rounded bg-darkAccent px-4 py-2 text-xs font-medium text-white hover:bg-darkPrimary"
                            onClick={() => handleViewOrder(order)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      {showModal && selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </>
  );
};
export default OrderTracking;
