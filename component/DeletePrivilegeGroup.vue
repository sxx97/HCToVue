
        <template>
            <div class="modal fade" id="deletePrivilegeGroupModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>删除权限组同时会删除权限组下的所有权限，确认是否删除!</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeDeletePrivilegeGroupModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deletePrivilegeGroup()">确认删除</button>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
        export default {
            props: {"callBackListener":"false","callBackFunction":"false"},
            components: {
                
            },
            data () {
                return {"addPrivilegeViewInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){

            this.$vc.on('addPrivilegeViewInfo','syncData',function(_obj){
                this.$vc.copyObject(_obj,this.addPrivilegeViewInfo);
                //从url中获取 资源路径 /flow/abc
                if(_obj.hasOwnProperty("url") && this.$vc.notNull(_obj.url)){
                    this.addPrivilegeViewInfo.resource = (_obj.url.indexOf("/flow") == 0 && _obj.url.length > 5) ? _obj.url.substring(5):_obj.url;
                }
            });

            this.$vc.on('addPrivilegeViewInfo', 'onIndex', function(_index){
                this.addPrivilegeViewInfo.index = _index;
            });
        })()   
            },
            methods: {
                addPrivilegeValidate(){
                return this.$vc.validate.validate({
                    addPrivilegeViewInfo:this.addPrivilegeViewInfo
                },{
                    'addPrivilegeViewInfo.name':[
{
                            limit:"required",
                            param:"",
                            errInfo:"权限名称不能为空"
                        },
 {
                            limit:"maxin",
                            param:"2,10",
                            errInfo:"权限名称必须在2至10字符之间"
                        },
                    ],
'addPrivilegeViewInfo.domain':[
{
                            limit:"required",
                            param:"",
                            errInfo:"商户类型不能为空"
                        },
 {
                            limit:"maxin",
                            param:"1,12",
                            errInfo:"商户类型错误"
                        },
                    ],
'addPrivilegeViewInfo.description':[
 {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注内容不能超过200"
                        },
                    ],

                });
            },saveAddPrivilegeInfo:function(){
                if(this.addPrivilegeValidate()){
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction, this.addPrivilegeViewInfo);
                    return ;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    