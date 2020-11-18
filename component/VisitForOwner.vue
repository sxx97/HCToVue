
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
            
        export default {
            props: {"callBackListener":"chooseStaff","callBackFunction":"chooseStaff","showCallBackButton":"false"},
            components: {
                
            },
            data () {
                return {"viewOwnerInfo":"[object Object]","showCallBackButton":"true"}    
            },
            mounted() {
             (function(){
            this._loadOwnerInfo();
        })()(function(){
            this.$vc.on('visitForOwner','onIndex',function(_index){
                this.$vc.emit('addVisitSpace', 'notify', _index);
                /*if(_index == 2){
                   this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewOwnerInfo);
                }*/
            });

            this.$vc.on('visitForOwner','ownerInfo',function(_info){
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
                    function(json,res){
                        var listOwnerData =JSON.parse(json);
                        this.$vc.copyObject(listOwnerData.owners[0],this.viewOwnerInfo);
                    },function(errInfo,error){
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
    