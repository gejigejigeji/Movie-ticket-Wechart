// miniprogram/currentPage/local/local.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[]

  },

  onUpdate(e){
    const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index
    const ads = this.data.address[index]
    const url = "/currentPage/record/record?name=" + ads.name + "&region=" + ads.region + "&address=" + ads.address + "&phone=" + ads.phone + "&id=" + ads.id + "&surname=" +ads.surname+"&type=edit"+"&normal="+ads.normal+"&userId="+ads.userId
    wx.navigateTo({
      url: url,
    })
    // app.globalData.ajax({
    //   url:`/address/address/${index}`,
    //   method:'put',
    //   data:JSON.stringify({})
    // }).then(res=>{
    //   console.log(res)

    // })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const user=app.globalData.user
    app.globalData.ajax({
      url: '/address/address',
      data:{
        id: user.id
      }
    }).then(res => {
      console.log(res.data)
      this.setData({
        address:res.data.list
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})