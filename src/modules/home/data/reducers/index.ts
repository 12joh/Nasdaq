import {
  GET_STOCKS,
  GET_STOCKS_FAILURE,
  GET_STOCKS_SUCCESS,
  GET_MORE_STOCKS,
  GET_MORE_STOCKS_FAILURE,
  GET_MORE_STOCKS_SUCCESS,
  RESET_ERRORS
} from "../../../../constants/actionTypes";

const initialState = {
  cardLoader:false,
  cardError:false,
  card:null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    // GET STOCKS
    case GET_STOCKS:
      return { ...state, cardLoader: true, cardError: null };
    case GET_STOCKS_SUCCESS:
      return {
        ...state,
        cardLoader: false,
        cardError: null,
        card: action.payload.data,
      };
    case GET_STOCKS_FAILURE:
      return {
        ...state,
        cardLoader: false,
        cardError: action.payload.errorMessage,
      };
      
    // GET MORE STOCKS
    case GET_MORE_STOCKS:
      return { ...state, cardLoader: true, cardError: null };
    case GET_MORE_STOCKS_SUCCESS:
      return {
        ...state,
        cardLoader: false,
        cardError: null,
        card: action.payload.data,
      };
    case GET_MORE_STOCKS_FAILURE:
      return {
        ...state,
        cardLoader: false,
        cardError: action.payload.errorMessage,
      };
      case RESET_ERRORS:
        return {
          ...state,
          cardError:null
        };
   
    default:
      return state;
  }
}
