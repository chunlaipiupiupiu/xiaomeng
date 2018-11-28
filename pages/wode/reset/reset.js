import { Reset } from "../../../utils/HTTP.js";
Page({
  formReset: (e) => {
    wx.showLoading({
      title: '重置中...',
    });
    var username = e.detail.value.username;
    var identify = e.detail.value.identify;
    Reset(username,identify);
  }
})