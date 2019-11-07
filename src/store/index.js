import { createStore } from 'redux';
import rootReducer from './modules/rootReducer';

const store = createStore(rootReducer); // o reducer eh passado como parametro para o createStore

export default store;
