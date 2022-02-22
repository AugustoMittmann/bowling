import React from "react";

const Frame10Normal = ({round1, round2, resultado}) => {
  const arrayFrames = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <>
    <div className='frame'>
      <div className='round_1'>{round1}</div>
      <div className='round_2'>{round2}</div>
      <div className='result'>{resultado}</div>
    </div>
  </>
  )
}

export default Frame10Normal