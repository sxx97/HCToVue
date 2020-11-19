
        <template>
            <div id="addFloorModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加楼栋</h3>
                <div class="ibox-content">
                    <div>
                        <p style="color:red;">{{addFloorInfo.errorInfo}}</p>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼栋编号</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.floorNum" type="number"
                                                              placeholder="必填，请填写编号" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼栋名称</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.name"  type="text"
                                                              placeholder="必填，请填写名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><textarea cols="5" v-model="addFloorInfo.remark" type="tel"
                                                              placeholder="可填，请填写备注" class="form-control"></textarea></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveFloorInfo()">
                                    <i class="fa fa-check"></i>&nbsp;保存
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
                    return {"addFloorInfo":{"floorId":"","name":"","floorName":"","floorNum":"","remark":"","cityAddress":"","cityCode":"","errorInfo":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
            this.$vc.on('addFloor','openAddFloorModal',() =>{
                $('#addFloorModel').modal('show');
            });
        })()   
                },
                methods: {
                    addFloorValidate(){
                return this.$vc.validate.validate({
                    addFloorInfo:this.addFloorInfo
                },{
                    'addFloorInfo.name':[
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
                    'addFloorInfo.floorNum':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"楼编号不能为空"
                        },
                        {
                            limit:"num",
                            param:"",
                            errInfo:"不是有效的数字"
                        },
                    ],
                    'addFloorInfo.remark':[

                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注长度不能超过200位"
                        }
                    ]

                });
            },saveFloorInfo:function(){
                if(!this.addFloorValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }


                this.addFloorInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.addFloorInfo.cityAddress = this.$vc.getCurrentCommunity().address.split('区')[0]+'区';
                this.addFloorInfo.cityCode = this.$vc.getCurrentCommunity().cityCode;
                //不提交数据将数据 回调给侦听处理
                if(this.$vc.notNull(this.$vc._thiscallBackListener)){
                    this.addFloorInfo.floorName = this.addFloorInfo.name;
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.addFloorInfo);
                    $('#addFloorModel').modal('hide');
                    return ;
                }

                this.$vc.http.post(
                    'addFloor',
                    'saveFloor',
                    JSON.stringify(this.addFloorInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addFloorModel').modal('hide');
                            this.clearAddFloorInfo();
                            this.$vc.emit('listFloor','listFloorData',{});

                            return ;
                        }
                        this.addFloorInfo.errorInfo = json;

                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.addFloorInfo.errorInfo = errInfo;

                     });
            },clearAddFloorInfo:function(){
                this.addFloorInfo = {
                                            name:'',
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
    