import { render } from '@testing-library/react';
import React, { Component } from 'react';
import TaskItems from './TaskItem';
import TaskEnded from './TaskEnded';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Task from './../models/Task';

class Header extends Component {
    taskList: Task[] = [];
    taskEnded: Task[] = [];
    state = {
        taskValue: [],
        taskEndedValue: [],
    }
    currentIndex = 0;


    onDragEnd = (result: any) => {
        const { destination, source, reason } = result;
        if (!destination || reason === 'CANCEL') {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        let users = Object.assign([], this.taskList);
        const droppedUser = this.state.taskValue[source.index];

        users.splice(source.index, 1);
        users.splice(destination.index, 0, droppedUser);


        this.setState({ taskValue: users });
        this.taskList = users;


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
            (document.getElementById("title") as HTMLInputElement).value = "";
            (document.getElementById("description") as HTMLInputElement).value = "";
            (document.getElementById("assignedTo") as HTMLInputElement).value = "";
            (document.getElementById("priority") as HTMLInputElement).value = "";


        } else {
            alert("Where is the papagail ?")
        }


    }

    editItem = (e: any) => {
        this.currentIndex = e.target.name;
        (document.getElementById("btnSaveChanges") as HTMLInputElement).setAttribute("style", "display: block");
        (document.getElementById("btnAddNewTask") as HTMLInputElement).setAttribute("style", "display: none");
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
        (document.getElementById("btnSaveChanges") as HTMLInputElement).setAttribute("style", "display: none");
        (document.getElementById("btnAddNewTask") as HTMLInputElement).setAttribute("style", "display: block");
    }

    finishedItem = (e: any) => {
        this.currentIndex = e.target.name;
        this.taskEnded.push(this.taskList[this.currentIndex]);
        this.taskList.splice(this.currentIndex, 1)
        this.setState({ taskValue: this.taskList });
        this.setState({ taskEndedValue: this.taskEnded });
        console.log("baing baing c'est marseillle avec 3 L", this.currentIndex);

    }

    deleteItem = (e: any) => {
        this.currentIndex = e.target.name;
        this.taskList.splice(this.currentIndex, 1)
        this.setState({ taskValue: this.taskList });
    }

    render() {
        return (
            <div className="container">

                <Modal.Dialog style={{ display: "block" }}>
                    <Modal.Header >
                        <Modal.Title>Create a new task</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Task title</label>
                                        <input id="title" type="text" className="form-control" />

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <input id="description" type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">



                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Assigned to</label>
                                        <select id="assignedTo" className="form-select" aria-label="Default select example">
                                            <option selected value="">Who ..</option>
                                            <option value="tanako">Tanako</option>
                                            <option value="akiko">Akiko</option>
                                            <option value="genji">Genji</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Priority</label>
                                        <select id="priority" className="form-select" aria-label="Default select example">
                                            <option selected value="">Select a priority level</option>
                                            <option value="1">Not important</option>
                                            <option value="2">Important</option>
                                            <option value="3">Now</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button id="btnSaveChanges" variant="warning" onClick={this.saveChanges} style={{ display: "none" }}>Save changes</Button>
                        <Button id="btnAddNewTask" variant="info" onClick={this.addNewTask}>Add this task</Button>
                    </Modal.Footer>
                </Modal.Dialog>


                <div className="row">
                    <div className="col">
                        <TaskItems items={this.state.taskValue} edit={this.editItem} finish={this.finishedItem} delete={this.deleteItem} onDragEnd={this.onDragEnd} ></TaskItems>
                    </div>
                    <div className="col">
                        <TaskEnded items={this.state.taskEndedValue}></TaskEnded>
                    </div>

                </div>

            </div>

        )
    }

}

export default Header;