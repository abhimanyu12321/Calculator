import React from 'react';
import { ACTIONS } from './App';

function Operationbutton({operand,dispatch}) {
  return (
    
           <button onClick={()=> dispatch({type:ACTIONS.ADD_OPERATION,payload:{operand}})} className="text-[2rem] border border-black bg-[#60a5fa] hover:bg-[#93c5fd] focus:bg-[#93c5fd]">
            {operand}
         </button>
  );
}

export default Operationbutton;
