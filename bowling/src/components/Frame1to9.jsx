import React from "react";

const Frames1to9 = ({prevJogadas, resultado}) => {
  const arrayFrames = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <>
    {
      arrayFrames.map((value, index) => {
        const frameClassName = `frame frame_${value}`
        return <div key={value} className={frameClassName}> 
        {
          prevJogadas[index] !== undefined ? prevJogadas[index][0] === 10 ? 
          <>
            <div className='round_1'>{''}</div> 
            <div className='round_2'>{prevJogadas[index] === undefined ? '' : prevJogadas[index][0]}</div>
          </> :
          <>
            <div className='round_1'>{prevJogadas[index] === undefined ? '' : prevJogadas[index][0]}</div>
            <div className='round_2'>{prevJogadas[index] === undefined ? '' : prevJogadas[index][1]}</div>
          </> : null
        }
          <div className='result'> {resultado[value]}</div>
        </div>
      })
    }
  </>
  )
}

export default Frames1to9