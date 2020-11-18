
        <template>
            <div class="row" id="component">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>物业费初始化信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="openConfigPropertyFeeModel()">
                        <i class="glyphicon glyphicon-plus"></i> 编辑</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >物业费配置ID：</label>
                            <label class="">{{feeConfigInfo.configId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">每平米单价：</label>
                            <label class="">{{feeConfigInfo.squarePrice}} 元</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >附加费用：</label>
                            <label class="">{{feeConfigInfo.additionalAmount}} 元</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <ConfigPropertyFee name="configPropertyFee"></ConfigPropertyFee>
</div>
        </template>
        <script>
            import ConfigPropertyFee from './ConfigPropertyFee.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"feeConfigInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
                this.loadPropertyConfigFee();
        })()(function(){
            this.$vc.on('viewPropertyFeeConfig','loadPropertyConfigFee',function(){
                this.loadPropertyConfigFee();
            });

        })()   
            },
            methods: {
                openConfigPropertyFeeModel:function(){
                this.$vc.emit('configPropertyFee','openConfigPropertyFeeModel',this.feeConfigInfo);
            },loadPropertyConfigFee:function(){
                var param = {
                    params:{
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        configId:this.feeConfigInfo.configId
                    }
                };
                this.$vc.http.get(
                    'viewPropertyFeeConfig',
                    'loadData',
                     param,
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            this.$vc.copyObject(JSON.parse(json), this.feeConfigInfo);
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    