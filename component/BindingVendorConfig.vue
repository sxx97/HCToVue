
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"vendorList":"[object Object]","isEdit":"false","config":"[object Object]"}    
            },
            mounted() {
             (_initMethod() {
            this.queryVendorConfig();
        })()(_initEvent() {

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
    