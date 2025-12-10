import React from 'react'

type Props = {
    text : string
    color : string
    bgColor? : string
}

const FreeAdvertizemantCard = (props: Props) => {
  return (
   <button className={`capitalize  px-2 cursor-pointer rounded-lg py-1 text-[12px]  text-${props.color} ${props.bgColor ? `bg-${props.bgColor}` : 'bg-[#fcf3fd]'}`}>
          {props.text}
    </button>
  )
}

export default FreeAdvertizemantCard