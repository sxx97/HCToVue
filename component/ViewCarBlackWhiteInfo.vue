
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>黑白名单信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewCarBlackWhiteInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectCarBlackWhiteInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择黑白名单</button>

                    <button type="button" v-if="viewCarBlackWhiteInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddCarBlackWhiteInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加黑白名单</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >名单类型：</label>
                            <label class="">{{viewCarBlackWhiteInfo.blackWhite}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >车牌号：</label>
                            <label class="">{{viewCarBlackWhiteInfo.carNum}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >开始时间：</label>
                            <label class="">{{viewCarBlackWhiteInfo.startTime}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >结束时间：</label>
                            <label class="">{{viewCarBlackWhiteInfo.endTime}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addCarBlackWhite"
               callBackListener="viewCarBlackWhiteInfo"
               callBackFunction="chooseCarBlackWhite"
    ></vc:create>


    <vc:create name="chooseCarBlackWhite"
               emitChooseCarBlackWhite="viewCarBlackWhiteInfo"
               emitLoadData="viewCarBlackWhiteInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
        export default {
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"viewCarBlackWhiteInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //根据请求参数查询 查询 业主信息
            this._loadCarBlackWhiteInfoData();
        })()(function(){
            this.$vc.on('viewCarBlackWhiteInfo','chooseCarBlackWhite',function(_app){
                this.$vc.copyObject(_app, this.viewCarBlackWhiteInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewCarBlackWhiteInfo);
            });

            this.$vc.on('viewCarBlackWhiteInfo', 'onIndex', function(_index){
                this.viewCarBlackWhiteInfo.index = _index;
            });

        })()   
            },
            methods: {
                _openSelectCarBlackWhiteInfoModel(){
                this.$vc.emit('chooseCarBlackWhite','openChooseCarBlackWhiteModel',{});
            },_openAddCarBlackWhiteInfoModel(){
                this.$vc.emit('addCarBlackWhite','openAddCarBlackWhiteModal',{});
            },_loadCarBlackWhiteInfoData:function(){

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    