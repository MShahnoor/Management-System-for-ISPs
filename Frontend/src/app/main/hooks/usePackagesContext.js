import { PackagesContext } from "../context/PackageContext";
import { useContext } from "react";

export const usePackagesContext = () => {
  const context = useContext(PackagesContext);

  if (!context) {
    throw new Error(`usePackagesContext must be used within a AreasContext`);
  }

  return context;
};
