Page({
  onLoad: function(options) {
    this.setData({
      "customs": wx.getStorageSync("customs")
    })
  },
  /*链接到关于我们*/
  aboutus: function(event) {
    wx.navigateTo({
      url: 'aboutus/aboutus',
    })
  },
  /*链接到设置*/
  settings: function(event) {
    wx.navigateTo({
      url: 'system/system',
    })
  },
  /*链接到登陆界面*/
  authentication: function(event) {
    wx.getStorage({
      key: 'userAccount',
      success: function(res) {
        wx.navigateTo({
          url: 'logined/logined',
        })
      },
      fail: function(error) {
        wx.navigateTo({
          url: 'login/login',
        })
      }
    })
  },
  /*链接到加入我们*/
  joinus: function(event) {
    wx.navigateTo({
      url: 'join/join',
    })
  },

  /* 
  manual: function(e) {
    wx.navigateTo({
      url: 'manual/manual'
    })
  },
  */
  
  onShareAppMessage: function() {
    return {
      title: '树小萌助手',
      desc: '一个查成绩、查课表的小程序',
    }

  },
  // changebgd:function(e){
  //   wx.navigateTo({
  //     url: 'changebgd/changebgd'
  //   })
  // }
})