
        <template>
            <div id = "storesCommunityModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="addPrivilegeModalLabel">商户管理区</h3>
            </div>
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row">

                                <div class="col-sm-7 m-b-xs">

                                </div>
                                <div class="col-sm-5">
                                    <div class="input-group">
                                        <input placeholder="输入管理区名称" v-model="storesCommunityInfo.searchCommunityName" type="text" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="listMyCommunity(1,10)">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>管理区ID</th>
                                            <th data-hide="phone">名称</th>
                                            <th data-hide="phone">地址</th>
                                            <th data-hide="phone">状态</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="community in storesCommunityInfo.communityInfo">
                                            <td>
                                                {{community.communityId}}
                                            </td>
                                            <td>
                                                {{community.name}}
                                            </td>
                                            <td>
                                                {{community.address}}
                                            </td>
                                            <td>
                                                {{community.stateName}}
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <vc:create
                                    name="paginationPlus"
                                    namespace="storesCommunity"
                            ></vc:create>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
            import PaginationPlus from '@/component/PaginationPlus.vue';



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
                    PaginationPlus
                },
                data () {
                    return {"storesCommunityInfo":{"communityInfo":[],"errorInfo":"","searchCommunityName":"","storeId":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
            this.$vc.on('storesCommunity','openStoresCommunity',(_params) =>{
                $('#storesCommunityModel').modal('show');
                this.storesCommunityInfo.searchCommunityName = '';
                this.storesCommunityInfo.storeId = _params.storeId;
                this.listMyCommunity(DEFAULT_PAGE,DEFAULT_ROWS);
            });
             this.$vc.on('storesCommunity','paginationPlus', 'page_event',  (_currentPage) => {
                this.listMyCommunity(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    listMyCommunity:function(_page,_row){
                    var param = {
                        params:{
                            communityName:this.storesCommunityInfo.searchCommunityName,
                            storeId:this.storesCommunityInfo.storeId,
                            page:_page,
                            row:_row
                        }

                   }
                   //发送get请求
                   this.$vc.http.get('storesCommunity',
                                'listMyCommunity',
                                 param,
                                 (json,res) =>{
                                    var _communityInfo =JSON.parse(json);
                                    this.storesCommunityInfo.communityInfo = _communityInfo.communitys
                                    this.$vc.emit('storesCommunity','paginationPlus', 'init', {
                                        total: _communityInfo.records,
                                        currentPage: _page
                                    });
                                 },(errInfo,error) =>{
                                    console.log('请求失败处理');
                                 }
                   );
             },
                },
            }
    
        </script>
        <style>
            
        </style>
    