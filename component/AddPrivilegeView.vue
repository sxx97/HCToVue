
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>菜单权限</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">

                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">权限名称</label>
                    <div class="col-sm-10">
                        <input v-model="addPrivilegeViewInfo.name" readonly type="text" placeholder="必填，请填写权限名称"
                               class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">资源路径</label>
                    <div class="col-sm-10">
                        <input v-model="addPrivilegeViewInfo.resource" type="text" placeholder="必填，请填写资源路径"
                               class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">商户类型</label>
                    <div class="col-sm-10">
                        <select class="custom-select" v-model="addPrivilegeViewInfo.domain">
                            <option selected disabled value="">必填，请选择商户类型</option>
                            <option value="800900000001">运营团队</option>
                            <option value="800900000002">代理商</option>
                            <option value="800900000003">物业</option>
                            <option value="800900000000">开发团队</option>
                        </select></div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">描述</label>
                    <div class="col-sm-10">
                        <textarea placeholder="选填，请填写描述" readonly class="form-control"
                                  v-model="addPrivilegeViewInfo.description"></textarea></div>
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
                props: {"callBackListener":"false","callBackFunction":"false"},
                components: {
                    
                },
                data () {
                    return {"addPrivilegeViewInfo":{"flowComponent":"addPrivilegeView","name":"","resource":"","domain":"","description":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{

            this.$vc.on('addPrivilegeViewInfo','syncData',(_obj) =>{
                this.$vc.copyObject(_obj,this.addPrivilegeViewInfo);
                //从url中获取 资源路径 /flow/abc
                if(_obj.hasOwnProperty("url") && this.$vc.notNull(_obj.url)){
                    this.addPrivilegeViewInfo.resource = (_obj.url.indexOf("/flow") == 0 && _obj.url.length > 5) ? _obj.url.substring(5):_obj.url;
                }
            });

            this.$vc.on('addPrivilegeViewInfo', 'onIndex', (_index) =>{
                this.addPrivilegeViewInfo.index = _index;
            });
        })()   
                },
                methods: {
                    addPrivilegeValidate(){
                return this.$vc.validate.validate({
                    addPrivilegeViewInfo:this.addPrivilegeViewInfo
                },{
                    'addPrivilegeViewInfo.name':[
{
                            limit:"required",
                            param:"",
                            errInfo:"权限名称不能为空"
                        },
 {
                            limit:"maxin",
                            param:"2,10",
                            errInfo:"权限名称必须在2至10字符之间"
                        },
                    ],
'addPrivilegeViewInfo.domain':[
{
                            limit:"required",
                            param:"",
                            errInfo:"商户类型不能为空"
                        },
 {
                            limit:"maxin",
                            param:"1,12",
                            errInfo:"商户类型错误"
                        },
                    ],
'addPrivilegeViewInfo.description':[
 {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注内容不能超过200"
                        },
                    ],

                });
            },saveAddPrivilegeInfo:function(){
                if(this.addPrivilegeValidate()){
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction, this.addPrivilegeViewInfo);
                    return ;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    