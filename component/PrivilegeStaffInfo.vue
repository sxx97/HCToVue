
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>员工信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="openSearchStaffModel()">
                        <i class="glyphicon glyphicon-search"></i> 定位员工</button>
                    <button type="button" class="btn btn-primary btn-sm"
                            v-if="privilegeStaffInfo.userId != null && privilegeStaffInfo.userId != ''"
                            style="margin-left:10px" v-on:click="openAddStaffPrivilegeModel()">
                        <i class="glyphicon glyphicon-plus" ></i> 添加权限</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <!--<div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label" >员工ID：</label>
                            <label class="">{{privilegeStaffInfo.userId}}</label>
                        </div>
                    </div>-->
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label">员工名称：</label>
                            <label class="">{{privilegeStaffInfo.name}}</label>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label" >手机号：</label>
                            <label class="">{{privilegeStaffInfo.tel}}</label>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label" >邮箱：</label>
                            <label class="">{{privilegeStaffInfo.email}}</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label" >性别：</label>
                            <label class="">{{privilegeStaffInfo.sex == 0 ? '男' : (privilegeStaffInfo.sex == 1 ?'女':'')}}</label>
                        </div>
                    </div>
                    <div class="col-sm-9">
                        <div class="form-group">
                            <label class="col-form-label">地址：</label>
                            <label class="">{{privilegeStaffInfo.address}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <SearchStaff name="searchStaff"></SearchStaff>
    <AddStaffPrivilege name="addStaffPrivilege"></AddStaffPrivilege>
</div>
        </template>
        <script>
            import SearchStaff from './SearchStaff.vue';import AddStaffPrivilege from './AddStaffPrivilege.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"privilegeStaffInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

        })()(function(){
            this.$vc.on('privilegeStaffInfo','chooseStaff',function(_staff){
                this.privilegeStaffInfo = _staff;
            })

        })()   
            },
            methods: {
                loadStaffInfo:function(_name){

            },openSearchStaffModel(){
                this.$vc.emit('searchStaff','openSearchStaffModel',{});
            },openAddStaffPrivilegeModel(){
                console.log("点击openAddStaffPrivilegeModel")
                this.$vc.emit('addStaffPrivilege','addStaffPrivilegeModel',{
                    userId:this.privilegeStaffInfo.userId
                });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    