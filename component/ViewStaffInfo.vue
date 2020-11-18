
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>员工信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm"
                            style="margin-right:10px;" v-on:click="_openSelectStaffInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <!--<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">员工ID：</label>
                            <label class="">{{viewStaffInfo.userId}}</label>
                        </div>
                    </div>-->
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">员工名称：</label>
                            <label class="">{{viewStaffInfo.name}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">员工邮箱：</label>
                            <label class="">{{viewStaffInfo.email}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">手机号：</label>
                            <label class="">{{viewStaffInfo.tel}}</label>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">员工性别：</label>
                            <label class="">{{viewStaffInfo.sex=='0' ? '男' : '女'}}</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <vc:create name="searchStaff"
               callBackListener="viewStaffInfo"
               callBackFunction="chooseStaff"
    ></vc:create>
</div>

        </template>
        <script>
            
        export default {
            props: {"callBackListener":"chooseStaff","callBackFunction":"chooseStaff"},
            components: {
                
            },
            data () {
                return {"viewStaffInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //根据请求参数查询 查询 业主信息
            this._loadStaffInfoData();
        })()(function(){
            this.$vc.on('viewStaffInfo','chooseStaff',function(_app){
                this.$vc.copyObject(_app, this.viewStaffInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewStaffInfo);
            });

            this.$vc.on('viewStaffInfo', 'onIndex', function(_index){
                this.viewStaffInfo.index = _index;
            });

            this.$vc.on('viewStaffInfo', '_initInfo', function(_info){
                //this.viewStaffInfo.index = _index;
                this.$vc.copyObject(_info,this.viewStaffInfo);
                console.log(_info);
            });

            this.$vc.on('viewStaffInfo', '_clear', function(_info){
                //this.viewStaffInfo.index = _index;
                this.viewStaffInfo = {
                    index:0,
                    flowComponent:'viewStaffInfo',
                    userId:'',
                    name:'',
                    email:'',
                    tel:'',
                    sex:'',
                    orgId:''
                };
            });

        })()   
            },
            methods: {
                _openSelectStaffInfoModel(){
                this.$vc.emit('searchStaff','openSearchStaffModel',{
                    orgId:this.viewStaffInfo.orgId
                });
            },_loadStaffInfoData:function(){

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    