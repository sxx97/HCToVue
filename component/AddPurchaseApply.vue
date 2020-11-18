
        <template>
            <div id="addPurchaseApplyModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加采购申请</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">使用人</label>
                                <div class="col-sm-3">
                                    <vc:create name="orgSelect2"
                                               parentModal="addInspectionPlanModel"
                                               callBackListener="addInspectionPlanInfo"
                                               callBackFunction="notify"
                                               namespace="addInspectionPlan"
                                    ></vc:create>
                                </div>
                                <div class="col-sm-3">
                                    <vc:create name="departmentSelect2"
                                               parentModal="addInspectionPlanModel"
                                               callBackListener="addInspectionPlanInfo"
                                               callBackFunction="notify"
                                               namespace="addInspectionPlan"
                                    ></vc:create>
                                </div>
                                <div class="col-sm-3">
                                    <vc:create name="staffSelect2"
                                               parentModal="addInspectionPlanModel"
                                               callBackListener="addInspectionPlanInfo"
                                               callBackFunction="notify"
                                               namespace="addInspectionPlan"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">申请说明</label>
                                <div class="col-sm-10">
                                    <textarea v-model="addPurchaseApplyInfo.description" type="text" placeholder="选填，请填写申请说明"
                                              class="form-control">
                                    </textarea>
                                </div>
                            </div>


                            <ul class="nav nav-list"><li class="divider"></li></ul>
                            <table id="resource_table"></table>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="savePurchaseApplyInfo()"><i class="fa fa-check"></i>&nbsp;保存
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
            
        export default {
            props: {"callBackListener":"false","callBackFunction":"false"},
            components: {
                
            },
            data () {
                return {"addPurchaseApplyInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //初始化物品表格
             this.initResourceTable();
         })()(function(){
            this.$vc.on('addPurchaseApply','openAddPurchaseApplyModal',function(){
                $('#addPurchaseApplyModel').modal('show');
            });
        })()   
            },
            methods: {
                addPurchaseApplyValidate(){
                return this.$vc.validate.validate({
                    addPurchaseApplyInfo:this.addPurchaseApplyInfo
                },{
                    'addPurchaseApplyInfo.state':[
{
                            limit:"required",
                            param:"",
                            errInfo:"订单状态不能为空"
                        },
 {
                            limit:"num",
                            param:"",
                            errInfo:"计算公式格式错误"
                        },
                    ],




                });
            },savePurchaseApplyInfo:function(){
                if(!this.addPurchaseApplyValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }

                this.addPurchaseApplyInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if(this.$vc.notNull(this.$vc._thiscallBackListener)){
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.addPurchaseApplyInfo);
                    $('#addPurchaseApplyModel').modal('hide');
                    return ;
                }

                this.$vc.http.post(
                    'addPurchaseApply',
                    'save',
                    JSON.stringify(this.addPurchaseApplyInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addPurchaseApplyModel').modal('hide');
                            this.clearAddPurchaseApplyInfo();
                            this.$vc.emit('purchaseApplyManage','listPurchaseApply',{});

                            return ;
                        }
                        this.$vc.message(json);

                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                     });
            },clearAddPurchaseApplyInfo:function(){
                this.addPurchaseApplyInfo = {
                    state:'',
                };
            },initResourceTable:function(){
                $('#resource_table').bootstrapTable({
                    height: 500,
                    columns: [
                        {
                            field:'resId',
                            title:'资源ID',
                        },
                        {
                            field:'resName',
                            title:'资源名称',
                        },{
                            field:'resCode',
                            title:'物品编码',
                        },{
                            field:'price',
                            title:'单价',
                        },{
                            field:'stock',
                            title:'库存'
                        },{
                            field:'quantity',
                            title:'采购数量'
                        },
                        {
                            field:'remark',
                            title:'备注'
                        }
                    ],
                });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    