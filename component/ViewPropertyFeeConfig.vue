
        <template>
            <div class="row" id="component">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>物业费初始化信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="openConfigPropertyFeeModel()">
                        <i class="glyphicon glyphicon-plus"></i> 编辑</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >物业费配置ID：</label>
                            <label class="">{{feeConfigInfo.configId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">每平米单价：</label>
                            <label class="">{{feeConfigInfo.squarePrice}} 元</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >附加费用：</label>
                            <label class="">{{feeConfigInfo.additionalAmount}} 元</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <vc:create name="configPropertyFee"></vc:create>
</div>
        </template>
        <script>
            
            import ConfigPropertyFee from '@/component/ConfigPropertyFee.vue';



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
                    ConfigPropertyFee
                },
                data () {
                    return {"feeConfigInfo":{"configId":"","squarePrice":"","additionalAmount":""}}    
                },
                mounted() {
                (() =>{
                this.loadPropertyConfigFee();
        })()
(() =>{
            this.$vc.on('viewPropertyFeeConfig','loadPropertyConfigFee',() =>{
                this.loadPropertyConfigFee();
            });

        })()   
                },
                methods: {
                    openConfigPropertyFeeModel:function(){
                this.$vc.emit('configPropertyFee','openConfigPropertyFeeModel',this.feeConfigInfo);
            },loadPropertyConfigFee:function(){
                var param = {
                    params:{
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        configId:this.feeConfigInfo.configId
                    }
                };
                this.$vc.http.get(
                    'viewPropertyFeeConfig',
                    'loadData',
                     param,
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            this.$vc.copyObject(JSON.parse(json), this.feeConfigInfo);
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    