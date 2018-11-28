import {
  ChangePwd
} from "../../../utils/HTTP.js";
Page({
  onLoad: function(e) {
    wx.setStorageSync('studentID', e.studentID);
    this.setData({
      status: 0,
      able: false
    });
  },

  formSubmit: function(e) {
    this.setData({
      able: true
    });
    var id = wx.getStorageSync('studentID');
    var oldpwd = e.detail.value.oldpwd;
    var newpwd = e.detail.value.newpwd;
    var confirmpwd = e.detail.value.confirmpwd;
    var pwd1 = (newpwd.search(/[A-Za-z]/) != -1) ? 1 : 0;
    var pwd2 = (newpwd.search(/[0-9]/) != -1) ? 1 : 0;
    var hanzi = escape(newpwd).indexOf("%u");
    console.log(oldpwd, newpwd, pwd1, pwd2, hanzi);
    if (oldpwd == newpwd) {
      this.setData({
        'status': 1,
        able: false
      })
    } else if (newpwd != confirmpwd) {
      this.setData({
        'status': 2,
        able: false
      })
    } else if (newpwd.length < 8 || newpwd.length > 50) {
      this.setData({
        'status': 3,
        able: false
      })
    } else if (pwd1 == 0 || pwd2 == 0) {
      this.setData({
        'status': 4,
        able: false
      })
    } else if (oldpwd.length == 0 || newpwd.length == 0) {
      this.setData({
        status: 5,
        able: false
      })
    } else if (escape(newpwd).indexOf("%u") >= 0) {
      this.setData({
        status: 6,
        able: false
      })
    } else {
      ChangePwd(id, oldpwd, newpwd);
      wx.hideLoading();
    }
  },
  onHide: (e) => {
    wx.removeStorageSync('studentID');
  },
  onUnload: (e) => {
    wx.removeStorageSync('studentID');
  }
})