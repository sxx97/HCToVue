
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"positivePhotoInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
//              this.$on('errorInfoEvent',function(_errorInfo){
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
    