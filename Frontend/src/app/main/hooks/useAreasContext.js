import { AreasContext } from "../context/AreaContext";
import { useContext } from "react";

export const useAreasContext = () => {
  const context = useContext(AreasContext);

  if (!context) {
    throw new Error(`useAreasContext must be used within a AreasContext`);
  }
 console.log("In useAreaContext")
  return context;
};
