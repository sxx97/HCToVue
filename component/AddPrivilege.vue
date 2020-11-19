
        <template>
            <div id = "addPrivilegeModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="addPrivilegeModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="addPrivilegeModalLabel">添加权限</h3>
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
                                            <input placeholder="输入权限名称" type="text" v-model = "addPrivilegeInfo._pName" class="form-control form-control-sm">
                                            <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" @click="listNoAddPrivilege()">查询</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive" style="margin-top:15px">
                                    <table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <th class="text-center">
                                                <input type="checkbox"  class="i-checks " @click="checkAll($event)" id="quan">
                                            </th>
                                            <!--<th>权限编码</th>-->
                                            <th>权限名称</th>
                                            <th>创建时间</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="noAddPrivilege in addPrivilegeInfo._noAddPrivilege">
                                                <td class="text-center">
                                                    <input type="checkbox" class="i-checks checkItem" v-bind:value="noAddPrivilege.pId" v-model="addPrivilegeInfo.selectPrivileges" >
                                                </td>
                                                <!--<td>{{noAddPrivilege.pId}}</td>-->
                                                <td>{{noAddPrivilege.name}}</td>
                                                <td>{{vc.dateFormat(noAddPrivilege.createTime)}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="ibox-content" v-if="addPrivilegeInfo._noAddPrivilege.length > 0">

                                        <button class="btn btn-primary float-right" type="button" v-on:click="addPrivilegeToPrivilegeGroup()"><i
                                                class="fa fa-check"></i>&nbsp;提交
                                        </button>
                                        <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                                                data-dismiss="modal">取消
                                        </button>
                                    </div>
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
                props: {},
                components: {
                    
                },
                data () {
                    return {"addPrivilegeInfo":{"_currentPgId":"","_pName":"","name":"","description":"","errorInfo":"","_noAddPrivilege":[],"selectPrivileges":[]}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
             this.$on('addPrivilege_openPrivilegeModel',(_params) =>{
                $('#addPrivilegeModel').modal('show');
                this.addPrivilegeInfo._currentPgId = _params.pgId;
                //查询没有添加的权限
                this.listNoAddPrivilege();
            });
        })()   
                },
                methods: {
                    listNoAddPrivilege:function(){
                this.addPrivilegeInfo._noAddPrivilege=[];
                var param = {
                    params:{
                        pgId:this.addPrivilegeInfo._currentPgId,
                        pName:this.addPrivilegeInfo._pName
                    }
                }
                this.$vc.http.get(
                            'addPrivilege',
                            'listNoAddPrivilege',
                             param,
                             (json,res) =>{
                                //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                                if(res.status == 200){
                                    this.addPrivilegeInfo._noAddPrivilege = JSON.parse(json);
                                    return ;
                                }
                                this.addPrivilegeInfo.errorInfo = json;
                             },
                             (errInfo,error) =>{
                                console.log('请求失败处理');

                                this.addPrivilegeInfo.errorInfo = errInfo;
                             });
            },addPrivilegeToPrivilegeGroup:function(){

                this.addPrivilegeInfo.errorInfo = "";
                var _selectPrivileges = this.addPrivilegeInfo.selectPrivileges;

                if(_selectPrivileges.length < 1){
                    this.$vc.toast("请先选择权限");
                    return ;
                }
                var _pIds = [];
                for(var selectIndex = 0;selectIndex < _selectPrivileges.length;selectIndex ++){
                    var _pId = {
                        pId: _selectPrivileges[selectIndex]
                    };
                    _pIds.push(_pId);
                }
                var _objData = {
                    pgId:this.addPrivilegeInfo._currentPgId,
                    pIds:_pIds
                };
                this.$vc.http.post(
                    'addPrivilege',
                    'addPrivilegeToPrivilegeGroup',
                    JSON.stringify(_objData),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            this.listNoAddPrivilege();
                            $('#addPrivilegeModel').modal('hide');
                            this.$emit('privilege_loadPrivilege',this.addPrivilegeInfo._currentPgId);
                            return ;
                        }
                        this.addPrivilegeInfo.errorInfo = json;
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.addPrivilegeInfo.errorInfo = errInfo;
                     });
            },checkAll:function(e){
                    var checkObj = document.querySelectorAll('.checkItem'); // 获取所有checkbox项
                    if(e.target.checked){ // 判定全选checkbox的勾选状态
                        for(var i=0;i<checkObj.length;i++){
                            if(!checkObj[i].checked){ // 将未勾选的checkbox选项push到绑定数组中
                                this.addPrivilegeInfo.selectPrivileges.push(checkObj[i].value);
                            }
                        }
                    }else { // 如果是去掉全选则清空checkbox选项绑定数组
                        this.addPrivilegeInfo.selectPrivileges = [];
                    }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    