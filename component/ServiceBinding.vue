
        <template>
            <div id="component" >

    <div class="java110_step">
        <div id="step" ></div>
    </div>

    <!-- 选择 应用信息 -->
    <div v-if="serviceBindingInfo.index == 0">
        <vc:create name="viewAppInfo"
                   callBackListener="serviceBinding"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="serviceBindingInfo.index == 1">
        <vc:create name="viewServiceInfo"
                   callBackListener="serviceBinding"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="serviceBindingInfo.index == 2">
        <vc:create name="addRouteView"
                   callBackListener="serviceBinding"
                   callBackFunction="notify"
        ></vc:create>
    </div>



    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-secondary" v-on:click="_prevStep()">上一步</button>
            <button v-if="serviceBindingInfo.index != 2" type="button" class="btn btn-primary" style="margin-left:10px;" v-on:click="_nextStep()">下一步</button>
            <button v-if="serviceBindingInfo.index == 2" type="button" class="btn btn-primary" style="margin-left:10px;" v-on:click="_finishStep()">完成</button>
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
                return {"serviceBindingInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._initStep();
        })()(function () {
            this.$vc.on("serviceBinding", "notify", function (_info) {
                this.serviceBindingInfo.infos[this.serviceBindingInfo.index] = _info;
            });

        })()   
            },
            methods: {
                _initStep:function () {
                this.serviceBindingInfo.$step = $("#step");
                this.serviceBindingInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["选择应用", "选择服务", "扩展信息"]
                });
                this.serviceBindingInfo.index = this.serviceBindingInfo.$step.getIndex();
            },_prevStep:function () {
                this.serviceBindingInfo.$step.prevStep();
                this.serviceBindingInfo.index = this.serviceBindingInfo.$step.getIndex();

                this.$vc.emit('viewAppInfo', 'onIndex', this.serviceBindingInfo.index);
                this.$vc.emit('viewServiceInfo', 'onIndex', this.serviceBindingInfo.index);
                this.$vc.emit('addRouteView', 'onIndex', this.serviceBindingInfo.index);

            },_nextStep:function () {
                var _currentData = this.serviceBindingInfo.infos[this.serviceBindingInfo.index];
                if (_currentData == null || _currentData == undefined) {
                    this.$vc.message("请选择或填写必选信息");
                    return;
                }
                this.serviceBindingInfo.$step.nextStep();
                this.serviceBindingInfo.index = this.serviceBindingInfo.$step.getIndex();

                this.$vc.emit('viewAppInfo', 'onIndex', this.serviceBindingInfo.index);
                this.$vc.emit('viewServiceInfo', 'onIndex', this.serviceBindingInfo.index);
                this.$vc.emit('addRouteView', 'onIndex', this.serviceBindingInfo.index);

            },_finishStep:function () {


                var _currentData = this.serviceBindingInfo.infos[this.serviceBindingInfo.index];
                if (_currentData == null || _currentData == undefined) {
                    this.$vc.message("请选择或填写必选信息");
                    return;
                }

                var param = {
                    data: this.serviceBindingInfo.infos
                }

                this.$vc.http.post(
                    'serviceBinding',
                    'binding',
                    JSON.stringify(param),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        if (res.status == 200) {

                            this.$vc.message('处理成功', true);
                            //关闭model
                            this.$vc.jumpToPage("/flow/serviceRegisterFlow?" + this.$vc.objToGetParam(JSON.parse(json)));
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
            .wizard > .steps > ul > li {
    width: 33.33%;
}

.java110_step{
    width:80%;
    margin: 20px auto 50px auto;
}

        </style>
    