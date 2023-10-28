export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    ADD_OPERATION: 'add-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'compute the values'
}

export function reducer(state, { type, payload }) {
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
                currentoperand: state.currentoperand === '0' ? `${payload.number}` : `${state.currentoperand || ''}${payload.number}`
            }


        case ACTIONS.ADD_OPERATION:
            if (state.currentoperand === '0' && state.previousoperand == null) {
                return state
            }
            if (state.previousoperand == null)
                return {
                    ...state,
                    operation: payload.operand,
                    previousoperand: state.currentoperand,
                    currentoperand: '0',
                }

            if (state.currentoperand === '0') {
                return {
                    ...state,
                    operation: payload.operand === '-' ? `${state.operation}${payload.operand}`.slice(0, 2) : payload.operand
                }
            }

            return {
                ...state,
                previousoperand: evaluate(state.currentoperand, state.previousoperand, state.operation),
                operation: payload.operand,
                currentoperand: ''
            }


        case ACTIONS.CLEAR:
            return { currentoperand: '0', previousoperand: null }



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
        case '*-':
            value = pre * - current
            break
        case '+-':
            value = pre + - current
            break
        case '÷-':
            value = pre / - current
            break
    }



    return value.toString()
}