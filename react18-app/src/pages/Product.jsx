/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 18:35:48
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-16 12:24:24
 * @Description :
 */
const Product = () => {
  function goBaseHome() {
    sendDataToBase()
  }
  function sendDataToBase() {
    window.microApp.dispatch(
      {
        from: 'react18-app',
        toPath: '/',
        __forceUpdate: Date.now(),
      },
      () => {
        console.log('发送成功')
      }
    )
  }
  return (
    <div>
      <h1>Product Page</h1>
      {window.__MICRO_APP_ENVIRONMENT__ ? (
        <button onClick={goBaseHome} type="primary">
          go to base home
        </button>
      ) : null}
    </div>
  )
}

export default Product
