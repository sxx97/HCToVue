
        <template>
            <div id = "editPrivilegeGroupModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">编辑权限组</h3>
                <div class="ibox-content">
                    <div>
                        <p style="color:red;">{{editPrivilegeGroupInfo.errorInfo}}</p>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">权限组名称</label>
                                <div class="col-sm-10"><input v-model="editPrivilegeGroupInfo.name" type="text" placeholder="必填，请填写员工名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">权限组描述</label>
                                <div class="col-sm-10"><input v-model="editPrivilegeGroupInfo.description" type="text" placeholder="必填，请填写员工名称" class="form-control"></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveEditPrivilegeGroup()" ><i class="fa fa-check"></i>&nbsp;保存</button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;" data-dismiss="modal">取消</button>
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"editPrivilegeGroupInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('editPrivilegeGroup','openPrivilegeGroupModel',function(_params){
                this.$vc.copyObject(_params,this.editPrivilegeGroupInfo)
                $('#editPrivilegeGroupModel').modal('show');
            });
        })()   
            },
            methods: {
                editPrivilegeGroupValidate(){
                return this.$vc.validate.validate({
                    editPrivilegeGroupInfo:this.editPrivilegeGroupInfo
                },{
                    'editPrivilegeGroupInfo.pgId':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"权限组ID不能为空"
                        }

                    ],
                    'editPrivilegeGroupInfo.name':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"权限组名不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,10",
                            errInfo:"权限组名长度必须在2位至10位"
                        },
                    ],
                    'editPrivilegeGroupInfo.description':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"权限组描述不能为空"
                        },
                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"权限组描述长度不能超过200位"
                        },
                    ]

                });
            },saveEditPrivilegeGroup:function(){
                if(!this.editPrivilegeGroupValidate()){
                    this.editPrivilegeGroupInfo.errorInfo = this.$vc.validate.errInfo;
                    return ;
                }
                this.editPrivilegeGroupInfo.errorInfo = "";
                this.$vc.http.post(
                    'editPrivilegeGroup',
                    'editPrivilegeGroupInfo',
                    JSON.stringify(this.editPrivilegeGroupInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#editPrivilegeGroupModel').modal('hide');
                            this.clearEditPrivilegeGroupInfo();
                            this.$emit('privilegeGroup_loadPrivilegeGroup',{});
                            return ;
                        }
                        this.editPrivilegeGroupInfo.errorInfo = json;
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.editPrivilegeGroupInfo.errorInfo = errInfo;
                     });
            },clearEditPrivilegeGroupInfo:function(){
                this.editPrivilegeGroupInfo = {
                    pgId:'',
                    name:'',
                    description:'',
                    errorInfo:''
                };
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    