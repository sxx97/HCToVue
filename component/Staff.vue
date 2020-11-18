
        <template>
            <div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{staffInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group ">
                                <select class="custom-select" v-model="staffInfo.conditions.branchOrgId">
                                    <option selected value="">必填，请选择分公司</option>
                                    <option v-for="branchOrg in staffInfo.branchOrgs" :value="branchOrg.orgId">
                                        {{branchOrg.orgName}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <select class="custom-select" v-model="staffInfo.conditions.departmentOrgId">
                                    <option selected value="">必填，请选择部门</option>
                                    <option v-for="departmentOrg in staffInfo.departmentOrgs"
                                            :value="departmentOrg.orgId">
                                        {{departmentOrg.orgName}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入员工名称" v-model="staffInfo.conditions.name"
                                       class=" form-control">
                            </div>
                        </div>

                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryStaffMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="staffInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="number" placeholder="请输入手机号" v-model="staffInfo.conditions.tel"
                                       class=" form-control">
                            </div>
                        </div>
                        <!--<div class="col-sm-4" v-if="staffInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="number" placeholder="请输入员工ID" v-model="staffInfo.conditions.staffId"
                                       class=" form-control">
                            </div>
                        </div>-->
                    </div>


                </div>
            </div>
        </div>
    </div>


    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>员工管理</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddStaffStepPage()">添加员工
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <!--<th>员工ID</th>-->
                            <th>名称</th>
                            <th>岗位</th>
                            <th>部门</th>
                            <th>邮箱</th>
                            <th>地址</th>
                            <th>性别</th>
                            <th>手机号</th>
                            <th>照片</th>
                            <th>RFID卡</th>
                            <th  class="text-right">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="gradeX" v-for="staff in staffData">
                            <!--<td>{{staff.userId}}</td>-->
                            <td>{{staff.name}}</td>
                            <td>{{staff.relCdStr}}</td>
                            <td>{{staff.orgName}}</td>
                            <td>{{staff.email}}</td>
                            <td>{{staff.address}}</td>
                            <td>{{staff.sex == 0 ? '男' : '女'}}</td>
                            <td>{{staff.tel}}</td>
                            <td>
                                <template v-if="staff.photo && staff.photo != ''">
                                    <img style="max-height:120px;border-radius:50%;" :src="staff.photo" alt="">
                                </template>
                                <template v-else>
                                    ---
                                </template>
                            </td>
                            <td>{{staff.rfidCard}}</td>
                            <td  class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="openEditStaff(staff)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_resetStaffPwd(staff)">重置密码
                                    </button>
                                </div>
                                <div v-if="staff.relCd != 600311000001" class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="openDeleteStaff(staff)">删除
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <!-- 分页 -->
                    <Pagination name="pagination"></Pagination>

                </div>
            </div>
        </div>
    </div>

    <ResetStaffPwd name="resetStaffPwd"></ResetStaffPwd>
</div>
        </template>
        <script>
            import Pagination from './Pagination.vue';import ResetStaffPwd from './ResetStaffPwd.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"staffInfo":"[object Object]","staffData":""}    
            },
            mounted() {
             (function(){
                this.loadData(1,10);
                this._getOrgsByOrgLevelStaff(DEFAULT_PAGE, DEFAULT_ROWS,2,'');

            })()(function(){
                 this.$on('pagination_page_event',function(_currentPage){
                        this.currentPage(_currentPage);
                    });
                 this.$on('addStaff_reload_event',function(){
                     this.loadData(1,10);
                 });
                 this.$on('editStaff_reload_event',function(){
                      this.loadData(1,10);
                  });
                  this.$on('deleteStaff_reload_event',function(){
                     this.loadData(1,10);
                  });


            })()   
            },
            methods: {
                loadData:function(_page,_rows){
                       this.staffInfo.conditions.page = _page;
                       this.staffInfo.conditions.rows = _rows;
                       this.staffInfo.conditions.row = _rows;
                       var param = {
                           params:this.staffInfo.conditions
                      };

                    //发送get请求
                   this.$vc.http.get('staff',
                                'loadData',
                                 param,
                                 function(json){
                                    var _staffInfo = JSON.parse(json);
                                    this.staffData = _staffInfo.staffs;
                                    this.$emit('pagination_info_event',{
                                        total:_staffInfo.records,
                                        currentPage:_page
                                    });

                                 },function(){
                                    console.log('请求失败处理');
                                 }
                               );

                },currentPage:function(_currentPage){
                    this.loadData(_currentPage,10);
                },openEditStaff:function(_staffInfo){
                     this.$emit('edit_staff_event',_staffInfo);
                },openDeleteStaff:function(_staffInfo){
                     this.$emit('delete_staff_event',_staffInfo);
                },_moreCondition:function(){
                    if(this.staffInfo.moreCondition){
                        this.staffInfo.moreCondition = false;
                    }else{
                        this.staffInfo.moreCondition = true;
                    }
                },_getOrgsByOrgLevelStaff:function(_page, _rows,_orgLevel,_parentOrgId){

                    var param = {
                        params:{
                            page: _page,
                            row: _rows,
                            orgLevel:_orgLevel,
                            parentOrgId: _parentOrgId
                        }
                     };

                   //发送get请求
                   this.$vc.http.get('staff',
                                'list',
                                 param,
                                 function(json,res){
                                    var _orgInfo=JSON.parse(json);
                                    if(_orgLevel == 2){
                                         this.staffInfo.branchOrgs = _orgInfo.orgs;
                                    }else{
                                         this.staffInfo.departmentOrgs = _orgInfo.orgs;
                                    }
                                 },function(errInfo,error){
                                    console.log('请求失败处理');
                                 }
                               );
                },_openAddStaffStepPage:function(){
                    this.$vc.jumpToPage("/flow/addStaffStepFlow")
                },_queryStaffMethod:function(){
                    this.loadData(DEFAULT_PAGE,DEFAULT_ROWS)
                },_resetStaffPwd:function(_staff){
                    this.$vc.emit('resetStaffPwd','openResetStaffPwd',_staff);
                },
            },
        }
    
        </script>
        <style>
            
        </style>
    