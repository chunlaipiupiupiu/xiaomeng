Page({
  /**
   * 更换课表背景图
   */
  changeBackground: function() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        wx.setStorage({
          key: 'backgroundImage',
          data: res.tempFilePaths,
        })
      },
    })
  },

  /**
   * 清空课表背景图
   */
  clearBackground: function() {
    wx.removeStorage({
      key: 'backgroundImage',
      success: (res) => {
        this.setData({
          backgroundImage: "https://lg-n8uihw4i-1253681281.cos.ap-shanghai.myqcloud.com/kcb-bg.jpg"
        });
        wx.showToast({
          title: '清除成功',
        })
      },
    })

  },


  /**
   * 清空本地数据
   */

  clearStorage: function() {
    wx.clearStorage({
      success: function() {
        wx.showToast({
          title: '清除成功',
        })
      },
      failed: function() {
        wx.showToast({
          'title': "清除失败，请再次点击",
        })
      }
    });
    this.setData(null);
  },
  /*更改背景颜色*/
  // submit: function(e) {
  //   // console.log(e.detail.value.bgd);
  //   wx.setStorageSync('background', e.detail.value.bgd);
  // }
})