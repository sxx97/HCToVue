
        <template>
            <div id = "addParkingSpaceModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加停车位</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">车位编码</label>
                                <div class="col-sm-10"><input v-model="addParkingSpaceInfo.num" type="text" placeholder="必填，请填写车位编码" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">停车场</label>
                                <div class="col-sm-10">
                                    <vc:create name="parkingAreaSelect2"
                                               parentModal="addParkingSpace"
                                               callBackListener="addParkingSpace"
                                               callBackFunction="notify"
                                               namespace="addParkingSpace"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">面积</label>
                                <div class="col-sm-10"><input v-model="addParkingSpaceInfo.area" type="number" placeholder="必填，请填写面积，如30.09" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><input v-model="addParkingSpaceInfo.remark" type="tel" placeholder="可填，请填写备注" class="form-control"></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveParkingSpaceInfo()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
            
            import ParkingAreaSelect2 from '@/component/ParkingAreaSelect2.vue';



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
                props: {"notifyLoadDataComponentName":"false"},
                components: {
                    ParkingAreaSelect2
                },
                data () {
                    return {"addParkingSpaceInfo":{"num":"","paId":"","area":"","remark":"","psId":"","parkingAreas":[]}}    
                },
                mounted() {
                (() =>{
         })()
(() =>{
            this.$vc.on('addParkingSpace','openAddParkingSpaceModal',(_parkingSpaceId) =>{
                if(_parkingSpaceId != null || _parkingSpaceId != -1){
                    this.addParkingSpaceInfo.parkingSpaceId = _parkingSpaceId;
                }
                $('#addParkingSpaceModel').modal('show');
            });

            this.$vc.on("addParkingSpace", "notify",  (_param) => {
                    this.addParkingSpaceInfo.paId = _param.paId;
            });
        })()   
                },
                methods: {
                    addParkingSpaceValidate(){
                return this.$vc.validate.validate({
                    addParkingSpaceInfo:this.addParkingSpaceInfo
                },{
                    'addParkingSpaceInfo.num':[
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
                    'addParkingSpaceInfo.paId':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"停车场不能为空"
                        }
                    ],
                    'addParkingSpaceInfo.area':[
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
                    'addParkingSpaceInfo.remark':[

                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注长度不能超过200位"
                        }
                    ]

                });
            },saveParkingSpaceInfo:function(){
                if(!this.addParkingSpaceValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }

                this.addParkingSpaceInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'addParkingSpace',
                    'saveParkingSpace',
                    JSON.stringify(this.addParkingSpaceInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addParkingSpaceModel').modal('hide');
                            this.clearAddParkingSpaceInfo();
                            this.$vc.emit(this.$vc._thisnotifyLoadDataComponentName,'listParkingSpaceData',{});

                            return ;
                        }
                        this.$vc.message(json);

                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                     });
            },clearAddParkingSpaceInfo:function(){
                this.addParkingSpaceInfo = {
                    num:'',
                    paId:'',
                    area:'',
                    remark:''
                };

                this.$vc.emit('addParkingSpace', 'parkingAreaSelect2', 'setParkingArea', {
                    paId: '',
                    num: ''
                });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    