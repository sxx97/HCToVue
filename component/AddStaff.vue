
        <template>
            <div id = "addStaffModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加员工</h3>
                <div class="ibox-content">
                    <div>
                        <p style="color:red;">{{addStaffInfo.errorInfo}}</p>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">员工名称</label>
                                <div class="col-sm-10"><input v-model="addStaffInfo.username" type="text" placeholder="必填，请填写员工名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">员工邮箱</label>
                                <div class="col-sm-10"><input v-model="addStaffInfo.email" type="email" placeholder="必填，请填写员工名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">手机号码</label>
                                <div class="col-sm-10"><input v-model="addStaffInfo.tel" type="tel" placeholder="必填，请填写手机号码" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">员工性别</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addStaffInfo.sex">
                                        <option selected value="">必填，请选择员工性别</option>
                                        <option value="0">男</option>
                                        <option value="1">女</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">家庭住址</label>
                                <div class="col-sm-10"><input v-model="addStaffInfo.address" type="text" placeholder="请填写家庭住址" class="form-control"></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveStaffInfo()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
                    return {"addStaffInfo":{"username":"","email":"","tel":"","sex":"","address":"","errorInfo":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{

        })()   
                },
                methods: {
                    addStaffValidate(){
                return this.$vc.validate.validate({
                    addStaffInfo:this.addStaffInfo
                },{
                    'addStaffInfo.username':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"用户名不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,10",
                            errInfo:"用户名长度必须在2位至10位"
                        },
                    ],
                    'addStaffInfo.email':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"密码不能为空"
                        },
                        {
                            limit:"email",
                            param:"",
                            errInfo:"不是有效的邮箱"
                        },
                    ],
                    'addStaffInfo.tel':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"手机号不能为空"
                        },
                        {
                            limit:"phone",
                            param:"",
                            errInfo:"不是有效的手机号"
                        }
                    ],
                    'addStaffInfo.sex':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"性别不能为空"
                        }
                    ],
                    'addStaffInfo.address':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"地址不能为空"
                        },
                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"地址长度不能超过200位"
                        },
                    ]

                });
            },saveStaffInfo:function(){
                if(!this.addStaffValidate()){
                    this.addStaffInfo.errorInfo = this.$vc.validate.errInfo;
                    return ;
                }

                this.addStaffInfo.errorInfo = "";
                this.$vc.http.post(
                    'addStaff',
                    'saveStaff',
                    JSON.stringify(this.addStaffInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addStaffModel').modal('hide');
                            this.clearAddStaffInfo();
                            this.$emit('addStaff_reload_event',{});
                            return ;
                        }
                        this.addStaffInfo.errorInfo = json;
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.addStaffInfo.errorInfo = errInfo;
                     });
            },clearAddStaffInfo:function(){
                this.addStaffInfo = {
                                            username:'',
                                            email:'',
                                            tel:'',
                                            sex:'',
                                            address:'',
                                            errorInfo:''
                                        };
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    