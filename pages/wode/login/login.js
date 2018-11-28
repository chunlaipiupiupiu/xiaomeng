import { Login } from "../../../utils/HTTP.js";
Page({
  formSubmit:function(e){
    if (e.detail.value.username.length == 0){
    wx.showToast({
      title: '学号不能为空',
      image: '/images/icon/wrong.png',
    })
  }else if(e.detail.value.password.length==0){
    console.log(1);
    wx.showToast({
      title: '密码不能为空',
      image: '/images/icon/wrong.png',
    })
  }else if(e.detail.value.username.length!=10){
    console.log(e.detail.value.username);
      wx.showToast({
        title: '学号是10位的哟',
        duration: 3000,
        image: '/images/icon/wrong.png'
      })
  }else{
    wx.showLoading({
      title: '正在登录',
    });
      var username = e.detail.value.username;
      var password=e.detail.value.password;
      Login(username,password);
  }

  },
  forgetpwd:(res)=>{
    wx.navigateTo({
      url: '../reset/reset',
    })
  }
})