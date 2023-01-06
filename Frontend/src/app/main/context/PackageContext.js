import { createContext, useReducer } from "react";

export const PackagesContext = createContext();

export const packagesReducer = (state, action) => {
  switch (action.type) {
    case "SET_PACKAGES":
      return { packages: action.payload };
    case "CREATE_PACKAGE":
      return { packages: [action.payload, ...state.packages] };
    case "DELETE_PACKAGE":
      return {
        packages: state.packages.filter(
          (a) => a["_id"] !== action.payload["_id"]
        ),
      };
    case "EDIT_PACKAGE":
      console.log("in edit package constext dispacnf");
      let updatedPackages = state.packages.map((a) => {
        if (a.id == action.payload.id) {
          a.name = action.payload.name;
          a.monthlyFee = action.payload.monthlyFee;
          a.mbs = action.payload.mbs;
          return a;
        }
        return a;
      });
      return {
        packages: updatedPackages,
      };

    default:
      return state;
  }
};

export const PackagesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(packagesReducer, { packages: [] });
  console.log(state, "from store");

  return (
    <PackagesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PackagesContext.Provider>
  );
};
