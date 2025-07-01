import React from "react";

export default function MemberList() {
  const users = [
    {
      id: "DGYM0251",
      name: "Gillian Trecia",
      phone: "+911491373291",
      duration: "3 Month gold",
      expiry: "Expires in 14 days",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      id: "DGYM0234",
      name: "Marvin Russel",
      phone: "+911491603294",
      duration: "6 Month platinum",
      expiry: "Expires in 60 days",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      id: "DGYM0101",
      name: "Daniel Martin",
      phone: "+911491503295",
      duration: "1 Month gold",
      expiry: "Expires in 10 days",
      image: "https://randomuser.me/api/portraits/men/90.jpg",
    },
  ];
  return (
    <div className="flex flex-col items-center  p-6 w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        {users.map((user) => (
          <div
            className="flex items-start bg-white p-2 rounded-xl shadow-md mb-4 px-1.5"
            key={user.id}
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover mr-4"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h3>
                <span className="text-sm font-semibold text-gray-500">
                  {user.id}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{user.phone}</p>
              <div className="flex justify-between text-sm mt-4">
                <span className="text-gray-700">{user.duration}</span>
                <span className="text-gray-500">{user.expiry}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
