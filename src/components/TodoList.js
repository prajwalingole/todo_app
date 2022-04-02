import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';
import TodoFilters from "./TodoFilters";
import TodoItem from "./TodoItem";

const getTodos = gql`
  query getTodos {
    todos {
      title
      is_completed
      id
    }
  }
`;

const Clear_Completed = gql`
mutation clearCompleted {
    delete_todos(where: {is_completed: {_eq: true}}) {
      affected_rows
    }
  }
`;

const TodoList = (props) => {
  const [state, setState] = useState({
    filter: "all",
    clearInProgress: false,
    todos: []
  });

  const filterResults = filter => {
    setState({
      ...state,
      filter: filter
    });
  };

  const { todos } = props;

  const [clearCompletedTodos] = useMutation(Clear_Completed);

  const clearCompleted = () => {
    clearCompletedTodos({
      optimisticResponse: true,
      update: (cache, { data }) => {
        const existingTodos = cache.readQuery({ query: getTodos });
        const newTodos = existingTodos.todos.filter(t => (!t.is_completed));
        cache.writeQuery({ query: getTodos, data: { todos: newTodos } });
      }
    });
  }

  let filteredTodos = todos;
  if (state.filter === "active") {
    filteredTodos = todos.filter(todo => todo.is_completed !== true);
  } else if (state.filter === "completed") {
    filteredTodos = todos.filter(todo => todo.is_completed === true);
  }

  const todoList = [];
  filteredTodos.forEach((todo, index) => {
    todoList.push(<TodoItem key={index} index={index} todo={todo} />);
  });

  return (
    <>
      <div className="todoListWrapper">
        <ul>{todoList}</ul>
      </div>

      <TodoFilters
        todos={filteredTodos}
        currentFilter={state.filter}
        filterResultsFn={filterResults}
        clearCompletedFn={clearCompleted}
        clearInProgress={state.clearInProgress}
      />
    </>
  )
}

const TodoListQuery = () => {
  const { loading, error, data } = useQuery(getTodos);
  if (loading) return <div>Loading...</div>
  if (error) {
    return <div>There is an error :(</div>
  }
  return <TodoList todos={data.todos} />;
}

export default TodoListQuery;
export { getTodos };