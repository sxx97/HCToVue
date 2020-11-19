
        <template>
            <div id="addServiceModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加服务</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <!--<div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼名称</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.name" type="text" placeholder="必填，请填写名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼编号</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.floorNum" type="email" placeholder="必填，请填写编号" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.remark" type="tel" placeholder="可填，请填写备注" class="form-control"></div>
                            </div>-->

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">服务名称</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceInfo.name" type="text" placeholder="必填，请填写服务名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">服务编码</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceInfo.serviceCode" type="text" placeholder="必填，请填写服务编码"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">消息队列</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceInfo.messageQueueName" type="text"
                                           placeholder="选填，请填写消息队列" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">是否实例</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addServiceInfo.isInstance">
                                        <option selected disabled value="">必填，请填写是否实例</option>
                                        <option value="Y">是</option>
                                        <option value="N">否</option>
                                        <option value="NT">透传</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">调用地址</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceInfo.url" type="text" placeholder="选填，请填写调用地址"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">调用方式</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addServiceInfo.method">
                                        <option selected disabled value="">必填，请选择调用方式</option>
                                        <option value="GET">http get</option>
                                        <option value="POST">http post</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">超时时间</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceInfo.timeout" type="text" placeholder="必填，请填写超时时间"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">重试次数</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceInfo.retryCount" type="text" placeholder="必填，请填写重试次数"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveServiceInfo()"><i class="fa fa-check"></i>&nbsp;保存
                                </button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                                        data-dismiss="modal">取消
                                </button>
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
                props: {"callBackListener":"true","callBackFunction":"true"},
                components: {
                    
                },
                data () {
                    return {"addServiceInfo":{"serviceId":"","name":"","serviceCode":"","businessTypeCd":"API","seq":"1","messageQueueName":"","isInstance":"Y","url":"http://order-service/orderApi/service","method":"","timeout":"60","retryCount":"3","provideAppId":"8000418002"}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
            this.$vc.on('addService','openAddServiceModal',() =>{
                $('#addServiceModel').modal('show');
            });
        })()   
                },
                methods: {
                    addServiceValidate(){
                return this.$vc.validate.validate({
                    addServiceInfo:this.addServiceInfo
                },{
                    'addServiceInfo.name':[
{
                            limit:"required",
                            param:"",
                            errInfo:"服务名称不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"50",
                            errInfo:"服务名称不能超过50"
                        },
                    ],
'addServiceInfo.serviceCode':[
{
                            limit:"required",
                            param:"",
                            errInfo:"服务编码不能为空"
                        },
 {
                            limit:"maxin",
                            param:"2,50",
                            errInfo:"服务编码必须在2至50字符之间"
                        },
                    ],
'addServiceInfo.businessTypeCd':[
{
                            limit:"required",
                            param:"",
                            errInfo:"秘钥不能为空"
                        },
 {
                            limit:"maxin",
                            param:"2,4",
                            errInfo:"业务类型必须为API"
                        },
                    ],
'addServiceInfo.seq':[
{
                            limit:"required",
                            param:"",
                            errInfo:"序列不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"1",
                            errInfo:"序列格式错误"
                        },
                    ],
'addServiceInfo.messageQueueName':[
 {
                            limit:"maxLength",
                            param:"50",
                            errInfo:"消息队列不能超过50"
                        },
                    ],
'addServiceInfo.isInstance':[
{
                            limit:"required",
                            param:"",
                            errInfo:"是否实例不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"50",
                            errInfo:"实例不能超过50"
                        },
                    ],
'addServiceInfo.url':[
 {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"调用地址不能超过200"
                        },
                    ],
'addServiceInfo.method':[
{
                            limit:"required",
                            param:"",
                            errInfo:"调用方式不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"50",
                            errInfo:"调用方式不能超过50"
                        },
                    ],
'addServiceInfo.timeout':[
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
'addServiceInfo.retryCount':[
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
'addServiceInfo.provideAppId':[
{
                            limit:"required",
                            param:"",
                            errInfo:"提供服务不能为空"
                        },
 {
                            limit:"num",
                            param:"",
                            errInfo:"重试次数必须为数字"
                        },
                    ],




                });
            },saveServiceInfo:function(){
                if(!this.addServiceValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }

                //this.addServiceInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if(this.$vc.notNull(this.$vc._thiscallBackListener)){
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.addServiceInfo);
                    $('#addServiceModel').modal('hide');
                    return ;
                }
                this.$vc.http.post(
                    'addService',
                    'save',
                    JSON.stringify(this.addServiceInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addServiceModel').modal('hide');
                            this.clearAddServiceInfo();
                            this.$vc.emit('serviceManage','listService',{});

                            return ;
                        }
                        this.$vc.message(json);

                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                     });
            },clearAddServiceInfo:function(){
                this.addServiceInfo = {
                                            name:'',
serviceCode:'',
businessTypeCd:'API',
seq:'1',
messageQueueName:'',
isInstance:'Y',
url:'http://order-service/orderApi/service',
method:'',
timeout:'60',
retryCount:'3',
provideAppId:'8000418002',

                                        };
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    