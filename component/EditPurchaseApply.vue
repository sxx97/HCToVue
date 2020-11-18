
        <template>
            <div id = "editPurchaseApplyModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改采购申请</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
         <label class="col-sm-2 col-form-label">订单状态</label>
         <div class="col-sm-10">
<select class="custom-select" v-model="editPurchaseApplyInfo.state">
         <option selected  disabled value="">必填，请选择订单状态</option>
         <option  value="1001">面积*单价+附加费</option>
<option  value="2002">固定费用</option>
  </select>         </div>
</div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editPurchaseApply()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"editPurchaseApplyInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('editPurchaseApply','openEditPurchaseApplyModal',function(_params){
                this.refreshEditPurchaseApplyInfo();
                $('#editPurchaseApplyModel').modal('show');
                this.$vc.copyObject(_params, this.editPurchaseApplyInfo );
                this.editPurchaseApplyInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
            },
            methods: {
                editPurchaseApplyValidate:function(){
                        return this.$vc.validate.validate({
                            editPurchaseApplyInfo:this.editPurchaseApplyInfo
                        },{
                            'editPurchaseApplyInfo.state':[
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
'editPurchaseApplyInfo.applyOrderId':[
{
                            limit:"required",
                            param:"",
                            errInfo:"订单号不能为空"
                        }]

                        });
             },editPurchaseApply:function(){
                if(!this.editPurchaseApplyValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }

                this.$vc.http.post(
                    'editPurchaseApply',
                    'update',
                    JSON.stringify(this.editPurchaseApplyInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#editPurchaseApplyModel').modal('hide');
                             this.$vc.emit('purchaseApplyManage','listPurchaseApply',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },refreshEditPurchaseApplyInfo:function(){
                this.editPurchaseApplyInfo= {
                  applyOrderId:'',
state:'',

                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    