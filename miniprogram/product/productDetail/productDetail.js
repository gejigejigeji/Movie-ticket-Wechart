// miniprogram/product/productDetail/productDetail.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
 
  data: {
    styleSwich:false,
    bgOption:0,
    isBtnType:1,
    productId:'',
    user:{},
    productDetails:null,
    like:false
  
  },
  onStarTab(e){
      this.setData({
        like:!this.data.like
      })
  },
  addShopingCart(e){
    const form = e.detail
    const user = this.data.user
    form.userId = user.id
    form.region = user.region
    form.address = user.address
    app.globalData.ajax({
      url:'/shoppingCart/shoppingCart',
      method:'post',
      data: form
    }).then(res=>{
      console.log(res)
    })

  },
  startBuy(e){
    const form = e.detail
    const user=this.data.user
    const productDetails = this.data.productDetails
    form.userId = user.id
    form.region = user.region
    form.address = user.address
    form.cover = productDetails.cover
    form.title = productDetails.title

    let requestData = [form]
    wx.navigateTo({
      url: '/product/shopCart/shopCart',
      success: function (res) {
        res.eventChannel.emit('onForm', { list: requestData,type:'immediatelyBuy'})
      }
    })
  },
  isBuyOrCar(e){
    this.setData({
      isBtnType: e.detail,
      styleSwich: true
    })
  },
  closePopup(){
      this.setData({
        styleSwich:!this.data.styleSwich
      })
  },
  selectStyle(){
    this.setData({
      isBtnType:2,
      styleSwich: true
    })
  },
  onScrollEnd(){
    let bgOption = this.data.bgOption
    bgOption=0;
    this.setData({
      bgOption
    })
  },
  onScroll(e){
    let sc = e.detail.scrollTop;
    let bgOption=this.data.bgOption
    let directe = e.detail.deltaY

    if (sc >= 50 && sc<250){
      if (directe > 0) {
        if(sc %2==0){
          bgOption -= 0.1

        }

      } else {
        if (sc % 2 == 0) {
          bgOption += 0.1

        }
     
      }
    } else if (sc > 250){
      bgOption =1
    } else if (sc < 50) {
      bgOption = 0
    }
  



    
    
    this.setData({
      bgOption
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = { ...app.globalData}

    this.setData({
      productId:options.id,
      user
    })
    const productId=options.id
    app.globalData.ajax({
      url: `/product/productDetails/${productId}`,
    }).then(res=>{
      let rul = res.data.data
      rul.master=rul.master.split(',')
      rul.details = rul.details.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;" ')
      rul.productStyle.map((a,b)=>{
        if(b==0){
          a.selected = true
        }else{
          a.selected = false
        }
      })
      
      this.setData({
        productDetails:rul
      })
      console.log(rul)
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
    this.setData({
      user: app.globalData.user
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