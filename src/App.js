import React from 'react'
import InProgressList from "./components/InProgressList";
import DoneList from "./components/DoneList";
import TodoList from "./components/TodoList";
import AddTaskModal from "./components/AddTaskModal";
import {addTask, deleteTask} from "./utils/state-functions";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = localStorage.getItem('state') ? {
                ...JSON.parse(localStorage.getItem('state')),
                isAddTaskModalShow: false,
                // task: {}
            } :
            {
                todoList: [],
                inProgressList: [],
                doneList: [],
                isAddTaskModalShow: false,
                task: {}
            }
    }

    shouldComponentUpdate(nextProps, nextState) {
        localStorage.setItem('state', JSON.stringify(nextState));
        return true;
    }

    onInProgressDrop = (card) => {
        switch (card.state) {
            case 'todo': {
                card.state = 'inProgress';
                this.setState({
                    todoList: this.state.todoList.filter(c => c.id !== card.id),
                    inProgressList: [...this.state.inProgressList, card]
                })
                break;
            }
            case 'done': {
                card.state = 'inProgress';
                this.setState({
                    doneList: this.state.doneList.filter(c => c.id !== card.id),
                    inProgressList: [...this.state.inProgressList, card]
                })
                break;
            }
        }
    }

    onDoneDrop = (card) => {
        switch (card.state) {
            case 'inProgress': {
                card.state = 'done';
                this.setState({
                    inProgressList: this.state.inProgressList.filter(c => c.id !== card.id),
                    doneList: [...this.state.doneList, card]
                })
                break;
            }
            case 'todo': {
                alert('You cannot drop todo task to done list!!!')
                this.setState({
                    doneList: [...this.state.doneList]
                })
                break;
            }
        }
    }

    onAddTaskClick = () => {
        this.setState({
            isAddTaskModalShow: true,
            task: {}
        })
    }

    onLearnMoreClick = (task) => {
        console.log(task)
        this.setState({
            isAddTaskModalShow: true,
            task: task
        })
    }

    onSaveTaskClick = (task) => {
        this.setState({
            todoList: addTask(this.state.todoList, task)
        })

    }

    onEditTaskClick = (card, updatedCard) => {
        let updatedTask = {
            ...card,
            ...updatedCard
        }
        switch (card.state) {
            case 'todo': {
                this.setState({
                    todoList: [...this.state.todoList.filter(c => c.id !== updatedTask.id), updatedTask]
                })
                break;
            }
            case 'inProgress': {
                this.setState({
                    inProgressList: [...this.state.inProgressList.filter(c => c.id !== updatedTask.id), updatedTask]
                })
                break;
            }
            case 'done': {
                this.setState({
                    doneList: [...this.state.doneList.filter(c => c.id !== updatedTask.id), updatedTask]
                })
                break;
            }
        }
    }

    onDeleteTaskClick = (card) => {
        switch (card.state) {
            case 'todo': {
                this.setState({
                    todoList: deleteTask(this.state.todoList, card.id)
                })
                break;
            }
            case 'inProgress': {
                this.setState({
                    inProgressList: deleteTask(this.state.inProgressList, card.id)
                })
                break;
            }
            case 'done': {
                this.setState({
                    doneList: deleteTask(this.state.doneList, card.id)
                })
                break;
            }
        }
    }

    render() {
        let {todoList, inProgressList, doneList, isAddTaskModalShow, task} = this.state;
        return (
            <React.Fragment>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <AddTaskModal isShow={isAddTaskModalShow} onSaveTaskClick={this.onSaveTaskClick}
                                  onEditTaskClick={this.onEditTaskClick} onDeleteTaskClick={this.onDeleteTaskClick}
                                  card={task}/>
                    <TodoList todoList={todoList} onAddTaskClick={this.onAddTaskClick}
                              onLearnMoreClick={this.onLearnMoreClick}/>
                    <InProgressList onInProgressDrop={this.onInProgressDrop} inProgressList={inProgressList}
                                    onLearnMoreClick={this.onLearnMoreClick}/>
                    <DoneList doneList={doneList} onDoneDrop={this.onDoneDrop}
                              onLearnMoreClick={this.onLearnMoreClick}/>
                </div>
            </React.Fragment>
        )
    }
}
