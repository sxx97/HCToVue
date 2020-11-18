
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>{{viewOrgInfo.componentName}}</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewOrgInfo.index != 2" class="btn btn-primary btn-sm"
                            style="margin-right:10px;" v-on:click="_openSelectOrgInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> {{viewOrgInfo.buttonName}}
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">组织名称：</label>
                            <label class="">{{viewOrgInfo.orgName}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">组织级别：</label>
                            <label class="">{{viewOrgInfo.orgLevelName}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">上级组织：</label>
                            <label class="">{{viewOrgInfo.parentOrgName}}</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <!--<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">组织ID：</label>
                            <label class="">{{viewOrgInfo.orgId}}</label>
                        </div>
                    </div>-->
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">描述：</label>
                            <label class="">{{viewOrgInfo.description}}</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <vc:create name="chooseOrg"
               emitChooseOrg="viewOrgInfo"
               emitLoadData="viewOrgInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
        export default {
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"viewOrgInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //根据请求参数查询 查询 业主信息
            this._loadOrgInfoData();


        })()(function(){
            this.$vc.on('viewOrgInfo','chooseOrg',function(_app){
                this.$vc.copyObject(_app, this.viewOrgInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewOrgInfo);
            });

            this.$vc.on('viewOrgInfo', 'onIndex', function(_index){
                this.viewOrgInfo.index = _index;
            });

            this.$vc.on('viewOrgInfo', '_initInfo', function(_info){
                //this.viewOrgInfo.index = _index;
                this.$vc.copyObject(_info,this.viewOrgInfo);
                console.log(_info);
            });

        })()   
            },
            methods: {
                _openSelectOrgInfoModel(){
                this.$vc.emit('chooseOrg','openChooseOrgModel',{
                    orgLevel:this.viewOrgInfo.orgLevel,
                    parentOrgId:this.viewOrgInfo.parentOrgId,
                });
            },_openAddOrgInfoModel(){
                this.$vc.emit('addOrg','openAddOrgModal',{});
            },_loadOrgInfoData:function(){

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    