
"use client"; // Required for using hooks in a Client Component

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/slices/counterSlice";

const About1 = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

  return (
    <div>
    <h1>Counter: {count}</h1>
    <button onClick={() => dispatch(increment())}>Increment</button>
    <button onClick={() => dispatch(decrement())}>Decrement</button>
    <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
  </div>
  )
}

export default About1
