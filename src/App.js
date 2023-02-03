import Numberbutton from "./Numberbutton";
import Operationbutton from "./Operationbutton";
import Spanbutton from "./Spanbutton";
import { useReducer } from "react";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  ADD_OPERATION: 'add-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'compute the values'
}

function reducer(state, { type, payload }) {
  // eslint-disable-next-line 
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentoperand: payload.number,
          overwrite: false
        }
      }
      if (payload.number === '0' && state.currentoperand === '0') { return state }
      if (payload.number === '.' && state.currentoperand.includes('.')) { return state }
      return {
        ...state,
        currentoperand: `${state.currentoperand || ''}${payload.number}`
      }


    case ACTIONS.ADD_OPERATION:
      if (state.currentoperand == null && state.previousoperand == null) {
        return state
      }
      if (state.previousoperand == null)
        return {
          ...state,
          operation: payload.operand,
          previousoperand: state.currentoperand,
          currentoperand: '',
        }

      if (state.currentoperand === '') {
        return {
          ...state,
          operation: payload.operand
        }
      }

      return {
        ...state,
        previousoperand: evaluate(state.currentoperand, state.previousoperand, state.operation),
        operation: payload.operand,
        currentoperand: ''
      }


    case ACTIONS.CLEAR:
      return {currentoperand:''}



    case ACTIONS.EVALUATE:
      if (state.previousoperand == null || state.operation == null || state.currentoperand === '') {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousoperand: null,
        operation: null,
        currentoperand: evaluate(state.currentoperand, state.previousoperand, state.operation)
      }


    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentoperand: ''
        }
      }
      if (state.currentoperand == null) return state
      if (state.currentoperand.lenght === 1) {
        return {
          ...state,
          currentoperand: ''
        }
      }

      return {
        ...state,
        currentoperand: state.currentoperand.slice(0, -1)
      }
  }
}

function evaluate(currentoperand, previousoperand, operation) {
  const pre = parseFloat(previousoperand)
  const current = parseFloat(currentoperand)
  if (isNaN(pre) || isNaN(current)) { return "" }

  let value = '';
  // eslint-disable-next-line 
  switch (operation) {
    case '+':
      value = pre + current
      break

    case '-':
      value = pre - current
      break

    case '*':
      value = pre * current
      break

    case '÷':
      value = pre / current
      break
  }

  return value.toString()
}

function App() {
  const [{ currentoperand, previousoperand, operation }, dispatch] = useReducer(reducer, {currentoperand:''});

   
  return (
    <div className="container min-h-[100vh] w-[100vw] bg-gradient-to-r from-[#2563eb] to-[#16a34a] flex items-center justify-center">
      <div className=" max-w-[70vw] calculator min-h-[70vh]  grid grid-cols-[repeat(4,5rem)] grid-rows-[minmax(7rem,auto) repeat(5,4rem)] justify-center gap-0 shadow-2xl">
        <div className="output bg-[rgba(0,0,0,.75)] col-start-1 col-span-4 flex flex-col items-end justify-around p-[.75rem] break-all">
          <div className="previous_operand text-[rgba(255,255,255,.75)] text-[1.5rem]">{previousoperand} {operation}</div>
          <div className="current_operand text-white text-[2.5rem]">{currentoperand}</div>
        </div>
        <button className=" span-two  col-span-2 text-[2rem]  border border-black bg-[#60a5fa] hover:bg-[#93c5fd] focus:bg-[#93c5fd]" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })} className="text-[2rem] border border-black bg-[#60a5fa] hover:bg-[#93c5fd] focus:bg-[#93c5fd]">
          DEL
        </button>
        <Operationbutton operand='÷' dispatch={dispatch} />
        <Numberbutton number='1' dispatch={dispatch} />
        <Numberbutton number='2' dispatch={dispatch} />
        <Numberbutton number='3' dispatch={dispatch} />
        <Operationbutton operand='*' dispatch={dispatch} />
        <Numberbutton number='4' dispatch={dispatch} />
        <Numberbutton number='5' dispatch={dispatch} />
        <Numberbutton number='6' dispatch={dispatch} />
        <Operationbutton operand='+' dispatch={dispatch} />
        <Numberbutton number='7' dispatch={dispatch} />
        <Numberbutton number='8' dispatch={dispatch} />
        <Numberbutton number='9' dispatch={dispatch} />
        <Operationbutton operand='-' dispatch={dispatch} />
        <Numberbutton number='.' dispatch={dispatch} />
        <Numberbutton number='0' dispatch={dispatch} />
        <Spanbutton span='=' dispatch={dispatch} />




      </div>
    </div>
  );
}

export default App;
