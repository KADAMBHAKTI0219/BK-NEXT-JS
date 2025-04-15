'use client'
import { createCategory } from '@/lib/categoryApi';
import React from 'react'

const AddCategory = () => {
  const handleSubmit = (e)=>{
    e.preventDefault();
    const formdata = new FormData(e.target)
    const data = Object.fromEntries(formdata.entries())
    createCategory(data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })

  }
  return (
    <div>
      <form action="" onSubmit={(e)=>handleSubmit(e)}>
      <label htmlFor="category">Category</label>
      <input type="text" name='category' id='category'/><br />
      <label htmlFor="fabric">Fabric</label>
      <input type="text" name='fabric' id='fabric'/><br />
      <input type="submit" value="Submit  " />
      </form>
    </div>
  )
}

export default AddCategory
