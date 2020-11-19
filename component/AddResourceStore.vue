
        <template>
            <div id="addResourceStoreModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加物品</h3>
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
                                <label class="col-sm-2 col-form-label">物品名称</label>
                                <div class="col-sm-10">
                                    <input v-model="addResourceStoreInfo.resName" type="text" placeholder="必填，请填写物品名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">物品编码</label>
                                <div class="col-sm-10">
                                    <input v-model="addResourceStoreInfo.resCode" type="text" placeholder="选填，请填写物品编码"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">物品价格</label>
                                <div class="col-sm-10">
                                    <input v-model="addResourceStoreInfo.price" type="text" placeholder="必填，请填写物品价格，如终端串码"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">描述</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写描述" class="form-control"
                                              v-model="addResourceStoreInfo.description"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveResourceStoreInfo()"><i class="fa fa-check"></i>&nbsp;保存
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
                props: {"callBackListener":"false","callBackFunction":"false"},
                components: {
                    
                },
                data () {
                    return {"addResourceStoreInfo":{"resId":"","resName":"","resCode":"","price":"","description":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
            this.$vc.on('addResourceStore','openAddResourceStoreModal',() =>{
                $('#addResourceStoreModel').modal('show');
            });
        })()   
                },
                methods: {
                    addResourceStoreValidate(){
                return this.$vc.validate.validate({
                    addResourceStoreInfo:this.addResourceStoreInfo
                },{
                    'addResourceStoreInfo.resName':[
{
                            limit:"required",
                            param:"",
                            errInfo:"物品名称不能为空"
                        },
 {
                            limit:"maxin",
                            param:"2,100",
                            errInfo:"物品名称长度为2至100"
                        },
                    ],
'addResourceStoreInfo.resCode':[
 {
                            limit:"maxLength",
                            param:"50",
                            errInfo:"物品编码不能超过50位"
                        },
                    ],
'addResourceStoreInfo.price':[
{
                            limit:"required",
                            param:"",
                            errInfo:"物品价格不能为空"
                        },
 {
                            limit:"money",
                            param:"",
                            errInfo:"物品价格格式错误"
                        },
                    ],
'addResourceStoreInfo.description':[
 {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"描述不能为空"
                        },
                    ],




                });
            },saveResourceStoreInfo:function(){
                if(!this.addResourceStoreValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }

                this.addResourceStoreInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if(this.$vc.notNull(this.$vc._thiscallBackListener)){
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.addResourceStoreInfo);
                    $('#addResourceStoreModel').modal('hide');
                    return ;
                }

                this.$vc.http.post(
                    'addResourceStore',
                    'save',
                    JSON.stringify(this.addResourceStoreInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addResourceStoreModel').modal('hide');
                            this.clearAddResourceStoreInfo();
                            this.$vc.emit('resourceStoreManage','listResourceStore',{});

                            return ;
                        }
                        this.$vc.message(json);

                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                     });
            },clearAddResourceStoreInfo:function(){
                this.addResourceStoreInfo = {
                        resName:'',
                        resCode:'',
                        price:'',
                        description:'',
                };
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    