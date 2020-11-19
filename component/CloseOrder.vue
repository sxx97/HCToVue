
        <template>
            <div id="closeOrderModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">结单信息</h3>
                <div class="ibox-content">
                    <div>
                        <div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">结单状态</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="closeOrderInfo.state">
                                        <option selected disabled value="">请选择</option>
                                        <option value="1100">结单</option>
                                        <option value="1200">退单</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">原因</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写原因" class="form-control"
                                              v-model="closeOrderInfo.remark"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="_closeOrderSubmit()"><i class="fa fa-check"></i>&nbsp;提交
                                </button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                                        data-dismiss="modal">取消
                                </button>
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
                props: {"callBackListener":"true","callBackFunction":"true"},
                components: {
                    
                },
                data () {
                    return {"closeOrderInfo":{"state":"","remark":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
            this.$vc.on('closeOrder','openCloseOrderModal',() =>{
                $('#closeOrderModel').modal('show');
            });
        })()   
                },
                methods: {
                    closeOrderValidate(){
                return this.$vc.validate.validate({
                    closeOrderInfo:this.closeOrderInfo
                },{
                    'closeOrderInfo.state':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"订单状态不能为空"
                        },
                        {
                            limit:"num",
                            param:"",
                            errInfo:"订单状态错误"
                        },
                    ],
                    'closeOrderInfo.remark':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"原因内容不能为空"
                        },
                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"原因内容不能超过200"
                        },
                    ]
                });
            },_closeOrderSubmit:function(){
                if(!this.closeOrderValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }
                //不提交数据将数据 回调给侦听处理
                if(this.$vc.notNull(this.$vc._thiscallBackListener)){
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.closeOrderInfo);
                    $('#closeOrderModel').modal('hide');

                    this.clearAddBasePrivilegeInfo();
                    return ;
                }


            },clearAddBasePrivilegeInfo:function(){
                this.closeOrderInfo={
                             state:'',
                             remark:''
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    