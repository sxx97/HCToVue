
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>开发服务提供</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">

                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">描述</label>
                    <div class="col-sm-10">
                        <textarea rows="10" placeholder="选填，请填写描述" class="form-control"
                                  v-model="serviceProvideRemarkViewInfo.description"></textarea></div>
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
                props: {"callBackListener":"true","callBackFunction":"true"},
                components: {
                    
                },
                data () {
                    return {"serviceProvideRemarkViewInfo":{"flowComponent":"serviceProvideRemarkView","remark":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{

            this.$vc.on('serviceProvideRemarkViewInfo', 'onIndex', (_index) =>{
                this.serviceProvideRemarkViewInfo.index = _index;
            });
        })()   
                },
                methods: {
                    serviceProvideRemarkValidate(){
                return this.$vc.validate.validate({
                    serviceProvideRemarkViewInfo:this.serviceProvideRemarkViewInfo
                },{
                    'serviceProvideRemarkViewInfo.remark':[
 {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注内容不能超过200"
                        },
                    ],

                });
            },saveServiceProvideRemarkInfo:function(){
                if(this.serviceProvideRemarkValidate()){
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction, this.serviceProvideRemarkViewInfo);
                    return ;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    