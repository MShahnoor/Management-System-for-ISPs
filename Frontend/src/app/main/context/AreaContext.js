import { createContext, useReducer } from "react";

export const AreasContext = createContext();

export const areasReducer = (state, action) => {
  switch (action.type) {
    case "SET_AREAS":
      return { areas: action.payload };
    case "CREATE_AREA":
      return { areas: [action.payload, ...state.areas] };
    case "DELETE_AREA":
      return {
        areas: state.areas.filter((a) => a.id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const AreasContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(areasReducer, { areas: [] });
  return (
    <AreasContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AreasContext.Provider>
  );
};
