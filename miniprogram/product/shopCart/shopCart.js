// miniprogram/product/shopCart/shopCart.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    productList:[],
    spani:null,
    sparrow:null,
    ani:true,
    detailList:null,
    price:null,
    user:null,
    type:0
  },

  onClickArrow(){
    let spani=wx.createAnimation({
      duration: 250,
      timingFunction: "ease-out",
      delay: 0,
      transformOrigin: "50% 50%",
    })
    let sparrow = wx.createAnimation({
      duration: 250,
      timingFunction: "ease-out",
      delay: 0,
      transformOrigin: "50% 50%",
    })
    let detailList = wx.createAnimation({
      duration: 150,
      timingFunction: "ease-out",
      delay: 0,
      transformOrigin: "50% 50%",
    })

    let show=this.data.ani

    if (show){
      spani.height('470rpx').step()       //后期改成 商品条目数量 * 高度80rpx
      sparrow.rotate('180').step()
      detailList.opacity(1).step()
    }else{
      spani.height('180rpx').step()       //后期改成 商品条目数量 * 高度80rpx
      sparrow.rotate(0).step()
      detailList.opacity(0).step()

    }

 
    this.setData({
      spani,
      sparrow,
      ani:!show,
      detailList
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    let productList=this.data.productList
    let type;
    eventChannel.on('onForm', (data) =>{
      console.log(data)
      if (data.type && data.type == "immediatelyBuy"){
        type ='immediatelyBuy'
        this.setData({
          productList: data.list,
          price: data.list[0].price,
          type
        })
      }
    })

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
    const user = app.globalData.user
    this.setData({
      user
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