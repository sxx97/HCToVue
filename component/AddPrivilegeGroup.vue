
        <template>
            <div id = "addPrivilegeGroupModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加权限组</h3>
                <div class="ibox-content">
                    <div>
                        <p style="color:red;">{{addPrivilegeGroupInfo.errorInfo}}</p>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">权限组名称</label>
                                <div class="col-sm-10"><input v-model="addPrivilegeGroupInfo.name" type="text" placeholder="必填，请填写" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">权限组描述</label>
                                <div class="col-sm-10"><input v-model="addPrivilegeGroupInfo.description" type="text" placeholder="必填，请填写" class="form-control"></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveAddPrivilegeGroup()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
                return {"addPrivilegeGroupInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$on('addPrivilegeGroup_openPrivilegeGroupModel',function(_params){
                $('#addPrivilegeGroupModel').modal('show');
            });
        })()   
            },
            methods: {
                addPrivilegeGroupValidate(){
                return this.$vc.validate.validate({
                    addPrivilegeGroupInfo:this.addPrivilegeGroupInfo
                },{
                    'addPrivilegeGroupInfo.name':[
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
                    'addPrivilegeGroupInfo.description':[
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
            },saveAddPrivilegeGroup:function(){
                if(!this.addPrivilegeGroupValidate()){
                    this.addPrivilegeGroupInfo.errorInfo = this.$vc.validate.errInfo;
                    return ;
                }
                this.addPrivilegeGroupInfo.errorInfo = "";
                this.$vc.http.post(
                    'addPrivilegeGroup',
                    'savePrivilegeGroupInfo',
                    JSON.stringify(this.addPrivilegeGroupInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addPrivilegeGroupModel').modal('hide');
                            this.clearAddPrivilegeGroupInfo();
                            this.$emit('privilegeGroup_loadPrivilegeGroup',{});
                            return ;
                        }
                        this.addPrivilegeGroupInfo.errorInfo = json;
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.addPrivilegeGroupInfo.errorInfo = errInfo;
                     });
            },clearAddPrivilegeGroupInfo:function(){
                this.addPrivilegeGroupInfo = {
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
    