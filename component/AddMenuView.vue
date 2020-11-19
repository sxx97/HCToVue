
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>配置菜单</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">

                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">菜单名称</label>
                    <div class="col-sm-10">
                        <input v-model="addMenuViewInfo.name" type="text" placeholder="必填，请填写菜单名称" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">菜单地址</label>
                    <div class="col-sm-10">
                        <input v-model="addMenuViewInfo.url" type="text" placeholder="必填，请填写菜单地址" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">序列</label>
                    <div class="col-sm-10">
                        <input v-model="addMenuViewInfo.seq" type="text" placeholder="必填，请填写序列" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">菜单显示</label>
                    <div class="col-sm-10">
                        <select class="custom-select" v-model="addMenuViewInfo.isShow">
                            <option selected disabled value="">必填，请选择菜单显示</option>
                            <option value="Y">显示菜单</option>
                            <option value="N">不显示菜单</option>
                        </select></div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">描述</label>
                    <div class="col-sm-10">
                        <textarea placeholder="选填，请填写描述" class="form-control"
                                  v-model="addMenuViewInfo.description"></textarea></div>
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
                    return {"addMenuViewInfo":{"flowComponent":"addMenuView","name":"","url":"","seq":"","isShow":"","description":""}}    
                },
                mounted() {
                ( () => {

        })()
( () => {

            this.$vc.on('addMenuViewInfo', 'onIndex',  (_index) => {
                this.addMenuViewInfo.index = _index;
            });
        })()   
                },
                methods: {
                    addMenuValidate() {
                return this.$vc.validate.validate({
                    addMenuViewInfo: this.addMenuViewInfo
                }, {
                    'addMenuViewInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "菜单名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,10",
                            errInfo: "菜单名称必须在2至10字符之间"
                        },
                    ],
                    'addMenuViewInfo.url': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "菜单地址不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "菜单地址不能超过200"
                        },
                    ],
                    'addMenuViewInfo.seq': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "序列不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "序列必须为整数"
                        },
                    ],
                    'addMenuViewInfo.isShow': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "菜单显示不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,12",
                            errInfo: "菜单显示错误"
                        },
                    ],
                    'addMenuViewInfo.description': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "备注内容不能超过200"
                        },
                    ],

                });
            },saveAddMenuInfo:function () {
                if (this.addMenuValidate()) {

                    this.$vc.emit('addPrivilegeViewInfo', 'syncData', {
                        name: this.addMenuViewInfo.name,
                        description: this.addMenuViewInfo.description,
                        url: this.addMenuViewInfo.url
                    });
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addMenuViewInfo);
                    return;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    