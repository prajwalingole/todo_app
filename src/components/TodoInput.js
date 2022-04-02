import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import { getTodos } from './TodoList';

const INSERT_TODO = gql`
mutation($todo: String!){
  insert_todos(objects: {title: $todo}) {
    returning {
      id
      title
      is_completed
    }
  }
}
`;

const TodoInput = () => {
  const [todoInput, setTodoInput] = useState('');

  const updateCache = (cache, { data }) => {
    const existingTodos = cache.readQuery({
      query: getTodos
    });
    const newTodo = data.insert_todos.returning[0];
    cache.writeQuery({
      query: getTodos,
      data: { todos: [newTodo, ...existingTodos.todos] }
    });

  };
  const resetInput = () => {
    setTodoInput('');
  };

  const [addTodo] = useMutation(INSERT_TODO, { update: updateCache, onCompleted: resetInput });

  return (
    <form
      className="formInput"
      onSubmit={e => {
        e.preventDefault();
        addTodo({
          variables: { todo: todoInput }
        })
      }}
    >
      <input className="input" placeholder="What needs to be done?"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <i className="inputMarker fa fa-angle-down" />
    </form>
  )
}

export default TodoInput;
