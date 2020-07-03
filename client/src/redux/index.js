import { createStore } from 'redux';
import { rootReducer } from './RootReducer';
export { fetchProjectData, fetchedProjectData, projectDataError } from './Projects/ProjectAction';
export { fetchTaskData, fetchedTaskData, taskDataError } from './Tasks/TaskAction';
export { fetchTeamData, fetchedTeamData, teamDataError } from './Teams/TeamAction';
export { fetchUsersData, fetchedUsersData, usersDataError } from './Users/UserAction';

const store = createStore(rootReducer);

export default store;
