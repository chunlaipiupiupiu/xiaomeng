Page({
  data: {
    backgroundImage: wx.getStorageSync('backgroundImage') ? wx.getStorageSync('backgroundImage') : "https://lg-n8uihw4i-1253681281.cos.ap-shanghai.myqcloud.com/kcb-bg.jpg",
    morecourse: false,
    isIndex: false,
    week_index: 0,
    week_num: null
  },

  onLoad: function(options) {
    var myDate = new Date();
    var month = myDate.getMonth();
    var newsem = new Date(myDate.getFullYear() + "/09/03");
    var week_index = Math.floor((myDate.getTime() - newsem.getTime()) / (24 * 3600 * 1000 * 7));
    this.setData({
      week_index: week_index,
    });
  },

  onShow: function(e) {
    this.setData({
      backgroundImage: wx.getStorageSync('backgroundImage') ? wx.getStorageSync('backgroundImage') : "https://lg-n8uihw4i-1253681281.cos.ap-shanghai.myqcloud.com/kcb-bg.jpg"
    });
    wx.getStorage({
      key: 'userAccount',
      success: (res) => {
        this.setData({
          week_num: wx.getStorageSync("timetable")[this.data.week_index]
        });
      },
      fail: (err) => {
        wx.showToast({
          title: '请先登录',
          duration: 3000,
          image: '/images/icon/gth.png'
        });
        this.setData({
          week_index: week_index,
        });
      }
    })
  },
  //分享
  onShareAppMessage: function() {
    return {
      title: '树小萌助手',
      desc: '一个查成绩、查课表的小程序',
    }
  },

  morecourse: function(e) {
    this.setData({
      morecourse: e.detail.morecourse
    })
  },

  refresh: function(e) {
    this.setData({
      week_num: wx.getStorageSync("timetable")[this.data.week_index]
    })
    this.onShow();
  },

  addcourse: function(e) {
    this.setData({
      addcourse: e.detail.addcourse,
      addday: e.detail.addday,
      model: e.detail.model
    })
  },

  onPullDownRefresh: function() {
    this.onLoad();
    this.onShow();
    wx.stopPullDownRefresh();
  },
  weekChange: function(e) {
    this.setData({
      week_index: e.detail.week_index
    })
  }
})