import react, { useEffect, useState } from "react";
import pino from './pino.png'
import bola from './bola.png'

const Quadra = ({qntdPinos}) => {

  const [pinos, setPinos] = useState([
    [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], 
  ])
/*
  useEffect(() => {
    console.log(qntdPinos);
    setPinos(pinos => pinos.map((value, index) => {
      if(index >= 10 - qntdPinos) {
        return null
      } else {
        return value
      }
    }))
  }, [qntdPinos])
*/
  return(
    <>
    <div className="background">
      <div className="quadra">
        {
          pinos.map(pinos => {
            const classe = `pino pino_${pinos}`
            return <img key={pinos} className={classe} src={pino}/>
          })
        }
        <img className="bola" src={bola}/>
      </div>
    </div>
    </>
  )
}

export default Quadra