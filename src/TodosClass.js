import React from "react";
import TodoItem from "./TodoItem";
import todosData from "./todosData";


class TodosClass extends React.Component{
    constructor(){
        super()
        this.state={
            todos:todosData
        }
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(id){
        this.setState(prevState=>{
            
            const updateTodos=prevState.todos.map(todo=>{
            if(todos.id === id){
                todo.completed= !todo.completed
            }
            return todo;
        })
            return {
                todos: updateTodos
            }
    }
            )
       
    }
    render(){
        const todosItems=this.state.todos.map(item=> <TodoItem key={item.id} item={item} handleChange={this.handleChange}/>)
        return(
            {todosItems}
        )
    }
}
export default TodosClass;