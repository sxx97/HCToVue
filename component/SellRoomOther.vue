
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>其他信息</h5>
            </div>
            <div class="ibox-content">
                <div>
                    <div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">出售状态</label>
                            <div class="col-sm-10">
                                <select class="custom-select" v-model="otherInfo.otherState">
                                    <option selected  disabled value="">必填，请选择状态</option>
                                    <option value="2001">业主未迁入</option>
                                    <option value="2001">业主迁入</option>
                                    <option value="2001">业主迁出</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">备注</label>
                            <div class="col-sm-10">
                                <textarea v-model="otherInfo.otherRemark" type="text" placeholder="请填写备注信息" rows="3" class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
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
                return {"otherInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

        })()(function(){
            this.$vc.on('sellRoomOther','listOwnerData',function(_owner){
                //this.ownerInfo = _owner;
                this.otherInfo.ownerId = _owner.ownerId;
            });

        })()   
            },
            methods: {
                
            },
        }
    
        </script>
        <style>
            
        </style>
    