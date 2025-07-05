// import React, { memo, useCallback } from "react";
// import { useNavigate } from "react-router-dom";

// const MemberCard = memo(({ user, style }) => {
//   const navigate = useNavigate();

//   const handleCardClick = useCallback(() => {
//     navigate(`/users/${user?.member_id}`);
//   }, [navigate, user?.member_id]);

//   const getStatusColor = useCallback((endDate) => {
//     const today = new Date();
//     const expiry = new Date(endDate);
//     const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

//     if (daysUntilExpiry < 0) return "text-red-500 bg-red-50"; // Expired
//     if (daysUntilExpiry <= 10) return "text-orange-500 bg-orange-50"; // Expiring soon
//     return "text-green-500 bg-green-50"; // Active
//   }, []);

//   const formatExpiryDate = useCallback((endDate) => {
//     const today = new Date();
//     const expiry = new Date(endDate);
//     const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

//     if (daysUntilExpiry < 0)
//       return `Expired ${Math.abs(daysUntilExpiry)} days ago`;
//     if (daysUntilExpiry === 0) return "Expires today";
//     if (daysUntilExpiry <= 30) return `Expires in ${daysUntilExpiry} days`;
//     return expiry.toLocaleDateString();
//   }, []);

//   if (!user) {
//     return (
//       <div style={style}>
//         <div className="px-4 pb-3 box-border w-full">
//           <div className="flex items-center bg-gray-100 p-3 rounded-xl animate-pulse">
//             <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
//             <div className="flex-1">
//               <div className="h-4 bg-gray-300 rounded mb-2"></div>
//               <div className="h-3 bg-gray-300 rounded w-2/3"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const statusColor = getStatusColor(user.end_date);
//   const formattedExpiry = formatExpiryDate(user.end_date);

//   return (
//     <div style={style} onClick={() => navigate(`/users/${user.member_id}`)}>
//       <div className="px-4 pb-3 box-border w-full">
//         <div className="flex items-start bg-white p-3 rounded-xl shadow-sm w-full max-w-md mx-auto">
//           {/* Profile Picture */}
//           {/* <img
//             src="https://randomuser.me/api/portraits/men/88.jpg"
//             alt={user?.name}
//             className="w-10 h-10 rounded-full object-cover mr-4"
//           /> */}

//           {/* Info Section */}
//           <div className="flex-1 min-w-0">
//             <div className="flex justify-between items-start mb-1">
//               <h3 className="text-base font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-200">
//                 {user.name.toUpperCase()}
//               </h3>
//               <span className="text-xs font-medium text-gray-500 ml-2 flex-shrink-0">
//                 #{user.member_id}
//               </span>
//             </div>
//             {/* <p className="text-sm text-gray-600 mb-2 truncate">
//               📞 {user.phone_number}
//             </p> */}

//             <div className="flex justify-between items-center text-xs">
//               <span className="px-2 py-1  rounded-full font-medium uppercase tracking-wide">
//                 {user.type}
//               </span>
//               <span className={`px-2 py-1 rounded-full  ${statusColor}`}>
//                 {/* {formattedExpiry} */}.
//               </span>
//             </div>
//           </div>

//           {/* Arrow indicator */}
//           <div className="ml-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// MemberCard.displayName = "MemberCard";

// export default MemberCard;
import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const MemberCard = memo(({ user, style }) => {
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    navigate(`/users/${user?.member_id}`);
  }, [navigate, user?.member_id]);

  const getStatusColor = useCallback((endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) return "text-red-600 bg-red-100 border-red-200"; // Expired
    if (daysUntilExpiry <= 10)
      return "text-orange-600 bg-orange-100 border-orange-200"; // Expiring soon
    return "text-green-600 bg-green-100 border-green-200"; // Active
  }, []);

  const getTypeColor = useCallback((type) => {
    const colors = {
      premium: "text-purple-600 bg-purple-100 border-purple-200",
      standard: "text-blue-600 bg-blue-100 border-blue-200",
      basic: "text-gray-600 bg-gray-100 border-gray-200",
      vip: "text-yellow-600 bg-yellow-100 border-yellow-200",
    };
    return (
      colors[type?.toLowerCase()] || "text-gray-600 bg-gray-100 border-gray-200"
    );
  }, []);

  const formatExpiryDate = useCallback((endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0)
      return `Expired ${Math.abs(daysUntilExpiry)} days ago`;
    if (daysUntilExpiry === 0) return "Expires today";
    if (daysUntilExpiry <= 30) return `Expires in ${daysUntilExpiry} days`;
    return expiry.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);
  const formattedExpiry = formatExpiryDate(user.end_date);

  const getInitials = useCallback((name) => {
    if (!name) return "??";
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }
    return (
      nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
    ).toUpperCase();
  }, []);

  const getInitialsColor = useCallback((name) => {
    if (!name) return "bg-gray-500";
    const colors = ["bg-blue-500"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }, []);

  const getStatusIndicator = useCallback((endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) return "bg-red-500"; // Expired
    if (daysUntilExpiry <= 10) return "bg-orange-500"; // Expiring soon
    return "bg-green-500"; // Active
  }, []);

  if (!user) {
    return (
      <div style={style}>
        <div className="px-4 pb-3 box-border w-full">
          <div className="flex items-center bg-gray-100 p-4 rounded-xl animate-pulse border">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3 mb-2"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-300 rounded w-16"></div>
                <div className="h-6 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statusColor = getStatusIndicator(user.end_date);
  const typeColor = getTypeColor(user.type);
  const initials = getInitials(user.name);
  const initialsColor = getInitialsColor(user.name);

  return (
    <div
      style={style}
      onClick={() => navigate(`/users/${user.member_id}`)}
      className="mb-4"
    >
      <div className="px-4 pb-3 box-border w-full ">
        <div className="flex items-start bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer borderw-full max-w-md mx-auto group relative">
          {/* Status Color Indicator */}

          {/* Profile Initials */}
          <div
            className={`w-12 h-12 ${initialsColor} rounded-full mr-4 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1.5`}
          >
            {initials}
          </div>

          {/* Info Section */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-base font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-200">
                {user.name.toUpperCase()}
              </h3>
              <span className="text-xs font-medium text-gray-500 ml-2 flex-shrink-0">
                #{user.member_id}
              </span>
            </div>

            <div className="flex flex-wrap justify-between gap-2 mb-2 ">
              <div className="font-light">
                <p>{formattedExpiry}</p>
                <div className="mt-0.5">
                  <span
                    className={`px-2 py-1   text-xs font-medium uppercase tracking-wide `}
                  >
                    {user.type}
                  </span>
                </div>
              </div>

              <div>
                <div
                  className={` w-3 h-3 ${statusColor} rounded-full m-2`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

MemberCard.displayName = "MemberCard";

export default MemberCard;
