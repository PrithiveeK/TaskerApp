import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import TaskContent from './TaskContent';
import { fetchAllUsers, fetchAllTasks } from '../redux';
import style from '../cssModules/taskTable.module.css';
import TaskForm from './TaskForm';

function TaskTable(props) {

    const [filter, setFilter] = useState({
        status: 0,
        category: "",
        assignee: "",
        keyword: ""
    })

    const tasks = useSelector(state => state.tasks)
    const allUsers = useSelector(state => state.users)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchAllUsers())
        dispatch(fetchAllTasks())
    },[dispatch])

    const handleChange = (event) => {
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <Header />
            <div className={`body-content of_auto body_h sb_none`}>
                <div className={`${style['tasks-container']}`}>
                    <h2>Search Conditions</h2>
                    <div className={`${style['filter-line']} w_100 d_flex`}>
                        <h5>Status:</h5>
                        <div className={`${style['filter-op']} ${filter.status===0 ? style['filter-sel'] : ""}`}
                        onClick={()=>setFilter({...filter, status: 0})}>All</div>
                        <div className={`${style['filter-op']} ${filter.status===1 ? style['filter-sel'] : ""}`}
                        onClick={()=>setFilter({...filter, status: 1})}>Open</div>
                        <div className={`${style['filter-op']} ${filter.status===2 ? style['filter-sel'] : ""}`}
                        onClick={()=>setFilter({...filter, status: 2})}>In Progress</div>
                        <div className={`${style['filter-op']} ${filter.status===3 ? style['filter-sel'] : ""}`}
                        onClick={()=>setFilter({...filter, status: 3})}>Resolved</div>
                        <div className={`${style['filter-op']} ${filter.status===4 ? style['filter-sel'] : ""}`}
                        onClick={()=>setFilter({...filter, status: 4})}>QA</div>
                        <div className={`${style['filter-op']} ${filter.status===5 ? style['filter-sel'] : ""}`}
                        onClick={()=>setFilter({...filter, status: 5})}>Reopen</div>
                        <div className={`${style['filter-op']} ${filter.status===6 ? style['filter-sel'] : ""}`}
                        onClick={()=>setFilter({...filter, status: 6})}>Closed</div>
                        <div className={`${style['filter-op']} ${filter.status===7 ? style['filter-sel'] : ""}`}
                        onClick={()=>setFilter({...filter, status: 7})}>Not Closed</div>
                    </div>
                    <div className={`${style['filter-line']} w_100 d_flex`}>
                        <div>
                            <p>Category</p>
                            <select onChange={handleChange} name="category">
                                <option value=""></option>
                                <option value="frontend">Frontend</option>
                                <option value="server">Server</option>
                                <option value="database">Database</option>
                                <option value="testing">Testing</option>
                            </select>
                        </div>
                        <div>
                            <p>Assignee</p>
                            <select onChange={handleChange} name="assignee">
                                <option value=""></option>
                                {allUsers.data.map(user=><option value={user.UserName} key={user.ID}>{user.UserName}</option>)}
                            </select>
                        </div>
                        <div>
                            <p>Keyword</p>
                            <input type="text" name="keyword" onChange={handleChange} value={filter.keyword} />
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
                            {tasks.data.map(task=><TaskContent data={task} key={task.ID} filter={filter}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
            {props.location.search && (<div className={`${style['edit-task-container']}`}>
                <div className={`${style['edit-task']}`}>
                    <div className={`${style['close-icon-holder']}`} onClick={()=>props.history.push("/tasks")}>
                        <div className={`${style['close']}`}></div>
                    </div>
                    <TaskForm task={tasks.data.find(task=>task.ID===props.location.search.split("=")[1])} />
                </div>
            </div>)}
        </div>
    );
}

export default withRouter(TaskTable);