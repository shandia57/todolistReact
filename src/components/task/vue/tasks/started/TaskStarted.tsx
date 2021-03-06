import React, { Component } from "react";
import Task from "../../../../../models/Task";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


type props = {
  items: Task[],
  edit(e: React.FormEvent): void,
  finish(e: React.FormEvent): void,
  delete(e: React.FormEvent): void,
  onDragEnd(result: Object): void,

};

class TaskStarted extends Component<props>{


  returColor(color: string) {
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

  render() {

    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        <div>

          <h2>Tasks started</h2>
          <Droppable droppableId='dp1'>

            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>

                {this.props.items !== null
                  ? this.props.items.map((item: Task, index: number) => (


                    <Draggable key={index} draggableId={index + ''} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="containerTask" style={{ border: this.returColor(item.priority) }}>
                            <div className="header borderBottomGrey">
                              <h1 id="taskTitle">{item.title}</h1>
                              <p> <strong>Assigned to :</strong> {item.assigned} </p>
                            </div>this.

                            <div className="body borderBottomGrey">
                              <h3>Description</h3>
                              <p>{item.description}</p>
                            </div>
                            <div className="footer  ">
                              <button name={index + ''} className="btn btn-warning elementFloatRight" onClick={this.props.edit}>Edit</button>
                              <button name={index + ''} className="btn btn-success  elementFloatRight" onClick={this.props.finish}>Done</button>
                              <button name={index + ''} className="btn btn-danger elementFloatRight" onClick={this.props.delete}>Delete</button>
                            </div>
                          </div>

                        </div>
                      )}
                    </Draggable>
                  ))


                  : null}

                {provided.placeholder}


              </div>

            )}
          </Droppable>

        </div>


      </DragDropContext>


    );
  }
}



export default TaskStarted;
