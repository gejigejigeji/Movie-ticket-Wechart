let app=getApp()
module.exports={
  getLoginToke(){
    return new Promise((resolve, reject)=>{
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'http://127.0.0.1:7001/login/wxlogin',
              method: 'post',
              data: {
                code: res.code
              },
              success(data) {
                resolve(data)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    })
  },
  ajax(obj){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: `http://127.0.0.1:7001${obj.url}`,
        method: obj.method || 'get',
        data: obj.data||null,
        header:{
          token: this.token,
        },
        success(data) {
          resolve(data)
        },
        fail(err){
          reject(err)
        }
      })
    })

  }

}