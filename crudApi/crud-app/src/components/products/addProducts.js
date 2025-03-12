"use client"
import React, { useState } from 'react'
import { addProducts } from '../redux/slices/product/productThunks';
import { useDispatch } from 'react-redux';

const AddProducts = () => {
  
  const dispatch = useDispatch();
  const initialData = {
    title: '',
    price: 0,
    description: ''
}
const [formData, setformData] = useState(initialData);
const handleChange = (e)=>{
    setformData({...formData,[e.target.name]:e.target.value})
}

const {title,price,description} = formData
const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(addProducts(formData));
    setformData({ title: "", price: "", description: "" });
}
  return (
    <div>
      <form action="" onSubmit={(e)=>handleSubmit(e)}>
        <input type="text" placeholder='enter title' name='title' value={title} onChange={(e)=>handleChange(e)}/> <br />
        <input type='number' placeholder='enter price' name='price' value={price} onChange={(e)=>handleChange(e)}/> <br />
        <textarea name="description" placeholder="enter description" value={description} onChange={(e)=>handleChange(e)}></textarea> <br/>
        <input type="submit" />
    </form>
    </div>
  )
}

export default AddProducts
