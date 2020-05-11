// components/scrollXList/scrollXlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value: [
        { url: '/images/recommend/hb1.jpg', extra: '', title: 'Shanghai周杰伦演唱会Shanghai周杰伦演唱会Shanghai周杰伦演唱会', price: 700 },
        { url: '/images/recommend/hb2.jpg', extra: '音乐演出', title: 'FirstLight超级明星国际场景秀', price: 3518 },
        { url: '/images/recommend/hb3.jpg', extra: '装逼现场', title: '颓废小哥全力出击打到资本主义', price: 10000 },
        { url: '/images/recommend/hb2.jpg', extra: '音乐演出', title: 'FirstLight超级明星国际场景秀', price: 3518 },
        { url: '/images/recommend/hb1.jpg', extra: '', title: 'Shanghai周杰伦演唱会', price: 700 },

      ]
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    attached: function () {
      

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    asd(){
      console.log(1)
    }

  }
})
