import {
  sendEmail
} from "../../../utils/HTTP.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['办公室', '编辑部', '代码组','美工组'],
    index: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      index: 0
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    });
  },

  formSubmit: function(e) {
    //点击提交把信息交到服务器上c
    var time = true;
    if (time) {
      e.detail.value.department = this.data.array[e.detail.value.department];
      var data = e.detail.value;
      //填了为真，没填为假 
      var bona = data.name != ""; //名字不等于空则为真，则是填了，即填了为真
      var bosc = data.school != "";
      var bopro = data.profession != "";
      // var bode = data.department == "";
      var boin = data.interest != "";
      var boex = data.exp != "";
      var bomo = data.mobile != "";
      var boQQ = data.QQ != "";
      console.log("name" + bona);
      console.log("school" + bosc);
      console.log("prosession" + bopro);
      // console.log("department"+bode);
      console.log("interest" + boin);
      console.log("experience" + boex);
      console.log("mobile" + bomo);
      console.log("QQ" + boQQ);
      //如果有一个没有填，则不提交，全部填了才提交，即全为真才提交
      if (boQQ && boex && boin && bomo && bona && bopro && bosc) {
        wx.showLoading({
          title: '正在发送',
        });
        sendEmail(data);
      } else {
        wx.showToast({
          title: '信息不完整',
          image: '/images/icon/wrong.png'
        })
      }
    } else {
      wx.showToast({
        title: '暂未开放',
        image: '/images/icon/wrong.png'
      })
    }
  },

})