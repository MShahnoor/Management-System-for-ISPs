import { createContext, useReducer } from "react";

export const PaymentContext = createContext();

export const paymentReducer = (state, action) => {
  switch (action.type) {
    case "SET_PAYMENTS":
      console.log(action.payload)

     let pays = action.payload.map((obj)=>{
        let userId = obj.areaCode.code + obj.userId.autoID
        return {
          userId, serialNo: obj.serialNo, paymentDate: obj.paymentDate, amount: obj.amount
        }

      })
      

      return { payments: pays };
    case "CREATE_PAYMENT":
      return { payments: [action.payload, ...state.payments] };
    case "DELETE_PAYMENT":
      
      return {
        payments: state.payments.filter((payment) => {
          return payment._id !== action.payload._id}),
      };
    case "EDIT_PAYMENT":
      console.log("in edit PAYMENT constext dispacnf")
      let updatedPayments = state.payments.map((a) => {
        
        if(a._id == action.payload.id){
          a.serialNo = action.payload.serialNo
          a.paymentDate = action.payload.paymentDate
          a.amount = action.payload.amount
          return a
        }
        return a

      } )
      
      return{
        payments: updatedPayments
      }  

      // let index = state.areas.findIndex((a) => action.payload.id == a.id )
      // console.log(index)
      // state.areas[index].code = action.payload.code
      // state.areas[index].name = action.payload.name
      
      // return state  
    default:
      console.log("Default Payment Context Dispach function called")
      return state;
  }
};

export const PaymentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, { payments: [] });
  return (
    <PaymentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PaymentContext.Provider>
  );
};
