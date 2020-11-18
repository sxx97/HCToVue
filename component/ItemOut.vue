
        <template>
            <div id="component">

    <div class="java110_step">
        <div id="step"></div>
    </div>

    <!-- 选择 应用信息 -->
    <div v-if="itemOutInfo.index == 0">
        <vc:create name="resourceStoreManage"
                   callBackListener="itemOut"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="itemOutInfo.index == 1">
        <vc:create name="viewStaffInfo"
                   callBackListener="itemOut"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="itemOutInfo.index == 2">
        <vc:create name="viewOrgInfo"
                   callBackListener="itemOut"
                   callBackFunction="notify"
        ></vc:create>
    </div>


    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-secondary" v-on:click="_prevStep()">上一步</button>
            <button v-if="itemOutInfo.index != 2" type="button" class="btn btn-primary" style="margin-left:10px;"
                    v-on:click="_nextStep()">下一步
            </button>
            <button v-if="itemOutInfo.index == 2" type="button" class="btn btn-primary" style="margin-left:10px;"
                    v-on:click="_finishStep()">完成
            </button>
        </div>
    </div>

</div>

        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"itemOutInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._initStep();
        })()(function(){
            this.$vc.on("itemOut", "notify", function(_info){
                this.itemOutInfo.infos[this.itemOutInfo.index] = _info;
            });

        })()   
            },
            methods: {
                _initStep:function(){
                this.itemOutInfo.$step = $("#step");
                this.itemOutInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["选择物品","选择员工","选择员工"]
                });
                this.itemOutInfo.index = this.itemOutInfo.$step.getIndex();
            },_prevStep:function(){
                this.itemOutInfo.$step.prevStep();
                this.itemOutInfo.index = this.itemOutInfo.$step.getIndex();

                this.$vc.emit('viewItemOutInfo', 'onIndex', this.itemOutInfo.index);
this.$vc.emit('viewStaffInfo', 'onIndex', this.itemOutInfo.index);
this.$vc.emit('viewOrgInfo', 'onIndex', this.itemOutInfo.index);

            },_nextStep:function(){
                var _currentData = this.itemOutInfo.infos[this.itemOutInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.itemOutInfo.$step.nextStep();
                this.itemOutInfo.index = this.itemOutInfo.$step.getIndex();

                 this.$vc.emit('viewItemOutInfo', 'onIndex', this.itemOutInfo.index);
this.$vc.emit('viewStaffInfo', 'onIndex', this.itemOutInfo.index);
this.$vc.emit('viewOrgInfo', 'onIndex', this.itemOutInfo.index);

            },_finishStep:function(){


                var _currentData = this.itemOutInfo.infos[this.itemOutInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }

                var param = {
                    data:this.itemOutInfo.infos
                }

               this.$vc.http.post(
                   'itemOutBinding',
                   'binding',
                   JSON.stringify(param),
                   {
                       emulateJSON:true
                    },
                    function(json,res){
                       if(res.status == 200){

                           this.$vc.message('处理成功',true);
                           //关闭model
                           this.$vc.jumpToPage("/flow/itemOut?" + this.$vc.objToGetParam(JSON.parse(json)));
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
    