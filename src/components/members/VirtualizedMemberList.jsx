import { FixedSizeList as List } from "react-window";
import MemberCard from "./MemberCard";
import { useMembers } from "../../hooks/useMembers";
import { useEffect, useState, useMemo } from "react";
import { data } from "react-router-dom";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const filteredMembers = useMemo(() => {
    return members.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm);
      const matchFilter = filter ? user.type === filter : true;
      return matchSearch && matchFilter;
    });
  }, [members, searchTerm, filter]);

  const Row = ({ index, style }) => (
    <MemberCard user={members[index]} style={style} />
  );

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      {filteredMembers.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No members found</p>
      ) : (
        <List
          height={Math.min(filteredMembers.length * 180, 900)} // Responsive scroll area
          itemCount={filteredMembers.length}
          itemSize={120}
          width="100%"
        >
          {Row}
        </List>
      )}
    </div>
  );
}
