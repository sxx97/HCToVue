
        <template>
            <div id="addUnitModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加单元</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">单元编号</label>
                                <div class="col-sm-10"><input v-model="addUnitInfo.unitNum" type="number"
                                                              placeholder="必填，请填写单元编号" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">总层数</label>
                                <div class="col-sm-10"><input v-model="addUnitInfo.layerCount" type="number"
                                                              placeholder="必填，请填写单元总层数" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">电梯</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addUnitInfo.lift">
                                        <option selected disabled value="">必填，请选择是否有电梯</option>
                                        <option value="1010">有</option>
                                        <option value="2020">无</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><textarea cols="5" v-model="addUnitInfo.remark" type="text"
                                                                 placeholder="请填写备注信息" class="form-control"></textarea></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="addUnit()"><i
                                        class="fa fa-check"></i>&nbsp;保存
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
                props: {"callBackListener":"chooseStaff","callBackFunction":"chooseStaff"},
                components: {
                    
                },
                data () {
                    return {"addUnitInfo":{"floorId":"","unitNum":"","layerCount":"","lift":"","remark":"","communityId":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
             this.$vc.on('addUnit','openAddUnitModal',(_params) =>{
                 this.refreshAddUnitInfo();
                $('#addUnitModel').modal('show');
                 if(_params.hasOwnProperty("floorId") && this.$vc.notNull(_params.floorId)){
                     this.addUnitInfo.floorId = _params.floorId;
                 }
                this.addUnitInfo.communityId = this.$vc.getCurrentCommunity().communityId;
             });
             this.$vc.on('addUnit','addUnitModel',(_params) =>{
                this.refreshAddUnitInfo();

                $('#addUnitModel').modal('show');
                if(_params.hasOwnProperty("floorId") && this.$vc.notNull(_params.floorId)){
                    this.addUnitInfo.floorId = _params.floorId;
                }
                this.addUnitInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
             this.$vc.on('addUnit','onFloorInfo', (_params) => {
                 if(_params.hasOwnProperty("floorId") && this.$vc.notNull(_params.floorId)){
                     this.addUnitInfo.floorId = _params.floorId;
                 }
                 this.addUnitInfo.communityId = this.$vc.getCurrentCommunity().communityId;
             });
        })()   
                },
                methods: {
                    addUnitValidate:function(){
                        return this.$vc.validate.validate({
                            addUnitInfo:this.addUnitInfo
                        },{
                            'addUnitInfo.floorId':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"写字楼不能为空"
                                }
                            ],
                            'addUnitInfo.unitNum':[
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
                            'addUnitInfo.layerCount':[
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
                            'addUnitInfo.lift':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"必须选择单元是否电梯"
                                }
                            ],
                            'addUnitInfo.remark':[
                                {
                                    limit:"maxLength",
                                    param:"200",
                                    errInfo:"备注长度不能超过200位"
                                },
                            ]

                        });
             },addUnit:function(){
                if(!this.addUnitValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }

                 this.addUnitInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                //不提交数据将数据 回调给侦听处理
                if(this.$vc.notNull(this.$vc._thiscallBackListener)){
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.addUnitInfo);
                    $('#addUnitModel').modal('hide');
                    return ;
                }

                this.$vc.http.post(
                    'addUnit',
                    'save',
                    JSON.stringify(this.addUnitInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addUnitModel').modal('hide');
                            this.$vc.emit('unit','loadUnit',{
                                floorId:this.addUnitInfo.floorId
                            });
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },refreshAddUnitInfo:function(){
                this.addUnitInfo= {
                  floorId:'',
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
    