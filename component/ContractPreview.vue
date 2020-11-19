
                <template>
                    
            <div class="contract-preview">
                <div class="contract-preview-header">
                    <div>合同预览</div>
                </div>
                <div class="contract-preview-item">
                    <div class="item-field">
                        <div class="field-name">合同编号</div>
                        <div class="field-content">xxxxxxxxxxx</div>
                    </div>
                    <div class="item-field">
                        <div class="field-name">合同创建时间</div>
                        <div class="file-content">xxxxxxxxxxx</div>
                    </div>
                    <div class="item-field">
                        <div class="field-name">合同开始时间</div>
                        <div class="file-content">xxxxxxxx</div>
                    </div>
                    <div class="item-field">
                        <div class="field-name">合同截止时间</div>
                        <div class="file-content">xxxxxx</div>
                    </div>
                    <button class="btn btn-primary btn-step" @click="changeContractStep(1)">修改</button>
                </div>
                
                <div class="contract-preview-item">
                    <div class="item-field">
                        <div class="field-name">租赁时间</div>
                        <div class="field-content">xxxx</div>
                    </div>
                    <div class="item-field">
                        <div class="field-name">房间租金</div>
                        <div class="field-content">xxxx</div>
                    </div>
                    <div class="item-field">
                        <div class="field-name">合同金额</div>
                        <div class="field-content">xxxx</div>
                    </div>
                    <div class="item-field">
                        <div class="field-name">房间押金</div>
                        <div class="field-content">xxxxx</div>
                    </div>
                    
                    <button class="btn btn-primary btn-step" @click="changeContractStep(2)">修改</button>
                </div>
                
                <div class="contract-preview-item">
                    <div class="item-field">
                        <div class="field-name">钥匙押金10把</div>
                        <div class="field-content">xxxx</div>
                    </div>
                    <div class="item-field">
                        <div class="field-name">物业费</div>
                        <div class="field-content">xxxx</div>
                    </div>
                    <button class="btn btn-primary btn-step" @click="changeContractStep(3)">修改</button>
                </div>
                
                <div class="contract-preview-item">
                    <div class="item-field">
                        <div class="field-name">租客</div>
                        <div class="field-content">xxxx</div>
                    </div>
                    <div class="item-field">
                        <div class="field-name">房间</div>
                        <div class="field-content">xxxx</div>
                    </div>
                    
                    <div class="item-field">
                        <div class="field-name">附件</div>
                        <div class="field-content">xxxx</div>
                    </div>
                    
                    <div class="item-field">
                        <div class="field-name">备注</div>
                        <div class="field-content">xxxx</div>
                    </div>
                    <button class="btn btn-primary btn-step" @click="changeContractStep(4)">修改</button>
                </div>
                
            </div> 
        
                </template>
                <script>
                    export default {
                        name: ContractPreview,
                        undefined,
                        data() {
      return {};
    },
                        undefined,
                        [object Object],
                    }
                </script>
            