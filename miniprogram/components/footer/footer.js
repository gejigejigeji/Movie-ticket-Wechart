// components/footer/footer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
 
    like:{
      type:Boolean,
      default:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    star: '/images/icon/star.png',
    star2: '/images/icon/star2.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addCart(){
      this.triggerEvent('isBuyOrCar',1)

    },
    nowBuy(){
      this.triggerEvent('isBuyOrCar',1)
    },
    onStarTab(){
      this.triggerEvent('onStarTab', 1)
    }

  }
})
