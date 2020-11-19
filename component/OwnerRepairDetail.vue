
        <template>
            <div id="ownerRepairDetailModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">报修详情</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">报修ID</label>
                                <div class="col-sm-10">
                                    <input v-model="ownerRepairDetailInfo.repairId" type="text"
                                           readonly class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">报修类型</label>
                                <div class="col-sm-10">
                                    <input v-model="ownerRepairDetailInfo.repairTypeName" type="text"
                                            readonly class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">报修人</label>
                                <div class="col-sm-10">
                                    <input v-model="ownerRepairDetailInfo.repairName" type="text" readonly
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">联系方式</label>
                                <div class="col-sm-10">
                                    <input v-model="ownerRepairDetailInfo.tel" type="number" readonly
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间编号</label>
                                <div class="col-sm-10">
                                    <input v-model="ownerRepairDetailInfo.roomName" readonly type="text" readonly
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">预约时间</label>
                                <div class="col-sm-10">
                                    <input v-model="ownerRepairDetailInfo.appointmentTime" type="text"
                                           readonly class="form-control ">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">维修师傅</label>
                                <div class="col-sm-10">
                                    <input v-model="ownerRepairDetailInfo.userName" type="text"
                                           readonly class="form-control ">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">状态</label>
                                <div class="col-sm-10">
                                    <input v-model="ownerRepairDetailInfo.stateName" type="text"
                                           readonly class="form-control ">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">报修内容</label>
                                <div class="col-sm-10">
                                    <textarea readonly cols="15" class="form-control"
                                              v-model="ownerRepairDetailInfo.context"></textarea></div>
                            </div>

                            <div class="ibox-content">
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
                props: {},
                components: {
                    
                },
                data () {
                    return {"ownerRepairDetailInfo":{"repairId":"","repairType":"","repairTypeName":"","repairName":"","tel":"","roomId":"","roomName":"","appointmentTime":"","context":"","stateName":"","userId":"","userName":""}}    
                },
                mounted() {
                (() =>{
            
         })()
(() =>{
            this.$vc.on('ownerRepairDetail','openOwnerRepairDetailModal',(_ownerInfo) =>{
                this.clearOwnerRepairDetailInfo();
                this.$vc.copyObject(_ownerInfo,this.ownerRepairDetailInfo);
                this._getRoom();
                $('#ownerRepairDetailModel').modal('show');
            });
        })()   
                },
                methods: {
                    clearOwnerRepairDetailInfo:function(){
                this.ownerRepairDetailInfo = {
                        repairId:'',
                        repairType:'',
                        repairTypeName:'',
                        repairName:'',
                        tel:'',
                        roomId:'',
                        roomName:'',
                        appointmentTime:'',
                        context:'',
                        stateName:'',
                        roomId:'',
                        userId:'',
                        userName:''
                    };
            },_getRoom:function(){
                var param={
                    params:{
                        roomId:this.ownerRepairDetailInfo.roomId,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        page:1,
                        row:1
                    }
                };
                //查询房间信息 业主信息
               this.$vc.http.get('ownerRepairManage',
                            'getRoom',
                             param,
                             (json,res) =>{
                                if(res.status == 200){
                                    var _roomInfos=JSON.parse(json);
                                    if(!_roomInfos.hasOwnProperty("rooms")){
                                         this.$vc.toast("非法操作，未找到房间信息");
                                         //this.$vc.jumpToPage('/flow/ownerFlow');
                                         return ;
                                    }
                                    var _roomInfo = _roomInfos.rooms[0];
                                    this.ownerRepairDetailInfo.roomName= _roomInfo.floorNum+"号楼 "+_roomInfo.unitNum+"单元 "+_roomInfo.roomNum + "室";
                                }else{
                                     this.$vc.message("非法操作，未找到房间信息");
                                     this.$vc.jumpToPage('/flow/ownerFlow');
                                }
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                                this.$vc.message("非法操作，未找到房间信息");
                                this.$vc.jumpToPage('/flow/ownerFlow');
                             }
                 );
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    