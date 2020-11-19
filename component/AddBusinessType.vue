
        <template>
            <div id = "addOwnerModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加订单类型</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">订单类型编码</label>
                                <div class="col-sm-10"><input v-model="addOwnerInfo.name" type="text" placeholder="必填，请填写订单类型编码" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">订单类型名称</label>
                                <div class="col-sm-10">
                                       <input v-model="addOwnerInfo.name" type="text" placeholder="必填，请填写订单类型名称" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">年龄</label>
                                <div class="col-sm-10"><input v-model="addOwnerInfo.age" type="number" placeholder="必填，请填写年龄" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">手机</label>
                                <div class="col-sm-10"><input v-model="addOwnerInfo.link" type="number" placeholder="必填，请填写联系方式" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><input v-model="addOwnerInfo.remark" type="tel" placeholder="可填，请填写备注" class="form-control"></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveOwnerInfo()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
                props: {"notifyLoadDataComponentName":"true"},
                components: {
                    
                },
                data () {
                    return {"addOwnerInfo":{"name":"","age":"","link":"","sex":"","remark":"","ownerId":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
            this.$vc.on('addOwner','openAddOwnerModal',(_ownerId) =>{
                if(_ownerId != null || _ownerId != -1){
                    this.addOwnerInfo.ownerId = _ownerId;
                }
                $('#addOwnerModel').modal('show');
            });
        })()   
                },
                methods: {
                    addOwnerValidate(){
                return this.$vc.validate.validate({
                    addOwnerInfo:this.addOwnerInfo
                },{
                    'addOwnerInfo.name':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"名称不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,10",
                            errInfo:"名称长度必须在2位至10位"
                        },
                    ],
                    'addOwnerInfo.age':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"年龄不能为空"
                        },
                        {
                            limit:"num",
                            param:"",
                            errInfo:"年龄不是有效的数字"
                        },
                    ],
                    'addOwnerInfo.sex':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"性别不能为空"
                        }
                    ],
                    'addOwnerInfo.link':[
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
                    'addOwnerInfo.remark':[

                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注长度不能超过200位"
                        }
                    ]

                });
            },saveOwnerInfo:function(){
                if(!this.addOwnerValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }

                this.addOwnerInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'addOwner',
                    'saveOwner',
                    JSON.stringify(this.addOwnerInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addOwnerModel').modal('hide');
                            this.clearAddOwnerInfo();
                            this.$vc.emit(this.$vc._thisnotifyLoadDataComponentName,'listOwnerData',{});

                            return ;
                        }
                        this.$vc.message(json);

                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                     });
            },clearAddOwnerInfo:function(){
                this.addOwnerInfo = {
                                            name:'',
                                            age:'',
                                            link:'',
                                            sex:'',
                                            remark:''
                                        };
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    