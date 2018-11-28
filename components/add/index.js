Component({
  properties: {
    x: {
      type: Number,
      observer: function(newVal, oldVal) {
        //点击位置-50px除以100rpx
        var pix = 750 / wx.getSystemInfoSync().screenWidth;
        var addday = Math.ceil((newVal * pix - 50) / 100);
        this.setData({
          addday: addday
        })
      }
    },

    y: {
      type: Number,
      observer: function(newVal, oldVal) {
        var sys = wx.getSystemInfoSync();
        var pix = 750 / sys.screenWidth;
        var Height = 2 * wx.getSystemInfoSync().statusBarHeight * pix + 80;
        var addcourse = Math.ceil((newVal * pix - Height - 35) / 200);
        this.setData({
          addcourse: addcourse
        })
      }
    }
  },

  methods: {
    add: function(e) {
      // console.log(this.data);
      this.triggerEvent('addcourse', {
        addday: this.data.addday,
        addcourse: this.data.addcourse,
        model: true
      }); // 将num通过参数的形式传递给父组件
    }
  }
})