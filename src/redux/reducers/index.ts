import {combineReducers} from 'redux';
import homeStore from '../../modules/home/data/reducers/index';

const appReducer = combineReducers({
  home: homeStore,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
