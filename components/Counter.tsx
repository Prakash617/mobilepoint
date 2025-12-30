// "use client"

// import { useSelector, useDispatch } from "react-redux"
// import { RootState, AppDispatch } from "../store/store"
// import { increment, decrement, reset } from "../store/counterSlice"

// export default function Counter() {
//   const count = useSelector((state: RootState) => state.counter.value)
//   const dispatch = useDispatch<AppDispatch>()

//   return (
//    <div className="flex bg-white justify-between px-4 items-center gap-4 border p-2 rounded-lg ">

//        <div>
//                   <button className="text-2xl font-bold" onClick={() => dispatch(decrement())}>-</button>
//                 </div>
//                 <div className="font-bold">{count}</div>
//                 <div>
//                   <button className="text-2xl font-bold" onClick={() => dispatch(increment())}>+</button>
//                 </div>

    
//     </div>
//   )
// }
