'use client'
import React from 'react'

const AddProducts = () => {
  return (
    <div>
      <form action="">
        <label for="name">Product:</label>
        <input type="text" id="name" name="name" />
        <br/>
        <label for="price">Price:</label>
        <input type="number" id="price" name="price" />
        <br/>
        <label htmlFor="stock">Stock:</label>
        <input type="number" id="stock" name="stock" />
        <br/>
        <label htmlFor="category">Category:</label>
        <input type="text" id='category' name='category'/>
        <br />
        <label htmlFor="image">Images</label>
        <input type="file" id='image' name='image'/>
      </form>
    </div>
  )
}

export default AddProducts
