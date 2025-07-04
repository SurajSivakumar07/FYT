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
    
    if (daysUntilExpiry < 0) return "text-red-500 bg-red-50"; // Expired
    if (daysUntilExpiry <= 10) return "text-orange-500 bg-orange-50"; // Expiring soon
    return "text-green-500 bg-green-50"; // Active
  }, []);

  const formatExpiryDate = useCallback((endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return `Expired ${Math.abs(daysUntilExpiry)} days ago`;
    if (daysUntilExpiry === 0) return "Expires today";
    if (daysUntilExpiry <= 30) return `Expires in ${daysUntilExpiry} days`;
    return expiry.toLocaleDateString();
  }, []);

  if (!user) {
    return (
      <div style={style}>
        <div className="px-4 pb-3 box-border w-full">
          <div className="flex items-center bg-gray-100 p-3 rounded-xl animate-pulse">
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statusColor = getStatusColor(user.end_date);
  const formattedExpiry = formatExpiryDate(user.end_date);

  return (
    <div style={style}>
      <div className="px-4 pb-3 box-border w-full">
        <div 
          className="flex items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200 group"
          onClick={handleCardClick}
        >
          {/* Profile Picture with loading state */}
          <div className="relative mr-4 flex-shrink-0">
            <img
              src={user.photo_url || "https://randomuser.me/api/portraits/men/88.jpg"}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-200"
              loading="lazy"
              onError={(e) => {
                e.target.src = "https://randomuser.me/api/portraits/men/88.jpg";
              }}
            />
            {/* Status indicator dot */}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              statusColor.includes('red') ? 'bg-red-500' : 
              statusColor.includes('orange') ? 'bg-orange-500' : 'bg-green-500'
            }`}></div>
          </div>

          {/* Info Section */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-base font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-200">
                {user.name}
              </h3>
              <span className="text-xs font-medium text-gray-500 ml-2 flex-shrink-0">
                #{user.member_id}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2 truncate">
              📞 {user.phone_number}
            </p>

            <div className="flex justify-between items-center text-xs">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium uppercase tracking-wide">
                {user.type}
              </span>
              <span className={`px-2 py-1 rounded-full font-medium ${statusColor}`}>
                {formattedExpiry}
              </span>
            </div>
          </div>

          {/* Arrow indicator */}
          <div className="ml-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});

MemberCard.displayName = 'MemberCard';

export default MemberCard;
