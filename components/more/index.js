import {
  Gettimetable
} from '../../utils/HTTP.js';
Component({
  attached: function() {
    this.setData({
      moreul: false,
      morecourse: false
    })
  },

  methods: {
    //点击加号显示列表
    more: function(e) {
      this.setData({
        moreul: !this.data.moreul
      })
    },
    // 点击列表显示添加课程选项
    morecourse: function(e) {
      this.setData({
        morecourse: true
      });
      this.triggerEvent('morecourse', {
        morecourse: this.data.morecourse
      });
    },
    //更新课表，当点击的时候，可以从网络上获取到课表
    update: function(e) {
      var account = wx.getStorageSync('userAccount');
      var password = wx.getStorageSync('userPassword');
      var timetable = Gettimetable(account, password);
      wx.showLoading({
        title: '正在刷新',
      });
      this.triggerEvent("refresh", {}, {});
    }
  }
})