
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
                <Positive-photo name="positive-photo"></Positive-photo>
            </div>
        </div>
    </div>
</fieldset>


        </template>
        <script>
            import Positive-photo from './Positive-photo.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"companyCerdentialsInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
             this._companyinitDate();
         })()(function(){
                // 证件信息
               this.$on('positivePhotoEvent',function(positivePhoto){
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
                    .on('changeDate', function (ev) {
                        var value = $(".company_time").val();
                        this.companyCerdentialsInfo.validityPeriod = value;
                    });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    