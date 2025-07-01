import React from "react";
import { FixedSizeList as List } from "react-window";
import MemberCard from "./MemberCard";

// ✅ Dummy data (replace with API later)
const users = Array.from({ length: 100 }).map((_, i) => ({
  id: `DGYM${1000 + i}`,
  name: `Member ${i + 1}`,
  phone: `+91149150${3000 + i}`,
  duration: `${(i % 3) + 1} Month ${["Gold", "Platinum", "Silver"][i % 3]}`,
  expiry: `Expires in ${5 + (i % 30)} days`,
  image: `https://randomuser.me/api/portraits/${
    i % 2 === 0 ? "men" : "women"
  }/${i % 99}.jpg`,
}));

export default function VirtualizedMemberList() {
  const Row = ({ index, style }) => (
    <MemberCard user={users[index]} style={style} />
  );

  return (
    <div className="flex flex-col items-center pt-4 bg-gray-50 min-h-screen w-full p-7 ">
      <List height={800} itemCount={users.length} itemSize={120} width={"100%"}>
        {Row}
      </List>
    </div>
  );
}
