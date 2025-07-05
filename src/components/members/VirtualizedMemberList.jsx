import React, { memo, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import MemberCard from "./MemberCard";

const VirtualizedMemberList = memo(({ members }) => {
  // Memoized Row component to prevent unnecessary re-renders
  const Row = useCallback(
    ({ index, style }) => <MemberCard user={members[index]} style={style} />,
    [members]
  );

  // Calculate responsive height based on available members
  const calculateHeight = useCallback(() => {
    const maxHeight = Math.min(window.innerHeight - 200, 800); // Leave space for header/footer
    const itemHeight = 120;
    const calculatedHeight = Math.min(members.length * itemHeight, maxHeight);
    return Math.max(calculatedHeight, 240); // Minimum height
  }, [members.length]);

  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 ">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <p className="text-gray-500 text-lg font-medium">No members found</p>
        <p className="text-gray-400 text-sm mt-1">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto ">
      <div className="mb-4 text-sm text-gray-600">
        Showing {members.length} member{members.length !== 1 ? "s" : ""}
      </div>
      <List
        height={calculateHeight()}
        itemCount={members.length}
        itemSize={120}
        width="100%"
        overscanCount={5} // Render 5 extra items for smoother scrolling
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 "
      >
        {Row}
      </List>
    </div>
  );
});

VirtualizedMemberList.displayName = "VirtualizedMemberList";

export default VirtualizedMemberList;
