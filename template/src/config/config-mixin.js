export default {
  data() {
    return {
      themeName: 'red',
      tradeType: '',
      initData: '', //uiconfig入参
      userInfo: '', //交易账号信息
      
    };
  },
  filters: {
    formatData(val, format) {
      let newVal = val;
      if (typeof format != 'string' || format == '') {
        return newVal;
      } else if (format === 't') {
        if (val.length === 6) {
          return (
            val.substr(0, 2) + ':' + val.substr(2, 2) + ':' + val.substr(4, 2)
          );
        } else if (val.length === 5) {
          return (
            '0' +
            val.substr(0, 1) +
            ':' +
            val.substr(1, 2) +
            ':' +
            val.substr(3, 2)
          );
        }
      } else if (format === 'd') {
        if (val.length === 8) {
          return (
            val.substr(0, 4) + '-' + val.substr(4, 2) + '-' + val.substr(6, 2)
          );
        } else {
          return newVal;
        }
      } else if (format.indexOf('%') > -1) {
        newVal = parseFloat(val).toFixed(2) + '%';
      } else if (!isNaN(format) && !isNaN(val)) {
        newVal = parseFloat(val).toFixed(parseInt(format));
      }
      return newVal;
    }
  },
  methods: {
    getTradeAccount() {
      let _this = this;
      tdxCt.tdxgetAccList(function(data) {
        let res = typeof data === 'object' ? data : JSON.parse(data); //返回皆为string，且格式化后皆为数组
        if (res.length === 0) {
          _this.userInfo = '';
          return;
        }
        if (typeof res[0] === 'object') {
          //ios格式处理
          res = tdxCt.FormatResult(res);
          res = res.rows[0].RESULT;
        }

        res = typeof res === 'object' ? res : JSON.parse(res); //得到ios res为string
        let resobj =
          res.length > 0 && typeof res[0] === 'string'
            ? JSON.parse(res[0])
            : res[0] || ''; //得到android res[0]为string
        _this.userInfo = resobj;
      });
    }
  },
  watch: {
    userInfo(valNew, valOld) {
      // modal.alert({
      //     message:valNew
      // })
    }
  },
  created() {
    let _this = this;
    
  }
};
