
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{ownerRepairManageInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入报修ID"
                                       v-model="ownerRepairManageInfo.conditions.repairId" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入报修人"
                                       v-model="ownerRepairManageInfo.conditions.repairName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入报修电话" v-model="ownerRepairManageInfo.conditions.tel"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryOwnerRepairMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="ownerRepairManageInfo.moreCondition == true">
                            <select class="custom-select" v-model="ownerRepairManageInfo.conditions.repairType">
                                <option selected value="">请选择报修类型</option>
                                <option value="10001">水电报修</option>
                                <option value="10002">管道报修</option>
                                <option value="10003">其它</option>
                            </select></div>
                        <div class="col-sm-4" v-if="ownerRepairManageInfo.moreCondition == true">
                            <select class="custom-select" v-model="ownerRepairManageInfo.conditions.state">
                                <option selected value="">请选择报修状态</option>
                                <option value="1000">未派单</option>
                                <option value="1100">处理中</option>
                                <option value="1200">处理完成</option>
                            </select>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5><span v-text="ownerRepairManageInfo.conditions.roomName"></span>报修信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddOwnerRepairModal()" v-if:click="ownerRepairManageInfo.conditions.roomId != ''">
                            <i class="glyphicon glyphicon-plus"></i>
                            登记
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">报修ID</th>
                            <th class="text-center">报修类型</th>
                            <th class="text-center">报修人</th>
                            <th class="text-center">联系方式</th>
                            <th class="text-center">预约时间</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="ownerRepair in ownerRepairManageInfo.ownerRepairs">
                            <td class="text-center">{{ownerRepair.repairId}}</td>
                            <td class="text-center">{{ownerRepair.repairTypeName}}</td>
                            <td class="text-center">{{ownerRepair.repairName}}</td>
                            <td class="text-center">{{ownerRepair.tel}}</td>
                            <td class="text-center">{{ownerRepair.appointmentTime}}</td>
                            <td class="text-center">{{ownerRepair.stateName}}</td>
                            <td class="text-center">
                                <div class="btn-group" v-if="ownerRepair.state == '1000'">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDispatchRepair(ownerRepair)">派单
                                    </button>
                                </div>
                                <div class="btn-group" v-if="ownerRepair.state == '1000'">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditOwnerRepairModel(ownerRepair)">修改
                                    </button>
                                </div>
                                <div class="btn-group" v-if="ownerRepair.state == '1000'">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeleteOwnerRepairModel(ownerRepair)">删除
                                    </button>
                                </div>
                            </td>

                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="7">
                                <ul class="pagination float-right"></ul>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                    <!-- 分页 -->
                    <vc:create name="pagination"></vc:create>
                </div>
            </div>
        </div>
    </div>


    <vc:create name="addOwnerRepair"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <vc:create name="editOwnerRepair"></vc:create>
    <vc:create name="deleteOwnerRepair"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import AddOwnerRepair from '@/component/AddOwnerRepair.vue';import EditOwnerRepair from '@/component/EditOwnerRepair.vue';import DeleteOwnerRepair from '@/component/DeleteOwnerRepair.vue';



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
                    Pagination,AddOwnerRepair,EditOwnerRepair,DeleteOwnerRepair
                },
                data () {
                    return {"ownerRepairManageInfo":{"ownerRepairs":[],"total":0,"records":1,"moreCondition":false,"repairName":"","conditions":{"repairId":"","repairName":"","tel":"","repairType":"","roomId":"","roomName":"","ownerId":"","state":""}}}    
                },
                mounted() {
                (() =>{
            //this._listOwnerRepairs(DEFAULT_PAGE, DEFAULT_ROWS);
            this._validateParam();
        })()
(() =>{
            
            this.$vc.on('ownerRepairManage','listOwnerRepair',(_param) =>{
                  this._listOwnerRepairs(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',(_currentPage) =>{
                this._listOwnerRepairs(_currentPage,DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _validateParam:function(){
                var _ownerId = this.$vc.getParam('ownerId')
                var _roomId = this.$vc.getParam('roomId')

                if(!this.$vc.notNull(_roomId)){
                    this.$vc.message("非法操作，未找到房间信息");
                    this.$vc.jumpToPage('/flow/ownerFlow');
                    return ;
                }
                this.ownerRepairManageInfo.conditions.roomId = _roomId;
                this.ownerRepairManageInfo.conditions.ownerId = _ownerId;
                var param={
                    params:{
                        roomId:this.ownerRepairManageInfo.conditions.roomId,
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
                                         this.$vc.message("非法操作，未找到房间信息");
                                         this.$vc.jumpToPage('/flow/ownerFlow');
                                         return ;
                                    }
                                    var _roomInfo = _roomInfos.rooms[0];
                                    this.ownerRepairManageInfo.conditions.roomName= _roomInfo.floorNum+"号楼 "+_roomInfo.unitNum+"单元 "+_roomInfo.roomNum + "室";
                                    this._listOwnerRepairs(DEFAULT_PAGE, DEFAULT_ROWS);
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
            },_listOwnerRepairs:function(_page, _rows){
                this.ownerRepairManageInfo.conditions.page = _page;
                this.ownerRepairManageInfo.conditions.row = _rows;
                this.ownerRepairManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params:this.ownerRepairManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('ownerRepairManage',
                            'list',
                             param,
                             (json,res) =>{
                                var _ownerRepairManageInfo=JSON.parse(json);
                                this.ownerRepairManageInfo.total = _ownerRepairManageInfo.total;
                                this.ownerRepairManageInfo.records = _ownerRepairManageInfo.records;
                                this.ownerRepairManageInfo.ownerRepairs = _ownerRepairManageInfo.ownerRepairs;
                                this.$vc.emit('pagination','init',{
                                     total:this.ownerRepairManageInfo.records,
                                     currentPage:_page
                                 });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openAddOwnerRepairModal:function(){
                this.$vc.emit('addOwnerRepair','openAddOwnerRepairModal',this.ownerRepairManageInfo.conditions);
            },_openEditOwnerRepairModel:function(_ownerRepair){
                _ownerRepair.roomName = this.ownerRepairManageInfo.conditions.roomName;
                _ownerRepair.roomId = this.ownerRepairManageInfo.conditions.roomId;
                this.$vc.emit('editOwnerRepair','openEditOwnerRepairModal',_ownerRepair);
            },_openDeleteOwnerRepairModel:function(_ownerRepair){
                this.$vc.emit('deleteOwnerRepair','openDeleteOwnerRepairModal',_ownerRepair);
            },_queryOwnerRepairMethod:function(){
                this._listOwnerRepairs(DEFAULT_PAGE, DEFAULT_ROWS);

            },_openDispatchRepair:function(_ownerRepair){
                 this.$vc.jumpToPage('/flow/repairDispatchStepFlow?repairId=' + _ownerRepair.repairId);

            },_moreCondition:function(){
                if(this.ownerRepairManageInfo.moreCondition){
                    this.ownerRepairManageInfo.moreCondition = false;
                }else{
                    this.ownerRepairManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    