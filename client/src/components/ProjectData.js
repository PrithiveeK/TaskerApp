import React from 'react';
import { Link } from 'react-router-dom';
import style from '../cssModules/project.module.css';

function ProjectData(props) {
    return (
        <div className={`${style['project-content']}`}>
        <Link to={`/project/${props.data.ID}`}>
            {props.data.Title}
        </Link>
        </div>
    );
}

export default ProjectData;