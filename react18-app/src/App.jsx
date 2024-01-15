/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:52:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-15 22:12:29
 * @Description :
 */
import { Button } from 'antd'
import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'

import './App.css'
import About from './pages/About'
import Home from './pages/Home'
import Product from './pages/Product'

function App() {
  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem('dataFromReactApp'))?.count || 0
  )
  const [countFromBase, setData] = useState(
    JSON.parse(localStorage.getItem('baseCount')) ?? 0
  )

  // useEffect(() => {
  if (window.__MICRO_APP_NAME__ === 'react18-app') {
    // 监听来自主应用的通信
    // NOTE  microApp.addDataListener 不生效
    window.microApp.addDataListener(data => {
      console.log('react18-app 收到数据', data)
      // debugger
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
  // console.log('react18-app App', window.__MICRO_APP_NAME__)

  function increment() {
    const newCount = count + 1
    setCount(newCount)
    if (window.__MICRO_APP_ENVIRONMENT__) {
      window.microApp.dispatch(
        {
          from: 'react18-app',
          count: newCount,
        },
        finishSend
      )
    }
  }

  function finishSend(isFinish) {
    console.log('react18-app finishSend', isFinish)
  }

  const location = useLocation()
  useEffect(() => {
    const fullPath = `/host${location.pathname}`
    window.localStorage.setItem('initPath', fullPath)
    window.microApp.dispatch(
      {
        from: 'react18-app',
        initPath: fullPath,
      },
      finishSend
    )
  }, [location.pathname])

  return (
    <div className="react18-app">
      <h1>Vite + React</h1>
      {window.__MICRO_APP_NAME__ ? <h2>{window.__MICRO_APP_NAME__}</h2> : null}
      <div className="card">
        <Button onClick={increment} type="primary">
          count is {count}
        </Button>
      </div>
      <p>{JSON.stringify(location)}</p>
      {window.__MICRO_APP_NAME__ ? (
        <h2>countFromBase {JSON.stringify(countFromBase)}</h2>
      ) : null}
      <nav>
        <NavLink to="/">首页</NavLink>
        <NavLink to="/product">产品</NavLink>
        <NavLink to="/about">关于</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
