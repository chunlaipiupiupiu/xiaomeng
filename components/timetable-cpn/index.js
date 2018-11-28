Component({
  properties: {
    week_index: {
      type: Number,
      observer: function(newVal, oldVal) {
        this.setData({
          week_index: newVal,
          week_num: wx.getStorageSync("timetable")[this.data.week_index]
        })
      }
    },

    week_num: {
      type: Array,
      observer: function(newVal, oldVal) {
        // console.log(newVal);
        // console.log(this.data.week_index);
        this.setData({
          week_num: newVal
        })
      }
    },
  },
  data: {
    week: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    chose_num: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    day_num: ['日', '一', '二', '三', '四', '五', '六'],
  },
  methods: {
    bindweekchange: function(e) {
      this.setData({
        week_index: e.detail.week_index
      });
      this.triggerEvent('weekChange', {
        week_index: e.detail.week_index
      });
    },

    morecourse: function(e) {
      this.triggerEvent('morecourse', {
        morecourse: e.detail.morecourse
      }); // 将num通过参数的形式传递给父组件
    },

    refresh: function(e) {
      // this.setData({
      //   week_num: wx.getStorageSync("timetable")[this.data.week_index]
      // });
      this.triggerEvent("refresh", {}, {});
    },

    add: function(e) {
      if (e.detail.x > 25) {
        this.setData({
          add: true,
          x: e.detail.x,
          y: e.detail.y
        })
      }
    },
    model: function(e) {
      this.triggerEvent('addcourse', {
        addday: e.detail.addday,
        addcourse: e.detail.addcourse,
        model: true
      });
    },
    delete: function(e) {
      var sys = wx.getSystemInfoSync();
      var pix = 750 / sys.screenWidth;
      var Height = 2 * sys.statusBarHeight * pix + 80;
      var addcourse = Math.ceil((e.detail.y * pix - Height - 35) / 200);
      var addday = Math.floor((e.detail.x * pix - 50) / 100);
      var timetable = wx.getStorageSync("timetable");
      var weekcourse = wx.getStorageSync("timetable")[this.data.week_index];
      var currentcourse;
      for (var i = 0; i < weekcourse.length; i++) {
        var day = weekcourse[i].whichDay == addday;
        var course = weekcourse[i].whichCourse == addcourse;
        if (day && course) {
          currentcourse = weekcourse[i];
        }
      }
      wx.showModal({
        title: '你去定要删除课程吗？？',
        content: '将会删除本学期所有本节课程',
        success: (res) => {
          //获取所有周的课程并进行匹配
          if (res.confirm) {
            for (var i = 0; i < timetable.length; i++) {
              for (var j = 0; j < timetable[i].length; j++) {
                var day = currentcourse.whichDay == timetable[i][j].whichDay;
                var course = currentcourse.whichCourse == timetable[i][j].whichCourse;
                var name = currentcourse.courseName == timetable[i][j].courseName;
                var week = currentcourse.courseWeek == timetable[i][j].courseWeek;
                var address = currentcourse.courseAddress == timetable[i][j].courseAddress;
                if (day && course && name && week) {
                  timetable[i].splice(j, 1);
                }
              }
            }
            this.setData({
              timetable: timetable
            });
            wx.setStorage({
              key: 'timetable',
              data: timetable,
            })
          }
          this.triggerEvent("refresh", {}, {});
        }
      })
    },
  },
})