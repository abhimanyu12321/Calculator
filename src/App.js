import Numberbutton from "./components/Numberbutton";
import Operationbutton from "./components/Operationbutton";
import Spanbutton from "./components/Spanbutton";
import { useReducer } from "react";
import { ACTIONS, reducer } from "./utils/reducerAction.js";
import { ModifyOperation } from "./utils/modify.js";



function App() {
  const [{ currentoperand, previousoperand, operation }, dispatch] = useReducer(reducer, { currentoperand: '0' });

  if (operation !== '' && operation !== undefined && operation !== null) { ModifyOperation(operation, operation.length) }
  return (
    <div className="container min-h-[100vh] w-[100vw] bg-gradient-to-r from-[#2563eb] to-[#16a34a] flex items-center justify-center">
      <div className=" max-w-[70vw] calculator min-h-[70vh]  grid grid-cols-[repeat(4,5rem)] grid-rows-[minmax(7rem,auto) repeat(5,4rem)] justify-center gap-0 shadow-2xl">
        <div className="output bg-[rgba(0,0,0,.75)] col-start-1 col-span-4 flex flex-col items-end justify-around p-[.75rem] break-all" id='display'>
          <div className="previous_operand text-[rgba(255,255,255,.75)] text-[1.5rem]">{previousoperand} {operation}</div>
          <div className="current_operand text-white text-[2.5rem]">{currentoperand}</div>
        </div>
        <button className=" span-two  col-span-2 text-[2rem]  border border-black bg-[#60a5fa] hover:bg-[#93c5fd] focus:bg-[#93c5fd]" onClick={() => dispatch({ type: ACTIONS.CLEAR })} id='clear'>
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })} className="text-[2rem] border border-black bg-[#60a5fa] hover:bg-[#93c5fd] focus:bg-[#93c5fd]">
          DEL
        </button>
        <Operationbutton operand='÷' dispatch={dispatch} id="divide" />
        <Numberbutton number='1' dispatch={dispatch} id='one' />
        <Numberbutton number='2' dispatch={dispatch} id='two' />
        <Numberbutton number='3' dispatch={dispatch} id='three' />
        <Operationbutton operand='*' dispatch={dispatch} id='multiply' />
        <Numberbutton number='4' dispatch={dispatch} id='four' />
        <Numberbutton number='5' dispatch={dispatch} id='five' />
        <Numberbutton number='6' dispatch={dispatch} id='six' />
        <Operationbutton operand='+' dispatch={dispatch} id='add' />
        <Numberbutton number='7' dispatch={dispatch} id='seven' />
        <Numberbutton number='8' dispatch={dispatch} id='eight' />
        <Numberbutton number='9' dispatch={dispatch} id='nine' />
        <Operationbutton operand='-' dispatch={dispatch} id='subtract' />
        <Numberbutton number='.' dispatch={dispatch} id='decimal' />
        <Numberbutton number='0' dispatch={dispatch} id='zero' />
        <Spanbutton span='=' dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
