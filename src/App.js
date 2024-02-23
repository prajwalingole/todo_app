import React from 'react'
import TodoWrapper from './components/TodoWrapper';
// checkings
const App = () => {
  return (
    <div>
      <div className="container">
        <TodoWrapper />
      </div>
      <div className="created">Created by Prajwal Ingole</div>
    </div>

  )
}

export default App;