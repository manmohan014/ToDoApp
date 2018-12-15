import React from 'react';
import './App.css';
import TaskItem from './TaskItem';
import AddItem from './AddItem';

const tasks = [
{
  title: 'Practice',
  desc: "Make sure to practice for next week's football tournament",
  dueDate: '2018-12-18 20:00'
},
{
  title: 'Study',
  desc: 'Study for the finals three hours daily',
  dueDate: '2018-12-19 20:00'
}
];

localStorage.setItem('tasks',JSON.stringify(tasks));

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: JSON.parse(localStorage.getItem('tasks'))
    };
    
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);    
  }

  componentWillMount(){
    const tasks = this.getTasks();
    this.setState({tasks});
  }

  getTasks(){
    return this.state.tasks
  }

  onAdd(title, desc, dueDate){
    const tasks = this.getTasks();
    tasks.push({
      title,
      desc,
      dueDate
    });

    this.setState({tasks});
  }
  onDelete(title){
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task =>{
      return task.title !== title;
    });

    this.setState({tasks: filteredTasks});
  }

  onEditSubmit(title, desc, dueDate, originalTitle){
    let tasks = this.getTasks();
    tasks = tasks.map(task => {
      if(task.title === originalTitle){
      task.title = title;
      task.desc = desc;
      task.dueDate = dueDate;
    }
    return task;
     });
  this.setState({tasks});  
}
  render() {
    return (
      <div className="App">
        <h1>To-Do App </h1>
        <AddItem 
         onAdd={this.onAdd}/>
        {
          this.state.tasks.map(task => {
            return(
             <TaskItem 
             key={task.title}
             {...task}
             onDelete={this.onDelete}
             onEditSubmit={this.onEditSubmit}
             />
            )
          })
        }
      </div>
    );
  }
}

export default App;
