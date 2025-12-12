import Image from "next/image";
import React from "react";

function AudioCamera() {
  const audiocamera = [
    {
      title: "Audio & Camera",
      image: ["/topcell4.png", "/topcell5.png", "/topcell9.png", "/topcell10.png", "/topcell11.png"],
      idata: ["Speaker", "DSLR Camera", "Earbuds", "Microphone"],
      items: ["12", "9", "5", "12"],
    },
    {
      title: "Gaming",
      image: ["/topcell7.png", "/topcell15.png", "/topcell12.png", "/topcell13.png", "/topcell14.png"],
      idata: ["Monitors", "Chair", "Controller", "KeyBoards"],
      items: ["28", "12", "9", "30"],
    },
    {
      title: "Office Equipments",
      image: ["/topcell8.png", "/topcell16.png", "/topcell17.png", "/topcell18.png", "/topcell19.png"],
      idata: ["Printer", "Network", "Security", "Projectors"],
      items: ["9", "90", "12", "12"],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg  ">
      {audiocamera.map((acproduct, index) => (
        <div key={index} className="pt-2">
          <div className="bg-white border border-gray-300 hover:shadow-lg transition-shadow duration-200 rounded-md p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-semibold">{acproduct.title}</h1>
              <button className="text-sm text-gray-500 cursor-pointer">View All</button>
            </div>

            {/* Main Image */}
            <div className="mb-4 relative">
              <Image
                src={acproduct.image[0]}
                alt={acproduct.title}
                width={368}
                height={190}
                className="w-full h-auto object-contain rounded"
              />
            </div>

            <div className="border-t border-gray-300 mt-4 mb-4"></div>

            {/* Sub Items Grid */}
            <div className="grid grid-cols-2 gap-5 pt-2">
              {acproduct.idata.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center ">
                  <div className="w-20 h-20  rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src={acproduct.image[idx + 1]}
                    alt={item}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                  </div>
                  <h2 className=" text-sm font-bold mt-2">{item}</h2>
                  <button className="text-xs text-gray-500 cursor-pointer">
                    {acproduct.items[idx]} items
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AudioCamera;
