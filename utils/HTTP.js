var rooturl = "https://api.heifuture.com";
//登陆功能
function Login(account, password) {
  var url = rooturl + "/api/v1/login";
  wx.request({
    url: url,
    data: {
      'studentID': account,
      'password': password
    },
    method: "GET",
    success: function(res) {
      if (res.data.studentID == account) {
        wx.setStorageSync('userAccount', account);
        wx.setStorageSync('userPassword', password);
        wx.setStorage({
          key: 'info',
          data: res.data,
          success: (res) => {
            wx.redirectTo({
              url: '../logined/logined',
            });
            //获取课表
            Gettimetable(account, password);
          }
        })
      } else if (res.data.errorCode == 999) {
        wx.hideLoading();
        wx.showToast({
          title: '服务器错误',
          duration: 3000,
          image: '/images/icon/wrong.png'
        })
      } else if (res.data.errorCode == 10000) {
        wx.hideLoading()
        wx.showToast({
          title: '密码至少六位',
          duration: 3000,
          image: '/images/icon/wrong.png'
        })
      } else if (res.data.errorCode == 60002) {
        wx.hideLoading();
        wx.showToast({
          title: '密码过于简单',
          duration: 3000,
          image: '/images/icon/wrong.png',
          success: function(event) {
            setTimeout(() => {
              wx.redirectTo({
                url: '../changepwd/changepwd?studentID=' + account,
              })
            }, 1500);
          }
        })
      } else if (res.data.errorCode = 60001) {
        wx.hideLoading()
        wx.showToast({
          title: '账号或密码错误',
          image: '/images/icon/wrong.png',

        })
      } else if (res.statusCode == 500) {
        wx.hideLoading()
        wx.showToast({
          title: '网页加载失败',
          image: '/images/icon/wrong.png',
        })
      } else {
        wx.hideLoading();
        // console.log(res.data);
        wx.showToast({
          title: '小萌也不知道哪里错了~',
        })
      }
    },

    fail: function(err) {
      wx.hideLoading();
      wx.showToast({
        title: '无法链接到服务器~',
      })
    },
  })
}
//获取课表功能
function Gettimetable(account, password) {
  var url = rooturl + "/api/v1/timetable";
  // console.log(url);
  wx.request({
    url: url,
    data: {
      'semester': '2018-2019-1',
      'studentID': account,
      'password': password
    },
    method: "GET",
    success: (res) => {
      wx.hideLoading();
      if (res.statusCode == 500) {
        wx.showToast({
          title: '课表获取失败',
        })
      } else if (res.data.errorCode == 999) {
        wx.showLoading({
          title: '服务器错误',
        });
        setTimeout(function() {
          wx.hideLoading()
        }, 2000);
      } else {
        wx.setStorageSync('timetable', res.data);
      }
    },
    fail: (res) => {
      wx.hideLoading();
    }
  })
}

function ChangePwd(id, oldpwd, newpwd) {
  var url = rooturl + "/api/v1/change";
  wx.request({
    url: url,
    data: {
      'studentID': id,
      'oldPassword': oldpwd,
      'newPassword': newpwd
    },
    success: (res) => {
      if (res.data.errorCode == 60003) {
        wx.showToast({
          title: '原密码错误',
          image: '/images/icon/wrong.png'
        });
        this.setData({
          able: false
        });
      } else if (res.data.errorCode == 60001) {
        wx.showToast({
          title: '修改失败',
          image: '/images/icon/wrong.png'
        });
        this.setData({
          able: false
        });
      } else {
        wx.showToast({
          title: '修改成功，等待跳转',
          duration: 2000,
          success: (res) => {
            setTimeout(() => {
              wx.redirectTo({
                url: '../login/login',
              })
            }, 2000);
          }
        });
      }
    }
  })
}
//恢复初始密码设置
function Reset(username, identify) {
  wx.request({
    url: 'https://api.heifuture.com/api/v1/reset',
    data: {
      'studentID': username,
      'IDCard': identify
    },
    success: (res) => {
      if (res.data.success) {
        wx.hideLoading();
        wx.showToast({
          title: '已重置为初始密码',
          duration: 3000,
          success: function(res) {
            setTimeout(() => {
              wx.redirectTo({
                url: '../login/login',
              })
            }, 3000);
          }
        });
      } else if (res.data.errorCode == 60004) {
        wx.hideLoading();
        wx.showToast({
          title: '不存在此学号',
          image: '/images/icon/wrong.png'
        });
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '重置失败',
          image: '/images/icon/wrong.png'
        });
      }
    }
  })
}

// https://api.heifuture.com/api/v1/mail?recipients=申请加入人的邮箱&content=申请加入人的信息
//加入我们
function sendEmail(e) {
  var url = rooturl + "/api/v1/mail";
  var email = e.QQ + "@qq.com";
  var content = "申请人姓名：" + e.name + "，学院：" + e.school + "，专业：" + e.profession + "，意向部门:" + e.department + ",兴趣爱好：" + e.interest + ",个人经历:" + e.exp + ",手机号：" + e.mobile + "，QQ：" + e.QQ;
  console.log(content);
  wx.request({
    url: url,
    data: {
      "recipients": email,
      "content": content
    },
    success: (res) => {
      console.log(res);
      wx.hideLoading();
      if (res.data = "发送成功") {
        wx.showToast({
          title: '发送成功',
        })
      } else {
        wx.showToast({
          title: '服务器未收到',
        })
      }
    },
    fail: (res) => {
      wx.hideLoading();
      wx.showToast({
        title: '发送失败',
      })
    }
  })
}

module.exports = {
  Login: Login,
  Gettimetable: Gettimetable,
  Reset: Reset,
  sendEmail: sendEmail,
  ChangePwd: ChangePwd
}