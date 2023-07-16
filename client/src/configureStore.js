import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from './reducers';

const loggerMiddleware = createLogger();
const isProd = process.env.NODE_ENV === 'production';

export default function configureStore(initialState) {
    if (isProd) {
        return createStore(
            rootReducer,
            initialState,
            applyMiddleware(thunkMiddleware)
        );
    }
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
}
