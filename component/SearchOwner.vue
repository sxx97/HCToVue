
        <template>
            <div id="searchOwnerModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchOwnerModelLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <template v-if="isTenant">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="searchOwnerModelLabel">选择企业租客</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class=" row">
                        <div class="col-lg-12">
                            <div class="ibox ">
                                <div class="row">

                                    <!--<div class="col-sm-7 m-b-xs">
                                        <div class="input-group">
                                            <input placeholder="输入租客ID" type="text"
                                                   v-model="searchOwnerInfo._currentOwnerId"
                                                   class="form-control form-control-sm">
                                        </div>
                                    </div>-->
                                    <div class="col-sm-5">
                                        <div class="input-group">
                                            <input placeholder="输入企业名称" type="text"
                                                   v-model="searchOwnerInfo._currentOwnerName"
                                                   class="form-control form-control-sm">
                                            <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary"
                                                        v-on:click="searchOwners()">查询</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive" style="margin-top:15px">
                                    <table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <!--<th>租客ID</th>-->
                                            <th>企业名称</th>
                                            <th>企业代表</th>
                                            <th>手机</th>
                                            <th>操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="owner in searchOwnerInfo.owners">
                                            <!--<td>
                                                {{owner.memberId}}
                                            </td>-->
                                            <td>
                                                {{owner.enterpriseName}}
                                            </td>
                                            <td>
                                                {{owner.name}}
                                            </td>
                                            <td>
                                                {{owner.link}}
                                            </td>
                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseOwner(owner)">选择
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="searchOwnerModelLabel">选择业主</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class=" row">
                        <div class="col-lg-12">
                            <div class="ibox ">
                                <div class="row">

                                    <!--<div class="col-sm-7 m-b-xs">
                                        <div class="input-group">
                                            <input placeholder="输入业主ID" type="text"
                                                   v-model="searchOwnerInfo._currentOwnerId"
                                                   class="form-control form-control-sm">
                                        </div>
                                    </div>-->
                                    <div class="col-sm-5">
                                        <div class="input-group">
                                            <input placeholder="输入业主名称" type="text"
                                                   v-model="searchOwnerInfo._currentOwnerName"
                                                   class="form-control form-control-sm">
                                            <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary"
                                                        v-on:click="searchOwners()">查询</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive" style="margin-top:15px">
                                    <table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <!--<th>业主ID</th>-->
                                            <th>名称</th>
                                            <th>性别</th>
                                            <th>年龄</th>
                                            <th>身份证</th>
                                            <th>联系方式</th>
                                            <th>创建员工</th>
                                            <th>操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="owner in searchOwnerInfo.owners">
                                            <!--<td>
                                                {{owner.memberId}}
                                            </td>-->

                                            <td>
                                                {{owner.name}}
                                            </td>
                                            <td>
                                                {{owner.sex == 0 ? '男' : '女'}}
                                            </td>
                                            <td>
                                                {{owner.age}}
                                            </td>
                                            <td>
                                                {{owner.idCard}}
                                            </td>
                                            <td>
                                                {{owner.link}}
                                            </td>
                                            <td>
                                                {{owner.userName}}
                                            </td>
                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseOwner(owner)">选择
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</div>
        </template>
        <script>
            
            



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
                props: {"emitChooseOwner":"true","emitLoadData":"true"},
                components: {
                    
                },
                data () {
                    return {"isTenant":false,"searchOwnerInfo":{"owners":[],"_currentOwnerName":"","_currentOwnerId":""}}    
                },
                mounted() {
                (() =>{

        })()
(() =>{
            this.$vc.on('searchOwner','openSearchOwnerModel',(_param) =>{
                console.log("打开业主成员界面")
                $('#searchOwnerModel').modal('show');
                this._refreshSearchOwnerData();
                this._loadAllOwnerInfo(1,10);
            });
        })()   
                },
                methods: {
                    _loadAllOwnerInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page: _page,
                        row: _row,
                        isEnterprise: this.isTenant ? 1 : 0,
                        communityId: this.$vc.getCurrentCommunity().communityId,
                        enterpriseName: _name,
                        ownerId: this.searchOwnerInfo._currentOwnerId,
                        ownerTypeCd: this.isTenant ? OWNER_TYPE.TENANT : OWNER_TYPE.OWNER,
                    }
                };

                //发送get请求
               this.$vc.http.get('searchOwner',
                            'listOwner',
                             param,
                             (json) =>{
                                var _ownerInfo = JSON.parse(json);
                                this.searchOwnerInfo.owners = _ownerInfo.owners;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseOwner:function(_owner){
                this.$vc.emit(this.$vc._thisemitChooseOwner,'chooseOwner',_owner);
                this.$vc.emit(this.$vc._thisemitLoadData,'listOwnerData',{
                    ownerId: _owner.ownerId,
                    memberId: _owner.memberId,
                });
                $('#searchOwnerModel').modal('hide');
            },searchOwners:function(){
                this._loadAllOwnerInfo(1,10,this.searchOwnerInfo._currentOwnerName);
            },_refreshSearchOwnerData:function(){
                this.searchOwnerInfo._currentOwnerName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    