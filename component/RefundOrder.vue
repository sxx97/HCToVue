
        <template>
            <div class="modal" tabindex="-1" role="dialog" id="refundOrderModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>确定退款吗？</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary"
                        @click="affirmRefundOrder">确认</button>
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
                return {"orderId":"0"}    
            },
            mounted() {
             (_initMethod() {

        })()(_initEvent() {
            this.$vc.on('refundOrder', 'showRefundOrderModal', this.listenerRefundOrderModal);
        })()   
            },
            methods: {
                listenerRefundOrderModal(orderId) {
                this.orderId = orderId;
                $('#refundOrderModal').modal('show');
            },affirmRefundOrder() {
                console.log(this.orderId, '发起退款时的订单id');
                this.$vc.http.post('mOrderRefund', 'refund',
                    {
                        mOrderId: this.orderId,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    },
                    (resText, res) => {
                        $('#refundOrderModal').modal('hide');
                        this.$vc.emit('mallMange', 'orderList', 'refresh', null);
                    },
                    (errText, err) => {
                        $('#refundOrderModal').modal('hide');
                    }
                )
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    