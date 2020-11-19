
        <template>
            <div id = "addStaffPrivilegeModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="addPrivilegeModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link" v-bind:class="{active:addStaffPrivilegeInfo._currentTab == 1}" v-on:click="changeTab(1)">权限组</a>
                                </li>
                                <li class="nav-item" >
                                    <a class="nav-link" v-bind:class="{active:addStaffPrivilegeInfo._currentTab == 2}" v-on:click="changeTab(2)">权限</a>
                                </li>
                            </ul>
                                <div class="table-responsive"
                                     style="margin-top:15px">
                                    <table class="table table-striped" v-if="addStaffPrivilegeInfo._currentTab == 1">
                                        <thead>
                                        <tr>
                                            <th class="text-center">
                                                <input type="checkbox"  class="i-checks" v-bind:checked="addStaffPrivilegeInfo.quanGroup == true" @click="checkAllGroup($event)" >
                                            </th>
                                            <th>权限组编码</th>
                                            <th>权限组名称</th>
                                            <th>权限组描述</th>
                                            <th>创建时间</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="privilegeGroup in addStaffPrivilegeInfo._noAddPrivilegeGroup">
                                                <td class="text-center">
                                                    <input type="checkbox" class="i-checks checkGroupItem" v-bind:value="privilegeGroup.pgId" v-model="addStaffPrivilegeInfo.selectPrivilegeGroups" >
                                                </td>
                                                <td>{{privilegeGroup.pgId}}</td>
                                                <td>{{privilegeGroup.name}}</td>
                                                <td>{{privilegeGroup.description}}</td>
                                                <td>{{vc.dateFormat(privilegeGroup.createTime)}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="table table-striped" v-if="addStaffPrivilegeInfo._currentTab == 2">
                                        <thead>
                                        <tr>
                                            <th class="text-center">
                                                <input type="checkbox"  class="i-checks " v-bind:checked="addStaffPrivilegeInfo.quan == true" @click="checkAll($event)">
                                            </th>
                                            <!--<th>权限编码</th>-->
                                            <th>权限名称</th>
                                            <th>权限描述</th>
                                            <th>创建时间</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="privilege in addStaffPrivilegeInfo._noAddPrivilege">
                                            <td class="text-center">
                                                <input type="checkbox" class="i-checks checkItem" v-bind:value="privilege.pId" v-model="addStaffPrivilegeInfo.selectPrivileges" >
                                            </td>
                                            <!--<td>{{privilege.pId}}</td>-->
                                            <td>{{privilege.name}}</td>
                                            <td>{{privilege.description}}</td>
                                            <td>{{vc.dateFormat(privilege.createTime)}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" v-on:click="addStaffPrivilege()">提交</button>
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
                props: {},
                components: {
                    
                },
                data () {
                    return {"addStaffPrivilegeInfo":{"_currentUserId":"","name":"","description":"","errorInfo":"","_noAddPrivilege":[],"_noAddPrivilegeGroup":[],"_currentTab":1,"selectPrivileges":[],"selectPrivilegeGroups":[],"quanGroup":false,"quan":false}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
             this.$vc.on('addStaffPrivilege','addStaffPrivilegeModel',(_params) =>{
                $('#addStaffPrivilegeModel').modal('show');
                this._refreshData(_params);
            });
        })()   
                },
                methods: {
                    _refreshData:function(_params){
                this.addStaffPrivilegeInfo._currentUserId = _params.userId;
                this.addStaffPrivilegeInfo._currentTab = 1;
                this.listNoAddPrivilegeGroup();
            },changeTab:function(_tempTab){
                this.addStaffPrivilegeInfo._currentTab= _tempTab;
                if(_tempTab == 2){
                    this.listNoAddPrivilege();
                    return ;
                }
                this.listNoAddPrivilegeGroup();
            },listNoAddPrivilegeGroup:function(){
                this.addStaffPrivilegeInfo._noAddPrivilegeGroup = [];
                var param = {
                    params:{
                        userId:this.addStaffPrivilegeInfo._currentUserId
                    }
                };
                this.$vc.http.get(
                    'addStaffPrivilege',
                    'listNoAddPrivilegeGroup',
                     param,
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            this.addStaffPrivilegeInfo._noAddPrivilegeGroup = JSON.parse(json);
                            return ;
                        }
                        this.addStaffPrivilegeInfo.errorInfo = json;
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.addStaffPrivilegeInfo.errorInfo = errInfo;
                });

            },listNoAddPrivilege:function(){
                this.addStaffPrivilegeInfo._noAddPrivilege=[];
                var param = {
                    params:{
                        userId:this.addStaffPrivilegeInfo._currentUserId
                    }
                }
                this.$vc.http.get(
                            'addStaffPrivilege',
                            'listNoAddPrivilege',
                             param,
                             (json,res) =>{
                                //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                                if(res.status == 200){
                                    this.addStaffPrivilegeInfo._noAddPrivilege = JSON.parse(json);
                                    return ;
                                }
                                this.addStaffPrivilegeInfo.errorInfo = json;
                             },
                             (errInfo,error) =>{
                                console.log('请求失败处理');

                                this.addStaffPrivilegeInfo.errorInfo = errInfo;
                             });
            },addStaffPrivilege:function(){
                this.addStaffPrivilegeInfo.errorInfo = "";
                var _pIds = [];
                var _selectPrivilegeGroups = this.addStaffPrivilegeInfo.selectPrivilegeGroups;
                var _selectPrivileges = this.addStaffPrivilegeInfo.selectPrivileges;
                if(this.addStaffPrivilegeInfo._currentTab == 1){
                    for(var _pIndex = 0;_pIndex < _selectPrivilegeGroups.length;_pIndex++){
                        var _pgId = {
                            pId: _selectPrivilegeGroups[_pIndex]
                        }
                        _pIds.push(_pgId);
                    }
                }else{
                    for(var _pIndex = 0;_pIndex < _selectPrivileges.length;_pIndex++){
                        var _pId = {
                            pId: _selectPrivileges[_pIndex]
                        }
                        _pIds.push(_pId);
                    }
                }
                if(_pIds.length < 1){
                    this.$vc.toast('未选择相应权限或权限组');
                    return ;
                }
                var param = {
                    userId:this.addStaffPrivilegeInfo._currentUserId,
                    pIds:_pIds,
                    pFlag:this.addStaffPrivilegeInfo._currentTab
                };
                this.$vc.http.post(
                    'addStaffPrivilege',
                    'addStaffPrivilegeOrPrivilegeGroup',
                    JSON.stringify(param),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addStaffPrivilegeModel').modal('hide');
                            this.$vc.emit('staffPrivilege','_loadStaffPrivileges',{
                                staffId:this.addStaffPrivilegeInfo._currentUserId
                            });
                            return ;
                        }
                        this.addStaffPrivilegeInfo.errorInfo = json;
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.addStaffPrivilegeInfo.errorInfo = errInfo;
                     });
            },checkAll:function(e){
                    var checkObj = document.querySelectorAll('.checkItem'); // 获取所有checkbox项
                    if(e.target.checked){ // 判定全选checkbox的勾选状态
                        for(var i=0;i<checkObj.length;i++){
                            if(!checkObj[i].checked){ // 将未勾选的checkbox选项push到绑定数组中
                                this.addStaffPrivilegeInfo.selectPrivileges.push(checkObj[i].value);
                            }
                        }
                    }else { // 如果是去掉全选则清空checkbox选项绑定数组
                        this.addStaffPrivilegeInfo.selectPrivileges = [];
                    }
            },checkAllGroup:function(e){
                     var checkObj = document.querySelectorAll('.checkGroupItem'); // 获取所有checkbox项
                     if(e.target.checked){ // 判定全选checkbox的勾选状态
                         for(var i=0;i<checkObj.length;i++){
                             if(!checkObj[i].checked){ // 将未勾选的checkbox选项push到绑定数组中
                                 this.addStaffPrivilegeInfo.selectPrivilegeGroups.push(checkObj[i].value);
                             }
                         }
                     }else { // 如果是去掉全选则清空checkbox选项绑定数组
                         this.addStaffPrivilegeInfo.selectPrivilegeGroups = [];
                     }
             },
                },
            }
    
        </script>
        <style>
            
        </style>
    