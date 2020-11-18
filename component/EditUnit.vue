
        <template>
            <div id = "editUnitModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改单元</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">单元编号</label>
                                <div class="col-sm-10"><input v-model="editUnitInfo.unitNum" type="number" placeholder="必填，请填写单元编号" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">总层数</label>
                                <div class="col-sm-10"><input v-model="editUnitInfo.layerCount" type="number" placeholder="必填，请填写单元总层数" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">电梯</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editUnitInfo.lift">
                                        <option selected value="">必填，请选择是否有电梯</option>
                                        <option value="1010">有</option>
                                        <option value="2020">无</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><textarea cols="5" v-model="editUnitInfo.remark" type="text" placeholder="请填写备注信息" class="form-control"></textarea></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editUnit()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
                return {"editUnitInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('editUnit','openUnitModel',function(_params){
                this.refreshEditUnitInfo();
                $('#editUnitModel').modal('show');
                this.editUnitInfo = _params;
                this.editUnitInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
            },
            methods: {
                editUnitValidate:function(){
                        return this.$vc.validate.validate({
                            editUnitInfo:this.editUnitInfo
                        },{
                            'editUnitInfo.floorId':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"写字楼不能为空"
                                }
                            ],
                            'editUnitInfo.unitNum':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"单元编号不能为空"
                                },
                                {
                                    limit:"num",
                                    param:"",
                                    errInfo:"单元编号必须为数字"
                                },
                            ],
                            'editUnitInfo.layerCount':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"单元楼层高度不能为空"
                                },
                                {
                                    limit:"num",
                                    param:"",
                                    errInfo:"单元楼层高度必须为数字"
                                }
                            ],
                            'editUnitInfo.lift':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"必须选择单元是否电梯"
                                }
                            ],
                            'editUnitInfo.remark':[
                                {
                                    limit:"maxLength",
                                    param:"200",
                                    errInfo:"备注长度不能超过200位"
                                },
                            ]

                        });
             },editUnit:function(){
                if(!this.editUnitValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }

                this.$vc.http.post(
                    'editUnit',
                    'update',
                    JSON.stringify(this.editUnitInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#editUnitModel').modal('hide');
                            this.$vc.emit('unit','loadUnit',{
                                floorId:this.editUnitInfo.floorId
                            });
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },refreshEditUnitInfo:function(){
                this.editUnitInfo= {
                  floorId:'',
                  unitId:'',
                  unitNum:'',
                  layerCount:'',
                  lift:'',
                  remark:'',
                  communityId:''
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    