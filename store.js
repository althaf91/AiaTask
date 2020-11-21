import appReducer from './reducer/index';
import {createStore} from 'redux';

const store = createStore(appReducer);

export default store;
