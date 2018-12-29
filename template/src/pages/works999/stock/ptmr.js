//普通买入相关配置信息
export default {
  data: function() {
    return {
      stockGDDMList: [],
      creditGDDMlist: [],
      needAccountChecked: true
    };
  },
  methods: {
    GetSendData(n, json) {
      let _this = this;
      var funcid = '';
      var ix = {};
      ix.valArr = [{}];
      ix.Set = function(key, value) {
        ix.valArr[0][key] = value;
      };
      switch (n) {
        case 0: //可划转数量查询
          funcid = '110'; //功能号
          ix.Set('F110', _this.userInfo.WTFS || '7'); //委托方式
          ix.Set('F140', json['zqdm']); //证券代码
          ix.Set('F123', json['gddm']); //股东代码
          ix.Set('F125', json['zhlb']); //账号类别
          ix.Set('F166', json['hzfx']); //委托方式 0 普通转极速  1 极速转普通
          break;
        default:
          break;
      }
      return [funcid, ix];
    },
   
  }
};
