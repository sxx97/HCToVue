
        <template>
            <div id="editServiceImplModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改服务实现</h3>
                <div class="ibox-content">
                    <div>
                        <div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">业务名称</label>
                                <div class="col-sm-10">
                                    <input v-model="editServiceImplInfo.name" type="text" placeholder="必填，请填写业务名称" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">调用类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editServiceImplInfo.invokeType">
                                        <option selected disabled value="">必填，请选择调用类型</option>
                                        <option value="1">微服务POST方式</option>
                                        <option value="2">webservice方式</option>
                                        <option value="3">http post方式</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">调用地址</label>
                                <div class="col-sm-10">
                                    <input v-model="editServiceImplInfo.url" type="text" placeholder="必填，请填写调用地址" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">kafka主题</label>
                                <div class="col-sm-10">
                                    <input v-model="editServiceImplInfo.messageTopic" type="text" placeholder="选填，请填写kafka主题" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">超时时间</label>
                                <div class="col-sm-10">
                                    <input v-model="editServiceImplInfo.timeout" type="text" placeholder="必填，请填写超时时间" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">重试次数</label>
                                <div class="col-sm-10">
                                    <input v-model="editServiceImplInfo.retryCount" type="text" placeholder="必填，请填写重试次数" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">描述</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写描述" class="form-control" v-model="editServiceImplInfo.description"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editServiceImpl()"><i class="fa fa-check"></i>&nbsp;保存</button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                return {"editServiceImplInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('editServiceImpl','openEditServiceImplModal',function(_params){
                this.refreshEditServiceImplInfo();
                $('#editServiceImplModel').modal('show');
                this.$vc.copyObject(_params, this.editServiceImplInfo );
                //this.editServiceImplInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
            },
            methods: {
                editServiceImplValidate:function(){
                        return this.$vc.validate.validate({
                            editServiceImplInfo:this.editServiceImplInfo
                        },{
                            'editServiceImplInfo.serviceBusinessId':[
{
                            limit:"required",
                            param:"",
                            errInfo:"服务实现ID不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"50",
                            errInfo:"服务实现ID不能超过50"
                        },
                    ],
'editServiceImplInfo.businessTypeCd':[
{
                            limit:"required",
                            param:"",
                            errInfo:"业务类型不能为空"
                        },
 {
                            limit:"maxin",
                            param:"2,50",
                            errInfo:"业务类型必须在2至50字符之间"
                        },
                    ],
'editServiceImplInfo.name':[
{
                            limit:"required",
                            param:"",
                            errInfo:"业务名称不能为空"
                        },
 {
                            limit:"maxin",
                            param:"2,50",
                            errInfo:"业务类型必须在2至50字符之间"
                        },
                    ],
'editServiceImplInfo.invokeType':[
{
                            limit:"required",
                            param:"",
                            errInfo:"调用类型不能为空"
                        },
 {
                            limit:"maxin",
                            param:"1,4",
                            errInfo:"调用类型错误"
                        },
                    ],
'editServiceImplInfo.url':[
{
                            limit:"required",
                            param:"",
                            errInfo:"调用地址不能为空"
                        },
 {
                           limit:"maxLength",
                          param:"200",
                          errInfo:"调用地址超过200位"
                        },
                    ],
'editServiceImplInfo.messageTopic':[
 {
                            limit:"maxLength",
                            param:"50",
                            errInfo:"kafka主题不能超过50"
                        },
                    ],
'editServiceImplInfo.timeout':[
{
                            limit:"required",
                            param:"",
                            errInfo:"超时时间不能为空"
                        },
 {
                            limit:"num",
                            param:"",
                            errInfo:"超时时间必须为数字"
                        },
                    ],
'editServiceImplInfo.retryCount':[
{
                            limit:"required",
                            param:"",
                            errInfo:"重试次数不能为空"
                        },
 {
                            limit:"num",
                            param:"",
                            errInfo:"重试次数必须为数字"
                        },
                    ],
'editServiceImplInfo.description':[
 {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注内容不能超过200"
                        },
                    ],
'editServiceImplInfo.serviceBusinessId':[
{
                            limit:"required",
                            param:"",
                            errInfo:"服务实现ID不能为空"
                        }]

                        });
             },editServiceImpl:function(){
                if(!this.editServiceImplValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }

                this.$vc.http.post(
                    'editServiceImpl',
                    'update',
                    JSON.stringify(this.editServiceImplInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#editServiceImplModel').modal('hide');
                             this.$vc.emit('serviceImplManage','listServiceImpl',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },refreshEditServiceImplInfo:function(){
                this.editServiceImplInfo= {
                  serviceBusinessId:'',
serviceBusinessId:'',
businessTypeCd:'',
name:'',
invokeType:'',
url:'1000',
messageTopic:'',
timeout:'60',
retryCount:'3',
description:'',

                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    