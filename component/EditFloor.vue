
        <template>
            <div id="editFloorModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改楼栋</h3>
                <div class="ibox-content">
                    <div>
                        <p style="color:red;">{{editFloorInfo.errorInfo}}</p>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼栋编号</label>
                                <div class="col-sm-10"><input v-model="editFloorInfo.floorNum" type="number"
                                                              placeholder="必填，请填写编号" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼栋名称</label>
                                <div class="col-sm-10"><input v-model="editFloorInfo.floorName"  type="text"
                                                              placeholder="必填，请填写名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><textarea cols="5" v-model="editFloorInfo.remark" type="tel"
                                                                 placeholder="可填，请填写备注" class="form-control"></textarea></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="editFloorMethod()"><i class="fa fa-check"></i>&nbsp;修改
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
            props: {},
            components: {
                
            },
            data () {
                return {"editFloorInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
            this.$vc.on('editFloor','openEditFloorModal',function(_floor){
                this.editFloorInfo.errorInfo="";
                this.$vc.copyObject(_floor,this.editFloorInfo);
                $('#editFloorModel').modal('show');
            });
        })()   
            },
            methods: {
                editFloorValidate(){
                return this.$vc.validate.validate({
                    editFloorInfo:this.editFloorInfo
                },{
                    'editFloorInfo.floorName':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"楼名称不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,10",
                            errInfo:"楼名称长度必须在2位至10位"
                        },
                    ],

                    'editFloorInfo.remark':[

                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注长度不能超过200位"
                        }
                    ]

                });
            },editFloorMethod:function(){

                if(!this.editFloorValidate()){
                    this.editFloorInfo.errorInfo = this.$vc.validate.errInfo;
                    return ;
                }

                this.editFloorInfo.errorInfo = "";
                this.addFloorInfo.cityAddress = this.$vc.getCurrentCommunity().address.split('区')[0]+'区';
                this.addFloorInfo.cityCode = this.$vc.getCurrentCommunity().cityCode;
                this.editFloorInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'editFloor',
                    'changeFloor',
                    JSON.stringify(this.editFloorInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#editFloorModel').modal('hide');
                            this.clearEditFloorInfo();
                            this.$vc.emit('listFloor','listFloorData',{});

                            return ;
                        }
                        this.editFloorInfo.errorInfo = json;

                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.editFloorInfo.errorInfo = errInfo;

                     });
            },clearEditFloorInfo:function(){
                this.editFloorInfo = {
                                            floorId:'',
                                            floorName:'',
                                            floorNum:'',
                                            remark:'',
                                            errorInfo:''
                                        };
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    