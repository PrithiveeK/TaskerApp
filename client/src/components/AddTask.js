import React from 'react';
import Header from './Header';
import TaskForm from './TaskForm';
import style from '../cssModules/addTask.module.css';

function AddTask(props) {
    return (
        <div>
            <Header />
            <div className={`body-content body_h scroll`}>
                <div className={`${style['form-container']}`}>
                    <h3>Add Task</h3>
                    <TaskForm />
                </div>
            </div>
        </div>
    );
}

export default AddTask;