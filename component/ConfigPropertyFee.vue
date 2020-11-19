
        <template>
             <div id = "configPropertyFeeModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">编辑物业费</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">每平米单价</label>
                                <div class="col-sm-10"><input v-model="changeFeeConfigInfo.squarePrice" type="text" placeholder="必填，请填写房间每平米的物业费单价,如1000.00" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">附加费用</label>
                                <div class="col-sm-10"><input v-model="changeFeeConfigInfo.additionalAmount" type="text" placeholder="必填，请填写附加费，如200.00" class="form-control"></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="savePropertyConfigFee()" ><i class="fa fa-check"></i>&nbsp;保存</button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;" data-dismiss="modal">取消</button>
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
                    return {"changeFeeConfigInfo":{"configId":"","squarePrice":"","additionalAmount":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
             this.$vc.on('configPropertyFee','openConfigPropertyFeeModel',(_params) =>{
                this.$vc.copyObject(_params, this.changeFeeConfigInfo);
                $('#configPropertyFeeModel').modal('show');
            });
        })()   
                },
                methods: {
                    changeFeeConfigValidate:function(){
                        return this.$vc.validate.validate({
                            changeFeeConfigInfo:this.changeFeeConfigInfo
                        },{
                            'changeFeeConfigInfo.squarePrice':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"房间每平米单价不能为空"
                                },
                                {
                                    limit:"money",
                                    param:"",
                                    errInfo:"必须是金额，如300.00"
                                }
                            ],
                            'changeFeeConfigInfo.additionalAmount':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"附加费不能为空"
                                },
                                {
                                    limit:"money",
                                    param:"",
                                    errInfo:"必须是金额，如300.00"
                                },
                            ],


                        });
             },savePropertyConfigFee:function(){
                if(!this.changeFeeConfigValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }
                this.changeFeeConfigInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'configPropertyFee',
                    'change',
                    JSON.stringify(this.changeFeeConfigInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#configPropertyFeeModel').modal('hide');
                            this.$vc.emit('viewPropertyFeeConfig','loadPropertyConfigFee',{});
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
    