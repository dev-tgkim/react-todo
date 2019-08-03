import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {

  id = 3;

  state = {
    input: '',
    todos: [
      {id: 0, text: '리액트 소개', checked: false},
      {id: 1, text: '리액트 소개', checked: true},
      {id: 2, text: '리액트 소개', checked: false},
    ]
  }

  handleChange = (e) => {
    this.setState({input: e.target.value});
  }

  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '',
      todos: todos.concat({//concat 대신 Array.from() 후에 push 써도 무방. 하지만 concat이 간결하고 좋음.
        id: this.id++, text: input, checked: false
      })
    });
  }

  handleKeypress = (e) => {
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const {todos} = this.state;

    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];

    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const {todos} = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    const { input, todos } = this.state; //이걸 선언 안하면 뒤에서 쓸때 this.state.어쩌구 라고 써줘야함. ex:여기서 todos 빼면 밑에서 {todos} 쓰면 에러나고 {this.state.todos} 해줘야함.
    const { handleChange, handleCreate, handleKeypress, handleToggle, handleRemove } = this;
    return (
      <TodoListTemplate form={(
        <Form
          value = {input}
          onKeyPress = {handleKeypress}
          onChange = {handleChange}
          onCreate = {handleCreate}
          />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;