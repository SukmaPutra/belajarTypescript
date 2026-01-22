export type CounterState ={
    count: number;
}

type CounterAction =
 {type: 'increment', payload: number} |
 {type: 'decrement', payload: number} |
 {type: 'reset'}

 const counterReducer = (state:CounterState, action:CounterAction) => {

    switch(action.type){
        case 'increment':
            return { count: state.count + action.payload };
        case 'decrement':
            return { count: state.count - action.payload };
        case 'reset':
            return { count: 0 };
        default:
            return state;
    }
}

export default counterReducer
