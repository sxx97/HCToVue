
        <template>
            <div class="fileinput fileinput-new" data-provides="fileinput">
    <span class="btn btn-default btn-file" v-bind:class="{no_display:positivePhotoInfo.chooseFlag==1}">
        <span class="fileinput-new" >选择图片</span>
    </span>
    <input type="file" class="file" accept="images/*" name="..." v-on:change="choosePositivePhoto($event)">
        <img v-bind:src="positivePhotoInfo.imgInfo" v-bind:class="{no_display:positivePhotoInfo.chooseFlag==0}" width="200px" height="200px">
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
                    return {"positivePhotoInfo":{"chooseFlag":0,"imgInfo":"","errorInfo":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
//              this.$on('errorInfoEvent',(_errorInfo) =>{
//                     this.registerInfo.errorInfo = _errorInfo;
//                     console.log('errorInfoEvent 事件被监听',_errorInfo)
//                 });

         })()   
                },
                methods: {
                    choosePositivePhoto:function(event){
                var photoFiles = event.target.files;
                if (photoFiles && photoFiles.length > 0) {
                        // 获取目前上传的文件
                        var file = photoFiles[0];// 文件大小校验的动作
                        if(file.size > 1024 * 1024 * 1) {
                            this.positivePhotoInfo.errorInfo = '图片大小不能超过 2MB!';
                            return false;
                        }
                        var reader = new FileReader(); //新建FileReader对象
                        reader.readAsDataURL(file); //读取为base64
                        console.log('render obj:',reader);
                        reader.onloadend = function(e) {
                            this.positivePhotoInfo.imgInfo = reader.result;
                            this.positivePhotoInfo.chooseFlag = 1;
                        }
                    }
            },validatePositivePhoto:function(){
                return this.$vc.validate.validate({
                                                   positivePhotoInfo:this.positivePhotoInfo
                                               },{
                                                   'positivePhotoInfo.imgInfo':[
                                                       {
                                                           limit:"required",
                                                           param:"",
                                                           errInfo:"未上传证件照"
                                                       }
                                                   ],

                                               });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    