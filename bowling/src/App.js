import { useEffect, useState, useMemo } from 'react';
import './App.css';
import Quadra from './Quadra'
const { result } = require('./functions')

function App() {
  const [prevJogadas, setPrevJogadas] = useState([])
  const [recorde, setRecorde] = useState([])
  const [qntdPinos, setQntdPinos] = useState(0)
  const arrayFrames = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const arrayButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const resultado = useMemo(() => {
    return result(prevJogadas)
  }, [prevJogadas])
  const sorted = recorde.sort((a, b) => b - a)  //não entendi pq isso ta funcionando

  function novoJogo() {
    setRecorde(recorde => [...recorde, resultado[9] || resultado[resultado.length-1]])
    setPrevJogadas([])
    setQntdPinos(0)
  }

  const ultimaJogada = prevJogadas[prevJogadas.length - 1]; //ultimaJogada recebe o index da ultima jogada
  const round = (() => {  
    if (!ultimaJogada) return 0;  //se não tem nada
    if (ultimaJogada.length === 2) return 0;  //se já foram preenchidos as 2 jogadas
    if (ultimaJogada[0] === 10) return 0; //se fez um strike antes
  
    return 1; //senão, retorna para a 2 jogada
  })()    

  function click(buttonClick) {
    setPrevJogadas(prevJogadas => {
    
      if (round === 0) {
        setQntdPinos(buttonClick)
        return [...prevJogadas, [buttonClick]]; //se o round for 0, adiciona os pontos
      } else {  //se o round for 1, ou seja, segunda jogada
        setQntdPinos(0)
        return prevJogadas.map((jogada, index) => { //map no histórico de jogadas
          const isLast = index === prevJogadas.length - 1;  //encontra a ultima posição
          if (!isLast) return jogada; //se não for a ultima jogada, retorna o que já tinha
          return [...jogada, buttonClick] //se for a ultima jogada, retorna a nova pontuação
        })
      }
    })
  }

  return (
  <section>
    <div className="background">

      <div className="score">Score: {resultado[9] || resultado[resultado.length-1]}</div>

      <div className='historico'>
        <div className='title'>Placar de Recordes:</div>
        <div className='cada_recorde recorde_1'>{recorde[0]}</div>
        <div className='cada_recorde recorde_2'>{recorde[1]}</div>
        <div className='cada_recorde recorde_3'>{recorde[2]}</div>
        <div className='cada_recorde recorde_4'>{recorde[3]}</div>
        <div className='cada_recorde recorde_4'>{recorde[4]}</div>
      </div>

      <Quadra qntdPinos={qntdPinos}/>

    <div className='container'>
    {
      arrayFrames.map((value, index) => {
        const frameClassName = `frame frame_${value}`
        return <div key={value} className={frameClassName}> 
        {
          prevJogadas[index] !== undefined ? prevJogadas[index][0] === 10 ? 
            <><div className='round_1'>{''}</div> 
            <div className='round_2'>{prevJogadas[index] === undefined ? '' : prevJogadas[index][0]}</div></> :
            <><div className='round_1'>{prevJogadas[index] === undefined ? '' : prevJogadas[index][0]}</div>
            <div className='round_2'>{prevJogadas[index] === undefined ? '' : prevJogadas[index][1]}</div></> : null
        }
          <div className='result'> {resultado[value]}</div>
        </div>
      })
    }

    {
      prevJogadas[9] !== undefined ? prevJogadas[9][0] === 10 || prevJogadas[9][0] + prevJogadas[9][1] === 10 ?
      <div className='frame_especial frame'>
        <div className='round_1_especial'>{prevJogadas[9][0] !== undefined ? prevJogadas[9][0] : null}</div>
        <div className='round_2_especial'>{prevJogadas[9][0] === 10 ? (prevJogadas[10] !== undefined ? prevJogadas[10][0] : null) : prevJogadas[9][1]}</div>
        <div className='round_2_especial'>{
          prevJogadas[10] !== undefined ? (prevJogadas[10][0] === 10 ? (prevJogadas[11] !== undefined ? prevJogadas[11][0] : (prevJogadas[11] !== undefined ? prevJogadas[11][0] : null)) : (prevJogadas[9][0] === 10? prevJogadas[10][1] : prevJogadas[10][0])) : null
        }</div>

        <div className='result_especial'> {resultado[9]}</div>
      </div> 
      : <div className='frame'>
      <div className='round_1'>{prevJogadas[9] !== undefined ? prevJogadas[9][0] : null}</div>
      <div className='round_2'>{prevJogadas[9] !== undefined ? prevJogadas[9][1] : null}</div>
      <div className='result'> {resultado[9]}</div>
    </div> : <div className='frame'>
        <div className='round_1'>{prevJogadas[9] !== undefined ? prevJogadas[9][0] : null}</div>
        <div className='round_2'>{prevJogadas[9] !== undefined ? prevJogadas[9][1] : null}</div>
        <div className='result'> {resultado[9]}</div>
      </div>
    }
    </div>

    <div className='novo_jogo'>
      <button className='btn_especial' onClick={() => novoJogo()}>Novo Jogo</button>
    </div>
    <div className='jogar_aleatorio'>
      <button className='btn_especial' onClick={resultado.length < 11 ? () => click(Math.ceil(Math.random()* (round === 0 ? 10 : (10 - prevJogadas[prevJogadas.length-1][0])))) : null}>Jogar aleatório</button>
    </div>
    </div>
    </section>
  )
}

export default App;