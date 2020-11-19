
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <select class="custom-select" v-model="carBlackWhiteManageInfo.conditions.blackWhite">
                                <option selected value="">请选择名单类型</option>
                                <option value="1111">黑名单</option>
                                <option value="2222">白名单</option>
                            </select></div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入车牌号"
                                       v-model="carBlackWhiteManageInfo.conditions.carNum" class=" form-control">
                            </div>
                        </div>
                        <!--<div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入名单ID"
                                       v-model="carBlackWhiteManageInfo.conditions.bwId" class=" form-control">
                            </div>
                        </div>-->
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm"
                                    v-on:click="_queryCarBlackWhiteMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
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
                    <h5>黑白名单信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddCarBlackWhiteModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <!--<th class="text-center">名单ID</th>-->
                            <th class="text-center">名单类型</th>
                            <th class="text-center">车牌号</th>
                            <th class="text-center">开始时间</th>
                            <th class="text-center">结束时间</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="carBlackWhite in carBlackWhiteManageInfo.carBlackWhites">
                            <!--<td class="text-center">{{carBlackWhite.bwId}}</td>-->
                            <td class="text-center">{{carBlackWhite.blackWhiteName}}</td>
                            <td class="text-center">{{carBlackWhite.carNum}}</td>
                            <td class="text-center">{{carBlackWhite.startTime}}</td>
                            <td class="text-center">{{carBlackWhite.endTime}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditCarBlackWhiteModel(carBlackWhite)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeleteCarBlackWhiteModel(carBlackWhite)">删除
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


    <vc:create name="addCarBlackWhite"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <vc:create name="editCarBlackWhite"></vc:create>
    <vc:create name="deleteCarBlackWhite"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import AddCarBlackWhite from '@/component/AddCarBlackWhite.vue';import EditCarBlackWhite from '@/component/EditCarBlackWhite.vue';import DeleteCarBlackWhite from '@/component/DeleteCarBlackWhite.vue';



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
                    Pagination,AddCarBlackWhite,EditCarBlackWhite,DeleteCarBlackWhite
                },
                data () {
                    return {"carBlackWhiteManageInfo":{"carBlackWhites":[],"total":0,"records":1,"moreCondition":false,"carNum":"","conditions":{"blackWhite":"","carNum":"","bwId":""}}}    
                },
                mounted() {
                (() =>{
            this._listCarBlackWhites(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
(() =>{
            
            this.$vc.on('carBlackWhiteManage','listCarBlackWhite',(_param) =>{
                  this._listCarBlackWhites(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',(_currentPage) =>{
                this._listCarBlackWhites(_currentPage,DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listCarBlackWhites:function(_page, _rows){

                this.carBlackWhiteManageInfo.conditions.page = _page;
                this.carBlackWhiteManageInfo.conditions.row = _rows;
                this.carBlackWhiteManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;

                var param = {
                    params:this.carBlackWhiteManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('carBlackWhiteManage',
                            'list',
                             param,
                             (json,res) =>{
                                var _carBlackWhiteManageInfo=JSON.parse(json);
                                this.carBlackWhiteManageInfo.total = _carBlackWhiteManageInfo.total;
                                this.carBlackWhiteManageInfo.records = _carBlackWhiteManageInfo.records;
                                this.carBlackWhiteManageInfo.carBlackWhites = _carBlackWhiteManageInfo.carBlackWhites;
                                this.$vc.emit('pagination','init',{
                                     total:this.carBlackWhiteManageInfo.records,
                                     currentPage:_page
                                 });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openAddCarBlackWhiteModal:function(){
                this.$vc.emit('addCarBlackWhite','openAddCarBlackWhiteModal',{});
            },_openEditCarBlackWhiteModel:function(_carBlackWhite){
                this.$vc.emit('editCarBlackWhite','openEditCarBlackWhiteModal',_carBlackWhite);
            },_openDeleteCarBlackWhiteModel:function(_carBlackWhite){
                this.$vc.emit('deleteCarBlackWhite','openDeleteCarBlackWhiteModal',_carBlackWhite);
            },_queryCarBlackWhiteMethod:function(){
                this._listCarBlackWhites(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function(){
                if(this.carBlackWhiteManageInfo.moreCondition){
                    this.carBlackWhiteManageInfo.moreCondition = false;
                }else{
                    this.carBlackWhiteManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    