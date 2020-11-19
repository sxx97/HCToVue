
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>业主信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-if="showCallBackButton=='true'"
                            v-on:click="_openSearchOwnerModel(viewOwnerInfo.ownerId)">
                        选择业主
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <!--<div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label">业主ID：</label>
                            <label class="">{{viewOwnerInfo.ownerId}}</label>
                        </div>
                    </div>-->
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label">名称：</label>
                            <label class="">{{viewOwnerInfo.name}}</label>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label">性别：</label>
                            <label class="">{{viewOwnerInfo.sex == 0 ? '男' : '女'}}</label>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label">年龄：</label>
                            <label class="">{{viewOwnerInfo.age}}</label>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label">联系方式：</label>
                            <label class="">{{viewOwnerInfo.link}}</label>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label">创建员工：</label>
                            <label class="">{{viewOwnerInfo.userName}}</label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-form-label">备注：</label>
                            <label class="">{{viewOwnerInfo.remark}}</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <vc:create name="chooseOwner"
               callBackListener="visitForOwner"
               callBackFunction="ownerInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import ChooseOwner from '@/component/ChooseOwner.vue';



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
                props: {"callBackListener":"chooseStaff","callBackFunction":"chooseStaff","showCallBackButton":"false"},
                components: {
                    ChooseOwner
                },
                data () {
                    return {"viewOwnerInfo":{"flowComponent":"viewOwnerInfo","ownerId":"","name":"","age":"","sex":"","userName":"","remark":"","link":""},"showCallBackButton":"true"}    
                },
                mounted() {
                (() =>{
            this._loadOwnerInfo();
        })()
(() =>{
            this.$vc.on('visitForOwner','onIndex',(_index) =>{
                this.$vc.emit('addVisitSpace', 'notify', _index);
                /*if(_index == 2){
                   this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewOwnerInfo);
                }*/
            });

            this.$vc.on('visitForOwner','ownerInfo',(_info) =>{
                this.viewOwnerInfo=_info;
                this.$vc.emit('addVisitSpace','ownerId',this.viewOwnerInfo.ownerId);
            });

        })()   
                },
                methods: {
                    _loadOwnerInfo:function(){
                //加载 业主信息
                var _ownerId = this.$vc.getParam('ownerId')

                if(!this.$vc.notNull(_ownerId)){
                    return ;
                }

                var param = {
                    params:{
                        ownerId:_ownerId,
                        page:1,
                        row:1,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        ownerTypeCd:'1001'
                    }
                }

                //发送get请求
                this.$vc.http.get('viewOwner',
                    'getOwner',
                    param,
                    (json,res) =>{
                        var listOwnerData =JSON.parse(json);
                        this.$vc.copyObject(listOwnerData.owners[0],this.viewOwnerInfo);
                    },(errInfo,error) =>{
                        console.log('请求失败处理');
                    }
                );

            },_openSearchOwnerModel:function(_ownerId){
                this.$vc.emit('searchOwner','openSearchOwnerModel',{});
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    