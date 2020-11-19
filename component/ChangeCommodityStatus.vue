
        <template>
            <div class="modal" tabindex="-1" role="dialog" id="changeCommodityStatusModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>确定{{commodityInfo.show ? '上' : '下'}}架商品?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary"
                    @click="postChangeCommodityStatus">确认</button>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
            



            const OWNER_TYPE = {
                OWNER: '1001',
                TENANT: '1003'
            };
            // 考核类型
            const ASSESSMENT_TYPE = {
                BUSINESS: 2,
                COMMON: 1,
                SYSTEM: 3,
            };
            
            // 删除时的类型
            const DELETE_TYPE = {
                TABLE: 1, // 删除通用考核表
                BUSINESS_ITEM: 2,  // 删除业务考核项
                COMMON_ITEM: 3, // 删除通用考核项
            }
            // 考核人员
            const ASSESSMENT_OBJECT_TYPE = {
                STAFF: 1,
                SUPERVISOR: 2,
                MANAGER: 3,
            }
            
            const AUTO_ASSESSMENT_TYPE = {
                INSPECTION: 1,
                WORK_ORDER: 2,
                ATTENDANCE: 3,
            }
            
            // 考核项目
            const ASSESSMENT_ITEM_TYPE = {
                COMMON_ITEM: 1,
                BUSINESS_ITEM: 2,
            }
            
            const DEFAULT_PAGE = 1;
            const DEFAULT_ROWS = 10;

            
            export default {
                props: {},
                components: {
                    
                },
                data () {
                    return {"commodityInfo":{"originalPrice":"","currentPrice":"","remark":"","title":"","commodityId":-1,"communityId":"","show":1,"photos":"","intro":"","stockpile":""}}    
                },
                mounted() {
                (() => {
            console.log('对比退款弹窗');
        })()
(() => {
            this.$vc.on('changeCommodityStatus', 'change', this.listenerChangeCommodityStatusModal)
        })()   
                },
                methods: {
                    listenerChangeCommodityStatusModal(commodityInfo) {
                $('#changeCommodityStatusModal').modal('show');
                for(let key in this.commodityInfo) {
                    if (key == 'show') {
                        this.commodityInfo[key] = Number(!(commodityInfo[key] - 0));
                    } else {
                        this.commodityInfo[key] = commodityInfo[key];
                    }
                }
            },prefixAddZero(num) {
                return num >= 10 ? num.toString() : '0' + num;
            },postChangeCommodityStatus() {
                const date = new Date();
                this.commodityInfo['issuedTime'] = `${date.toLocaleDateString().replace(/\//g, '-')} ${
                    this.prefixAddZero(date.getHours())}:${
                    this.prefixAddZero(date.getMinutes())}:${
                    this.prefixAddZero(date.getSeconds())}`

                this.$vc.http.post('updateCommodity', 'update',
                    this.commodityInfo,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    },
                    (resText, res) => {
                        this.$vc.emit('mallMange', 'commodityList', 'refresh', null);
                        $('#changeCommodityStatusModal').modal('hide');
                    },
                    (errText, err) => {

                    })
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    