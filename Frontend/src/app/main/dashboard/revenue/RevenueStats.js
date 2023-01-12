import * as React from "react";
import RevenueCard from "./RevenueCard";

export default function RevenueStats(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        paddingRight: 60,
        paddingLeft: 80,
        paddingBottom: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          backgroundColor: "#1F2A3C",
          borderRadius: "16px",
        }}
      >
        <RevenueCard title="Revenue" figure="14850" detail="Current Month" />
        <RevenueCard
          title="Fees Paid"
          figure="6"
          detail="Users who have paid"
        />
        <RevenueCard
          title="Fees Pending"
          figure="5"
          detail="Users who havn't paid"
        />
      </div>
    </div>
  );
}
