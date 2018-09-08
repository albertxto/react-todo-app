import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ListItem from './ListItem';

class App extends Component {
  constructor(){
    super();

    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      todos: [{
        id: 1, name: 'Watch a movie'
      }, {
        id: 2, name: 'Playing game',
      }, {
        id: 3, name: 'Write some code'
      }]
    };

    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.generateTodoId = this.generateTodoId.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //ubah state sesuai dengan input
  handleChange(event){
    this.setState({
      newTodo: event.target.value
    });

    console.log(event.target.name, event.target.value);
  }

  //generate id baru untuk state todos
  generateTodoId(){
    const lastTodo = this.state.todos[this.state.todos.length - 1];
    if(lastTodo){
      return lastTodo.id + 1;
    }

    return 1;
  }

  //tambah todo ke dalam state
  addTodo(){
    if(this.state.newTodo.length > 0){
      const newTodo = {
        name: this.state.newTodo,
        id: this.generateTodoId()
      }

      const todos = this.state.todos;
      todos.push(newTodo);

      this.setState({
        todos: todos,
        newTodo: ''
      });

      this.alert('Todo added successfully');
    }
    else{
      this.setState({notification: 'Add todo is required!'});
    }
  }

  //ubah button menjadi edit
  editTodo(index, item){
    this.setState({
      editing: true,
      editingIndex: index,
      newTodo: item.name
    });
  }

  //ubah todo ke dalam state
  updateTodo(index){
    const todo = this.state.todos[this.state.editingIndex];

    todo.name = this.state.newTodo;

    const todos = this.state.todos;
    todos[this.state.editingIndex] = todo;

    this.setState({
      todos,
      editing: false,
      editingIndex: null,
      newTodo: ''
    });
    this.alert('Todo updated successfully');
  }

  //hapus todo yang ada di state
  deleteTodo(index){
    const todos = this.state.todos;
    delete todos[index];

    this.setState({ todos });
    this.alert('Todo deleted successfully');
  }

  //tampilkan notifikasi yang dapat hilang secara otomatis dalam 5 detik
  alert(notification){
    this.setState({ notification });

    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 5000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div className="container" style={{marginBottom: '20px'}}>
          <h1>Todo App</h1>

          {
            this.state.notification && 
            <div className="alert alert-success">{this.state.notification}</div>
          }

          <div className="form-group">
            <input 
              type="text" 
              name="todo" 
              className="form-control" 
              placeholder="Add a new to do" 
              onChange={this.handleChange}
              value={this.state.newTodo} />
          </div>

          <div className="form-group">
            <button 
              onClick={this.state.editing ? this.updateTodo : this.addTodo}
              className="btn btn-success form-control"
              disabled={this.state.newTodo.length <= 0}
            >
              {this.state.editing ? "Update todo" : "Add todo"}
            </button>
          </div>

          {
            !this.state.editing && 
            <ul className="list-group">
              {this.state.todos.map((item, index) => {
                return <ListItem 
                  key={item.id}
                  item={item}
                  editTodo={() => { this.editTodo(index, item); }}
                  deleteTodo={() => { this.deleteTodo(index); }}
                />
              })}
            </ul>
          }

          {
            this.state.editing && 
            <div>
              <p>ID: {this.state.todos[this.state.editingIndex].id}</p>
              <p>Todo: {this.state.todos[this.state.editingIndex].name}</p>
            </div>
          }

          <hr />
        </div>
      </div>
    );
  }
}

export default App;
