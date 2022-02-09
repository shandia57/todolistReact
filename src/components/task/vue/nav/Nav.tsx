
import Button from 'react-bootstrap/Button';
import './nav.css';

const NavCreateNewTask = (props: any) => {
    return (
        <div>
            <nav>
                <div className="navHeader">
                    <h1>Create a new task</h1>
                </div>
                <div className="container">
                    <div className="row">
                        {/* Title task */}
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Task title</label>
                                <input id="title" type="text" className="form-control" />

                            </div>
                        </div>

                        {/* Description task */}
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <input id="description" type="text" className="form-control" />
                            </div>
                        </div>
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
                            <div className="mb-3">
                                <label className="form-label">Priority</label>
                                <select id="priority" className="form-select" aria-label="Default select example">
                                    <option selected value="" >Select a priority level</option>
                                    <option value="1" style={{ color: "green" }}>Not important</option>
                                    <option value="2" style={{ color: "orange" }}>Important</option>
                                    <option value="3" style={{ color: "red" }}>Very important</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navFooter">
                    <Button id="btnSaveChanges" variant="warning" onClick={props.saveChanges} style={{ display: "none" }}>Save changes</Button>
                    <Button id="btnAddNewTask" variant="info" onClick={props.addNewTask}>Add this task</Button>
                </div>
            </nav>
        </div>
    );
}

export default NavCreateNewTask;