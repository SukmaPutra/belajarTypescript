import { useReducer } from 'react'
import  counterReducer from './CounterReducer';
import type {  } from './CounterReducer';

const Counter = () => {
    const initialState = { count: 0 };
    const [state, dispatch] = useReducer(counterReducer, initialState);
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Count : {state.count}</h1>
        <button 
           onClick={() => dispatch({type: 'increment', payload: 1})}
            style={{ margin: '0 10px', padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
        >
            Increase
        </button>
        <button 
            onClick={() => dispatch({type:'decrement', payload:1})}
            style={{ margin: '0 10px', padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
        >
            Decrease
        </button>
        <button 
            onClick={() => dispatch ({type:'reset'})}
            style={{ margin: '0 10px', padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
        >
            Reset
        </button>
    </div>
  )
}

export default Counter
