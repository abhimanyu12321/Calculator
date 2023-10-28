import React from 'react';
import { ACTIONS } from "../utils/reducerAction.js";

function Spanbutton({ span, dispatch }) {
  return (
    <button className=" span-two  col-span-2 text-[2rem] border  border-black bg-[#60a5fa] hover:bg-[#93c5fd] focus:bg-[#93c5fd] " onClick={() => dispatch({ type: ACTIONS.EVALUATE })} id='equals'>
      {span}
    </button>
  );
}

export default Spanbutton;
