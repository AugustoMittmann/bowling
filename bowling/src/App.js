import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const arrayFrames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] //display
  
  const [frame, setFrame] = useState(0)
  const [round, setRound] = useState(1)
  const [firstNumber, setFirstNumber] = useState([])
  const [secondNumber, setSecondNumber] = useState([])
  const [result, setResult] = useState([])
  const [resultado, setResultado] = useState([])
  const arrayy = []
  

  function click(buttonClick) {
    if(round === 1) {
      if(buttonClick === 10) {  //strike
        setFirstNumber(firstNumber => [...firstNumber, ''])
        setSecondNumber(secondNumber => [...secondNumber, buttonClick])
        setFrame(frame+1)
        resultados(0)
      } else {
        setFirstNumber(firstNumber => [...firstNumber, buttonClick])
        setRound(2)
      }
    }
    if(round === 2) {
      setSecondNumber(secondNumber => [...secondNumber, buttonClick])
      setFrame(frame+1)
      setRound(1)
    }
    setResult(resultados(buttonClick))
  }
  function resultados(buttonClick) {
    arrayy.push(buttonClick)
    console.log(arrayy);
    return arrayy

    if(resultado % 2 !== 0) {
      if(resultado.length === 0){
        setResult(result => [...result, [buttonClick]])
      } else {
        setResult(result => [...result, [buttonClick + parseInt(result[result.length-1])]])
      }
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
    </section>

    <div className='buttons'>
      {
        arrayFrames.map((value) => {
          return <button key={value} className='btn' onClick={() => click(value+1)}>{value+1}</button>
        })
      }
    </div>
    </>
  )
}

export default App;
