
        <template>
            <div class="modal fade" id="deleteBusinessTypeModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>您确定要删除吗?请再三考虑下呢!</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" >点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteBusinessType()">确认删除</button>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
        export default {
            props: {"notifyLoadDataComponentName":"true"},
            components: {
                
            },
            data () {
                return {"addOwnerInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
            this.$vc.on('addOwner','openAddOwnerModal',function(_ownerId){
                if(_ownerId != null || _ownerId != -1){
                    this.addOwnerInfo.ownerId = _ownerId;
                }
                $('#addOwnerModel').modal('show');
            });
        })()   
            },
            methods: {
                addOwnerValidate(){
                return this.$vc.validate.validate({
                    addOwnerInfo:this.addOwnerInfo
                },{
                    'addOwnerInfo.name':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"名称不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,10",
                            errInfo:"名称长度必须在2位至10位"
                        },
                    ],
                    'addOwnerInfo.age':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"年龄不能为空"
                        },
                        {
                            limit:"num",
                            param:"",
                            errInfo:"年龄不是有效的数字"
                        },
                    ],
                    'addOwnerInfo.sex':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"性别不能为空"
                        }
                    ],
                    'addOwnerInfo.link':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"手机号不能为空"
                        },
                        {
                            limit:"phone",
                            param:"",
                            errInfo:"不是有效的手机号"
                        }
                    ],
                    'addOwnerInfo.remark':[

                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注长度不能超过200位"
                        }
                    ]

                });
            },saveOwnerInfo:function(){
                if(!this.addOwnerValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }

                this.addOwnerInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'addOwner',
                    'saveOwner',
                    JSON.stringify(this.addOwnerInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addOwnerModel').modal('hide');
                            this.clearAddOwnerInfo();
                            this.$vc.emit(this.$vc._thisnotifyLoadDataComponentName,'listOwnerData',{});

                            return ;
                        }
                        this.$vc.message(json);

                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                     });
            },clearAddOwnerInfo:function(){
                this.addOwnerInfo = {
                                            name:'',
                                            age:'',
                                            link:'',
                                            sex:'',
                                            remark:''
                                        };
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    