import React from 'react';
import './App.css';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import Header from './components/TaskList';




function App() {
  return (
    <div className="App">
      <h1 className="textCenter">Task to be done</h1>
      <Header></Header>
    </div>
  )
}

export default App;