import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { userOrders } from "../api/movieApi";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        // console.log(userId);
        const ordersData = await userOrders(userId);
        // console.log(ordersData);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="webcrumbs">
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
          <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden relative ">
            {orders.reverse().map((order) => (
              <div key={order._id} className="mb-8">
                <div className="relative border-2 border-dashed border-gray-500">
                  <div className="absolute top-0 left-0 w-6 h-6 bg-gray-100 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 bg-gray-100 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="p-6">
                  <div className="flex gap-7">
                    <div className="w-1/4">
                      <div className="bg-white p-2 border border-gray-300 rounded-md">
                        <img
                          src={order.movieId.poster_path || "https://via.placeholder.com/150"}
                          alt={order.movieId.title}
                          className="w-full h-auto rounded-md"
                        />
                      </div>
                    </div>
                    <div className="w-3/4">
                      <h2 className="font-bold text-3xl">{order.movieId.title} (U/A)</h2>
                      <div className="flex flex-col gap-6">
                        <p className="text-xl text-gray-600 mt-3">
                          {new Date(order.createdAt).toLocaleDateString()} | {order.showtime.time}
                        </p>
                      </div>
                      <p className="text-xl text-gray-600">{order.movieId.language || "Hindi, 2D"}</p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <p className="text-lg font-semibold">{order.numTickets} Ticket(s)</p>
                    <div className="text-sm text-gray-500 flex flex-col items-end">
                      <span>{order.ticketType === "m-ticket" ? "E-ticket" : "Physical Ticket"}</span>
                    </div>
                  </div>

                  <div className="text-xl text-gray-600 mt-2 border-t border-dashed pt-2">
                    <p className="text-2xl text-gray-600">{order.showtime.theater}</p>
                    <p>BOOKING ID: {order._id}</p>
                  </div>

                  <p className="text-sm text-gray-600 mt-6">
                    A confirmation is sent on e-mail/SMS/WhatsApp within 15 minutes of booking.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
