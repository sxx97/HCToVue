
        <template>
            <div id = "searchStaffModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchStaffModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="searchStaffModelLabel">定位员工</h3>
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
                                        <input placeholder="输入员工名称" type="text" v-model="searchStaffInfo._currentStaffName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="searchStaffs()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>员工编码</th>
                                        <th>员工名称</th>
                                        <th>手机号</th>
                                        <th>性别</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="staff in searchStaffInfo.staffs">
                                        <td>{{staff.userId}}</td>
                                        <td>{{staff.name}}</td>
                                        <td>{{staff.tel}}</td>
                                        <td>{{staff.sex == 0 ? '男' : (staff.sex == 1 ?'女':'')}}</td>
                                        <td>
                                            <button class="btn btn-primary btn-xs" v-on:click="chooseStaff(staff)">选择</button>
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
                props: {"callBackListener":"privilegeStaffInfo","callBackFunction":"chooseStaff"},
                components: {
                    
                },
                data () {
                    return {"searchStaffInfo":{"staffs":[],"_currentStaffName":"","orgId":""}}    
                },
                mounted() {
                (() =>{

        })()
(() =>{
            this.$vc.on('searchStaff','openSearchStaffModel',(_param) =>{
                console.log("打开定位员工界面")
                $('#searchStaffModel').modal('show');
                this._refreshSearchStaffData();
                if(_param.hasOwnProperty('orgId')){
                    this.searchStaffInfo.orgId = _param.orgId;
                }
                this._loadAllStaffInfo(1,10);
            });
        })()   
                },
                methods: {
                    _loadAllStaffInfo:function(_page,_rows,_staffName){
                var param = {
                    params:{
                        page:_page,
                        row:_rows,
                        staffName:_staffName,
                        orgId:this.searchStaffInfo.orgId
                    }
                };

                //发送get请求
               this.$vc.http.get('searchStaff',
                            'listStaff',
                             param,
                             (json) =>{
                                var _staffInfo = JSON.parse(json);
                                this.searchStaffInfo.staffs = _staffInfo.staffs;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseStaff:function(_staff){
                //this.$vc.emit('privilegeStaffInfo','chooseStaff',_staff);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,_staff);

                this.$vc.emit('staffPrivilege','_loadStaffPrivileges',{
                    staffId:_staff.userId
                });
                $('#searchStaffModel').modal('hide');
            },searchStaffs:function(){
                this._loadAllStaffInfo(1,10,this.searchStaffInfo._currentStaffName);
            },_refreshSearchStaffData:function(){
                this.searchStaffInfo._currentStaffName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    