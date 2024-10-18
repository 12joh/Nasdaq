import {GET_MORE_STOCKS} from './constants/actionTypes';

// THIS FUNCTION IS ONLY USED FOR THE UNIT TESTING IT IS THE SAME AS THE ONE IN THE HOME 
export const loadMoreData = (
  card: any,
  setIsMore: (value: boolean) => void,
  dispatch: any,
) => {
  if (card?.next_url != undefined) {
    setIsMore(true);
    const cursorMatch = card?.next_url.match(/cursor=([^&]*)/);
    if (cursorMatch !== null && cursorMatch[1] !== undefined) {
      if (cursorMatch[1] != undefined) {
        dispatch({
          type: GET_MORE_STOCKS,
          payload: {
            next: cursorMatch[1],
          },
        });
      }
    }
  }
};
