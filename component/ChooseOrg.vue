
        <template>
            <div id="chooseOrgModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseOrgModelLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseOrgModelLabel">选择组织</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
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
                                        <input placeholder="输入组织名称" type="text" v-model="chooseOrgInfo._currentOrgName"
                                               class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary"
                                                        v-on:click="queryOrgs()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <!--<th class="text-center">组织ID</th>-->
                                        <th class="text-center">组织名称</th>
                                        <th class="text-center">组织级别</th>
                                        <th class="text-center">上级ID</th>
                                        <th class="text-center">操作</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="org in chooseOrgInfo.orgs">
                                        <!--<td class="text-center">{{org.orgId}}</td>-->
                                        <td class="text-center">{{org.orgName}}</td>
                                        <td class="text-center">{{org.orgLevelName}}</td>
                                        <td class="text-center">{{org.parentOrgName}}</td>

                                        <td>
                                            <button class="btn btn-primary btn-xs" v-on:click="chooseOrg(org)">选择
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
                props: {"emitChooseOrg":"true","emitLoadData":"true"},
                components: {
                    
                },
                data () {
                    return {"chooseOrgInfo":{"orgs":[],"_currentOrgName":"","orgLevel":"","parentOrgId":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseOrg','openChooseOrgModel',(_param) =>{
                $('#chooseOrgModel').modal('show');
                this.$vc.copyObject(_param,this.chooseOrgInfo);
                this._refreshChooseOrgInfo();
                this._loadAllOrgInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllOrgInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name,
                        orgLevel:this.chooseOrgInfo.orgLevel,
                        parentOrgId:this.chooseOrgInfo.parentOrgId,
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseOrg',
                            'list',
                             param,
                             (json) =>{
                                var _orgInfo = JSON.parse(json);
                                this.chooseOrgInfo.orgs = _orgInfo.orgs;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseOrg:function(_org){
                if(_org.hasOwnProperty('name')){
                     _org.orgName = _org.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseOrg,'chooseOrg',_org);
                this.$vc.emit(this.$vc._thisemitLoadData,'listOrgData',{
                    orgId:_org.orgId
                });
                $('#chooseOrgModel').modal('hide');
            },queryOrgs:function(){
                this._loadAllOrgInfo(1,10,this.chooseOrgInfo._currentOrgName);
            },_refreshChooseOrgInfo:function(){
                this.chooseOrgInfo._currentOrgName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    