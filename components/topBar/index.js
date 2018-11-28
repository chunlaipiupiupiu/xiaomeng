var barData = getApp().topBar;
Component({
  properties: {
    Top: {
      type: Number,
      value: wx.getSystemInfoSync().statusBarHeight
    },
    Color: {
      type: String,
      value: wx.getStorageSync('background') ? wx.getStorageSync('background') : "#66ccff",
      observer: function(newVal, oldVal) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // newVal = wx.getStorageSync('background');
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        // console.log(newVal);
        this.setData({
          Color: newVal
        })
      }
    },
    Height: {
      type: Number
    },
    isIndex: {
      type: Boolean,
      value: true
    }
  },
  attached: function(e) {
    var sys = wx.getSystemInfoSync();
    if (sys.statusBarHeight > 30) {
      this.setData({
        Height: sys.statusBarHeight
      })
    } else {
      this.setData({
        Height: sys.statusBarHeight * 750 / sys.screenWidth
      });
    }
  },
  methods: {
    isIndex: function(e) {
      wx.navigateBack({
        delta: 1
      });
    }
  }
})