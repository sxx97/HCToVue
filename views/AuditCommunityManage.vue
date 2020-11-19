
        <template>
            <div id="component">

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>未审核管理区</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <th>管理区ID</th>
                            <th>管理区名称</th>
                            <th>管理区地址</th>
                            <th>附近地标</th>
                            <th>城市编码</th>
                            <th>管理区维度</th>
                            <th>管理区经度</th>
                            <th>状态</th>
                            <th class="text-right">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="community in auditCommunityManageInfo.communitys">
                            <td>{{community.communityId}}</td>
                            <td>{{community.name}}</td>
                            <td>{{community.address}}</td>
                            <td>{{community.nearbyLandmarks}}</td>
                            <td>{{community.cityCode}}</td>
                            <td>{{community.mapX}}</td>
                            <td>{{community.mapY}}</td>
                            <td>{{community.stateName}}</td>
                            <td>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openAuditCommunityModal(community)">审核
                                    </button>
                                </div>


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
    <vc:create name="audit"
               callBackListener="auditCommunityManage"
               callBackFunction="notifyAuditInfo"
    ></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import Audit from '@/component/Audit.vue';



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
                    Pagination,Audit
                },
                data () {
                    return {"auditCommunityManageInfo":{"communitys":[],"total":0,"records":1,"currentCommunityId":""}}    
                },
                mounted() {
                (() =>{
            this._listCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
(() =>{
            this.$vc.on('auditCommunityManage','listCommunity',(_param) =>{
                  this._listCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('auditCommunityManage','notifyAuditInfo',(_auditInfo) =>{
                  this._auditCommunityState(_auditInfo);
            });
             this.$vc.on('pagination','page_event',(_currentPage) =>{
                this._listCommunitys(_currentPage,DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listCommunitys:function(_page, _rows){
                var param = {
                    params:{
                        page:_page,
                        row:_rows
                    }

               }
               //发送get请求
               this.$vc.http.get('auditCommunityManage',
                            'list',
                             param,
                             (json,res) =>{
                                var _auditCommunityManageInfo=JSON.parse(json);
                                this.auditCommunityManageInfo.total = _auditCommunityManageInfo.total;
                                this.auditCommunityManageInfo.records = _auditCommunityManageInfo.records;
                                this.auditCommunityManageInfo.communitys = _auditCommunityManageInfo.communitys;
                                this.$vc.emit('pagination','init',{
                                    total:this.auditCommunityManageInfo.records,
                                    currentPage:_page
                                });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openAuditCommunityModal:function(_community){
                this.auditCommunityManageInfo.currentCommunityId = _community.communityId;
                this.$vc.emit('audit','openAuditModal',{});
            },_auditCommunityState:function(_auditInfo){
                _auditInfo.communityId = this.auditCommunityManageInfo.currentCommunityId;
                this.$vc.http.post(
                    'auditCommunityManage',
                    'audit',
                    JSON.stringify(_auditInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                             this._listCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    