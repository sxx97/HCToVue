
        <template>
            <div class="modal" tabindex="-1" role="dialog" id="signCommodityStatusModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>确定对方已签收商品?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary"
                        @click="changeSignStatus">确认</button>
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
                    return {"mOrderId":""}    
                },
                mounted() {
                (() => {

        })()
(() => {
            this.$vc.on('mallManage', 'signCommodity', 'show', this.listenerSignCommodityModal);
        })()   
                },
                methods: {
                    listenerSignCommodityModal(mOrderId) {
                $('#signCommodityStatusModal').modal('show');
                this.mOrderId = mOrderId;
            },changeSignStatus() {
                this.$vc.http.post('updateMOrder', 'update', {
                        mOrderId: this.mOrderId,
                        deliverStatus: SIGN_STATUS,
                    },{
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    },
                    (resText, res) => {
                        $('#signCommodityStatusModal').modal('hide');
                        this.$vc.emit('mallMange', 'orderList', 'refresh', null);
                    },
                    (errText, err) => {

                    });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    