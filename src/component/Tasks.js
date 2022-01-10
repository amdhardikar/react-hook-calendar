import React from 'react'
import { useState } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import './Tasks.css'

function Tasks() {
   const [text, setText] = useState('')
   const [tasks, setTasks] = useState([])
   const [wordCount, setWordCount] = useState(0)
   const maxCount = 60

   const lengthCheck = (string) => {
      if (string.length > 0 && string.length <= maxCount) {
         return true
      } else {
         return false
      }
   }

   const onChangeHandler = (e) => {
      let string = e.target.value
      if (string.length > -1 && string.length <= maxCount) {
         setText(e.target.value)
         setWordCount(string.length)
      }
   }

   const keyPressHandler = (e) => {
      if (lengthCheck(text)) {
         if (e.key === 'Enter') {
            addTask(e)
            setText('')
            setWordCount(0)
         }
      }
   }

   const addTask = (e) => {
      e.preventDefault()
      if (lengthCheck(text)) {
         let id = new Date().getTime()
         let obj = {
            id: id,
            data: text,
         }
         setTasks([...tasks, obj])
         setText('')
         setWordCount(0)
      }
   }

   const cancelTask = (index) => {
      const updatedTasks = tasks.filter((ele) => {
         return index !== ele.id
      })
      setTasks(updatedTasks)
   }

   return (
      <div className="tasks-container">
         <div className="header">
            <h1 style={{ color: '#2baa93' }}>Tasks</h1>
         </div>
         <div className="tasks__container">
            {tasks.map((entry, index) => {
               return (
                  <div key={index} className="single__task">
                     <input type="checkbox" id={entry.id} />
                     <label htmlFor={entry.id}>{entry.data}</label>
                     <button
                        className="cancel-btn task__btn"
                        onClick={() => cancelTask(entry.id)}>
                        <FaTimes />
                     </button>
                  </div>
               )
            })}
         </div>
         <div className="taskform-container">
            <form className="task-form" onKeyPress={(e) => keyPressHandler(e)}>
               <input
                  type="text"
                  name="task"
                  id="task"
                  placeholder="Enter task here"
                  onChange={(e) => onChangeHandler(e)}
                  value={text}
               />
               <p style={{ color: 'lightgray' }}>
                  {wordCount}/{maxCount}
               </p>
               <button
                  className="add-btn task__btn"
                  onClick={(e) => addTask(e)}>
                  <FaPlus />
               </button>
            </form>
         </div>
      </div>
   )
}

export default Tasks
