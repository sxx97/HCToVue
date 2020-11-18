
        <template>
            <div id = "editParkingSpaceModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改车位</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">车位编码</label>
                                <div class="col-sm-10"><input v-model="editParkingSpaceInfo.num" type="text" placeholder="必填，请填写车位编码" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">车位类型</label>
                                <div class="col-sm-10">
                                    <vc:create name="parkingAreaSelect2"
                                               parentModal="editParkingSpace"
                                               callBackListener="editParkingSpace"
                                               callBackFunction="notify"
                                               namespace="editParkingSpace"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">面积</label>
                                <div class="col-sm-10"><input v-model="editParkingSpaceInfo.area" type="number" placeholder="必填，请填写面积，如30.09" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><input v-model="editParkingSpaceInfo.remark" type="tel" placeholder="可填，请填写备注" class="form-control"></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editParkingSpaceMethod()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
            props: {"notifyLoadDataComponentName":"false"},
            components: {
                
            },
            data () {
                return {"editParkingSpaceInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
            this.$vc.on('editParkingSpace','openEditParkingSpaceModal',function(_parkingSpace){
                this.$vc.copyObject(_parkingSpace,this.editParkingSpaceInfo);
                this.$vc.emit('editParkingSpace', 'parkingAreaSelect2', 'setParkingArea', {
                    paId: this.editParkingSpaceInfo.paId,
                    num: this.editParkingSpaceInfo.areaNum
                });
                $('#editParkingSpaceModel').modal('show');
            });
             this.$vc.on("editParkingSpace", "notify", function (_param) {
                    this.addParkingSpaceInfo.paId = _param.paId;
            });
        })()   
            },
            methods: {
                editParkingSpaceValidate(){
                return this.$vc.validate.validate({
                    editParkingSpaceInfo:this.editParkingSpaceInfo
                },{
                   'editParkingSpaceInfo.num':[
                       {
                           limit:"required",
                           param:"",
                           errInfo:"车位编号不能为空"
                       },
                       {
                           limit:"maxLength",
                           param:"12",
                           errInfo:"车位编号长度不能超过12位"
                       },
                   ],
                   'editParkingSpaceInfo.paId':[
                       {
                           limit:"required",
                           param:"",
                           errInfo:"停车场不能为空"
                       }
                   ],
                   'editParkingSpaceInfo.area':[
                       {
                           limit:"required",
                           param:"",
                           errInfo:"车位面积不能为空"
                       },
                       {
                           limit:"money",
                           param:"",
                           errInfo:"车位面积格式错误，如3.09"
                       }
                   ],
                   'editParkingSpaceInfo.remark':[

                       {
                           limit:"maxLength",
                           param:"200",
                           errInfo:"备注长度不能超过200位"
                       }
                   ]

                });
            },editParkingSpaceMethod:function(){

                if(!this.editParkingSpaceValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }

                this.editParkingSpaceInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'editParkingSpace',
                    'changeParkingSpace',
                    JSON.stringify(this.editParkingSpaceInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#editParkingSpaceModel').modal('hide');
                            this.clearEditParkingSpaceInfo();
                            this.$vc.emit(this.$vc._thisnotifyLoadDataComponentName,'listParkingSpaceData',{});

                            return ;
                        }
                        this.$vc.message(json);

                     },
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                     });
            },clearEditParkingSpaceInfo:function(){
                this.editParkingSpaceInfo = {
                    psId:'',
                    num:'',
                    paId:'',
                    area:'',
                    remark:'',
                    areaNum:''
                };

                this.$vc.emit('editParkingSpace', 'parkingAreaSelect2', 'setParkingArea', {
                    paId: '',
                    num: ''
                });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    