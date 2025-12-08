import Image from 'next/image'
import React from 'react'

function AudioCamera() {

    const audiocamera = [{
        title: "Audio & Camera ",
        image: ["/topcell4.png", "/topcell5.png", "/topcell9.png", "/topcell10.png", "/topcell11.png"],
        idata: [" Speaker", " DSLR Camera","Earbuds","Microphone"],
        items: ["12","9","5","12"]
    },
    {
        title: "Gaming ",
        image: ["/topcell7.png", "/topcell15.png", "/topcell12.png", "/topcell13.png", "/topcell14.png"],
        idata: [" Monitors", " Chair","Controller","KeyBoards"],
        items: ["28","12","9","30"]
    },
    {
        title: "Office Equipments ",
        image: ["/topcell8.png", "/topcell16.png", "/topcell17.png", "/topcell18.png", "/topcell19.png"],
        idata: [" Printer", " Network","security","Projectors"],
        items: ["9","90","12","12"]
    },



    ]
    return (
        <div className=' grid grid-cols-3  gap-2  rounded border '>
            {audiocamera.map((acproduct, index) => (
                <div key={index} className='pt-2 '>
                    <div className='pr-5 pl-2 pb-2 bg-white border border-gray-300 hover:shadow-lg transition-shadow duration-200 rounded-md  '>
                        <div className=' grid grid-cols-2 gap-10 mb-5'>
                            <h1 className='mt-4 ml-5.5  '>{acproduct.title}</h1>
                            <button className='ml-30 mt-4 text-sm'>Viewall</button>

                        </div>
                        <div className=' '>

                            <div className=''>
                                <div >
                                    <Image
                                        src={acproduct.image[0]}
                                        alt="title"
                                        width={368}
                                        height={190}
                                        className="object-contain mt-2 pl-5 ml-0.5"
                                    />
                                </div>
                                <div className="h-px bg-gray-300 mt-10 mb-4 w-[350px] ml-5"></div>

                                <div className='grid grid-cols-2 grid-rows-2 pr-2'>
                                    <div className=' gap-3 ml-14'>
                                        <Image
                                            src={acproduct.image[2]}
                                            alt="hell"
                                            width={100}
                                            height={150}
                                            className="object-contain mt-6 "
                                        />
                                        <div className=' pl-3'>
                                        <h1 className='mt-4 ml-1  text-sm'>{acproduct.idata[0]}</h1>
                                       <button className=" hover:underline  px-1 transition duration-200 text-sm text-gray-500">
                                            {acproduct.items[0]}-items
                                        </button>
                                        </div>


                                    </div>
                                    <div className=' gap-3 ml-14'>
                                        <Image
                                            src={acproduct.image[1]}
                                            alt="hell"
                                            width={100}
                                            height={150}
                                            className="object-contain mt-6 "
                                        />
                                        <div className=' pl-3'>
                                        <h1 className='mt-4 ml-1 text-sm'>{acproduct.idata[1]}</h1>

                                        <button className=" hover:underline  px-1 transition duration-200 text-sm text-gray-500">
                                            {acproduct.items[1]}-items
                                        </button>
                                        </div>



                                    </div>
                                    <div className=' gap-3  ml-14 '>
                                        <Image
                                            src={acproduct.image[3]}
                                            alt="hell"
                                            width={100}
                                            height={150}
                                            className="object-contain mt-6  "
                                        />
                                        <div className=' pl-3'>
                                        <h1 className='mt-4 ml-1  text-sm'>{acproduct.idata[2]}</h1>
                                        <button className=" hover:underline  px-1 transition duration-200 text-sm text-gray-500">
                                            {acproduct.items[2]}-items
                                        </button>
                                        </div>


                                    </div>
                                    <div className=' gap-3 ml-14'>
                                        <Image
                                            src={acproduct.image[4]}
                                            alt="hell"
                                            width={100}
                                            height={150}
                                            className="object-contain mt-6 "
                                        />
                                        <div className=' pl-3'>
                                        <h1 className='mt-4 ml-1 text-sm '>{acproduct.idata[3]}</h1>
                                        <button className=" hover:underline  px-1 transition duration-200 text-sm text-gray-500">
                                            {acproduct.items[3]}-items
                                        </button>
                                        </div>

                                    </div>


                                </div>





                            </div>




                        </div>




                    </div>
                </div>
            ))}
        </div>


    )
}

export default AudioCamera