import React, { Component } from 'react';
import Task from "../../../../../models/Task";

function returColor(color: string) {
    const baseColor = "2px solid ";
    switch (color) {
        case "1":
            return baseColor + "green";

        case "2":
            return baseColor + "orange";

        case "3":
            return baseColor + "red";
    }
}

const TaskEnded = (props: any) => {

    return (
        <div>
            <h2>Task ended</h2>

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