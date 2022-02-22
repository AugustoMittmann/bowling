import React from "react";

const Frame10 = ({round1, round2, round3, resultado}) => {

  return (
    <>
    <div className='frame_especial frame'>
      <div className='round_1_especial'>{round1}</div>
      <div className='round_2_especial'>{round2}</div>
      <div className='round_2_especial'>{round3}</div>
      <div className='result_especial'>{resultado}</div>
    </div>
  </>
  )
}

export default Frame10