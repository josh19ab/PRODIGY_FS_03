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
            <div className="flex justify-center ">
              <div className="overflow-x-auto mt-10  ">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-gray-50 text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Order ID
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Date
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        No. of products
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Amount
                      </th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {order.attributes.createdAt.slice(0, 10)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                          {order.attributes.products.data.length}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          <IndianRupee className="w-3 h-3 inline" />
                          {order.attributes.amount}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
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
