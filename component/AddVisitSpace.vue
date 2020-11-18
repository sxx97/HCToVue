
        <template>
            <div id="component">

    <div class="java110_step">
        <div id="step"></div>
    </div>

    <!-- 选择 应用信息 -->
    <div v-if="newVisitInfo.index == 0">

        <!-- 选择停车位 -->
        <vc:create name="viewVisitInfo"
                   callBackComponent="addVisitSpace"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="newVisitInfo.index == 1">
        <vc:create name="visitForOwner"
                   callBackListener="addVisitSpace"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="newVisitInfo.index == 2">
        <vc:create name="addVisitCase"
                   callBackComponent="addVisitSpace"
                   callBackFunction="notify"
        ></vc:create>
    </div>



    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-secondary" v-on:click="_prevStep()">上一步</button>
            <button v-if="newVisitInfo.index != 2" type="button" class="btn btn-primary"
                    style="margin-left:10px;"
                    v-on:click="_nextStep()">下一步
            </button>
            <button v-if="newVisitInfo.index == 2" type="button" class="btn btn-primary"
                    style="margin-left:10px;"
                    v-on:click="_addVisitFinish()">登记
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
                return {"newVisitInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._initStep();
        })()(function(){

           this.$vc.on("addVisitSpace", "notify", function(_info){
               console.log("侦听到index为 "+_info);
                this.newVisitInfo.infos[this.newVisitInfo.index] = _info;
            });
            this.$vc.on("addVisitSpace", "ownerId", function(_ownerId){
                this.newVisitInfo.infos[0]["ownerId"] = _ownerId;
            });
            this.$vc.on("addVisitSpace", "visitCase", function(_visitCase){
                this.newVisitInfo.infos[0]["visitCase"] = _visitCase;
            });

        })()   
            },
            methods: {
                _initStep:function(){
                this.newVisitInfo.$step = $("#step");
                this.newVisitInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["新增访客","选择目标业主","填写拜访事由"]
                });
                this.newVisitInfo.index = this.newVisitInfo.$step.getIndex();
            },_prevStep:function(){
                this.newVisitInfo.$step.prevStep();
                this.newVisitInfo.index = this.newVisitInfo.$step.getIndex();

                this.$vc.emit('addVisit', 'onIndex', this.newVisitInfo.index);
                this.$vc.emit('visitForOwner', 'onIndex', this.newVisitInfo.index);
                this.$vc.emit('addVisitCase', 'onIndex', this.newVisitInfo.index);

                // if(this.newVisitInfo.index == 1){
                //     this.$vc.emit('viewOwnerInfo','callBackOwnerInfo',{});
                // }

            },_nextStep:function(){
                var _currentData = this.newVisitInfo.infos[this.viewVisitInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.newVisitInfo.$step.nextStep();
                this.newVisitInfo.index = this.newVisitInfo.$step.getIndex();
                this.$vc.emit('addVisit', 'onIndex', this.newVisitInfo.index);
                this.$vc.emit('visitForOwner', 'onIndex', this.newVisitInfo.index);
                this.$vc.emit('addVisitCase', 'onIndex', this.newVisitInfo.index);

                // if(this.newVisitInfo.index == 1){
                //     this.$vc.emit('viewOwnerInfo','callBackOwnerInfo',{});
                // }

            },_addVisitFinish:function(){


                var _currentData = this.newVisitInfo.infos[this.newVisitInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.newVisitInfo.infos[0]['communityId']=this.$vc.getCurrentCommunity().communityId;
                var param = {
                    vName:this.newVisitInfo.infos[0]['vName'],
                    visitGender:this.newVisitInfo.infos[0]['visitGender'],
                    phoneNumber:this.newVisitInfo.infos[0]['phoneNumber'],
                    communityId:this.newVisitInfo.infos[0]['communityId'],
                    ownerId:this.newVisitInfo.infos[0]['ownerId'],
                    visitCase:this.newVisitInfo.infos[0]['visitCase'],
                    visitTime:this.newVisitInfo.infos[0]['visitTime'],
                    departureTime:this.newVisitInfo.infos[0]['departureTime']
                }
                console.log(param);
               this.$vc.http.post(
                   'addVisit',
                   'save',
                   JSON.stringify(param),
                   {
                       emulateJSON:true
                    },
                    function(json,res){
                       //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                       if(res.status == 200){
                           //关闭model
                           this.$vc.jumpToPage("/flow/visitFlow?" + this.$vc.objToGetParam(JSON.parse(json)));
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
    