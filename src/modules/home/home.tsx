import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StatusBar,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import {colors} from '../../theme/colors';
import Header from '../../components/Header/Header';
import {GET_MORE_STOCKS, GET_STOCKS} from '../../constants/actionTypes';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../components/Card/Card';
import {cardType, StoreType} from '../../redux/store/StoreType';

const Home = () => {
  const dispatch = useDispatch();
  const {card} = useSelector((state: StoreType) => state.home);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<cardType[]>([]);
  const [issearch, setIsSearch] = useState(false);
  const [isMore, setIsMore] = useState(false);
  // THIS USEEFFECT IS TO LOAD THE STOCKS ONCE THE USER ENTER THE APPLICATION
  useEffect(() => {
    setIsMore(false);
    setIsSearch(false);
    dispatch({
      type: GET_STOCKS,
      payload: {
        search: '',
      },
    });
  }, []);
  // LOADMORE FUNCTION IS USED WHEN THE USER PASSES 80% OF THE STOCKS 
  // ALREADY ON THE SCREEN IT LOAD THE REST USING THIS FUNCTION
  const loadMoreData = () => {
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
  // THIS USEEFFECT IS USED WHEN ANY DATA IS FETCHED SO IT COULD BE ADDED TO THE PREVIOUS DATA
  useEffect(() => {
    if (isMore) {
      setResults(prevResults => [...prevResults, ...card?.results]);
    } else {
      setResults(card?.results);
    }
  }, [card?.results]);
// THIS USEEFFECT IS USED WHEN THE USER ENTER ANY DATA IN THE SEARCH BAR
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search !== undefined) {
        if (search !== '') {
          setIsMore(false);
          setIsSearch(true);
        } else {
          setIsSearch(false);
        }
        dispatch({
          type: 'GET_STOCKS',
          payload: {
            search: search,
          },
        });
      }
    }, 300);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [search]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.header} barStyle={'dark-content'} />
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={(text: string) => {
            setSearch(text);
          }}
          placeholder="Search"
          textAlign="left"
          style={styles.searchInput}
        />
      </View>
      {issearch && card?.results.length === 0 ? (
        <Text style={styles.noResultText}>No Result Found</Text>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={results}
            renderItem={({item}: {item: cardType}) => (
              <Card mainText={item.ticker} subText={item.name} />
            )}
            keyExtractor={(item: cardType, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.flatListContainer}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.8}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.homeBackground,
    flex: 1,
  },
  headerContainer: {
    height: '10%',
    width: '100%',
  },
  searchContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  searchInput: {
    marginTop: '5%',
    height: '22%',
    backgroundColor: colors.card,
    borderRadius: 30,
    borderColor: colors.iconBackground,
    borderWidth: 3,
    paddingLeft: 10,
  },
  noResultText: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 16,
  },
  listContainer: {
    top: '-15%',
    marginBottom: '40%',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  flatListContainer: {
    paddingVertical: '5%',
  },
});

export default Home;
