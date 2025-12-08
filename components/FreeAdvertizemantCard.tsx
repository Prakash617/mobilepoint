import React from 'react'

type Props = {
    text : string
    color : string
}

const FreeAdvertizemantCard = (props: Props) => {
  return (
   <button className={`capitalize bg-[#fcf3fd] px-2 py-1 text-xs rounded-xs text-${props.color}`}>
                    {props.text}
    </button>
  )
}

export default FreeAdvertizemantCard