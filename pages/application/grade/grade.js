Page({
  data: {
    semester: ["2017-2018-2", "2018-2019-1", "2014-2015-1", "2014-2015-2", "2015-2016-1", "2015-2016-2", "2016-2017-1", "2016-2017-2", "2017-2018-1"],
  },

  semesterchange: function(e) {
    wx.request({
      url: 'https://api.heifuture.com/api/v1/grade',
      data: {
        "semester": this.data.semester[e.detail.value],
        'studentID': wx.getStorageSync('userAccount'),
        'password': wx.getStorageSync('userPassword')
      },
      method: "GET",
      success: (res) => {
        console.log(res);
        if (res.statusCode == 404) {
          wx.showToast({
            title: '还没有成绩哟',
            duration: 1000,
            image: '/images/icon/wrong.png'
          })
        } else if (res.data.errorCode == 10001) {
          wx.showToast({
            title: '还没有成绩哟',
            duration: 1000,
            image: '/images/icon/wrong.png'
          });
        } else if (res.data.errorCode == 999) {
          wx.showToast({
            title: '服务器出错了~',
            image: '/images/icon/wrong.png'
          })
        } else {
          this.setData({
            grades: res.data,
            index: e.detail.value
          });
          this.average();
        }
      }
    });
  },

  onLoad: function(e) {
    // if(wx.getStorageSync('userAccount')){
    var index = 0;
    wx.request({
      url: 'https://api.heifuture.com/api/v1/grade',
      data: {
        "semester": this.data.semester[index],
        'studentID': wx.getStorageSync('userAccount'),
        'password': wx.getStorageSync('userPassword')
      },
      method: "GET",
      success: (res) => {
        // console.log(res)
        if (res.statusCode == 404) {
          wx.showToast({
            title: '还没有成绩哟',
            duration: 1000,
            image: '/images/icon/wrong.png'
          })
        } else if (res.data.errorCode == 999) {
          wx.showToast({
            title: '服务器出错了~',
            image: '/images/icon/wrong.png'
          })
        } else if (res.data.errorCode == 60001 && wx.getStorageSync('userAccount')) {
          wx.showToast({
            title: '身份认证已过期',
            image: '/images/icon/wrong.png'
          })
        } else {
          this.setData({
            grades: res.data,
            index: index
          });
          this.average();
        }
      }
    });
  },

  average: function() {
    var length = this.data.grades.length;
    var pointsum = 0;
    var gradesum = 0;
    var j = 0;
    for (var i = 0; i < length; i++) {
      if (parseInt(this.data.grades[i].courseGrade)) {
        var data = parseInt(this.data.grades[i].courseGrade);
        gradesum += data;
        j++;
      }
      var pointdata = parseInt(this.data.grades[i].credit);
      pointsum += pointdata;
    };
    var ave = (gradesum / j).toFixed(3);
    var pointave = (pointsum / length).toFixed(3);
    this.setData({
      average: ave,
      pointaverage: pointave
    })
  }
})