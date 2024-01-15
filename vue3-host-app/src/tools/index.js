/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-15 23:24:21
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-15 23:24:25
 * @Description : 
 */
import microApp from '@micro-zoe/micro-app'

export function sendDataTo(appName,data,afterSend){
   // 向子应用react18-app传递数据
   microApp.setData(appName,data,afterSend)
}