"use client";
import React, { useEffect } from "react";
import { deleteProducts, getProducts } from "../redux/slices/product/productThunks";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const GetProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getProducts()); 
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  const handleDelete = (id) => {
    console.log("Deleting product with ID:", id); 
    dispatch(deleteProducts(id))
  };

  return (
    <div>
       <h1>Products</h1>
      <div>
       {  
        products?.map((el,index)=>(
          <div key={index}>
            <h2>{el.title}</h2>
            <button  onClick={() => handleDelete(el.id)}>Delete</button>
            <Link href={`/editProduct/${el.id}`}>Edit</Link>
          </div>
        ))
       }
      </div>
    </div>
  );
};

export default GetProduct;
