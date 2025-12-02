import Image from 'next/image'
import { CiShoppingCart } from 'react-icons/ci'
import { GoPerson } from 'react-icons/go'
import { IoIosArrowDown } from 'react-icons/io'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className="bg-[#f5f6f8] pt-4 pb-8 px-8 rounded-xl">
            <div className=" flex justify-between items-center ">
              <div className="flex items-center ">
                <div>
                  <button className="bg-secondary-background pl-8 p-1 mr-4 rounded-lg">
                    Hotline 24/7
                  </button>
                </div>
                <div className="font-semibold">+977 12345678</div>
              </div>
              <div>
                <div className="flex">
                  <div className="flex gap-x-6 mr-12">
                    <div>Sell on Mobile Point</div>
                    <div>Track Order</div>
                  </div>
                  <div className="flex">
                    <div className="flex px-1 gap-2 items-center">
                      <div>NRP</div>
                      <div>
                        <IoIosArrowDown />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-1 border-l-1 border-gray-300">
                      <div>
                        <Image
                          src="/flag.png"
                          alt="Logo"
                          width={15}
                          height={15}
                          className="mr-1"
                        />
                      </div>
                      <div>
                        Eng <IoIosArrowDown className="inline" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-8 justify-between items-center">
              <div>
                <Image src="/logo.png" alt="Logo" width={200} height={200} />
              </div>
              <div className="flex justify-items-start grow">
                <div>
                  <ul className="uppercase flex flex-row  font-extrabold gap-x-4">
                    <li>Home</li>
                    <li className="flex items-center">
                      Product <IoIosArrowDown />
                    </li>
                    <li className="flex items-center">
                      Hot Sales <IoIosArrowDown />
                    </li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-x-8">
                <div className="flex gap-x-4">
                  <div>
                    <div className="h-12 w-12 bg-secondary-background text-[#b3b3b3] flex justify-center align-center items-center rounded-full">
                      <GoPerson size={32} className="m-4" />
                    </div>
                  </div>
    
                  <div>
                    <p>Welcome</p>
                    <p className="font-bold">Log In / Register</p>
                  </div>
                </div>
                <div className="flex gap-x-4 relative">
                  <div>
                    <div className="h-12 w-12 relative text-[#b3b3b3]  bg-secondary-background flex justify-center align-center items-center rounded-full">
                      <div className="w-6 h-6 bg-primary absolute bottom-[-10px] right-[-5px] rounded-full text-center text-white">
                        5
                      </div>
                      <CiShoppingCart size={32} className="m-4" />
                    </div>
                  </div>
    
                  <div>
                    <p>Cart</p>
                    <p className="font-bold">Rs.3000/-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default Navbar