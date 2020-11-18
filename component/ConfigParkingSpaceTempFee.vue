
        <template>
             <div id = "configFeeTempConfigInfoModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">编辑临时停车费</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">每小时单价</label>
                                <div class="col-sm-10"><input v-model="changeFeeTempConfigInfo.squarePrice" type="text" placeholder="必填，请填写临时车每小时单价,如10.00" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">首两个小时</label>
                                <div class="col-sm-10"><input v-model="changeFeeTempConfigInfo.additionalAmount" type="text" placeholder="必填，请填写前两个小时费用，如200.00" class="form-control"></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveTempParkingSpaceConfigFee()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
                return {"changeFeeTempConfigInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('configFeeTempConfigInfo','openConfigParkingSpaceFeeModel',function(_params){
                this.$vc.copyObject(_params, this.changeFeeTempConfigInfo);
                $('#configFeeTempConfigInfoModel').modal('show');
            });
        })()   
            },
            methods: {
                changeFeeConfigValidate:function(){
                        return this.$vc.validate.validate({
                            changeFeeTempConfigInfo:this.changeFeeTempConfigInfo
                        },{
                            'changeFeeTempConfigInfo.squarePrice':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"每小时单价不能为空"
                                },
                                {
                                    limit:"money",
                                    param:"",
                                    errInfo:"必须是金额，如300.00"
                                }
                            ],
                            'changeFeeTempConfigInfo.additionalAmount':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"前两小时费用不能为空"
                                },
                                {
                                    limit:"money",
                                    param:"",
                                    errInfo:"必须是金额，如300.00"
                                },
                            ],


                        });
             },saveTempParkingSpaceConfigFee:function(){
                if(!this.changeFeeConfigValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }
                this.changeFeeTempConfigInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'configParkingSpaceTempFee',
                    'change',
                    JSON.stringify(this.changeFeeTempConfigInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#configFeeTempConfigInfoModel').modal('hide');
                            this.$vc.emit('viewParkingSpaceFeeConfig','loadParkingSpaceConfigFee',this.changeFeeTempConfigInfo);
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    