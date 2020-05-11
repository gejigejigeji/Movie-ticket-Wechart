// components/selectStyle/selectStyle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btnType:{
      type:String,
      value:1
    },
    styles:{
      type:Array,
    },
    user:{
      type:Object
    }

  },
  lifetimes: {
    attached: function () {
      let time=setInterval(a=>{
        if (this.properties.styles.length>0){
          clearInterval(time)
          let styles = this.properties.styles;
          let rul = [...styles[0].size.split(','), ...styles[0].custom.split(',')]
          let category = [];
          let price = styles[0].price
          let styleItems = styles[0]
          let form = this.data.form;
          form.productListId = styleItems.productListId
          form.styleName = styleItems.name
          form.styleId = styleItems.id
          form.price = styleItems.price

          rul.map(a=>{
            if(a!=''){
              category.push({
                selected: false,
                name: a,
              })
            }
          })

          this.setData({
            styles,
            category,
            price,
            styleItems,
            form

          })
        }
      },1)
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    isTop:true,
    tNumber:0,
    aniWrap:null,
    imgAni:null,
    priceAni:null,
    aniCount:null,
    category:[],
    styleItems:{},
    styles:[],
    form:{
      count:1
    }



  },

  /**
   * 组件的方法列表
   */
  methods: {
    startBuy(){
      let form = this.data.form;
      this.triggerEvent('startBuy', form)
    },
    addShopingCart(){
      this.triggerEvent('addShopingCart')
    },
    onChangeCount(e){
      let form = this.data.form;
      form.count = e.detail.value;

      this.setData({
        form
      })
    },
    onClickStyleSize(e){
      const index = e.currentTarget.dataset.index;
      let category = this.data.category;
      let form = this.data.form;

      category.map(a=>{
        a.selected=false
      })
      category[index].selected=true
      form.size = category[index].name
      console.log(form)

      this.setData({
        category,
        form
      })

    },
    onClickStyle(e){
      const index = e.currentTarget.dataset.index;
      let styles = this.properties.styles;
      styles.map(a=>{
        a.selected=false
      })
      styles[index].selected = true
      let rul = [...styles[index].size.split(','), ...styles[index].custom.split(',')]
      let price=styles[index].price;
      let styleItems = styles[index]
      let form=this.data.form;
      form.productListId = styleItems.productListId
      form.styleName = styleItems.name
      form.styleId = styleItems.id
      form.price = styleItems.price
      console.log(styleItems)

      let category = []
      rul.map(a => {
        if(a!=''){
          category.push({
            selected: false,
            name: a
          })
        }
      })
      this.setData({
        styles: styles,
        category,
        price,
        styleItems,
        form
      })


    },
    onScroll(e){
      this.setData({
        tNumber: e.detail.scrollTop
      })
    },
    onTouchEnd(e){
      let tn = this.data.tNumber;
      let aniWrapHeight = ""
      let imgSize = "";
      let imgLeft = ''
      let priceSize = ''
      let priceTop = "";
      let priceLeft = "";
      let aniCountLeft = ''
      let duration=500;
      let aniWrap = wx.createAnimation({
        duration: duration,
        timingFunction: 'ease-in-out',
        delay: 0
      });
      let aniImg = wx.createAnimation({
        duration: duration,
        timingFunction: 'ease-in-out',
        delay: 0
      });
      let aniPrice = wx.createAnimation({
        duration: duration,
        timingFunction: 'ease-in-out',
        delay: 0
      });
      let aniCount = wx.createAnimation({
        duration: duration,
        timingFunction: 'ease-in-out',
        delay: 0
      });
      if (tn <= -30 ){
         aniWrapHeight = "750rpx"
         imgSize = "500rpx";
         imgLeft = '110rpx'
         priceSize = '100%'
         priceTop = "450rpx";
         priceLeft = "0";
         aniCountLeft = '280rpx'


        aniWrap.height(aniWrapHeight).step()

        aniImg.width(imgSize).height(imgSize).left(imgLeft).step()
        aniPrice.top(priceTop).left(priceLeft).width(priceSize).step()
        aniCount.left(aniCountLeft).step()
       
      }else{
    
         aniWrapHeight = "300rpx"
         imgSize = "250rpx";
         imgLeft = '0'
         priceSize = '470rpx'
         priceTop = "0";
         priceLeft = "260rpx";
         aniCountLeft = '0'


        aniWrap.height(aniWrapHeight).step()

        aniImg.width(imgSize).height(imgSize).left(imgLeft).step()
        aniPrice.top(priceTop).left(priceLeft).width(priceSize).step()
        aniCount.left(aniCountLeft).step()

      }

      this.setData({
        aniWrap: aniWrap.export(),
        imgAni: aniImg.export(),
        priceAni: aniPrice.export(),
        aniCount: aniCount.export(),
      })

   


    }

  }
})
