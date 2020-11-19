
        <template>
            <div id = "chooseMenuGroupModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseMenuGroupModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseMenuGroupModelLabel">选择菜单组</h3>
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
                                        <input placeholder="输入菜单组名称" type="text" v-model="chooseMenuGroupInfo._currentMenuGroupName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryMenuGroups()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">组Id</th>
                            <th class="text-center">组名称</th>
                            <th class="text-center">icon</th>
                            <th class="text-center">标签</th>
                            <th class="text-center">序列</th>
                            <th class="text-center">描述</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="menuGroup in chooseMenuGroupInfo.menuGroups">
                                                                        <td class="text-center">{{menuGroup.gId}}</td>
                            <td class="text-center">{{menuGroup.name}}</td>
                            <td class="text-center">{{menuGroup.icon}}</td>
                            <td class="text-center">{{menuGroup.label}}</td>
                            <td class="text-center">{{menuGroup.seq}}</td>
                            <td class="text-center">{{menuGroup.description}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseMenuGroup(menuGroup)">选择</button>
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
                props: {"emitChooseMenuGroup":"true","emitLoadData":"true"},
                components: {
                    
                },
                data () {
                    return {"chooseMenuGroupInfo":{"menuGroups":[],"_currentMenuGroupName":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseMenuGroup','openChooseMenuGroupModel',(_param) =>{
                $('#chooseMenuGroupModel').modal('show');
                this._refreshChooseMenuGroupInfo();
                this._loadAllMenuGroupInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllMenuGroupInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseMenuGroup',
                            'list',
                             param,
                             (json) =>{
                                var _menuGroupInfo = JSON.parse(json);
                                this.chooseMenuGroupInfo.menuGroups = _menuGroupInfo.menuGroups;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseMenuGroup:function(_menuGroup){
                if(_menuGroup.hasOwnProperty('name')){
                     _menuGroup.menuGroupName = _menuGroup.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseMenuGroup,'chooseMenuGroup',_menuGroup);
                this.$vc.emit(this.$vc._thisemitLoadData,'listMenuGroupData',{
                    menuGroupId:_menuGroup.menuGroupId
                });
                $('#chooseMenuGroupModel').modal('hide');
            },queryMenuGroups:function(){
                this._loadAllMenuGroupInfo(1,10,this.chooseMenuGroupInfo._currentMenuGroupName);
            },_refreshChooseMenuGroupInfo:function(){
                this.chooseMenuGroupInfo._currentMenuGroupName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    