import React from "react";
import MemberList from "../components/members/MemberList";
import VirtualizedMemberList from "../components/members/VirtualizedMemberList";

export default function Members() {
  return (
    <>
      <VirtualizedMemberList />
    </>
  );
}
