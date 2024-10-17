/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import { StatusBar } from 'react-native';
import MainNavigator from './src/navigators/MainNavigator';
import { persistor, store } from './src/redux/store';
function App(): React.JSX.Element {
 return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <StatusBar backgroundColor={"#000"} barStyle={"dark-content"} />
          <MainNavigator />
        </PersistGate>
      </Provider>
    );
 
}

export default App;
