import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'



const MyWheel = ({ mustSpin, setMustSpin, prizeNumber, data, finishSpinning }) => {

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={['#000']}
        textColors={['#ABFC4F']}
        radiusLineColor="#ABFC4F"
        outerBorderColor="#ABFC4F"
        onStopSpinning={() => {
          setMustSpin(false)
          finishSpinning();
        }}
        innerBorderColor="#fff"
        fontSize={40}
      />
    </>
  )
}

export default MyWheel;