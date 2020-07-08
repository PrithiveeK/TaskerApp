import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import LoginSignup from './components/LoginSignup';
import HomePage from './components/HomePage';
import TaskTable from './components/TaskTable';
import AddTask from './components/AddTask';
import store from './redux'; 
import ProjectList from './components/ProjectList';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LoginSignup} />
        <Route path="/home" component={HomePage} />
        <Route path="/project/:id" component={ProjectList} />
        <Route path="/add/:id" component={AddTask} />
        <Route path="/tasks" component={TaskTable} />
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
