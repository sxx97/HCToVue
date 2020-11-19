
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{myRepairDispatchInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入报修ID"
                                       v-model="myRepairDispatchInfo.conditions.repairId" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入报修人"
                                       v-model="myRepairDispatchInfo.conditions.repairName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入报修电话" v-model="myRepairDispatchInfo.conditions.tel"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryMyRepairDispatchMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="myRepairDispatchInfo.moreCondition == true">
                            <select class="custom-select" v-model="myRepairDispatchInfo.conditions.repairType">
                                <option selected value="">请选择报修类型</option>
                                <option value="10001">水电报修</option>
                                <option value="10002">管道报修</option>
                                <option value="10003">其它</option>
                            </select></div>
                        <div class="col-sm-4" v-if="myRepairDispatchInfo.moreCondition == true">
                            <select class="custom-select" v-model="myRepairDispatchInfo.conditions.state">
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
                    <h5><span v-text="myRepairDispatchInfo.conditions.roomName"></span>报修信息</h5>

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
                            <th class="text-right">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="ownerRepair in myRepairDispatchInfo.ownerRepairs">
                            <td class="text-center">{{ownerRepair.repairId}}</td>
                            <td class="text-center">{{ownerRepair.repairTypeName}}</td>
                            <td class="text-center">{{ownerRepair.repairName}}</td>
                            <td class="text-center">{{ownerRepair.tel}}</td>
                            <td class="text-center">{{ownerRepair.appointmentTime}}</td>
                            <td class="text-center">{{ownerRepair.repairDispatchStateName}}</td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-bind:disabled="ownerRepair.repairDispatchState == '10002' || ownerRepair.repairDispatchState == '10003'"
                                            v-on:click="_openDealRepair(ownerRepair)">办理
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
                    <vc:create name="pagination"></vc:create>
                </div>
            </div>
        </div>
    </div>

    <vc:create name="closeOrder"
               callBackListener="myRepairDispatch"
               callBackFunction="notifyData"
    >
    </vc:create>

    <vc:create name="ownerRepairDetail"></vc:create>


</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import CloseOrder from '@/component/CloseOrder.vue';import OwnerRepairDetail from '@/component/OwnerRepairDetail.vue';



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
                    Pagination,CloseOrder,OwnerRepairDetail
                },
                data () {
                    return {"myRepairDispatchInfo":{"ownerRepairs":[],"total":0,"records":1,"moreCondition":false,"repairName":"","currentRepairId":"","conditions":{"pageFlag":"myRepairDispatch","repairId":"","repairName":"","tel":"","repairType":"","roomId":"","roomName":"","ownerId":"","state":""}}}    
                },
                mounted() {
                (() =>{
            this._listOwnerRepairs(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
(() =>{
            
            this.$vc.on('myRepairDispatch','listOwnerRepair',(_param) =>{
                  this._listOwnerRepairs(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',(_currentPage) =>{
                this._listOwnerRepairs(_currentPage,DEFAULT_ROWS);
            });
            this.$vc.on('myRepairDispatch','notifyData',(_param) =>{
                this._closeRepairDispatchOrder(_param);
            });
        })()   
                },
                methods: {
                    _listOwnerRepairs:function(_page, _rows){
                this.myRepairDispatchInfo.conditions.page = _page;
                this.myRepairDispatchInfo.conditions.row = _rows;
                this.myRepairDispatchInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params:this.myRepairDispatchInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('myRepairDispatch',
                            'list',
                             param,
                             (json,res) =>{
                                var _myRepairDispatchInfo=JSON.parse(json);
                                this.myRepairDispatchInfo.total = _myRepairDispatchInfo.total;
                                this.myRepairDispatchInfo.records = _myRepairDispatchInfo.records;
                                this.myRepairDispatchInfo.ownerRepairs = _myRepairDispatchInfo.ownerRepairs;
                                this.$vc.emit('pagination','init',{
                                     total:this.myRepairDispatchInfo.records,
                                     currentPage:_page
                                 });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openDealRepair:function(_ownerRepair){
                this.myRepairDispatchInfo.currentRepairId = _ownerRepair.repairId;
                this.$vc.emit('closeOrder','openCloseOrderModal',{});
            },_moreCondition:function(){
                if(this.myRepairDispatchInfo.moreCondition){
                    this.myRepairDispatchInfo.moreCondition = false;
                }else{
                    this.myRepairDispatchInfo.moreCondition = true;
                }
            },_closeRepairDispatchOrder:function(_orderInfo){
                var _repairDispatchParam = {
                    repairId:this.myRepairDispatchInfo.currentRepairId,
                    context:_orderInfo.remark,
                    communityId:this.$vc.getCurrentCommunity().communityId
                };
                if(_orderInfo.state == '1100'){
                    _repairDispatchParam.state = '10002';
                }else{
                    _repairDispatchParam.state = '10003';
                }

               this.$vc.http.post(
                   'myRepairDispatch',
                   'closeOrder',
                   JSON.stringify(_repairDispatchParam),
                   {
                       emulateJSON:true
                    },
                    (json,res) =>{
                       //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                       if(res.status == 200){
                           //关闭model
                           this._listOwnerRepairs(DEFAULT_PAGE, DEFAULT_ROWS);
                           return ;
                       }
                       this.$vc.message(json);

                    },
                    (errInfo,error) =>{
                       console.log('请求失败处理');

                       this.$vc.message(errInfo);

                    });

            },_openDispatchRepairDetail:function(_ownerRepair){
                this.$vc.emit('ownerRepairDetail','openOwnerRepairDetailModal',_ownerRepair);
            },_queryMyRepairDispatchMethod:function(){
                this._listOwnerRepairs(DEFAULT_PAGE, DEFAULT_ROWS);
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    