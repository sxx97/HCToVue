
        <template>
            <div id="addBasePrivilegeModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加权限</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <!--<div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼名称</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.name" type="text" placeholder="必填，请填写名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼编号</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.floorNum" type="email" placeholder="必填，请填写编号" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.remark" type="tel" placeholder="可填，请填写备注" class="form-control"></div>
                            </div>-->

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">权限名称</label>
                                <div class="col-sm-10">
                                    <input v-model="addBasePrivilegeInfo.name" type="text" placeholder="必填，请填写权限名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">资源路径</label>
                                <div class="col-sm-10">
                                    <input v-model="addBasePrivilegeInfo.resource" type="text" placeholder="必填，请填写资源路径"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">商户类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addBasePrivilegeInfo.domain">
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
                                    <textarea placeholder="选填，请填写描述" class="form-control"
                                              v-model="addBasePrivilegeInfo.description"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveBasePrivilegeInfo()"><i class="fa fa-check"></i>&nbsp;保存
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
                props: {"callBackListener":"true","callBackFunction":"true"},
                components: {
                    
                },
                data () {
                    return {"addBasePrivilegeInfo":{"pId":"","name":"","resource":"","domain":"","description":""}}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('addBasePrivilege', 'openAddBasePrivilegeModal',  () => {
                $('#addBasePrivilegeModel').modal('show');
            });
        })()   
                },
                methods: {
                    addBasePrivilegeValidate() {
                return this.$vc.validate.validate({
                    addBasePrivilegeInfo: this.addBasePrivilegeInfo
                }, {
                    'addBasePrivilegeInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "权限名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,10",
                            errInfo: "权限名称必须在2至10字符之间"
                        },
                    ],
                    'addBasePrivilegeInfo.resource': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "资源路径不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,200",
                            errInfo: "资源路径必须在1至200字符之间"
                        },
                    ],
                    'addBasePrivilegeInfo.domain': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "商户类型不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,12",
                            errInfo: "商户类型错误"
                        },
                    ],
                    'addBasePrivilegeInfo.description': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "备注内容不能超过200"
                        },
                    ],


                });
            },saveBasePrivilegeInfo:function () {
                if (!this.addBasePrivilegeValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                this.addBasePrivilegeInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addBasePrivilegeInfo);
                    $('#addBasePrivilegeModel').modal('hide');
                    return;
                }

                this.$vc.http.post(
                    'addBasePrivilege',
                    'save',
                    JSON.stringify(this.addBasePrivilegeInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#addBasePrivilegeModel').modal('hide');
                            this.clearAddBasePrivilegeInfo();
                            this.$vc.emit('basePrivilegeManage', 'listBasePrivilege', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearAddBasePrivilegeInfo:function () {
                this.addBasePrivilegeInfo = {
                    name: '',
                    domain: '',
                    description: '',

                };
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    