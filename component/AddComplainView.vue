
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>登记投诉建议</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">

                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">投诉类型</label>
                    <div class="col-sm-10">
                        <select class="custom-select" v-model="addComplainViewInfo.typeCd">
                            <option selected disabled value="">必填，请选择投诉类型</option>
                            <option value="809001">投诉</option>
                            <option value="809002">建议</option>
                        </select></div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">投诉人</label>
                    <div class="col-sm-10">
                        <input v-model="addComplainViewInfo.complaintName" type="text" placeholder="必填，请填写投诉人"
                               class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">投诉电话</label>
                    <div class="col-sm-10">
                        <input v-model="addComplainViewInfo.tel" type="text" placeholder="必填，请填写投诉电话"
                               class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">投诉内容</label>
                    <div class="col-sm-10">
                        <textarea placeholder="必填，请填写投诉内容" class="form-control"
                                  v-model="addComplainViewInfo.context"></textarea></div>
                </div>

            </div>
        </div>
    </div>
</div>

        </template>
        <script>
            
        export default {
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"addComplainViewInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {

            this.$vc.on('addComplainViewInfo', 'onIndex', function (_index) {
                this.addComplainViewInfo.index = _index;
            });
        })()   
            },
            methods: {
                addComplainValidate:function () {
                return this.$vc.validate.validate({
                    addComplainViewInfo: this.addComplainViewInfo
                }, {
                    'addComplainViewInfo.typeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "投诉类型不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "投诉类型格式错误"
                        },
                    ],
                    'addComplainViewInfo.complaintName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "投诉人不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "投诉人不能大于200位"
                        },
                    ],
                    'addComplainViewInfo.tel': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "投诉电话不能为空"
                        },
                        {
                            limit: "phone",
                            param: "",
                            errInfo: "投诉电话格式错误"
                        },
                    ],
                    'addComplainViewInfo.context': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "投诉内容不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "4000",
                            errInfo: "投诉状态超过4000位"
                        },
                    ],

                });
            },saveAddComplainInfo:function () {
                if (this.addComplainValidate()) {
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addComplainViewInfo);
                    return;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    