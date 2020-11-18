
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>设备信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewMachineInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectMachineInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择设备</button>

                    <button type="button" v-if="viewMachineInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddMachineInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加设备</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >设备编码：</label>
                            <label class="">{{viewMachineInfo.machineCode}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >版本号：</label>
                            <label class="">{{viewMachineInfo.machineVersion}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >设备名称：</label>
                            <label class="">{{viewMachineInfo.machineName}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >设备类型：</label>
                            <label class="">{{viewMachineInfo.machineTypeCd}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >鉴权编码：</label>
                            <label class="">{{viewMachineInfo.authCode}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >设备IP：</label>
                            <label class="">{{viewMachineInfo.machineIp}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >设备MAC：</label>
                            <label class="">{{viewMachineInfo.machineMac}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addMachine"
               callBackListener="viewMachineInfo"
               callBackFunction="chooseMachine"
    ></vc:create>


    <vc:create name="chooseMachine"
               emitChooseMachine="viewMachineInfo"
               emitLoadData="viewMachineInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
        export default {
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"viewMachineInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //根据请求参数查询 查询 业主信息
            this._loadMachineInfoData();
        })()(function(){
            this.$vc.on('viewMachineInfo','chooseMachine',function(_app){
                this.$vc.copyObject(_app, this.viewMachineInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewMachineInfo);
            });

            this.$vc.on('viewMachineInfo', 'onIndex', function(_index){
                this.viewMachineInfo.index = _index;
            });

        })()   
            },
            methods: {
                _openSelectMachineInfoModel(){
                this.$vc.emit('chooseMachine','openChooseMachineModel',{});
            },_openAddMachineInfoModel(){
                this.$vc.emit('addMachine','openAddMachineModal',{});
            },_loadMachineInfoData:function(){

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    