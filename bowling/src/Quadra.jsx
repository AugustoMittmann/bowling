import { useEffect, useState } from "react";
import pino from './pino.png'
import bola from './bola.png'

const Quadra = ({qntdPinos}) => {

  const [pinos, setPinos] = useState([
    [1], [2], [3], [4], [5], [6], [7], [8], [9], [10] 
  ])

  useEffect(() => {
    setPinos(pinos => pinos.map((value, index) => {
      if(index >= 10 - qntdPinos) { return null } 
      else {
        if(qntdPinos === 0) { return index+1 } else { return value }
      }
    }))
  }, [qntdPinos])

  return(
    <>
      <div className="quadra">
        {
          pinos.map(pinos => {
            const classe = `pino pino_${pinos}`
            return <img key={pinos} className={classe} src={pino}/>
          })
        }
        <img className="ball" src={bola}/>
      </div>
    </>
  )
}

export default Quadra