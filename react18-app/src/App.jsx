/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:52:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-12 10:59:20
 * @Description :
 */
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [dataFromHost, setData] = useState(null)

  useEffect(() => {
    if (window.__MICRO_APP_NAME__ === 'react18-app') {
      // 监听来自主应用的通信
      // NOTE  microApp.addDataListener 不生效
      window.microApp.addDataListener(data => {
        console.log('react18-app 收到数据', data)
        setData(preData => {
          console.log('react18-app setData', preData, data)
          return { ...preData, ...data }
        })
      })
    }
  }, [])

  return (
    <div className='react18-app'>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
      </div>
      {window.__MICRO_APP_NAME__ ? (
        <h2>dataFromHost {JSON.stringify(dataFromHost)}</h2>
      ) : null}
    </div>
  )
}

export default App
