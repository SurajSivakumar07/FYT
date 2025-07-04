import { FixedSizeList as List } from "react-window";
import MemberCard from "./MemberCard";
import { useMemo } from "react";

// const users = Array.from({ length: 100 }).map((_, i) => ({
//   id: `DGYM${1000 + i}`,
//   name: `Member ${i + 1}`,
//   phone: `+91149150${3000 + i}`,
//   duration: `${(i % 3) + 1} Month ${["Gold", "Platinum", "Silver"][i % 3]}`,
//   expiry: `Expires in ${5 + (i % 30)} days`,
//   image: `https://randomuser.me/api/portraits/${
//     i % 2 === 0 ? "men" : "women"
//   }/${i % 99}.jpg`,
// }));

export default function VirtualizedMemberList({ members }) {
  // Memoise the list to avoid recalculation on parent re-renders
  const memoisedMembers = useMemo(() => members, [members]);

  // Each row receives the memoised array as itemData so we can access the member directly
  const Row = ({ index, style, data }) => {
    const user = data[index];
    return <MemberCard user={user} style={style} />;
  };

  if (!memoisedMembers || memoisedMembers.length === 0) {
    return (
      <div className="p-4 w-full max-w-md mx-auto">
        <p className="text-center text-gray-500 mt-4">No members found</p>
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <List
        height={Math.min(memoisedMembers.length * 140, 900)} // ensure we don't exceed viewport
        itemCount={memoisedMembers.length}
        itemSize={140}
        width="100%"
        itemData={memoisedMembers}
        itemKey={(index, data) => data[index].member_id || index}
      >
        {Row}
      </List>
    </div>
  );
}
