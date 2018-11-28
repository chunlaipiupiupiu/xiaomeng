Component({
  properties: {
    Color: {
      type: String,
      value: wx.getStorageSync('background') ? wx.getStorageSync('background') : "#66ccff",
      observer: function(newVal, oldVal) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        newVal = wx.getStorageInfoSync('background');
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    week_index: {
      type: Number,
      observer: function(newVal, oldVal) {
        this.setData({
          week_index: newVal
        })
      }
    },
    morecourse: Boolean
  },

  data: {
    //本学期周数
    week: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    //一天的课程数量，按小课来计算
    chose_num: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    //一周的天数显示
    day_num: ['日', '一', '二', '三', '四', '五', '六'],
  },
  methods: {
    bindWeekChange: function(e) {
      this.setData({
        week_index: parseInt(e.detail.value)
      })
      this.triggerEvent('bindweekchange', {
        week_index: parseInt(e.detail.value)
      }); // 将num通过参数的形式传递给父组件
    },
    morecourse: function(e) {
      this.triggerEvent('morecourse', {
        morecourse: e.detail.morecourse
      }); // 将num通过参数的形式传递给父组件
    },
    //刷新功能
    refresh: function(e) {
      this.triggerEvent("refresh", {}, {});
    }
  },
})