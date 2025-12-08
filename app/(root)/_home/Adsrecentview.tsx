import React from 'react'
import Image from 'next/image'

function Adsrecentview() {
    const adsrecentdata = [
        {
            image : ["/topcell6.png","/topcell20.png"]
        },
    ];
   

const data = [
    {
      id: 1,
      label: "NEW",
      image: "/topcell2.png",
      title: "Xomie Remid 8 Sport Water Resistance Watch",
      price: "Rs. 4200/-",
    },
    {
      id: 2,
      label: "NEW",
      image: "/topcell2.png",
      title: "Microtec Surface 2.0 Laptop",
      price: "Rs. 94000/-",
    },
    {
      id: 3,
      image: "/topcell2.png",
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
      <div className='absolute  top-2 left-100 z-50 text-white font-semibold'>
        <h1>hello</h1>
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

    
      <div className="flex items-center gap-23 overflow-x-auto scrollbar-hide ">   
        {data.map((item) => (
          <div key={item.id} className="min-w-[170px] ">
           
            <div className="relative mb-2 ">
              {item.label && (
                <div className="absolute top-0 left-0 bg-black text-white text-[10px] px-2 rounded-md">
                  {item.label}
                </div>
              )}

              {item.discount && (
                <div className="absolute top-0 left-0 bg-purple-600 text-white text-[10px] px-2 rounded-md ">
                  SAVE {item.discount}
                </div>
              )}

              <div className="w-[110px] h-[110px] relative mx-auto">
                <Image
                  src={item.image}
                  alt="product"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

           
            <p className="text-xs text-black">{item.title}</p>

          
            <p className={`text-sm font-semibold ${item.priceColor || "text-black"}`}>
              {item.price}
            </p>
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