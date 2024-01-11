/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:52:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-11 16:58:51
 * @Description :
 */
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
      </div>
    </>
  )
}

export default App
