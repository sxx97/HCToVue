
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
                    return {"otherInfo":{"otherState":"","otherRemark":""}}    
                },
                mounted() {
                (() =>{

        })()
(() =>{
            this.$vc.on('sellRoomOther','listOwnerData',(_owner) =>{
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
    