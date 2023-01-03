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
    case "EDIT_AREA":
      console.log("in edit area constext dispacnf")
      let updatedAreas = state.areas.map((a) => {
        if(a.id == action.payload.id){
          a.code = action.payload.code
          a.name = action.payload.name
          return a
        }
        return a

      } )
      
      return{
       areas: updatedAreas
      }  

      // let index = state.areas.findIndex((a) => action.payload.id == a.id )
      // console.log(index)
      // state.areas[index].code = action.payload.code
      // state.areas[index].name = action.payload.name
      
      // return state  
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
