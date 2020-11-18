
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>巡检点信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewInspectionPointInfo.index != 2" class="btn btn-primary btn-sm"
                            style="margin-right:10px;" v-on:click="_openSelectInspectionPointInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择巡检点
                    </button>

                    <button type="button" v-if="viewInspectionPointInfo.index != 2" class="btn btn-primary btn-sm"
                            v-on:click="_openAddInspectionPointInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加巡检点
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">巡检点名称：</label>
                            <label class="">{{viewInspectionPointInfo.inspection_name}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">备注：</label>
                            <label class="">{{viewInspectionPointInfo.remark}}</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <vc:create name="addInspectionPoint"
               callBackListener="viewInspectionPointInfo"
               callBackFunction="chooseInspectionPoint"
    ></vc:create>


    <vc:create name="chooseInspectionPoint"
               emitChooseInspectionPoint="viewInspectionPointInfo"
               emitLoadData="viewInspectionPointInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
        export default {
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"viewInspectionPointInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //根据请求参数查询 查询 业主信息
            this._loadInspectionPointInfoData();
        })()(function(){
            this.$vc.on('viewInspectionPointInfo','chooseInspectionPoint',function(_app){
                this.$vc.copyObject(_app, this.viewInspectionPointInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewInspectionPointInfo);
            });

            this.$vc.on('viewInspectionPointInfo', 'onIndex', function(_index){
                this.viewInspectionPointInfo.index = _index;
            });

        })()   
            },
            methods: {
                _openSelectInspectionPointInfoModel(){
                this.$vc.emit('chooseInspectionPoint','openChooseInspectionPointModel',{});
            },_openAddInspectionPointInfoModel(){
                this.$vc.emit('addInspectionPoint','openAddInspectionPointModal',{});
            },_loadInspectionPointInfoData:function(){

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    