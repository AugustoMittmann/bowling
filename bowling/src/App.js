import { useEffect, useState, useMemo } from 'react';
import './App.css';
import Quadra from './Quadra'
const { result } = require('./functions')

function App() {
  const [jogada, setJogada] = useState([])
  const arrayFrames = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  
  
  function click(buttonClick) {
    if(buttonClick === 10) {
      setJogada(jogada => [...jogada, 0])
    }
    setJogada(jogada => [...jogada, buttonClick])
  }
  
  const resultado = useMemo(() => { 
    return result(jogada) 
  }, [jogada])


  return (
    <>
    <div className="background">
    <div className="score">Score:</div>
    <div className="score pontos">{10}</div>
    <Quadra qntdPinos={0} score={100}/>
    <div className='container'>
    {
      arrayFrames.map((value, index) => {
        const frameClassName = `frame frame_${value}`
        return <div key={value} className={frameClassName}> 
          <div className='round_1'>{jogada[index*2]}</div>
          <div className='round_2'>{jogada[(index*2)+1]}</div>
          <div className='result'> {resultado[value]}</div>
        </div>
      })
      }
      {
        jogada[19] === 10 ?
        <div className='frame_especial'>
          <div className='round_1_especial'>{jogada[19]}</div>
          <div className='round_2_especial'>{jogada[21] === 10 ? jogada[21] : jogada[20]}</div>
          <div className='round_2_especial'>{jogada[23] === 10 ? jogada[23] : jogada[22]}</div>
          <div className='result_especial'> {resultado[9]}</div>
        </div> 
        : jogada[18] + jogada[19] === 10 ?
        <div className='frame_especial'>
          <div className='round_1_especial'>{jogada[18]}</div>
          <div className='round_2_especial'>{jogada[19]}</div>
          <div className='round_2_especial'>{jogada[20]}</div>
          <div className='result_especial'> {resultado[9]}</div>
        </div> :
        <div className='frame'>
          <div className='round_1'>{jogada[18]}</div>
          <div className='round_2'>{jogada[19]}</div>
          <div className='result'> {resultado[9]}</div>
        </div>
      }
    </div>

    <div className='buttons'>
      <button className='btn' onClick={() => click(0)}>{0}</button>
      {
        arrayFrames.map((value) => {
          return <button key={value} className='btn' onClick={() => click(value+1)}>{value+1}</button>
        })
      }
      <button className='btn' onClick={() => click(10)}>{10}</button>
    </div>
      <button className='btn_especial'>random</button>
    </div>
    </>
  )
}

export default App;