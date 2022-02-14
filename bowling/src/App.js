import { render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [arrayFrames, setArrayFrames] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]) //display
  const [renderFinal, setRenderFinal] = useState([1])

  const [frame, setFrame] = useState(0)
  const [round, setRound] = useState(1)
  const [firstNumber, setFirstNumber] = useState([])
  const [secondNumber, setSecondNumber] = useState([])
  const [result, setResult] = useState([])
  const [resultado, setResultado] = useState([0])


  function resultados(buttonClick) {
    if(secondNumber[secondNumber.length-1] === 10) {
      console.log(1);
      if(secondNumber[secondNumber.length-2] === 10) {
        console.log(2);
        if(secondNumber[secondNumber.length-3] === 10) {
          console.log(3);
          if(buttonClick === 10){
            setResult(result => [...result, [30 + parseInt(result[result.length-1])]])
          } else {
            setResult(result => [...result, [firstNumber[frame] + 20 + parseInt(result[result.length-1])]])
            setResult(result => [...result, [firstNumber[frame] + buttonClick + 10 + parseInt(result[result.length-1])]])
            setResult(result => [...result, [firstNumber[frame] + buttonClick + parseInt(result[result.length-1])]])
          }
        } else {
          console.log(-3);
          if(buttonClick !== 10){
            setResult(result => [...result, [firstNumber[frame] + buttonClick + 10 + parseInt(result[result.length-1])]])
            setResult(result => [...result, [firstNumber[frame] + buttonClick + parseInt(result[result.length-1])]])
          } else {
            setResult(result => [...result, [30]])
          }
        }  
      } else {
        console.log(-2);
        if(buttonClick !== 10) {
          console.log(firstNumber[frame] + buttonClick + 10 + parseInt(result[result.length-1]));
          if(result.length === 0) {
            setResult(result => [...result, [firstNumber[frame] + buttonClick + 10]])
            setResult(result => [...result, [firstNumber[frame] + buttonClick + parseInt(result[result.length-1])]])
          } else {
            setResult(result => [...result, [firstNumber[frame] + buttonClick + 10 + parseInt(result[result.length-1])]])
            setResult(result => [...result, [firstNumber[frame] + buttonClick + parseInt(result[result.length-1])]])
          }
        }
      }
    } else {
      if(buttonClick !== 10){
        console.log(-1);
        if(result.length === 0) {
          setResult(result => [...result, [firstNumber[frame] + buttonClick]])
        } else {
          setResult(result => [...result, [firstNumber[frame] + buttonClick + parseInt(result[result.length-1])]])
        }
      } else {
        console.log('nada');
      }
    }
    console.log('-------------');
  }


  function click(buttonClick) {
    if(round === 1) {
      if(buttonClick === 10) {  //strike
        setFirstNumber(firstNumber => [...firstNumber, ''])
        setSecondNumber(secondNumber => [...secondNumber, buttonClick])
        setFrame(frame+1)
        resultados(buttonClick)
      } else {
        setFirstNumber(firstNumber => [...firstNumber, buttonClick])
        setRound(2)
      }
    }
    
    if(round === 2) {
      setSecondNumber(secondNumber => [...secondNumber, buttonClick])
      setFrame(frame+1)
      setRound(1)
      resultados(buttonClick)
    }
  }

  return (
    <>
    <section className='container'>
      {
        arrayFrames.map((value) => {
          const frameClassName = `frame frame_${value}`
          return <div key={value} className={frameClassName}>
            <div className='round_1'>{firstNumber[value]}</div>
            <div className='round_2'>{secondNumber[value]}</div>
            <div className='result'> {result[value]}</div>
          </div>
        })
      }
      {
        secondNumber[9] === 10 ? 
        <div className='frame_especial'>
          <div className='round_1_especial'>{secondNumber[9]}</div>
          <div className='round_2_especial'>{firstNumber[10]}</div>
          <div className='round_2_especial'>{secondNumber[10]}</div>
          <div className='result_especial'> {result[9]}</div>
        </div> :
        <div className='frame'>
          <div className='round_1'>{firstNumber[9]}</div>
          <div className='round_2'>{secondNumber[9]}</div>
          <div className='result'> {result[9]}</div>
        </div>
      }
    </section>

    <div className='buttons'>
      {
        arrayFrames.map((value) => {
          return <button key={value} className='btn' onClick={() => click(value+1)}>{value+1}</button>
        })
      }
      <button className='btn' onClick={() => click(10)}>{10}</button>
    </div>
    </>
  )
}

export default App;
