// components/slider/slider.js
let app = getApp()

Component({
  properties: {
    items: {
      type: Array,
      value: []
    }
  },
  data: {
    startX: '',
    list: [],
    handX: '',
    handY: '',
    direction: '0',
    opacity: 0.8,
    moveMix: 0,
    bannerForm: {
      bucket: 'wx-1253787870',
      region: 'ap-shanghai',
      prefix: 'banner'
    },
  },
  lifetimes: {
    attached: function () {
      let getToken = setInterval(a => {
        if (app.globalData.token != null) {
          clearInterval(getToken)
          app.globalData.ajax({
            url: '/banner/banner',
            data: this.data.bannerForm,
          }).then(res => {
            let arr = res.data.data.Contents, list = [];
            arr.splice(0, 1)
            arr.map(a => {
              list = [
                ...list,
                {
                  url: `https://wx-1253787870.cos.ap-shanghai.myqcloud.com/${a.Key}`,
                  ani: null
                }
              ]
            })
            let opa = 1 - (list.length * 0.5) / 10
            list.map((a, b) => {
              a.zindex = b + 1
              a.scale = opa = (opa + 0.05)
              if (b > list.length - 4) {
                a.opacity = 0.8
              } else {
                list[b].opacity = 0
              }
              if (b == list.length - 1) {
                list[b].opacity = 1
              }
            })

            this.setData({
              list
            });
          })

        }
      }, 1)
     
    }
  },

  methods: {
    touchStart(e) {
      let index = e.target.dataset.index,
        list = this.data.list;
      list.map(a => {
        a.ani = null;
      })
      if (e.touches.length == 1) {
        this.setData({
          startX: e.touches[0].clientX,
          handX: e.touches[0].pageX,
          handY: e.touches[0].pageY - 20,
          list,
          direction: 0,
          moveMix: 10

        });
      }
    },
    touchMove(e) {
      let index = e.target.dataset.index
      let list = this.data.list;
      let x = e.changedTouches[0].pageX
      let y = e.changedTouches[0].pageY
      let handX = x - this.data.handX;
      let handY = y - this.data.handY;
      let diffX = this.data.startX - x;
      let rotate = diffX / 15, animation;
      let direction = this.data.direction;
      let moveMix = this.data.moveMix;
      if (moveMix == 10) {
        setTimeout(() => {
          moveMix = 80;
          this.setData({
            moveMix
          })
        }, 150)
      }
      if (moveMix == 80) {
        setTimeout(() => {
          moveMix = 200;
          this.setData({
            moveMix
          })
        }, 300)
      }
      if (diffX < -moveMix) {
        direction = 'r'
      } else if (diffX > moveMix) {
        direction = 'l'
      } else {
        direction = '0'
      }
      let transOut = null;
      if (direction == 'r') {
        transOut = 700
      } else if (direction == 'l') {
        transOut = -700
      } else {
        transOut = 0
      }
      animation = wx.createAnimation({
        duration: 220,
        timingFunction: 'linear',
        delay: 0
      })
      animation.translate(handX, handY).rotate(-rotate).step()
      list[index].ani = animation.export()
      list.map((a, b) => {
        if (a.zindex == list.length - 1) {
          a.opacity = 1
        }
      })

      this.setData({
        list,
        direction,
        moveMix
      })
    },
    touchEnd(e) {
      let list = this.data.list,
        direction = this.data.direction;
      let index =e.target.dataset.index

      let transOut = null;
      if (direction == 'r') {
        transOut = 700
      } else if (direction == 'l') {
        transOut = -700
      } else {
        animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'ease-out',
          delay: 0
        })
        animation.translate(0, 0).rotate(0).step()
        list[index].ani = animation.export()
        list.map((a, b) => {
          if (a.zindex == list.length-1) {
            a.opacity = this.data.opacity
          }
        })
        this.setData({
          list,
          moveMix: 10


        })
        return
      }
      let animation;
      animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out',
        delay: 0
      })
      animation.translate(transOut, 20).rotate(0).step().translate(0, 0).step({
        duration: 200,
        timingFunction: 'ease-out',
        delay: 0
      })
      list[index].ani = animation.export()
      list[index].scale = 0.8;
      this.setData({
        list,
        moveMix: 10

      })
      setTimeout(() => {
        list.map((a, b) => {
          a.zindex += 1;
          a.scale += 0.05
        })
        list[index].zindex = 1
        list.map((a, b) => {
          if (a.zindex == list.length) {
            a.opacity = 1
          } else{
            a.opacity = 0.8
          } 
          if(a.zindex<list.length-2){
            a.opacity = 0

          }
        
        })
        this.setData({
          list,
          moveMix: 10

        })
      }, 100)
    },
  }
})