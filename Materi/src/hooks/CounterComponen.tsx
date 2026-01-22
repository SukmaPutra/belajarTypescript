import useCounter from "./useCounter"

function CounterComponen() {
    const { count, increment, decrement, reset } = useCounter(0);
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Count : {count}</h1>
        <button 
           onClick={() => { increment() }}
            style={{ margin: '0 10px', padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
        >
            Increase
        </button>
        <button 
            onClick={() => { decrement() }}
            style={{ margin: '0 10px', padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
        >
            Decrease
        </button>
        <button 
            onClick={() => { reset() }}
            style={{ margin: '0 10px', padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
        >
            Reset
        </button>
    </div>
  )
}

export default CounterComponen
