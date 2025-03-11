"use client"; // Required for using hooks in a Client Component

import { useSelector, useDispatch } from "react-redux";
// import { decrement, increment } from "../redux/slice/counterSlice";
import { decrement,increment } from "../redux/slice/counterSlice";
import { useEffect, useState } from "react";

const Counter1 = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();



  return (
    <div className="h-screen flex justify-center items-center flex-col space-y-8">
      <h1 className="text-5xl ">Counter: {count}</h1>
     <div className="space-x-4">
     <button onClick={() => dispatch(increment())} className="bg-green-700 text-white p-4 border-2 border-white rounded-2xl">Increment</button>
     <button onClick={() => dispatch(decrement())} className="bg-red-700 text-white p-4 border-2 border-white rounded-2xl">Decrement</button>
     </div>
    </div>
  );
};

export default Counter1;
