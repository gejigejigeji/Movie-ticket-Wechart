//index.js
const app = getApp()

Page({
  data: {
    
    tabActive:0

  },
  onReady(){  
   

  },

  onTogglePage(e,){
    this.setData({
      tabActive:e.detail
    })
    console.log(e.detail)
  }



})
