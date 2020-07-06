import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './RootReducer';
export * from './Projects/ProjectAction';
export * from './Tasks/TaskAction';
export * from './Teams/TeamAction';
export * from './Users/UserAction';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
