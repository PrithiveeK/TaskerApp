import React from 'react';
import { useSelector } from 'react-redux';
import ProjectData from './ProjectData';
import style from '../cssModules/project.module.css';

function Project(props) {

    const projects = useSelector(state => state.projects)
    return (
        <div className={`${style['project-list-container']}`}>
            <h3>Project Home</h3>
            <div className={`${style['project-list-content']}`}>
                <ProjectData />
                <ProjectData />
                <ProjectData />
            </div>
        </div>
    );
}

export default Project;