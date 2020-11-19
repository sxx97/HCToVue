
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>添加访客拜访事由</h5>
            </div>
            <div class="ibox-content">
                <div>
                    <div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">访客拜访事由</label>
                            <div class="col-sm-10">
                                <textarea v-model="addVisitCase.visitCase" type="text" placeholder="请填写访客拜访事由" rows="3"
                                          class="form-control"></textarea>
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
                    return {"addVisitCase":{"visitCase":""}}    
                },
                mounted() {
                (() =>{

        })()
(() =>{
            this.$vc.on('addVisitCase', 'onIndex', (_index) =>{
                console.log("侦听到addVisitCase的index为  "+_index);
                // this.addCarInfo.index = _index;
                this.$vc.emit('addVisitSpace', 'notify', _index);
            });

        })()   
                },
                methods: {
                    addCarValidate:function(){

            },saveAddCarInfo:function(){
                if(this.addCarValidate()){
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackComponent,this.$vc._thiscallBackFunction, this.addCarInfo);
                    return ;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    