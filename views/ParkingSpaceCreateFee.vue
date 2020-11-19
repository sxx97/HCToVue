
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
<!--                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"-->
<!--                                v-on:click="_moreCondition()">{{parkingSpaceCreateFeeInfo.moreCondition == true?'隐藏':'更多'}}-->
<!--                        </button>-->
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">

                        <div class="col-sm-4">
                            <div class="form-group input-group">
                                    <input type="text" placeholder="请填写车位编码" class="form-control form-control-sm"
                                           v-model="parkingSpaceCreateFeeInfo.conditions.num">
                            </div>

                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <input type="text" placeholder="请填写车牌号" class="form-control form-control-sm"
                                           v-model="parkingSpaceCreateFeeInfo.conditions.carNum">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请填写车位ID" class="form-control form-control-sm"
                                       v-model="parkingSpaceCreateFeeInfo.conditions.psId">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryParkingSpaceMethod()"><i
                                    class="glyphicon glyphicon-search"></i> 查询
                            </button>
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
                    <h5>车位信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm"
                                style="margin-left:10px" v-on:click="_openParkingSpaceCreateFeeAddModal(null,true)">
                            <i class="glyphicon glyphicon-plus"></i> 批量创建
                        </button>
<!--                        <button type="button" class="btn btn-primary btn-sm"-->
<!--                                style="margin-left:10px" v-on:click="_openAddParkingSpace()">-->
<!--                            <i class="glyphicon glyphicon-plus"></i> 批量取消收费-->
<!--                        </button>-->
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" style="margin-top:10px"
                           data-page-size="10">
                        <thead>
                        <tr>
<!--                            <th>车位ID</th>-->
                            <th data-hide="phone">车位编号</th>
                            <th data-hide="phone">车牌号</th>
<!--                            <th data-hide="phone">业主ID</th>-->
                            <th data-hide="phone">业主名称</th>
                            <th data-hide="phone">业主身份证</th>
                            <th class="text-right">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="parkingSpace in parkingSpaceCreateFeeInfo.parkingSpaces">
                            <!--<td>
                                {{parkingSpace.psId}}
                            </td>-->
                            <td>
                                {{parkingSpace.areaNum}}号停车场{{parkingSpace.num}}号车位
                            </td>
                            <td>
                                {{parkingSpace.carNum}}
                            </td>
                            <!--<td>
                                {{parkingSpace.ownerId}}
                            </td>-->
                            <td>
                                {{parkingSpace.ownerName}}
                            </td>
                            <td>
                                {{parkingSpace.idCard}}
                            </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openParkingSpaceCreateFeeAddModal(parkingSpace,false)">创建收费
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openViewParkingSpaceCreateFee(parkingSpace)">查看收费
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

    <vc:create name="parkingSpaceCreateFeeAdd"
    ></vc:create>
</div>
        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import ParkingSpaceCreateFeeAdd from '@/component/ParkingSpaceCreateFeeAdd.vue';



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
                    Pagination,ParkingSpaceCreateFeeAdd
                },
                data () {
                    return {"parkingSpaceUnits":[],"parkingSpaceCreateFeeInfo":{"parkingSpaces":[],"total":0,"records":1,"floorId":"","unitId":"","state":"","num":"","moreCondition":false,"conditions":{"psId":"","num":"","carNum":""}}}    
                },
                mounted() {
                (() =>{
            this.listParkingSpace(DEFAULT_PAGE,DEFAULT_ROW);
        })()
(() =>{

            this.$vc.on('pagination','page_event',(_currentPage) =>{
                this.listParkingSpace(_currentPage,DEFAULT_ROW);
            });
        })()   
                },
                methods: {
                    listParkingSpace:function(_page,_row){

                this.parkingSpaceCreateFeeInfo.conditions.page=_page;
                this.parkingSpaceCreateFeeInfo.conditions.row=_row;
                this.parkingSpaceCreateFeeInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params:this.parkingSpaceCreateFeeInfo.conditions
                };

               //发送get请求
               this.$vc.http.get('parkingSpaceCreateFee',
                            'listParkingSpace',
                             param,
                             (json,res) =>{
                                var listParkingSpaceData =JSON.parse(json);

                                this.parkingSpaceCreateFeeInfo.total = listParkingSpaceData.total;
                                this.parkingSpaceCreateFeeInfo.records = listParkingSpaceData.records;
                                this.parkingSpaceCreateFeeInfo.parkingSpaces = listParkingSpaceData.parkingSpaces;

                                this.$vc.emit('pagination','init',{
                                    total:this.parkingSpaceCreateFeeInfo.records,
                                    dataCount: this.parkingSpaceCreateFeeInfo.total,
                                    currentPage:_page
                                });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openParkingSpaceCreateFeeAddModal:function(_parkingSpace,_isMore){
                this.$vc.emit('parkingSpaceCreateFeeAdd', 'openParkingSpaceCreateFeeAddModal',{
                    isMore:_isMore,
                    parkingSpace:_parkingSpace
                });
            },_openViewParkingSpaceCreateFee:function(_parkingSpace){
                 this.$vc.jumpToPage("/flow/listParkingSpaceFeeFlow?"+this.$vc.objToGetParam(_parkingSpace));
            },_queryParkingSpaceMethod:function(){
                this.listParkingSpace(DEFAULT_PAGE,DEFAULT_ROW);
            },_moreCondition:function(){
                if(this.parkingSpaceCreateFeeInfo.moreCondition){
                    this.parkingSpaceCreateFeeInfo.moreCondition = false;
                }else{
                    this.parkingSpaceCreateFeeInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    