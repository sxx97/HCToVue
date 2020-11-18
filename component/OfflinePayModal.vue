
                <template>
                    
            <div class="modal-layer" v-if="modalShowStatus">
                <div class="offline-pay-modal">
                    <div class="offline-pay-modal-content">
                        <div class="form-item">
                            <div class="form-item-label">支付渠道</div>
                            <div class="form-item-content">
                                <label>
                                    <input type="checkbox">
                                    <span>现金支付</span>
                                </label>
                                <label>
                                    <input type="checkbox">
                                    <span>银行转账</span>
                                </label>
                                <label>
                                    <input type="checkbox">
                                    <span>支付宝转账</span>
                                </label>
                                <label>
                                    <input type="checkbox">
                                    <span>微信转账</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-item">
                            <div class="form-item-label">已付金额</div>
                            <div class="form-item-content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>类目</th><th>实际付款金额</th><th>已付金额</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>房间租金</td>
                                            <td>xxx元</td>
                                            <td>
                                                <input type="number" class="custom-input" style="width: 100px;">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="form-item">
                            <div class="form-item-label">付款凭证</div>
                            <div class="form-item-content">
                                <!--<div>
                                    <img src="" alt="">
                                </div>
                                <div class="upload-img">
                                
                                </div>-->
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-item-label">备注</div>
                            <div class="form-item-content">
                                <textarea class="custom-input" style="width: 720px;height: 200px;"
                                    placeholder="已付金额与实际应付金额不一样，需填写原因，限50个字"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="offline-pay-modal-footer">
                        <button class="btn cs-btn-close" @click="changeModalShowStatus(false)">取消</button>
                        <button class="btn btn-primary">确定</button>
                    </div>
                </div>
            </div>
        
                </template>
                <script>
                    export default {
                        name: OfflinePayModal,
                        [object Object],
                        data() {
            return {

            }
        },
                        undefined,
                        [object Object],
                    }
                </script>
            