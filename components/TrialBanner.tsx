import Image from 'next/image'
import React from 'react'

type Props = {}

const TrialBanner = (props: Props) => {
  return (
     <div className="flex flex-col sm:flex-row my-2 items-center justify-center gap-2 sm:gap-4 p-3 sm:p-4 bg-linear-to-br from-[#9c6500] to-[#fca301] rounded-xl w-full">
        <Image src="/start.png" alt="star" width={24} height={24} />
        <p className="text-white text-center sm:text-left text-sm sm:text-base font-light">
          Member get
          <span className="text-[#ffe400] font-extrabold uppercase ml-1">
            Free Shipping*
          </span>
          with no order minimum!. *Restrictions apply
          <span className="underline underline-offset-2 ml-1 decoration-[#ffe400]">
            Try free 30-days trails!
          </span>
        </p>
      </div>
  )
}

export default TrialBanner