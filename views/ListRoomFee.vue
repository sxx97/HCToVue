
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>{{listRoomCreateFeeInfo.roomName}}费用</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <!--                        <button type="button" class="btn btn-primary btn-sm"-->
                        <!--                                style="margin-left:10px" v-on:click="_openRoomCreateFeeAddModal(null,true)">-->
                        <!--                            <i class="glyphicon glyphicon-plus"></i> 批量创建-->
                        <!--                        </button>-->

                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" style="margin-top:10px"
                           data-page-size="10">

                        <thead>
                        <tr>
                            <th class="text-center">费用项ID</th>
                            <th class="text-center">费用标识</th>
                            <th class="text-center">费用类型</th>
                            <th class="text-center">费用项目</th>
                            <th class="text-center">开始时间</th>
                            <th class="text-center">到期时间</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="fee in listRoomCreateFeeInfo.fees">
                            <td class="text-center">{{fee.feeId}}</td>
                            <td class="text-center">{{fee.feeFlagName}}</td>
                            <td class="text-center">{{fee.feeTypeCdName}}</td>
                            <td class="text-center">{{fee.feeName}}</td>
                            <td class="text-center">{{fee.startTime}}</td>
                            <td class="text-center">{{fee.endTime}}</td>
                            <td class="text-center">{{fee.stateName}}</td>
                            <td class="text-right">
                                <button class="btn btn-link btn-xs"
                                        v-on:click="_payFee(fee)">缴费
                                </button>
                                <button class="btn btn-link btn-xs"
                                        v-on:click="_payFeeHis(fee)">缴费历史
                                </button>
                                <button class="btn btn-link btn-xs" v-if="fee.isDefault == 'F'"
                                        v-on:click="_deleteFee(fee)">取消费用
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <!-- 分页 -->
                    <vc:create name="pagination"></vc:create>

                </div>
            </div>
        </div>
    </div>
    <vc:create name="deleteFee"></vc:create>
</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import DeleteFee from '@/component/DeleteFee.vue';



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
                    Pagination,DeleteFee
                },
                data () {
                    return {"listRoomCreateFeeInfo":{"fees":[],"roomName":"","roomId":"","total":0,"records":1}}    
                },
                mounted() {
                (() =>{
            if(this.$vc.notNull(this.$vc.getParam("roomNum"))){
                  this.listRoomCreateFeeInfo.roomName = this.$vc.getParam('floorNum')+"号楼"+this.$vc.getParam('unitNum')+"单元"+this.$vc.getParam("roomNum")+"室";
                  this.listRoomCreateFeeInfo.roomId = this.$vc.getParam('roomId');
            };
            this._loadListRoomCreateFeeInfo(1,10);
        })()
(() =>{
            this.$vc.on('listRoomFee','notify',(_param) =>{
                this._loadListRoomCreateFeeInfo(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',
                (_currentPage) => {
                    this._loadListRoomCreateFeeInfo(_currentPage, DEFAULT_ROWS);
                });
        })()   
                },
                methods: {
                    _loadListRoomCreateFeeInfo:function(_page,_row){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        payerObjId:this.listRoomCreateFeeInfo.roomId
                    }
                };

                //发送get请求
               this.$vc.http.get('listRoomFee',
                            'list',
                             param,
                             (json) =>{
                                var _feeConfigInfo = JSON.parse(json);
                                this.listRoomCreateFeeInfo.total = _feeConfigInfo.total;
                                this.listRoomCreateFeeInfo.records = _feeConfigInfo.records;
                                this.listRoomCreateFeeInfo.fees = _feeConfigInfo.fees;
                                this.$vc.emit('pagination', 'init', {
                                    total: _feeConfigInfo.records,
                                    currentPage: _page
                                });
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },_payFee:function(_fee){
               this.$vc.jumpToPage('/flow/payFeeOrderFlow?'+this.$vc.objToGetParam(_fee));
            },_payFeeHis:function(_fee){
               this.$vc.jumpToPage('/flow/propertyFeeFlow?'+this.$vc.objToGetParam(_fee));
            },_deleteFee:function(_fee){

                var dateA = new Date(_fee.startTime);
                var dateB = new Date();
                if(dateA.setHours(0, 0, 0, 0) != dateB.setHours(0, 0, 0, 0)){
                    this.$vc.toast("只能取消当天添加的费用");
                    return;
                }

                this.$vc.emit('deleteFee','openDeleteFeeModal',{
                         communityId:this.$vc.getCurrentCommunity().communityId,
                         feeId:_fee.feeId
                });
            },_refreshListRoomCreateFeeInfo:function(){
                this.listRoomCreateFeeInfo._currentFeeConfigName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    