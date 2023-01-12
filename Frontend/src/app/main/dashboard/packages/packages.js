import OutlinedCard from "./package";

function TopPackages() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        paddingRight: 70,
        paddingLeft: 70,
        paddingTop: 10,
        paddingBottom: 20,
      }}
    >
      <OutlinedCard
        name="Basic"
        type=" Tier 1 Package"
        bandwidth="5"
        activeUsers="12"
        color="text-blue-400"
      />
      <OutlinedCard
        name="Premium"
        type=" Tier 2 Package"
        bandwidth="2"
        activeUsers="8"
        color="text-green-400"
      />
      <OutlinedCard
        name="Hacker"
        type=" Tier 3 Package"
        bandwidth="8"
        activeUsers="10"
        color="text-amber-400"
      />
    </div>
  );
}

export default TopPackages;
