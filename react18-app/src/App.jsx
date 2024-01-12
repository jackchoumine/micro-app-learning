/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:52:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-12 11:32:40
 * @Description :
 */
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [dataFromHost, setData] = useState(null)

  // useEffect(() => {
  if (window.__MICRO_APP_NAME__ === 'react18-app') {
    // 监听来自主应用的通信
    // NOTE  microApp.addDataListener 不生效
    window.microApp.addDataListener(data => {
      console.log('react18-app 收到数据', data)
      // setData(preData => {
      //   console.log('react18-app setData', preData, data)
      //   return { ...preData, ...data }
      // })
      // FIXME 为何执行多次
      //  count 1 执行 2 次
      //  count 2 执行 4 次
      //  count 3 执行 6 次
      //  ……
      setData(data)
      // 返回值将传递给主应用
      return {
        success: true,
        msg: Math.random(),
        microAppName: window.__MICRO_APP_NAME__,
      }
    })
  }
  // }, [])
  console.log('react18-app App', window.__MICRO_APP_NAME__)

  function increment() {
    const newCount = count + 1
    setCount(newCount)
    window.microApp.dispatch(
      {
        from: 'react18-app',
        count: newCount,
      },
      finishSend
    )
  }

  function finishSend(isFinish) {
    console.log('react18-app finishSend', isFinish)
  }

  return (
    <div className='react18-app'>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={increment}>count is {count}</button>
      </div>
      {window.__MICRO_APP_NAME__ ? (
        <h2>dataFromHost {JSON.stringify(dataFromHost)}</h2>
      ) : null}
    </div>
  )
}

export default App
