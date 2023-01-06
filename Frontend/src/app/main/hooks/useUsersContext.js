import { UsersContext } from "../context/UserContext";
import { useContext } from "react";

export const useUsersContext = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error(`useUsersContext must be used within a UsersContext`);
  }

  return context;
};
