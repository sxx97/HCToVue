
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{auditEnterCommunityManageInfo.moreCondition ==
                            true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入商户名称"
                                       v-model="auditEnterCommunityManageInfo.conditions.name" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入管理区名称"
                                       v-model="auditEnterCommunityManageInfo.conditions.communityName"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <select class="custom-select"
                                    v-model="auditEnterCommunityManageInfo.conditions.auditStatusCd">
                                <option selected value="">请选择审核状态</option>
                                <option value="1000">未审核</option>
                                <option value="1100">审核通过</option>
                                <option value="1200">审核未通过</option>
                            </select></div>

                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm"
                                    v-on:click="_queryEnterCommunityMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row" v-if="auditEnterCommunityManageInfo.moreCondition == true">
                        <div class="col-sm-4">
                            <select class="custom-select"
                                    v-model="auditEnterCommunityManageInfo.conditions.memberTypeCd">
                                <option selected value="">请选择商户类型</option>
                                <option value="390001200002">物业公司</option>
                                <option value="390001200003">代理商</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入联系电话"
                                       v-model="auditEnterCommunityManageInfo.conditions.tel"
                                       class=" form-control">
                            </div>
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
                    <h5>商户审核</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <th>管理区ID</th>
                            <th>管理区名称</th>
                            <th>商户名称</th>
                            <th>商户类型</th>
                            <th>联系电话</th>
                            <th>商户地址</th>
                            <th>状态</th>
                            <th class="text-right">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="community in auditEnterCommunityManageInfo.communitys">
                            <td>{{community.communityId}}</td>
                            <td>{{community.name}}</td>
                            <td>{{community.storeName}}</td>
                            <td>{{community.storeTypeName}}</td>
                            <td>{{community.tel}}</td>
                            <td>{{community.address}}</td>
                            <td>{{community.stateName}}</td>
                            <td class="text-right">
                                <div class="btn-group" v-if="community.auditStatusCd=='1000'">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEnterAuditCommunityModal(community)">审核
                                    </button>
                                </div>
                                <!--v-on:click="_openEnterAuditCommunityModal(community)"-->
                                <div class="btn-group" v-if="community.auditStatusCd!='1000'">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openRecallAuditFinishCommunityModal(community)"
                                            >撤回审核
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
               callBackListener="auditEnterCommunityManage"
               callBackFunction="notifyAuditInfo"
    ></vc:create>
    <!--撤回审核-->
    <vc:create name="recallAuditEnterFinishCommunity"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import Audit from '@/component/Audit.vue';import RecallAuditEnterFinishCommunity from '@/component/RecallAuditEnterFinishCommunity.vue';



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
                    Pagination,Audit,RecallAuditEnterFinishCommunity
                },
                data () {
                    return {"auditEnterCommunityManageInfo":{"communitys":[],"total":0,"records":1,"currentCommunityMemberId":"","moreCondition":false,"conditions":{"name":"","memberTypeCd":"","communityName":"","auditStatusCd":"1000","tel":""}}}    
                },
                mounted() {
                (() =>{
            this._listCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
(() =>{
            this.$vc.on('auditEnterCommunityManage','listCommunity',(_param) =>{
                  this._listCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('auditEnterCommunityManage','notifyAuditInfo',(_auditInfo) =>{
                  this._auditEnterCommunityState(_auditInfo);
            });
             this.$vc.on('pagination','page_event',(_currentPage) =>{
                this._listCommunitys(_currentPage,DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listCommunitys:function(_page, _rows){

               this.auditEnterCommunityManageInfo.conditions.page = _page;
               this.auditEnterCommunityManageInfo.conditions.row = _rows;
               var param = {
                   params: this.auditEnterCommunityManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('auditEnterCommunityManage',
                            'list',
                             param,
                             (json,res) =>{
                                var _auditEnterCommunityManageInfo=JSON.parse(json);
                                this.auditEnterCommunityManageInfo.total = _auditEnterCommunityManageInfo.total;
                                this.auditEnterCommunityManageInfo.records = _auditEnterCommunityManageInfo.records;
                                this.auditEnterCommunityManageInfo.communitys = _auditEnterCommunityManageInfo.communitys;
                                this.$vc.emit('pagination','init',{
                                    total:this.auditEnterCommunityManageInfo.records,
                                    currentPage:_page
                                });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openEnterAuditCommunityModal:function(_community){
                this.auditEnterCommunityManageInfo.currentCommunityMemberId = _community.communityMemberId;
                this.$vc.emit('audit','openAuditModal',{});
            },_openRecallAuditFinishCommunityModal:function(_community){
                this.$vc.emit('recallAuditEnterFinishCommunity','openRecallAuditEnterFinishCommunityModal',_community);
            },_auditEnterCommunityState:function(_auditInfo){
                _auditInfo.communityMemberId = this.auditEnterCommunityManageInfo.currentCommunityMemberId;
                this.$vc.http.post(
                    'auditEnterCommunityManage',
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
            },_queryEnterCommunityMethod:function () {
                this._listCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function () {
                if (this.auditEnterCommunityManageInfo.moreCondition) {
                    this.auditEnterCommunityManageInfo.moreCondition = false;
                } else {
                    this.auditEnterCommunityManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    