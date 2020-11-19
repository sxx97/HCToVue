
        <template>
            <fieldset id="component-p-1" role="tabpanel" aria-labelledby="component-h-1" class="body" aria-hidden="true"  v-bind:class="{no_display:step!=3}">
    <h2>营业执照信息</h2>
    <div class="row">
        <div class="col-lg-8">
            <div class="form-group">
                <label>证件号码</label> <span class="required">*</span>
                <input v-model="companyCerdentialsInfo.value" type="text" class="form-control required" aria-required="true" />
            </div>
        </div>
        <div class="col-lg-8">
            <div class="form-group">
                <label>有效期</label> <span class="required">*</span>
                <input v-model="companyCerdentialsInfo.validityPeriod" size="16" type="text" placeholder="请选择时间(yyyy-mm-dd)"   readonly class="form-control form-control-sm company_time">

            </div>
        </div>
        <div class="col-lg-8">
            <div class="form-group">
                <label>营业执照照片 *</label>
                <vc:create name="positive-photo"></vc:create>
            </div>
        </div>
    </div>
</fieldset>


        </template>
        <script>
            
            import Positive-photo from '@/component/Positive-photo.vue';



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
                    Positive-photo
                },
                data () {
                    return {"companyCerdentialsInfo":{"value":"","validityPeriod":""}}    
                },
                mounted() {
                (() =>{
             this._companyinitDate();
         })()
(() =>{
                // 证件信息
               this.$on('positivePhotoEvent',(positivePhoto) =>{
                    for(var positivePhotoKey in positivePhoto){
                         this.companyCerdentialsInfo[positivePhotoKey] = positivePhoto[positivePhotoKey];
                     }
                      this.$emit('companyCerdentialsEvent',this.companyCerdentialsInfo);
                });

         })()   
                },
                methods: {
                    validateCerdentials:function(){
                        if(!this.validatePositivePhoto()){
                            return false;
                        }
                        return this.$vc.validate.validate({
                                                               companyCerdentialsInfo:this.companyCerdentialsInfo
                                                           },{
                                                               'companyCerdentialsInfo.value':[
                                                                   {
                                                                       limit:"required",
                                                                       param:"",
                                                                       errInfo:"证件号码不能为空"
                                                                   },
                                                                   {
                                                                       limit:"maxLength",
                                                                       param:"50",
                                                                       errInfo:"证件号码长度必须在50位之内"
                                                                   },
                                                               ],

                                                               'companyCerdentialsInfo.validityPeriod':[
                                                                   {
                                                                       limit:"required",
                                                                       param:"",
                                                                       errInfo:"成立时间不能为空"
                                                                   },
                                                                   {
                                                                       limit:"date",
                                                                       param:"",
                                                                       errInfo:"不是有效的日期，例如：2019-03-29"
                                                                   }
                                                               ]

                                                           });
                    },_companyinitDate:function(){
                $('.company_time').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    minView: "month",
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.company_time').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".company_time").val();
                        this.companyCerdentialsInfo.validityPeriod = value;
                    });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    