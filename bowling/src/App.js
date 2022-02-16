import { useEffect, useState } from 'react';
import './App.css';
import Quadra from './Quadra'

function App() {
  const [arrayFrames, setArrayFrames] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]) //display
  const [frame, setFrame] = useState(0) //frame atual na partida
  const [round, setRound] = useState(1) //round (poder ser 1 ou 2)
  const [firstNumber, setFirstNumber] = useState([])  //primeira pontuação de cada frame
  const [secondNumber, setSecondNumber] = useState([])  //segunda pontuação de cada frame
  const [result, setResult] = useState([])  //resultado de cada frame
  const [qntdPinos, setQntdPinos] = useState(0) //setado para mostrar na UI
  const [score, setScore] = useState(0)


  function resultados(buttonClick) {
    if(secondNumber[secondNumber.length-1] === 10) {  //se fez 1 strike na rodada anterior
      console.log(1);
      if(secondNumber[secondNumber.length-2] === 10) {  //se fez 3 strikes seguidos
        console.log(2);
        if(secondNumber[secondNumber.length-3] === 10) {  //se fez 4 strikes seguidos
          console.log(3);
          if (firstNumber[frame] + buttonClick === 10){ //se fez um spare depois de 3 strikes seguidos
            setResult(result => [...result, [firstNumber[frame] + 20 + parseInt(result[result.length-1])]])
            setResult(result => [...result, [firstNumber[frame] + 20 + parseInt(result[result.length-1])]]) 
          } else if(buttonClick === 10){  //se faz um strike depois de 3 strikes seguidos
            setResult(result => [...result, [30 + parseInt(result[result.length-1])]])
            if(firstNumber[10] !== undefined) { //se faz strike na jogada adicional do ultimo frame
              setResult(result => [...result, [30 + parseInt(result[result.length-1])]])
            }
          } else {  //se não faz nem strike nem spare depois de 3 strikes seguidos
            setResult(result => [...result, [firstNumber[frame] + 20 + parseInt(result[result.length-1])]])
            setResult(result => [...result, [firstNumber[frame] + buttonClick + 10 + parseInt(result[result.length-1])]])
            setResult(result => [...result, [firstNumber[frame] + buttonClick + parseInt(result[result.length-1])]])
          }
        } else {  //se fez 2 strikes e não fez strike no 3
          console.log(-3);
          if (firstNumber[frame] + buttonClick === 10){ // se faz 2 strikes e um spare
            if(result.length === 0) { //se fez 2 strikes e um spare e não foi computado nenhum resultado anterior
              setResult(result => [...result, [firstNumber[frame] + 20]])
            } else {//se fez 2 strikes e um spare e já foi computado resultados anteriores
              setResult(result => [...result, [firstNumber[frame] + 20 + parseInt(result[result.length-1])]])
            }
            setResult(result => [...result, [firstNumber[frame] + buttonClick + 10 + parseInt(result[result.length-1])]])
          } else if(buttonClick !== 10){  //se fez 2 strikes e fez uma jogada normal
            if(result.length === 0) { //se é o primeiro resultado a ser computado
              setResult(result => [...result, [firstNumber[frame] + 20]])
            } else {  //se já foram computados outros resultados anteriores
              setResult(result => [...result, [firstNumber[frame] + 20 + parseInt(result[result.length-1])]])
            }
            setResult(result => [...result, [firstNumber[frame] + buttonClick + 10 + parseInt(result[result.length-1])]])
            setResult(result => [...result, [firstNumber[frame] + buttonClick + parseInt(result[result.length-1])]])
          } else {  //se fez 3 strikes seguidos
            if(result.length === 0) { //se fez 3 strikes de primeira
              setResult(result => [...result, [30]])
            } else {  //se faz 3 strikes e já foram computados outros resultados
              setResult(result => [...result, [30 + parseInt(result[result.length-1])]])
            }
            if(firstNumber[10] !== undefined) {
              setResult(result => [...result, [30 + parseInt(result[result.length-1])]])
            }
          }
        } 
      } else {  //se fez 2 strikes
        console.log(-2);
        if(firstNumber[10] !== undefined) { //se fez 2 strikes e está no ultimo frame
          setResult(result => [...result, [20 + buttonClick + parseInt(result[result.length-1])]])
        }
        if (firstNumber[frame] + buttonClick === 10){ //se fez um spare depois de fazer 2 strikes seguidos
          if(result.length === 0) { //se não foi computado nenhum resultado anterior depois de fazer 2 strikes e 1 spare
            setResult(result => [...result, [firstNumber[frame] + buttonClick + 10]])
          } else {  //se já foram computados resultados anteriores após fazer um spare depois de 2 strikes
            setResult(result => [...result, [firstNumber[frame] + buttonClick + 10 + parseInt(result[result.length-1])]])
          }
        } else if(buttonClick !== 10) { //se fez 2 strikes seguidos e depois fez jogada normal
          if(result.length === 0) { //verifica se já foi computado resultado anterior depois de fazer 2 strikes e uma jogada normal
            setResult(result => [...result, [firstNumber[frame] + buttonClick + 10]])
            setResult(result => [...result, [firstNumber[frame] + buttonClick + parseInt(result[result.length-1])]])
          } else {  //se não foi computado nenhum resultado anterior depois de fazer 2 strikes e uma jogada normal
            setResult(result => [...result, [firstNumber[frame] + buttonClick + 10 + parseInt(result[result.length-1])]])
            setResult(result => [...result, [firstNumber[frame] + buttonClick + parseInt(result[result.length-1])]])
          }
        }
      }
    } else {  //se a jogada anterior não for um strike
      if(buttonClick === 10){ //caso faça um strike sem fazer strike antes
        console.log('strike');
        if(firstNumber[frame-1] + secondNumber[frame-1] === 10){  //se fez um spare na jogada anterior a fazer um strike
          if(result.length === 0) { //verifica se já foi computado algum resultado depois de fazer um strike e um spare
            setResult(result => [...result, [firstNumber[frame-1] + secondNumber[frame-1] + 10 ]])
          } else {
            setResult(result => [...result, [firstNumber[frame-1] + secondNumber[frame-1] + 10 + parseInt(result[result.length-1])]])
          }
        }
      } else if(firstNumber[frame] + buttonClick === 10) { //se não fez um strike na jogada anterior e na atual e fez um spare
        console.log('spare');
        if(firstNumber[frame-1] + secondNumber[frame-1] === 10){  //verifica se fez um spare na jogada anterior
          if(result.length === 0) { //verifica se já foi computado algo após fazer um spare sem ter feito strike antes
            setResult(result => [...result, [firstNumber[frame-1] + firstNumber[frame] + secondNumber[frame-1]]])
          } else {
            setResult(result => [...result, parseInt(result[result.length-1]) + firstNumber[frame-1] + firstNumber[frame] + secondNumber[frame-1]])
          }
        }
      } else {  //se fez uma jogada normal e a jogada anterior não foi strike
        console.log(-1);
        if(firstNumber[frame-1] + secondNumber[frame-1] === 10){  //verifica se a jogada anterior foi um spare
          if(result.length === 0) {//verifica se já foi computado algo antes de fazer um spare seguido de jogada normal
            setResult(result => [...result, [firstNumber[frame-1] + firstNumber[frame] + secondNumber[frame-1]]])
          } else {
            setResult(result => [...result, parseInt(result[result.length-1]) + firstNumber[frame-1] + firstNumber[frame] + secondNumber[frame-1]])
          }
        }
        if(result.length === 0) { //se fez uma jogada normal sem ter feito spare ou strike antes e agora (jogada normal)
          console.log('e');
          if(firstNumber[frame-1] + secondNumber[frame-1] === 10){  //se fez um spare na primeira rodada (ainda não vai estar computado no result)
            setResult(result => [...result, [firstNumber[frame] + buttonClick + parseInt(result[result.length-1])]])
          } else {
            setResult(result => [...result, [firstNumber[frame] + buttonClick]])
          }
        } else {
          setResult(result => [...result, [firstNumber[frame] + buttonClick + parseInt(result[result.length-1])]])
        }
      }
    }
    console.log('-------------');
  }
  
  function random() {
    const max = 10
    const button = getRandomInt(0, max)
    click(button)
  }
  function getRandomInt(min, max) {
    min = Math.ceil(0)
    max = Math.floor(10)
    return Math.floor(Math.random()*(max-min)) + min
  }

  function click(buttonClick) { //quando faz uma jogada
    if(firstNumber[frame] + buttonClick > 10){
      buttonClick = 10-firstNumber[frame]
    }
    setQntdPinos(buttonClick) //seta os pinos na UI
    if(secondNumber[9] === 10) {  //se faz strike no ultimo frame
      setFirstNumber(firstNumber => [...firstNumber, buttonClick])
      if(firstNumber[10] !== undefined) { //quando efetua a jogada do firstNumber[11] chama os resultados para mostrar o final
        resultados(buttonClick)
      }
    } else if(firstNumber[9] + secondNumber[9] === 10) {  //faz um spare no ultimo frame
      setFirstNumber(firstNumber => [...firstNumber, secondNumber[9]])
      setFirstNumber(firstNumber => [...firstNumber, buttonClick])
      setSecondNumber(secondNumber => secondNumber.map((value, index) => {  //arrumando as posições para mostrar no frame
        return index === 9 ? firstNumber[9] : value
      }))
      setFirstNumber(firstNumber => firstNumber.map((value, index) => { //arrumando as posições para mostrar no frame
        return index === 9 ? 10-firstNumber[9] : value
      }))
      setResult(result => [...result, [10 + buttonClick + parseInt(result[result.length-1])]])  //seta o resultado 
    } else{
      if(round === 1) { //verifica se é o "round 1", ou seja, vamos preencher o firstNumber
        if(buttonClick === 10) {  //se fez um strike
          setFirstNumber(firstNumber => [...firstNumber, '']) //seta o firstNumber para ''
          setSecondNumber(secondNumber => [...secondNumber, buttonClick]) //seta o secondNumber para 10 (strike)
          setFrame(frame+1) //após fazer um strike, seta para o proximo frame
          resultados(buttonClick) //apresenta os resultados
          setQntdPinos(0) //seta todos os pinos
        } else {  //se não fez um strike na primeira rodada
          setFirstNumber(firstNumber => [...firstNumber, buttonClick])  //atribui os pontos para o firstNumber
          setRound(2) //seta para o round 2
        }
      }
      
      if(round === 2) { //se está no round 2
        setSecondNumber(secondNumber => [...secondNumber, buttonClick]) //seta o secondNumber com a pontuação de agora
        setFrame(frame+1) //seta o proximo frame
        setRound(1) //seta o round para a jogada 1
        resultados(buttonClick) //mostra resultados
        setQntdPinos(0) //seta todos os pinos
      }}
  }

  useEffect(() => {
    if(result.length>10) {
      setScore(result[9])
    } else {
      setScore(result[result.length-1])
    }
  }, [result])
  return (
    <>
    <div className="background">
    <div className="score">Score:</div>
    <div className="score pontos">{score}</div>
    <Quadra qntdPinos={qntdPinos} score={score}/>
    <div className='container'>
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
        secondNumber[9] === 10 || secondNumber[9] + firstNumber[9] === 10 ? //se fez strike ou spare no frame 10 renderiza o "frame" especial
        <div className='frame_especial'>
          <div className='round_1_especial'>{secondNumber[9]}</div>
          <div className='round_2_especial'>{firstNumber[10]}</div>
          <div className='round_2_especial'>{firstNumber[11]}</div>
          <div className='result_especial'> {result[9]}</div>
          </div> :  //se não, renderiza um frame normal
        <div className='frame'>
          <div className='round_1'>{firstNumber[9]}</div>
          <div className='round_2'>{secondNumber[9]}</div>
          <div className='result'> {result[9]}</div>
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
      <button className='btn_especial' onClick={() => random()}>Jogar!</button>
    </div>
    </>
  )
}

export default App;