import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header';

import style from '../cssModules/addTask.module.css';
import { useSelector } from 'react-redux';

function AddTask(props) {

    const team = useSelector(state => state.team)

    const [newtask,setNewTask] = useState({
        subject: "",
        description: "",
        assignee: "",
        priority: 0,
        category: "",
        start_date: "",
        due_date: "",
        error: ""
    })

    const handleChange = (event) => {
        setNewTask({
            ...newtask,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newtask.subject || !newtask.description || !newtask.assignee || !newtask.category || !newtask.start_date || !newtask.due_date){
            setNewTask({
                ...newtask,
                error: "Fill all the Fields"
            });
        }
        else{
            fetch("http://localhost:5000/api/",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'client': JSON.parse(localStorage.getItem('loggedInUser')),
                    'project-id': "asd"
                }
            })
        }
    }
    console.log(props);
    return (
        <div>
            <Header />
            <div className={`body-content body_h scroll`}>
                <div className={`${style['form-container']}`}>
                    <h3>Add Task</h3>
                    <form className={`${style['task-form']}`} onSubmit={handleSubmit}>
                        <div className={`${style['task-subject']}`}>
                            <input type="text" className={`w_100`} placeholder="Subject" onChange={handleChange} name="subject" value={newtask.subject}/>
                        </div>
                        <div className={`${style['about-task']}`}>
                            <div className={`${style['task-section']}`}>
                                <p>Description</p>
                                <textarea rows="10" placeholder="Description" onChange={handleChange} name="description" value={newtask.description}/>
                            </div>
                            <div className={`${style['task-section']}`}>
                                <p>Status</p>
                                <p>Open</p>
                            </div>
                            <div className={`${style['task-section']}`}>
                                <p>Assignee</p>
                                <select onChange={handleChange} name="assignee" value={newtask.assignee}>

                                </select>
                            </div>
                            <div className={`${style['task-section']}`}>
                                <p>Priority</p>
                                <select onChange={handleChange} name="priority" value={newtask.priority}>
                                    <option value="-1">Low</option>
                                    <option value="0">Normal</option>
                                    <option value="1">High</option>
                                </select>
                            </div>
                            <div className={`${style['task-section']}`}>
                                <p>Category</p>
                                <select onChange={handleChange} name="category" value={newtask.category}>
                                    <option value=""></option>
                                    <option value="frontend">Frontend</option>
                                    <option value="server">Server</option>
                                    <option value="database">Database</option>
                                    <option value="testing">Testing</option>
                                </select>
                            </div>
                            <div className={`${style['task-section']}`}>
                                <p>Start Date</p>
                                <input type="date" onChange={handleChange} name="start_date" value={newtask.start_date} />
                            </div>
                            <div className={`${style['task-section']}`}>
                                <p>Due Date</p>
                                <input type="date" onChange={handleChange} name="due_date" value={newtask.due_date} />
                            </div>
                        </div>
                        <div className={`d_flex align_c`}>
                            <button>Save</button>
                            {newtask.error && <p className={`error`}>{newtask.error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(AddTask);