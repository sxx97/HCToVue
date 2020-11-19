
        <template>
            <div id="component">
    <div class="form-group row">
        <label class="col-sm-2 col-form-label">开放平台d</label>
        <div class="col-sm-10">
            <select class="form-control" v-model="config.vendor">
                <option value="" disabled>请选择</option>
                <option v-for="vendor in vendorList"
                        :value="vendor.val">{{vendor.name}}</option>
            </select>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-2 col-form-label">开放平台AppId</label>
        <div class="col-sm-10">
            <input v-model="config.appId" type="text" placeholder="必填，请填写订单类型编码" class="form-control">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-2 col-form-label">开放平台AppKey</label>
        <div class="col-sm-10">
            <input v-model="config.appKey" type="text" placeholder="必填，请填写订单类型编码" class="form-control">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-2 col-form-label">开放平台AppSecret</label>
        <div class="col-sm-10">
            <input v-model="config.appSecret" type="text" placeholder="必填，请填写订单类型编码" class="form-control">
        </div>
    </div>

    <div class="form-group row">
        <label class="col-sm-2 col-form-label">&nbsp;</label>
        <div class="col-sm-10">
            <button class="btn btn-primary"
                @click="saveConfig">保存</button>
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
                    return {"vendorList":[{"val":"DINGTALK","name":"钉钉"}],"isEdit":false,"config":{"vendor":"DINGTALK","appId":"","appKey":"","appSecret":"","regionId":""}}    
                },
                mounted() {
                (() => {
            this.queryVendorConfig();
        })()
(() => {

        })()   
                },
                methods: {
                    verifyConfigParams() {
                return this.$vc.validate.validate({
                    configInfo: this.config
                }, {
                    'configInfo.vendor': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "请选择平台"
                        },
                    ],
                    'configInfo.appId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "appId不能为空"
                        }
                    ],
                    'configInfo.appKey': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "appKey不能为空"
                        }
                    ],
                    'configInfo.appSecret': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "appSecret不能为空"
                        }
                    ]
                });
            },queryVendorConfig() {
                this.$vc.http.get('vendorComponent', 'queryConfig',{
                    params: {
                        regionId: this.$vc.getCurrentCommunity().communityId,
                    }
                },
                (resText, res) => {
                    const data = res.body;
                    this.config = {
                        vendor: data.data.vendor,
                        appId: data.data.appId,
                        appKey: data.data.appKey,
                        appSecret: data.data.appSecret,
                        regionId: this.$vc.getCurrentCommunity().communityId,
                    }
                    this.isEdit = true;
                },
                (errText, err) => {

                })
            },saveConfig() {
                let params = {};
                for (let key in this.config) {
                    params[key] = this.config[key];
                }
                if (this.isEdit) {
                    delete params.regionId;
                }
                if (!this.verifyConfigParams()) {
                    this.$vc.toast(this.$vc.validate.errInfo)
                    return ;
                }
                this.$vc.http.post('vendorComponent', this.isEdit ? 'edit' : 'create',
                    JSON.stringify(params),
                    {
                        emulateJSON: true
                    },
                    (resText, res) => {
                        this.$vc.toast(res.body.code === 0 ? '设置成功' : res.body.msg);
                    },
                    (errText, err) => {

                    }
                )
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    