
        <template>
            <div id="component">

    <div class="java110_step">
        <div id="step"></div>
    </div>

    <!-- 选择 应用信息 -->
    <div v-if="addComplaintStepInfo.index == 0">
        <vc:create name="viewFloorInfo"
                   callBackListener="addComplaintStep"
                   callBackFunction="notify"
                   showAddFloorButton="false"
        ></vc:create>
    </div>
    <div v-if="addComplaintStepInfo.index == 1">
        <vc:create name="sellRoomSelectRoom"
                   callBackListener="addComplaintStep"
                   callBackFunction="notify"
        ></vc:create>
        <vc:create name="searchRoom"
                   emitChooseRoom="sellRoomSelectRoom"
                   emitLoadData="sellRoomOther"
                   roomFlag="1"
        ></vc:create>
    </div>
    <div v-if="addComplaintStepInfo.index == 2">
        <vc:create name="addComplainView"
                   callBackListener="addComplaintStep"
                   callBackFunction="notify"
        ></vc:create>
    </div>


    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-secondary" v-on:click="_prevStep()">上一步</button>
            <button v-if="addComplaintStepInfo.index != 2" type="button" class="btn btn-primary"
                    style="margin-left:10px;" v-on:click="_nextStep()">下一步
            </button>
            <button v-if="addComplaintStepInfo.index == 2" type="button" class="btn btn-primary"
                    style="margin-left:10px;" v-on:click="_finishStep()">完成
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
                return {"addComplaintStepInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._initStep();
        })()(function () {
            this.$vc.on("addComplaintStep", "notify", function (_info) {
                this.addComplaintStepInfo.infos[this.addComplaintStepInfo.index] = _info;
                if(this.addComplaintStepInfo.index == 0){
                    this.$vc.emit('searchRoom','listenerFloorInfo',_info);
                }
            });

        })()   
            },
            methods: {
                _initStep:function () {
                this.addComplaintStepInfo.$step = $("#step");
                this.addComplaintStepInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["选择楼栋", "选择房间", "投诉建议"]
                });
                this.addComplaintStepInfo.index = this.addComplaintStepInfo.$step.getIndex();
            },_prevStep:function () {
                this.addComplaintStepInfo.$step.prevStep();
                this.addComplaintStepInfo.index = this.addComplaintStepInfo.$step.getIndex();

                this.$vc.emit('viewFloorInfo', 'onIndex', this.addComplaintStepInfo.index);
                this.$vc.emit('sellRoomSelectRoom', 'onIndex', this.addComplaintStepInfo.index);
                this.$vc.emit('addComplainView', 'onIndex', this.addComplaintStepInfo.index);

            },_nextStep:function () {
                var _currentData = this.addComplaintStepInfo.infos[this.addComplaintStepInfo.index];
                if (_currentData == null || _currentData == undefined) {
                    this.$vc.message("请选择或填写必选信息");
                    return;
                }
                this.addComplaintStepInfo.$step.nextStep();
                this.addComplaintStepInfo.index = this.addComplaintStepInfo.$step.getIndex();

                this.$vc.emit('viewFloorInfo', 'onIndex', this.addComplaintStepInfo.index);
                this.$vc.emit('sellRoomSelectRoom', 'onIndex', this.addComplaintStepInfo.index);
                this.$vc.emit('addComplainView', 'onIndex', this.addComplaintStepInfo.index);

            },_finishStep:function () {


                var _currentData = this.addComplaintStepInfo.infos[this.addComplaintStepInfo.index];
                if (_currentData == null || _currentData == undefined) {
                    this.$vc.message("请选择或填写必选信息");
                    return;
                }

                /*var param = {
                    data: this.addComplaintStepInfo.infos
                }*/
                this.addComplaintStepInfo.infos[2].roomId = this.addComplaintStepInfo.infos[1].roomId;

                this.$vc.http.post(
                    'addComplaintStepBinding',
                    'binding',
                    JSON.stringify(this.addComplaintStepInfo.infos[2]),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        if (res.status == 200) {

                            this.$vc.message('处理成功', true);
                            //关闭model
                            this.$vc.jumpToPage("/flow/complaintFlow?" + this.$vc.objToGetParam(JSON.parse(json)));
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    