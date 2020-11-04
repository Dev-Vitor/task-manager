import React, { useState } from 'react';
import './App.css';


function App() {

  const [tasks, setTasks] = useState([]);


  const [modal, setModal] = useState(false);

  const callModal = () => {
    setModal(!modal);
  }

  const saveTask = () => {
    let task = document.getElementById('task');
    if(task.value !== ''){
       setTasks([
      ...tasks,
      {
        id: new Date().getTime(),
        content: task.value[0].toUpperCase() + task.value.substr(1),
        terminated: false
      }
    ])
    setModal(!modal)
  }else{
    alert('this field cannot be empty')
  }
  
  }

  const terminatedTask = (id)=>{
    let newTasks = tasks.filter((val)=>{
     if(val.id === id && val.terminated === false){
       val.terminated = true;
     }else if(val.id === id && val.terminated === true){
        val.terminated = false;
     }

     return val;
    })
    setTasks(newTasks)
  }

  const deleteTask = (id)=>{
    let newTasks = tasks.filter((val)=>{
      if(val.id === id ){
        console.log(id)
        return val.id;
      }
    })
    setTasks(newTasks);
  }
  const returnPage = ()=>{
    return setModal(!modal)
  }

  return (
    <>
      {
        modal ?
          <div className='modal'>
            <div className='content--modal'>
              <h3>Add task</h3>
              <input id='task' type='text' require/>
              <button onClick={() => saveTask()}>Save</button>
              <p style={
                {
                  color: 'blue',
                  cursor: 'pointer',
                  marginTop: '20px',
                  fontWeight: 'bold'
                }
                } onClick={()=> returnPage()}>Come back</p>
            </div>
          </div>
          :
          <div></div>
      }
          <div className='btn' onClick={() => callModal()}><p>+</p></div>
      <div className="App">
        <div className='div--title'>
          <h2 className='title'>My tasks:</h2>
        </div>
        <div className='body'>
          {
            tasks.map((val) => {
              if (!val.terminated) {
                return (
                  <div className='div--task'>
                    <p className='tasks' onClick={()=> terminatedTask(val.id)} >{val.content} </p>
                    <span className='deleteTask'  onClick={()=> deleteTask(val.id)}>
                      x
                      </span>
                  </div>
                )
              } else {
                return (
                  <div className='div--task'>
                    <p className='tasks' onClick={()=> terminatedTask(val.id)} style={{ textDecoration: 'line-through' }}>{val.content} 
                      </p><span className='deleteTask'  onClick={()=> deleteTask(val)}>
                      x
                      </span>
                    
                  </div>
                )
              }
            })
          }
        </div>
      </div>
    </>
  );
}

export default App;