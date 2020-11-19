
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>{{orgCommunityManageInfo.orgName}}隶属管理区</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="_goBack()">
                        <i class="glyphicon glyphicon-plus"></i>
                        返回
                    </button>
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddOrgCommunityModal()">
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
                        <!--<th class="text-center">组织ID</th>-->
                        <th class="text-center">组织名称</th>
                        <th class="text-center">管理区ID</th>
                        <th class="text-center">管理区名称</th>
                        <th class="text-right">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="orgCommunity in orgCommunityManageInfo.orgCommunitys">
                        <!--<td class="text-center">{{orgCommunity.orgId}}</td>-->
                        <td class="text-center">{{orgCommunity.orgName}}</td>
                        <td class="text-center">{{orgCommunity.communityId}}</td>
                        <td class="text-center">{{orgCommunity.communityName}}</td>
                        <td class="text-right">
                            <div class="btn-group">
                                <button class="btn-white btn btn-xs"
                                        v-on:click="_openDeleteOrgCommunityModel(orgCommunity)">
                                    删除
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
    <vc:create name="addOrgCommunity"
               emitListener="orgCommunityManageInfo"
               emitFunction="listOrgCommunity"
    ></vc:create>
    <vc:create name="deleteOrgCommunity"></vc:create>
</div>



        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import AddOrgCommunity from '@/component/AddOrgCommunity.vue';import DeleteOrgCommunity from '@/component/DeleteOrgCommunity.vue';



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
                    Pagination,AddOrgCommunity,DeleteOrgCommunity
                },
                data () {
                    return {"orgCommunityManageInfo":{"orgCommunitys":[],"total":0,"records":1,"moreCondition":false,"orgId":"","orgName":""}}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('orgCommunityManageInfo', 'openOrgCommunity',  (_param) => {
                this.$vc.copyObject(_param, this.orgCommunityManageInfo);
                this._listOrgCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('orgCommunityManageInfo', 'listOrgCommunity',  (_param) => {
                //this.$vc.copyObject(_param, this.orgCommunityManageInfo.conditions);
                this._listOrgCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listOrgCommunitys(_currentPage, DEFAULT_ROWS);
            });

        })()   
                },
                methods: {
                    _listOrgCommunitys:function (_page, _rows) {

                var param = {
                    params: {
                        page:_page,
                        row:_rows,
                        orgId:this.orgCommunityManageInfo.orgId
                    }
                };

                //发送get请求
                this.$vc.http.get('orgCommunityManage',
                    'list',
                    param,
                     (json, res) => {
                        var _orgCommunityManageInfo = JSON.parse(json);
                        this.orgCommunityManageInfo.total = _orgCommunityManageInfo.total;
                        this.orgCommunityManageInfo.records = _orgCommunityManageInfo.records;
                        this.orgCommunityManageInfo.orgCommunitys = _orgCommunityManageInfo.orgCommunitys;
                        this.$vc.emit('pagination', 'init', {
                            total: this.orgCommunityManageInfo.records,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAddOrgCommunityModal:function () {
                this.$vc.emit('addOrgCommunity', 'openAddOrgCommunityModal', {
                    orgId: this.orgCommunityManageInfo.orgId,
                    orgName: this.orgCommunityManageInfo.orgName
                });
            },_openEditOrgCommunityModel:function (_orgCommunity) {
                this.$vc.emit('editOrgCommunity', 'openEditOrgCommunityModal', _orgCommunity);
            },_openDeleteOrgCommunityModel:function (_orgCommunity) {
                this.$vc.emit('deleteOrgCommunity', 'openDeleteOrgCommunityModal', _orgCommunity);
            },_openBeyondCommunity:function(_orgCommunity){
            },_queryOrgCommunityMethod:function () {
                this._listOrgCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function () {
                if (this.orgCommunityManageInfo.moreCondition) {
                    this.orgCommunityManageInfo.moreCondition = false;
                } else {
                    this.orgCommunityManageInfo.moreCondition = true;
                }
            },_goBack:function(){
                this.$vc.emit('orgManage','onBack',{});
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    