<style lang="scss" scoped>
    // @import '~Style@/index.scss'
</style>

<!-- <template src='@/components/simple-query-template.html'></template> -->

<script>
/**
import configMixin from '@/config/config-mixin.js';
import sendDataMixin from 'Swork@/credit/mob_send_dbpmr.js';
import simpleQueryMixin from '@/components/simple-query-mixin.js'
import confirmCom from '@/components/jy-confirm';
export default {
    mixins: [configMixin, sendDataMixin,simpleQueryMixin],
    props: {
        comHeight: {
            type: Number,
            require: false,
            default: 1334-150
        } 
    },
    components: {
        confirmCom
    },
    data() {
        return {
            tipsInfo: "",
            listType: "drwt",
            gdList: [],
            gpinfo: "",
            msg: "",
            lines: [{
                "title": "操作类别:",
                "field": "op"
            }, {
                "title": "买卖方向:",
                "field": "mmfx"
            }, {
                "title": "证券代码:",
                "field": "zqxx"
            }, {
                "title": "委托数量:",
                "field": "wtsl"
            }, {
                "title": "委托价格:",
                "field": "wtjg"
            }, {
                "title": "合同编号:",
                "field": "htbh"
            }],
            opTitle:'委托撤单',
            heads:[],
            cells:[],
            col:[],
            needConfirm:true       
        }
    },
    
    methods: {
        operation(){
            let item = this.itemData;
            this.gpinfo = {
                "op": this.opTitle ||"委托",
                "zqxx": item.F141 + " " + item.F140,
                "mmfx":item.F131,
                "wtsl": item.F144,
                "wtjg": item.F145,
                "htbh":item.F146,
                "gddm": '',
                "gdInfo": ''
            };


            
        },
        requestSend(){
            this.cancelRequest();
        }
    },
    mounted: function() {
        this.initStart()
    }
}
*/
</script>
