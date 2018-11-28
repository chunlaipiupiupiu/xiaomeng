// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: [true, false, false],
    longitude: "114.9290000000",
    latitude: "25.8537080000"
    //标记点用于在地图上显示标记的位置
    // markers: [{
    //   iconPath: "/resources/others.png",
    //   id: 0,
    //   latitude: 23.099994,
    //   longitude: 113.324520,
    //   width: 50,
    //   height: 50
    // }],
    // //指定一系列坐标点，从数组第一项连线至最后一项
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211,
    //     latitude: 23.10229
    //   }, {
    //     longitude: 113.324520,
    //     latitude: 23.21229
    //   }],
    //   color: "#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }],
    // //在地图上显示控件，控件不随着地图移动。即将废弃，请使用 cover-view
    // controls: [{
    //   id: 1,
    //   iconPath: '/resources/location.png',
    //   position: {
    //     left: 0,
    //     top: 300 - 50,
    //     width: 50,
    //     height: 50
    //   },
    //   clickable: true
    // }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  scale1: function(event) {
    this.setData({
      scale: [true, false, false],
      longitude: "114.9290000000",
      latitude: "25.8537080000"
    })
  },
  scale2: function(event) {
    this.setData({
      scale: [false, true, false],
      longitude: "114.9180800000",
      latitude: "25.8376100000"
    })
    console.log(event);
  },
  scale3: function(event) {
    this.setData({
      scale: [false, false, true],
      longitude: "114.9146300000",
      latitude: "25.8589100000"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})