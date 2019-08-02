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

  render() {
    const { input } = this.state;
    const { handleChange, handleCreate, handleKeypress } = this;
    return (
      <TodoListTemplate form={(
        <Form
          value = {input}
          onKeyPress = {handleKeypress}
          onChange = {handleChange}
          onCreate = {handleCreate}
          />
      )}>
        <TodoItemList/>
      </TodoListTemplate>
    );
  }
}

export default App;