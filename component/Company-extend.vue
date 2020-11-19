
        <template>
            <fieldset role="tabpanel" aria-labelledby="component-h-0" class="body current" v-bind:class="{no_display:step!=2}" aria-hidden="false">
    <h2>公司扩展信息</h2>
    <div class="row">
        <div class="col-lg-8">
            <div class="form-group">
                <label>公司法人 </label> <span class="required">*</span>
                <input  v-model="companyExtendInfo.corporation" type="text" class="form-control required" aria-required="true" />
            </div>
            <div class="form-group">
                <label>注册资本(万元) </label> <span class="required">*</span>
                <input  v-model="companyExtendInfo.registeredCapital" type="text" class="form-control required" aria-required="true" />
            </div>
            <div class="form-group">
                <label>成立日期</label> <span class="required">*</span>
                <input v-model="companyExtendInfo.foundingTime" size="16" type="text" placeholder="请选择时间(yyyy-mm-dd) "  readonly class="form-control form-control-sm extend_time">
            </div>
            <div class="form-group">
                <label>登记机关 </label> <span class="required">*</span>
                <input  v-model="companyExtendInfo.registrationAuthority" type="text" placeholder="填写营业执照上的登记机关" class="form-control required" aria-required="true" />

            </div>
            <div class="form-group">
                <label>经营范围 </label> <span class="required">*</span>
                <textarea  v-model="companyExtendInfo.scope" rows="20" cols="180" class="form-control required" aria-required="true" />
            </div>
        </div>
        <div class="col-lg-4">
            <div class="text-center">
                <div style="margin-top: 20px;">
                    <i class="fa fa-sign-in" style="font-size: 180px; color: rgb(229, 229, 229);"></i>
                </div>
            </div>
        </div>
    </div>
</fieldset>
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
                    return {"storeTypes":[],"companyExtendInfo":{"corporation":"","registeredCapital":"","foundingTime":"","registrationAuthority":"","scope":""}}    
                },
                mounted() {
                ( () => {
            this._extendInitDate();
        })()
( () => {
//              this.$on('errorInfoEvent',(_errorInfo) =>{
//                     this.registerInfo.errorInfo = _errorInfo;
//                     console.log('errorInfoEvent 事件被监听',_errorInfo)
//                 });

        })()   
                },
                methods: {
                    validateExtend:function () {
                return this.$vc.validate.validate({
                    companyExtendInfo: this.companyExtendInfo
                }, {
                    'companyExtendInfo.corporation': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "法人不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "50",
                            errInfo: "法人长度必须在50位之内"
                        },
                    ],
                    'companyExtendInfo.registeredCapital': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "注册资本不能为空"
                        },
                        {
                            limit: "num",
                            param: "50",
                            errInfo: "注册资本必须是数字"
                        },
                    ],
                    'companyExtendInfo.foundingTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "成立时间不能为空"
                        },
                        {
                            limit: "date",
                            param: "",
                            errInfo: "不是有效的日期，例如：2019-03-29"
                        }
                    ],
                    'companyExtendInfo.registrationAuthority': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "登记机关不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "50",
                            errInfo: "登记机关长度必须在50位之内"
                        }
                    ],
                    'companyExtendInfo.scope': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "经营范围不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "50",
                            errInfo: "经营范围长度必须在50位之内"
                        }
                    ],

                });
            },_extendInitDate:function () {

                $('.extend_time').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    minView: "month",
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.extend_time').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".extend_time").val();
                        this.companyExtendInfo.foundingTime = value;
                    });

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    