import React from 'react';
import { ACTIONS } from './App';

function Numberbutton({number,dispatch}) {
  return (
    
         <button onClick={()=> dispatch({type:ACTIONS.ADD_DIGIT,payload:{number}})} className="text-[2rem]  border border-black bg-[#60a5fa] hover:bg-[#93c5fd] focus:bg-[#93c5fd]">
            {number}
         </button>

  );
}

export default Numberbutton;
