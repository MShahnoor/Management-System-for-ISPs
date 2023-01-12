import { createContext, useReducer } from "react";

export const UsersContext = createContext();

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { users: action.payload };
    case "CREATE_USER":
      return { users: [action.payload, ...state.users] };
    case "DELETE_USER":
      return {
        users: state.users.filter((u) => u._id !== action.payload._id),
      };
    case "EDIT_USER":
      
      let updatedUsers = state.users.map((a) => {
        if (a._id == action.payload._id) {
          
          (a.firstName = action.payload.firstName),
            (a.lastName = action.payload.lastName),
            (a.contact = action.payload.contact),
            (a.package._id = action.payload.package._id),
            (a.package.name = action.payload.package.name),
            (a.balance = action.payload.balance),
            (a.status = action.payload.status),
            (a.address = action.payload.address);
          return a;
        }
        return a;
      });

      return {
        users: updatedUsers,
      };
    default:
      return state;
  }
};

export const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, { users: [] });
  return (
    <UsersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
