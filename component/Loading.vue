
        <template>
            <div id="loadingComponent" class="java110_loading" v-bind:class="{no_display:loadingInfo.hide}">
    <!--<div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
    </div>-->

    <div class="sk-spinner sk-spinner-wave" style="margin: 70px auto;">
        <div class="sk-rect1"></div>
        <div class="sk-rect2"></div>
        <div class="sk-rect3"></div>
        <div class="sk-rect4"></div>
        <div class="sk-rect5"></div>
    </div>
</div>
        </template>
        <script>
            
        export default {
            props: {"callBackListener":"false","callBackFunction":"false"},
            components: {
                
            },
            data () {
                return {"viewOwnerRepairInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //根据请求参数查询 查询 业主信息
            this._loadOwnerRepairInfoData();
        })()(function(){
            this.$vc.on('viewOwnerRepairInfo','chooseOwnerRepair',function(_app){
                this.$vc.copyObject(_app, this.viewOwnerRepairInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewOwnerRepairInfo);
            });

            this.$vc.on('viewOwnerRepairInfo', 'onIndex', function(_index){
                this.viewOwnerRepairInfo.index = _index;
            });

        })()   
            },
            methods: {
                _openSelectOwnerRepairInfoModel(){
                this.$vc.emit('chooseOwnerRepair','openChooseOwnerRepairModel',{});
            },_openAddOwnerRepairInfoModel(){
                this.$vc.emit('addOwnerRepair','openAddOwnerRepairModal',{});
            },_loadOwnerRepairInfoData:function(){

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    