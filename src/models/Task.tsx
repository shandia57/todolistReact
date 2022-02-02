class Task {
    title: string;
    description: string;
    assigned: string;
    priority:string;

    constructor(title: string, description:string, assigned:string, priority:string) {
        this.title = title;
        this.description = description;
        this.assigned = assigned;
        this.priority = priority;
    }
}

export default Task;