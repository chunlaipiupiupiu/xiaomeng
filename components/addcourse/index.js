Component({
  properties: {
    addday: {
      type: Number,
      observer: function(newVal, oldVal) {
        this.setData({
          addday: newVal
        })
      }
    },

    addcourse: {
      type: Number,
      observer: function(newVal, oldVal) {
        this.setData({
          addcourse: newVal
        })
      }
    },

    model: {
      type: Boolean,
      observer: function(newVal, oldVal) {
        this.setData({
          model: newVal
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
    //确认按钮
    addcheck: function(e) {
      var timetable = wx.getStorageSync("timetable");
      var addday = this.data.addday - 1;
      var addcourse = this.data.addcourse;
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
        model: false
      });
      this.triggerEvent("refresh", {}, {});
    },
    //取消按钮
    cancel: function(e) {
      this.setData({
        model: false
      });
    }
  },
})