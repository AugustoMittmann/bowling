import { useEffect, useState, useMemo } from 'react';
import './App.css';
import Quadra from './Quadra'
const { result } = require('./functions')

function App() {
  const [jogada, setJogada] = useState([])
  const [display, setDisplay] = useState([])
  const [round, setRound] = useState()
  const arrayFrames = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const arrayButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  function novoJogo() {
    setJogada([])
    setDisplay([])
    setRound()
  }

  function click(buttonClick) {
    setJogada(jogada => [...jogada, buttonClick]) //seta a jogada (usada para enviar para a função que faz os cálculos)
    round === 0 ? setRound(1) : buttonClick === 10 ? setDisplay(display => [...display, '']) : setRound(0)  //se fizer strike ele seta um '' antes, se fizer um spare (0,10) ele reage normal
    setDisplay(display => [...display, buttonClick])  //seta display, array usado para o display
  }
  
  const resultado = useMemo(() => {
    return result(jogada)
  }, [jogada])


  return (
    <>
    <div className="background">
    <div className="score">Score: {resultado[9] || resultado[resultado.length-1]}</div>
    <Quadra qntdPinos={jogada[jogada.length-1]}/>
    <div className='container'>
    {
      arrayFrames.map((value, index) => {
        const frameClassName = `frame frame_${value}`
        return <div key={value} className={frameClassName}> 
          <div className='round_1'>{display[(index*2)]}</div>
          <div className='round_2'>{display[(index*2)+1]}</div>
          <div className='result'> {resultado[value]}</div>
        </div>
      })
    }

    {
      display[19] === 10 ?
      <div className='frame_especial'>
        <div className='round_1_especial'>{display[19]}</div>
        <div className='round_2_especial'>{display[21] === 10 ? display[21] : display[20]}</div>
        <div className='round_2_especial'>{display[23] === 10 ? display[23] : display[22]}</div>
        <div className='result_especial'> {resultado[9]}</div>
      </div> 
      : display[18] + display[19] === 10 ?
      <div className='frame_especial'>
        <div className='round_1_especial'>{display[18]}</div>
        <div className='round_2_especial'>{display[19]}</div>
        <div className='round_2_especial'>{display[20]}</div>
        <div className='result_especial'> {resultado[9]}</div>
      </div> :
      <div className='frame'>
        <div className='round_1'>{display[18]}</div>
        <div className='round_2'>{display[19]}</div>
        <div className='result'> {resultado[9]}</div>
      </div>
    }
    </div>

    <div className='buttons'>
      {
        arrayButtons.map((value) => {
          return <button key={value} className='btn' onClick={() => click(value)}>{value}</button>
        })
      }
    </div>
    <div>
      <button className='btn_especial' onClick={() => novoJogo()}>Novo Jogo</button>
    </div>
    <div>
      <button className='btn_especial' onClick={() => click(Math.ceil(Math.random()* (round === 0 ? 10-jogada[jogada.length-1] : 10)))}>Jogar aleatório</button>
    </div>
    </div>
    </>
  )
}

export default App;