import React from 'react'
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const TodoWrapper = () => {
  return (
    <div className="todoWrapper">
      <div className="sectionHeader">Todos</div>
      <TodoInput />
      <TodoList />
    </div>
  )
}

export default TodoWrapper;