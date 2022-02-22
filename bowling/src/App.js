import { useState, useMemo } from 'react';
import './App.css';
import Quadra from './Quadra'
import Frames1to9 from './components/Frame1to9';
import Frame10 from './components/Frame10';
import Frame10Normal from './components/Frame10Normal';

const { result } = require('./functions')
function App() {
  const [prevJogadas, setPrevJogadas] = useState([])
  const [recorde, setRecorde] = useState([])
  const [qntdPinos, setQntdPinos] = useState(0)
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
    if (resultado.length > 9) return 0;
  
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

      <Frames1to9 prevJogadas={prevJogadas} resultado={resultado}/>

      {
        parseInt(prevJogadas[9]) === 10 || parseInt(prevJogadas[9]) + parseInt(prevJogadas[10]) === 10 ?
        <Frame10 round1={prevJogadas[9]} round2={prevJogadas[10]} round3={prevJogadas[11]} resultado={resultado[9]}/> :
        <Frame10Normal round1={prevJogadas[9]} round2={prevJogadas[10]} resultado={resultado[9]}/>
      }
    </div>


    <div className='buttons'>
      <button className='btn' onClick={() => click(0)}>{0}</button>
      <button className='btn' onClick={() => click(1)}>{1}</button>
      <button className='btn' onClick={() => click(2)}>{2}</button>
      <button className='btn' onClick={() => click(3)}>{3}</button>
      <button className='btn' onClick={() => click(4)}>{4}</button>
      <button className='btn' onClick={() => click(5)}>{5}</button>
      <button className='btn' onClick={() => click(6)}>{6}</button>
      <button className='btn' onClick={() => click(7)}>{7}</button>
      <button className='btn' onClick={() => click(8)}>{8}</button>
      <button className='btn' onClick={() => click(9)}>{9}</button>
      <button className='btn' onClick={() => click(10)}>{10}</button>
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