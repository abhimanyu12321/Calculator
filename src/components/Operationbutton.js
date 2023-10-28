import React from 'react';
import { ACTIONS } from "../utils/reducerAction.js";

function Operationbutton({ operand, dispatch, id }) {
  return (

    <button onClick={() => dispatch({ type: ACTIONS.ADD_OPERATION, payload: { operand } })} className="text-[2rem] border border-black bg-[#60a5fa] hover:bg-[#93c5fd] focus:bg-[#93c5fd]" id={id}>
      {operand}
    </button>
  );
}

export default Operationbutton;
