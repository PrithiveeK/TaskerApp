import { combineReducers } from 'redux';
import { projectReducer } from './Projects/ProjectReducer';
import { tasksReducer } from './Tasks/TasksReducer';
import { teamReducer } from './Teams/TeamReducer';
import { usersReducer } from './Users/UserReducer';

export const rootReducer = combineReducers({
    projects: projectReducer,
    tasks: tasksReducer,
    team: teamReducer,
    users: usersReducer
});