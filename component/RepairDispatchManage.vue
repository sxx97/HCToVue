
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{repairDispatchManageInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入报修ID"
                                       v-model="repairDispatchManageInfo.conditions.repairId" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入报修人"
                                       v-model="repairDispatchManageInfo.conditions.repairName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入报修电话" v-model="repairDispatchManageInfo.conditions.tel"
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
                        <div class="col-sm-4" v-if="repairDispatchManageInfo.moreCondition == true">
                            <select class="custom-select" v-model="repairDispatchManageInfo.conditions.repairType">
                                <option selected value="">请选择报修类型</option>
                                <option value="10001">水电报修</option>
                                <option value="10002">管道报修</option>
                                <option value="10003">其它</option>
                            </select></div>
                        <div class="col-sm-4" v-if="repairDispatchManageInfo.moreCondition == true">
                            <select class="custom-select" v-model="repairDispatchManageInfo.conditions.state">
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
                    <h5><span v-text="repairDispatchManageInfo.conditions.roomName"></span>报修信息</h5>

                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
<!--                            <th class="text-center">报修ID</th>-->
                            <th class="text-center">报修类型</th>
                            <th class="text-center">报修人</th>
                            <th class="text-center">联系方式</th>
                            <th class="text-center">预约时间</th>
                            <th class="text-center">维修师傅</th>
                            <th class="text-center">状态</th>
                            <th class="text-right">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="ownerRepair in repairDispatchManageInfo.ownerRepairs">
<!--                            <td class="text-center">{{ownerRepair.repairId}}</td>-->
                            <td class="text-center">{{ownerRepair.repairTypeName}}</td>
                            <td class="text-center">{{ownerRepair.repairName}}</td>
                            <td class="text-center">{{ownerRepair.tel}}</td>
                            <td class="text-center">{{ownerRepair.appointmentTime}}</td>
                            <td class="text-center">{{ownerRepair.userName}}</td>
                            <td class="text-center">{{ownerRepair.stateName}}</td>
                            <td class="text-right">
                                <div class="btn-group" v-if="ownerRepair.state == '1000'">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDispatchRepair(ownerRepair)">派单
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDispatchRepairDetail(ownerRepair)">详情
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
                    <Pagination name="pagination"></Pagination>
                </div>
            </div>
        </div>
    </div>

    <OwnerRepairDetail name="ownerRepairDetail"></OwnerRepairDetail>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import OwnerRepairDetail from './OwnerRepairDetail.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"repairDispatchManageInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listOwnerRepairs(DEFAULT_PAGE, DEFAULT_ROWS);
            //this._validateParam();
        })()(function(){
            
            this.$vc.on('repairDispatchManage','listOwnerRepair',function(_param){
                  this._listOwnerRepairs(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',function(_currentPage){
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
                this.repairDispatchManageInfo.conditions.roomId = _roomId;
                this.repairDispatchManageInfo.conditions.ownerId = _ownerId;
                var param={
                    params:{
                        roomId:this.repairDispatchManageInfo.conditions.roomId,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        page:1,
                        row:1
                    }
                };
                //查询房间信息 业主信息
               this.$vc.http.get('repairDispatchManage',
                            'getRoom',
                             param,
                             function(json,res){
                                if(res.status == 200){
                                    var _roomInfos=JSON.parse(json);
                                    if(!_roomInfos.hasOwnProperty("rooms")){
                                         this.$vc.message("非法操作，未找到房间信息");
                                         this.$vc.jumpToPage('/flow/ownerFlow');
                                         return ;
                                    }
                                    var _roomInfo = _roomInfos.rooms[0];
                                    this.repairDispatchManageInfo.conditions.roomName= _roomInfo.floorNum+"号楼 "+_roomInfo.unitNum+"单元 "+_roomInfo.roomNum + "室";
                                    this._listOwnerRepairs(DEFAULT_PAGE, DEFAULT_ROWS);
                                }else{
                                     this.$vc.message("非法操作，未找到房间信息");
                                     this.$vc.jumpToPage('/flow/ownerFlow');
                                }
                             },function(errInfo,error){
                                console.log('请求失败处理');
                                this.$vc.message("非法操作，未找到房间信息");
                                this.$vc.jumpToPage('/flow/ownerFlow');
                             }
                 );
            },_listOwnerRepairs:function(_page, _rows){
                this.repairDispatchManageInfo.conditions.page = _page;
                this.repairDispatchManageInfo.conditions.row = _rows;
                this.repairDispatchManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params:this.repairDispatchManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('repairDispatchManage',
                            'list',
                             param,
                             function(json,res){
                                var _repairDispatchManageInfo=JSON.parse(json);
                                this.repairDispatchManageInfo.total = _repairDispatchManageInfo.total;
                                this.repairDispatchManageInfo.records = _repairDispatchManageInfo.records;
                                this.repairDispatchManageInfo.ownerRepairs = _repairDispatchManageInfo.ownerRepairs;
                                this.$vc.emit('pagination','init',{
                                     total:this.repairDispatchManageInfo.records,
                                     currentPage:_page
                                 });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_queryOwnerRepairMethod:function(){
                this._listOwnerRepairs(DEFAULT_PAGE, DEFAULT_ROWS);

            },_openDispatchRepair:function(_ownerRepair){
                 this.$vc.jumpToPage('/flow/repairDispatchStepFlow?repairId=' + _ownerRepair.repairId);

            },_openDispatchRepairDetail:function(_ownerRepair){
                this.$vc.emit('ownerRepairDetail','openOwnerRepairDetailModal',_ownerRepair);
            },_moreCondition:function(){
                if(this.repairDispatchManageInfo.moreCondition){
                    this.repairDispatchManageInfo.moreCondition = false;
                }else{
                    this.repairDispatchManageInfo.moreCondition = true;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    