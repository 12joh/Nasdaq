import configureMockStore from 'redux-mock-store';
import {GET_MORE_STOCKS, GET_STOCKS} from '../src/constants/actionTypes';
import {loadMoreData} from './functionsUsed';
import {thunk} from 'redux-thunk';
import {act, renderHook} from '@testing-library/react-hooks';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';

const middlewares: any = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loadMoreData', () => {
  let store: ReturnType<typeof mockStore>;
  let card: {next_url?: string};

  beforeEach(() => {
    store = mockStore({});
    card = {
      next_url: undefined,
    };
  });

  it('should not dispatch any action when next_url is undefined', () => {
    const setIsMore = jest.fn();
    loadMoreData(card, setIsMore, store.dispatch);
    expect(setIsMore).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([]);
  });

  it('should dispatch GET_MORE_STOCKS action when next_url is defined', () => {
    card.next_url = 'https://example.com/data?cursor=12345';
    const setIsMore = jest.fn();
    loadMoreData(card, setIsMore, store.dispatch);
    expect(setIsMore).toHaveBeenCalledWith(true);
    expect(store.getActions()).toEqual([
      {
        type: GET_MORE_STOCKS,
        payload: {
          next: '12345',
        },
      },
    ]);
  });

  it('should not dispatch any action if cursor is not found in next_url', () => {
    card.next_url = 'https://example.com/data';
    const setIsMore = jest.fn();
    loadMoreData(card, setIsMore, store.dispatch);
    expect(setIsMore).toHaveBeenCalledWith(true);
    expect(store.getActions()).toEqual([]);
  });
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

const useStocks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_STOCKS,
      payload: {
        search: '',
      },
    });
  }, [dispatch]);
};

describe('useStocks', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch GET_STOCKS action with empty search string on mount', () => {
    renderHook(() => useStocks());
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_STOCKS,
      payload: {
        search: '',
      },
    });
  });
});

type Result = {ticker: string; name: string};

const useMyHook = (card: any, isMore: boolean) => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    if (isMore) {
      setResults(prevResults => [...prevResults, ...card?.results]);
    } else {
      setResults(card?.results);
    }
  }, [card?.results, isMore]);

  return results;
};

describe('useMyHook', () => {
  it('should set results correctly based on isMore and card results', () => {
    const initialResults = ['result1', 'result2'];
    const additionalResults = ['result3', 'result4'];

    const {result, rerender} = renderHook(
      ({card, isMore}) => useMyHook(card, isMore),
      {
        initialProps: {
          card: {results: initialResults},
          isMore: false,
        },
      },
    );

    expect(result.current).toEqual(initialResults);

    rerender({
      card: {results: additionalResults},
      isMore: true,
    });

    act(() => {
      rerender({
        card: {results: additionalResults},
        isMore: true,
      });
    });

    expect(result.current).toEqual([...initialResults, ...additionalResults]);

    rerender({
      card: {results: additionalResults},
      isMore: false,
    });

    expect(result.current).toEqual(additionalResults);
  });
});
