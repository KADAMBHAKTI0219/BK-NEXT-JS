"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; 
import { getSingleProductData, updateProduct } from "../redux/slices/product/productThunks";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const singleProduct = useSelector((state) => state.product.singleProduct);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
  });


  useEffect(() => {
    if (id) {
      dispatch(getSingleProductData(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleProduct) {
      setFormData({
        title: singleProduct.title || "",
        price: singleProduct.price || "",
        description: singleProduct.description || "",
      });
    }
  }, [singleProduct]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(id, formData));
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          placeholder="Enter price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <input type="submit" value="Update Product" />
      </form>
    </div>
  );
};

export default EditProduct;
