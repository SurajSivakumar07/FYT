export default function MemberCard({ user, style }) {
  return (
    <div style={style}>
      {/* 👇 Adds spacing between cards using padding instead of margin */}
      <div className="px-4 pb-3 box-border w-full">
        <div className="flex items-start bg-white p-3 rounded-xl shadow-sm w-full max-w-md mx-auto">
          {/* Profile Picture */}
          <img
            src="https://randomuser.me/api/portraits/men/88.jpg"
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover mr-4"
          />

          {/* Info Section */}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-gray-800">
                {user?.name}
              </h3>
              <span className="text-xs font-semibold text-gray-500">
                {user?.member_id}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-1">{user?.phone_number}</p>

            <div className="flex justify-between text-xs mt-2">
              <span className="text-gray-700">{user?.type.toUpperCase()}</span>
              <span className="text-gray-500">{user?.end_date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
