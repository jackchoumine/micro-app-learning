/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:52:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-11 17:22:53
 * @Description :
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

if (window.__MICRO_APP_ENVIRONMENT__) {
  console.log('我在微前端环境中')
  console.log('微应用名字', window.__MICRO_APP_NAME__)
  // TODO
  // https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/env?id=__micro_app_public_path__
  console.log('微应用静态资源', window.__MICRO_APP_PUBLIC_PATH__)
  console.log('微应用基础路由', window.__MICRO_APP_BASE_ROUTE__)
  console.log('是主应用吗', window.__MICRO_APP_BASE_APPLICATION__)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
