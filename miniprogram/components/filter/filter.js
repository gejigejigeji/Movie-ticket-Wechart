// components/filter/filter.js
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
    sort:true,
    filter:true,
    ftr:null,
    cps:null,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onFilter(e){
      this.triggerEvent("filterState", !this.data.filter)
      let ftr = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease',
        delay: 0,
        transformOrigin: '70% 50% 0'
      });
      let cps = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease',
        delay: 0,
        transformOrigin: '70% 50% 0'
      });
      if (this.data.filter) {
        ftr.rotate(180).step()
        cps.rotate(0).step()
      }else{
        ftr.rotate(0).step()

      }
      this.setData({
        filter: !this.data.filter,
        sort: true,
        ftr: ftr.export(),
        cps: cps.export()

      })
    },
    onSort(e){
      this.triggerEvent("sortState", !this.data.sort)
      let ftr = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease',
        delay: 0,
        transformOrigin: '70% 50% 0'
      });
      let cps = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease',
        delay: 0,
        transformOrigin:'70% 50% 0'
      });
      if (this.data.sort){
        ftr.rotate(0).step()
        cps.rotate(180).step()
      }else{
        cps.rotate(0).step()
      }


      this.setData({
        sort: !this.data.sort,
        filter:true,
        ftr: ftr.export(),
        cps:cps.export()
      })
    }

  }
})
