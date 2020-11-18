
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>权限信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewBasePrivilegeInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectBasePrivilegeInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择权限</button>

                    <button type="button" v-if="viewBasePrivilegeInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddBasePrivilegeInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加权限</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >权限名称：</label>
                            <label class="">{{viewBasePrivilegeInfo.name}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >商户类型：</label>
                            <label class="">{{viewBasePrivilegeInfo.domain}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >描述：</label>
                            <label class="">{{viewBasePrivilegeInfo.description}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addBasePrivilege"
               callBackListener="viewBasePrivilegeInfo"
               callBackFunction="chooseBasePrivilege"
    ></vc:create>


    <vc:create name="chooseBasePrivilege"
               emitChooseBasePrivilege="viewBasePrivilegeInfo"
               emitLoadData="viewBasePrivilegeInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
        export default {
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"viewBasePrivilegeInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //根据请求参数查询 查询 业主信息
            this._loadBasePrivilegeInfoData();
        })()(function(){
            this.$vc.on('viewBasePrivilegeInfo','chooseBasePrivilege',function(_app){
                this.$vc.copyObject(_app, this.viewBasePrivilegeInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewBasePrivilegeInfo);
            });

            this.$vc.on('viewBasePrivilegeInfo', 'onIndex', function(_index){
                this.viewBasePrivilegeInfo.index = _index;
            });

        })()   
            },
            methods: {
                _openSelectBasePrivilegeInfoModel(){
                this.$vc.emit('chooseBasePrivilege','openChooseBasePrivilegeModel',{});
            },_openAddBasePrivilegeInfoModel(){
                this.$vc.emit('addBasePrivilege','openAddBasePrivilegeModal',{});
            },_loadBasePrivilegeInfoData:function(){

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    