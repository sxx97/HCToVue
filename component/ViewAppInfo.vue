
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>应用信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewAppInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectAppInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择应用</button>

                    <button type="button" v-if="viewAppInfo.index != 2 && viewAppInfo.needShowAddAppButton== 'true'" class="btn btn-primary btn-sm" v-on:click="_openAddAppInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加应用</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >应用ID：</label>
                            <label class="">{{viewAppInfo.appId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">应用名称：</label>
                            <label class="">{{viewAppInfo.name}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >秘钥：</label>
                            <label class="">{{viewAppInfo.securityCode}}</label>
                        </div>
                    </div>


                </div>

                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >白名单：</label>
                            <label class="">{{viewAppInfo.whileListIp}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >黑名单：</label>
                            <label class="">{{viewAppInfo.blackListIp}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">备注：</label>
                            <label class="">{{viewAppInfo.remark}}</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <vc:create name="addApp"
               callBackListener="viewAppInfo"
               callBackFunction="chooseApp"
    ></vc:create>


    <vc:create name="chooseApp"
               emitChooseApp="viewAppInfo"
               emitLoadData="viewAppInfo"
    ></vc:create>
</div>
        </template>
        <script>
            
        export default {
            props: {"callBackListener":"string","callBackFunction":"string","needShowAddAppButton":"true"},
            components: {
                
            },
            data () {
                return {"viewAppInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //根据请求参数查询 查询 业主信息
            this._loadAppInfoData();
        })()(function(){
            this.$vc.on('viewAppInfo','chooseApp',function(_app){
                this.$vc.copyObject(_app, this.viewAppInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewAppInfo);
            });

            this.$vc.on('viewAppInfo', 'onIndex', function(_index){
                this.viewAppInfo.index = _index;
            });

        })()   
            },
            methods: {
                _openSelectAppInfoModel(){
                this.$vc.emit('chooseApp','openChooseAppModel',{});
            },_openAddAppInfoModel(){
                this.$vc.emit('addApp','openAddAppModal',{});
            },_loadAppInfoData:function(){

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    