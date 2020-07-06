import React, { useEffect } from 'react';
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux';
import TaskContent from './TaskContent';
import { fetchAllUsers, fetchAllTasks } from '../redux';
import style from '../cssModules/taskTable.module.css';

function TaskTable(props) {

    const tasks = useSelector(state => state.tasks)
    const allUsers = useSelector(state => state.users)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchAllUsers())
        dispatch(fetchAllTasks())
    },[])
    return (
        <div>
            <Header />
            <div className={`body-content of_auto body_h sb_none`}>
                <div className={`${style['tasks-container']}`}>
                    <h2>Search Conditions</h2>
                    <div className={`${style['filter-line']} w_100 d_flex`}>
                        <h5>Status:</h5>
                        <div>All</div>
                        <div>Open</div>
                        <div>In Progress</div>
                        <div>Resolved</div>
                        <div>QA</div>
                        <div>Reopen</div>
                        <div>Closed</div>
                        <div>Not Closed</div>
                    </div>
                    <div className={`${style['filter-line']} w_100 d_flex`}>
                        <div>
                            <p>Category</p>
                            <select>
                                <option value=""></option>
                                <option value="frontend">Frontend</option>
                                <option value="server">Server</option>
                                <option value="database">Database</option>
                                <option value="testing">Testing</option>
                            </select>
                        </div>
                        <div>
                            <p>Assignee</p>
                            <select>
                                <option value=""></option>
                                {allUsers.data.map(user=><option value={user.UserName} key={user.ID}>{user.UserName}</option>)}
                            </select>
                        </div>
                        <div>
                            <p>Keyword</p>
                            <input type="text" />
                        </div>
                    </div>
                    <table className={`w_100`}>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Assigner</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Created</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.data.map(task=><TaskContent data={task} key={task.ID}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TaskTable;