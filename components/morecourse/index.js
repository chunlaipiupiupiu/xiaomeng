Component({
  properties: {
    morecourse: {
      type: Boolean,
      observer: function(newVal, oldVal) {
        this.setData({
          morecourse: newVal
        })
      }
    }
  },

  data: {
    week: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    chose_num: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    day_num: ['日', '一', '二', '三', '四', '五', '六'],
  },

  methods: {
    moreWeekChange1: function(e) {
      this.setData({
        dayindex: parseInt(e.detail.value),
      })
    },

    moreWeekChange2: function(e) {
      this.setData({
        courseindex: parseInt(e.detail.value),
      })
    },

    addcheck: function(e) {
      var timetable = wx.getStorageSync("timetable");
      var addday = this.data.dayindex;
      var addcourse = this.data.courseindex + 1;
      var checkweek = e.detail.value.checkboxs;
      for (var i = 0; i < checkweek.length; i++) {
        var newcourse = new Object();
        var weeknum = parseInt(checkweek[i]) - 1;
        newcourse["whichDay"] = addday;
        newcourse["whichCourse"] = addcourse;
        newcourse["courseName"] = e.detail.value.coursename;
        newcourse["courseAddress"] = e.detail.value.courseaddress;
        newcourse["courseWeek"] = "第" + checkweek.toString() + "(周)";
        timetable[weeknum].push(newcourse);
      }
      wx.setStorageSync('timetable', timetable);
      wx.showToast({
        title: '添加完毕',
      });
      this.setData({
        morecourse: false
      });
      this.triggerEvent("refresh", {}, {});
    },
    cancel: function(e) {
      this.setData({
        morecourse: false
      });
    }
  },
  attached: function(e) {
    this.setData({
      dayindex: 0,
      courseindex: 0
    })
  }
})