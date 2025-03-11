'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteTask, toggleComplete } from '../redux/slice/toDoList'

const ToDoList = () => {

    const toDoList = useSelector(state => state.toDoList.toDoList)
    const dispatch = useDispatch()
    const [task,setTask] = useState('')

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(addTask(task))
    }

    const handleDelete=(e)=>{
        e.preventDefault();
        dispatch(deleteTask(task))
    }

    const handleChange=(e)=>{
        e.preventDefault();
        dispatch(toggleComplete(e.target.checked));
    }

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <form action="" onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" name="task" placeholder="Enter a task" value={task} onChange={(e)=>setTask(e.target.value)} className='focus:ring-4 ring-white py-2 px-4'/>
            <button type="submit" className='mx-4 px-4 py-2 bg-amber-50 text-black'>Add Task</button>
        </form>

    <table className='space-x-4 mt-4'>
    {
        toDoList.map((todo,index)=>
            <tr key={index} className='border-2 mt-2'>
                <td className='px-4'>{todo}</td>
                <td className='px-4'><input type="checkbox" onChange={(e)=>handleChange(e)}/></td>
                <td><button onClick={(e)=>handleDelete(e)} className='m-4 py-2 rounded-2xl px-6 bg-red-600 text-white'>DeleteTask</button></td>
            </tr>
        )
    }
    </table>
    </div>
  )
}

export default ToDoList
