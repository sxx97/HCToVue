
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"mOrderId":""}    
            },
            mounted() {
             (_initMethod() {

        })()(_initEvent() {
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
    