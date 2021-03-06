import React from "react";
import { gql, useMutation } from '@apollo/client';
import { getTodos } from './TodoList';


const TodoItem = ({ index, todo }) => {

  const RemoveTodo = gql`
mutation removeTodo ($id: Int!) {
  delete_todos(where: {id: {_eq: $id}}) {
    affected_rows
  }
}
`;

  const [removeTodoMutation] = useMutation(RemoveTodo);
  const removeTodo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeTodoMutation({
      variables: { id: todo.id },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos = cache.readQuery({ query: getTodos });
        const newTodos = existingTodos.todos.filter(t => (t.id !== todo.id));
        cache.writeQuery({
          query: getTodos,
          data: { todos: newTodos }
        });
      }
    });
  };

  const Toggle_Todo = gql`
  mutation toggleTodo ($id: Int!, $isCompleted: Boolean!) {
    update_todos(where: {id: {_eq: $id}}, _set: {is_completed: $isCompleted}) {
      affected_rows
    }
  }
  `;

  const [toggleTodoMutation] = useMutation(Toggle_Todo);

  const toggleTodo = () => {
    toggleTodoMutation({
      variables: { id: todo.id, isCompleted: !todo.is_completed },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos = cache.readQuery({ query: getTodos });
        const newTodos = existingTodos.todos.map(t => {
          if (t.id === todo.id) {
            return { ...t, is_completed: !t.is_completed };
          } else {
            return t;
          }
        });
        cache.writeQuery({
          query: getTodos,
          data: { todos: newTodos }
        });
      }
    });
  };

  return (
    <li>
      <div className="view">
        <div className="round">
          <input
            checked={todo.is_completed}
            type="checkbox"
            id={todo.id}
            onChange={toggleTodo}
          />
          <label htmlFor={todo.id} />
        </div>
      </div>

      <div className={"labelContent" + (todo.is_completed ? " completed" : "")}>
        <div>{todo.title}</div>
      </div>

      <button className="closeBtn" onClick={removeTodo}>
        x
      </button>
    </li>
  );
};

export default TodoItem;