// miniprogram/currentPage/record/record.js
let app=getApp()
import { $wuxToast } from '../../ui/wux/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    close:{
      surname:false,
      name: false,
      phone: false,
      region: false,
      address: false
    },
    form:{
      surname:'',
      name:'',
      phone:null,
      region:[],
      address:'',
      normal: 1,
    },
    type:''

  },
  onFocus(e){
    let name = e.currentTarget.dataset.name
    let close=this.data.close
    close[name]=true
    this.setData({
      close
    })
  },
  onBlur(e) {
    let name = e.currentTarget.dataset.name
    let close = this.data.close
    let form = this.data.form;
    const value = e.detail.value
    close[name] = false
    form[name] = value
    console.log(form)





    
    this.setData({
      close
    })
  },
  onClearInput(key){
    let form = this.data.form;
    form[key]=''
    this.setData({
      form
    })
    
  },
  onChangeRegion(e){
    let form=this.data.form;
    form.region = e.detail.value
    this.setData({
      form
    })
  },
  onChangeCheck(e) {
    let check = null;
    console.log(e)
    let form = this.data.form
    const flag = e.detail.value.length || e

    if (flag == 1) {
      check = 1
    } else {
      check = 0
    }
    form.normal = check
    this.setData({
      form
    })

  },
  onSubmit(e) {
    // let form = { ...e.detail.value}
    let form = JSON.parse(JSON.stringify({...this.data.form }));
    let method = '', url ='/address/address';


    const normal=this.data.form.normal
    form.region=form.region.join(',')
    form.normal = normal
    console.log(form)
    if (this.data.type == 'edit') {
      method='put'
      url =`/address/address/${form.id}`
    }else{
      method = 'post'
    }

    app.globalData.ajax({
      url: url,
      data:form,
      method: method,
    }).then(res=>{
      console.log(res.data)
      let user = res.data;
      console.log(user)
      if(user.normal==true){
        app.globalData.user.region = user.region
        app.globalData.user.address = user.address 
        app.globalData.user.name = user.name 
        app.globalData.user.phone = user.phone 
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    const user = app.globalData.user;
    const address=options;
    let form=this.data.form,type;
    if (options.type && options.type=='edit'){
      form.id = options.id
      form.userId = options.userId
      form.region = options.region.split(',')
      form.name = options.name
      form.surname = options.surname
      form.phone = options.phone
      form.address = options.address
      form.normal = options.normal=="false"?0:1
      type='edit'
    }else{
      form.id = user.id
    }

    this.setData({
      form,
      type
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})