// components/index/home/home.js
let app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    productList:{
      type:Array,
      default:null
    }


  },


  /**
   * 组件的初始数据
   */
  data: {
    categoryList:[],
    productList:[]
  
  },

  lifetimes: {
    attached: function () {
      let clt=setInterval(a=>{
        if(app.globalData.token!=null){
          clearInterval(clt);
          app.globalData.ajax({
            url:'/product/category',
          }).then(res=>{
            let rul = res.data.data
            this.setData({
              categoryList:rul
            })
          })

          app.globalData.ajax({
            url: '/product/product'
          }).then(res => {
            this.setData({
              productList: res.data.data
            })
          })



        }
      },1)


 

      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
