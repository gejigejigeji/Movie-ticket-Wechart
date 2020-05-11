// miniprogram/pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    overdue:"03:00"

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
    let time = this.data.overdue;
    let maxtime = 180;
    let clearTime=setInterval(()=>{
      if (maxtime >= 0) {
        let minutes = Math.floor(maxtime / 60);
        let seconds = Math.floor(maxtime % 60);
        if (seconds.toString().length==1){
          seconds="0"+seconds.toString()
        }
       
        let msg = '0'+minutes + ":" + seconds ;
        --maxtime;
        console.log(msg, seconds.toString().length)
        this.setData({
          overdue:msg
        })

      } else {
        clearInterval(clearTime);
      }


    },1000)
    

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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