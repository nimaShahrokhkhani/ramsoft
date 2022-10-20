import shortid from "shortid";

export function addTask(taskList, task) {
    const newTodo = Object.assign({}, task, {
        id: shortid.generate(),
        state: 'todo'
    });

    return taskList.concat([newTodo]);
}

export function deleteTask(taskList, id) {
    return taskList.filter((todo) => todo.id !== id);
}
