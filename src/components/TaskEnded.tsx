import React, { Component } from 'react';
import Task from "./../models/Task";
function returColor(color: string) {
    switch (color) {
        case "1":
            return "1px solid green";

        case "2":
            return "1px solid orange";

        case "3":
            return "1px solid red";
    }
}

const TaskEnded = (props: any) => {

    return (
        <div>
            <h2>Task Ended</h2>

            {props.items !== null
                ? props.items.map((item: Task, index: string) => (
                    <div key={index} className="containerTask" style={{ border: returColor(item.priority) }}>
                        <div className="header borderBottomGrey">
                            <h1 id="taskTitle">{item.title}</h1>
                            <p> <strong>Assigned to :</strong> {item.assigned} </p>
                        </div>

                        <div className="body borderBottomGrey">
                            <h3>Description</h3>
                            <p>{item.description}</p>
                        </div>

                    </div>
                ))
                : null}
        </div>
    )

}

export default TaskEnded;