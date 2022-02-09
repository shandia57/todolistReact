import { render } from '@testing-library/react';
import React, { Component } from 'react';

// Components
import TaskStarted from '../vue/tasks/started/TaskStarted';
import TaskEnded from '../vue/tasks/ended/TaskEnded';
import Task from '../../../models/Task';
import NavCreateNewTask from '../vue/nav/Nav';
import Filter from '../filter/Filter';

// Css 
import './task.css';

interface destination {
    droppableId: String;
    index: Number;
}

interface source {
    droppableId: String;
    index: Number;
}

class TaskList extends Component {
    taskList: Task[] = [];
    taskEnded: Task[] = [];
    state = {
        taskValue: [],
        taskEndedValue: [],
    }
    currentIndex = 0;


    onDragEnd = (result: { destination: destination; source: source; reason: String; }) => {
        const { destination, source, reason } = result;
        if (!destination || reason === 'CANCEL') {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        let users = Object.assign([], this.taskList);
        const droppedUser = this.state.taskValue[Number(source.index)];

        users.splice(Number(source.index), 1);
        users.splice(Number(destination.index), 0, droppedUser);


        this.setState({ taskValue: users });
        this.taskList = users;

        this.showAddTaskButton();
        this.clearAllInput();


    }


    addNewTask = () => {
        let title = (document.getElementById("title") as HTMLInputElement).value;
        let description = (document.getElementById("description") as HTMLInputElement).value;
        let assignedTo = (document.getElementById("assignedTo") as HTMLInputElement).value;
        let priority = (document.getElementById("priority") as HTMLInputElement).value;
        if (assignedTo !== "" && priority !== "" && title.length > 0 && description.length > 0) {

            this.taskList.push(
                new Task(title, description, assignedTo, priority)
            );
            this.setState({ taskValue: this.taskList });
            this.clearAllInput();

        } else {
            alert("Where is the papagail ?")
        }


    }

    editItem = (e: React.FormEvent): void => {
        this.currentIndex = parseInt((e.target as HTMLInputElement).name);
        this.showEditButton();
        (document.getElementById("title") as HTMLInputElement).value = this.taskList[this.currentIndex].title;
        (document.getElementById("description") as HTMLInputElement).value = this.taskList[this.currentIndex].description;
        (document.getElementById("assignedTo") as HTMLInputElement).value = this.taskList[this.currentIndex].assigned;
        (document.getElementById("priority") as HTMLInputElement).value = this.taskList[this.currentIndex].priority;
    }

    saveChanges = () => {
        this.taskList[this.currentIndex].title = (document.getElementById("title") as HTMLInputElement).value;
        this.taskList[this.currentIndex].description = (document.getElementById("description") as HTMLInputElement).value;
        this.taskList[this.currentIndex].assigned = (document.getElementById("assignedTo") as HTMLInputElement).value;
        this.taskList[this.currentIndex].priority = (document.getElementById("priority") as HTMLInputElement).value;

        this.setState({ taskValue: this.taskList });
        this.showAddTaskButton();
        this.clearAllInput();
    }

    finishedItem = (e: React.FormEvent): void => {
        this.currentIndex = parseInt((e.target as HTMLInputElement).name);
        this.taskEnded.push(this.taskList[this.currentIndex]);
        this.taskList.splice(this.currentIndex, 1)
        this.setState({ taskValue: this.taskList });
        this.setState({ taskEndedValue: this.taskEnded });
        this.showAddTaskButton();
        this.clearAllInput();

    }

    deleteItem = (e: React.FormEvent): void => {
        this.currentIndex = parseInt((e.target as HTMLInputElement).name);
        this.taskList.splice(this.currentIndex, 1)
        this.setState({ taskValue: this.taskList });
        this.showAddTaskButton();
        this.clearAllInput();
    }

    filterTaskAscPriority = () => {

        this.setState({
            taskValue: this.state.taskValue.sort((a: Task, b: Task) => {
                return parseInt(a.priority) - parseInt(b.priority);
            })
        })
    }

    filterTaskDescPriority = () => {
        this.setState({
            taskValue: this.state.taskValue.sort((a: Task, b: Task) => {
                return parseInt(b.priority) - parseInt(a.priority);
            })
        })
    }

    switchFilter = (e: React.FormEvent) => {
        if ((e.target as HTMLInputElement).value === 'asc') {
            this.filterTaskAscPriority();
        } else {
            this.filterTaskDescPriority();
        }
    }

    clearAllInput = () => {
        (document.getElementById("title") as HTMLInputElement).value = "";
        (document.getElementById("description") as HTMLInputElement).value = "";
        (document.getElementById("assignedTo") as HTMLInputElement).value = "";
        (document.getElementById("priority") as HTMLInputElement).value = "";
    }

    showEditButton = () => {
        (document.getElementById("btnSaveChanges") as HTMLInputElement).setAttribute("style", "display: block");
        (document.getElementById("btnAddNewTask") as HTMLInputElement).setAttribute("style", "display: none");
    }

    showAddTaskButton = () => {
        (document.getElementById("btnSaveChanges") as HTMLInputElement).setAttribute("style", "display: none");
        (document.getElementById("btnAddNewTask") as HTMLInputElement).setAttribute("style", "display: block");
    }

    render() {
        return (
            <div className="container">

                <NavCreateNewTask saveChanges={this.saveChanges} addNewTask={this.addNewTask}></NavCreateNewTask>


                <Filter switchFilter={this.switchFilter}></Filter>

                <div className="row task">
                    <div className="col">
                        <TaskStarted items={this.state.taskValue} edit={this.editItem} finish={this.finishedItem} delete={this.deleteItem} onDragEnd={this.onDragEnd} ></TaskStarted>
                    </div>
                    <div className="col">
                        <TaskEnded items={this.state.taskEndedValue}></TaskEnded>
                    </div>

                </div>

            </div>

        )
    }

}

export default TaskList;