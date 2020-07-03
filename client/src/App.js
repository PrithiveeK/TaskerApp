import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import LoginSignup from './components/LoginSignup';
import HomePage from './components/HomePage';
import TaskTable from './components/TaskTable';
import AddTask from './components/AddTask';
import ProjectUpdates from './components/ProjectUpdates';
import store from './redux'; 

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
      <Route exact path="/" component={LoginSignup} />
      <Route path="/home" component={HomePage} />
      <Route path="/add" component={AddTask} />
      <Route path="/tasks" component={TaskTable} />
      <Route path="/project" component={ProjectUpdates} />
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
