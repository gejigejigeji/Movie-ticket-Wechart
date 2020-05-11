// components/tabsCategory/tabsCategory.js
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
      active:0,
      filter:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    filterState(e){
      this.setData({
        filter:e.detail
      })
      console.log(e)
    },
    sortState(e) {
      this.setData({
        filter: e.detail
      })
      console.log(e)
    },
    onChange(e){
      console.log(1)
      this.setData({
        filter: true
      })
    }

  }
})
