// components/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabBar:[
      {
        url:'/images/tabBar/icon-home.png',
        urlColor:'/images/tabBar/icon-home-colour.png',
        text:'首页',
        active: true,

      },
      {
        url: '/images/tabBar/icon-events.png',
        urlColor: '/images/tabBar/icon-events-colour.png',
        text: '活动',
        active: false,

      },
      {
        url: '/images/tabBar/icon-me.png',
        urlColor: '/images/tabBar/icon-me-colour.png',
        text: '我的',
        active: false,

      }
    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onToggle(e){
      let index = e.target.dataset.index,
      list=this.data.tabBar;
      list.map(a=>{
        a.active=false;
      })
      list[index].active=true;
      this.setData({
        tabBar:list
      })
      this.triggerEvent('onTogglePage', index)
    }

  }
})
