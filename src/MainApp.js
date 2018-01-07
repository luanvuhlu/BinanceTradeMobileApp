import React from 'react';
import {Provider} from 'react-redux';
import store from './redux';
import AppNavigator from './AppNavigator';

const MainApp = () => {
    return (
        <Provider store={store}>
            <AppNavigator/>
        </Provider>
    )
};

export default MainApp;