import React from 'react'
import Image from 'next/image'

function Adsrecentview() {
  const adsrecentdata = [
    {
      image: ["/topcell6.png", "/topcell20.png"]
    },
  ];


  const data = [
    {
      id: 1,
      label: "NEW",
      image: "/topcell21.png",
      title: "Xomie Remid 8 Sport Water Resistance Watch",
      price: "Rs. 4200/-",
    },
    {
      id: 2,
      label: "NEW",
      image: "/topcell22.png",
      title: "Microtec Surface 2.0 Laptop",
      price: "Rs. 94000/-",
    },
    {
      id: 3,
      image: "/topcell1.png",
      title: "aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB",
      price: "Rs. 12000",
    },
    {
      id: 4,
      discount: "20%",
      image: "/topcell2.png",
      title: "SROK Smart Phone 128GB, Oled Retina",
      price: "Rs. 20000/-",
      priceColor: "text-red-500",
    },
  ];

  return (
    <div className=' pb-2 '>
      <div className=' '>
        {adsrecentdata.map((adsproduct, index) => (
          <div key={index} className='grid grid-cols-2 gap-2 pb-2'>

            <div className='relative'>
              <Image

                src={adsproduct.image[0]}
                alt="hell"
                width={622}
                height={180}
                className="object-contain mt-2 "
              />
              <div className='absolute  top-13 left-100 z-50 text-white font-semibold'>
                <h1 className='text-4xl text-[#FFE400] '>10% Back</h1>
                <p className='text-sm mt-2'>Earn 10% Cash back on
                  Swootech. Learn How</p>
              </div>
            </div>
            <div className='relative'>
              <Image

                src={adsproduct.image[1]}
                alt="hell"
                width={622}
                height={180}
                className="object-contain mt-2 "
              />
              <div className='absolute  top-13 left-10 z-50 text-white font-semibold'>

                <div className='flex relative w-100 gap-2'>
                  <h1 className='text-2xl '>Download
                    our app</h1>
                  <p className='text-sm pr-5'>Enter your phone number and we'll
                    send you a download link.</p>
                </div>
                <div className=' relative '>
                  <input
  type="text"
  className="w-70  h-9 p-2 rounded-sm bg-[#353739]  mt-2 placeholder:text-white text-white opacity-68 text-sm"
  placeholder="(+xx) xxx..."
/>
<button className="text-green-600 hover:underline absolute left-50 top-5 text-xs">
  SEND LINK
</button>


                </div>
              </div>
            </div>

          </div>
        ))}


      </div>

      <div className="w-full bg-white rounded-xl border p-5 shadow-sm ">

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-sm md:text-base">YOUR RECENTLY VIEWED</h2>
          <button className="text-xs text-gray-500 hover:underline">View All</button>
        </div>


        <div className="flex items-center gap-23 overflow-x-auto scrollbar-hide mt-10">
          {data.map((item) => (
            <div key={item.id} className="min-w-[170px] flex  ">

              <div className="relative mb-2 ">
                {item.label && (
                  <div className="absolute top-0 left-0 z-10 bg-black text-white text-[10px] px-2 py-1 rounded-md">
                    {item.label}
                  </div>
                )}

                {item.discount && (
                  <div className="absolute top-1 left-0 z-10 bg-purple-600 text-white text-[10px] px-1 rounded-md py-2 ">
                    SAVE {item.discount}
                  </div>
                )}

                <div className="w-[90px] h-[90px] relative mx-auto mr-3  mt-5">
                  <Image
                    src={item.image}
                    alt="product"
                    fill
                    className="object-contain  "
                  />
                </div>
              </div>
              <div className='grid grid-row-2 gap-1 text-left  w-100 '>


                <p className="text-xs text-black w-full tracking-wide wrap-break-word h-20  ">{item.title}</p>


                <p className={`text-sm font-semibold ${item.priceColor || "text-black"}`}>
                  {item.price}
                </p>
              </div>
            </div>
          ))}


          <div className="flex gap-2">
            <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">‹</button>
            <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">›</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adsrecentview