
        <template>
            <div id="component">

    <div class="java110_step">
        <div id="step"></div>
    </div>

    <!-- 选择 应用信息 -->
    <div v-if="devServiceProvideInfo.index == 0">
        <vc:create name="viewServiceInfo"
                   callBackListener="devServiceProvide"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="devServiceProvideInfo.index == 1">
        <vc:create name="devServiceProvideView"
                   callBackListener="devServiceProvide"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="devServiceProvideInfo.index == 2">
        <vc:create name="serviceProvideRemarkView"
                   callBackListener="devServiceProvide"
                   callBackFunction="notify"
        ></vc:create>
    </div>


    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-secondary" v-on:click="_prevStep()">上一步</button>
            <button v-if="devServiceProvideInfo.index != 2" type="button" class="btn btn-primary"
                    style="margin-left:10px;" v-on:click="_nextStep()">下一步
            </button>
            <button v-if="devServiceProvideInfo.index == 2" type="button" class="btn btn-primary"
                    style="margin-left:10px;" v-on:click="_finishStep()">完成
            </button>
        </div>
    </div>

</div>

        </template>
        <script>
            
            import ViewServiceInfo from '@/component/ViewServiceInfo.vue';import DevServiceProvideView from '@/component/DevServiceProvideView.vue';import ServiceProvideRemarkView from '@/component/ServiceProvideRemarkView.vue';



            const OWNER_TYPE = {
                OWNER: '1001',
                TENANT: '1003'
            };
            // 考核类型
            const ASSESSMENT_TYPE = {
                BUSINESS: 2,
                COMMON: 1,
                SYSTEM: 3,
            };
            
            // 删除时的类型
            const DELETE_TYPE = {
                TABLE: 1, // 删除通用考核表
                BUSINESS_ITEM: 2,  // 删除业务考核项
                COMMON_ITEM: 3, // 删除通用考核项
            }
            // 考核人员
            const ASSESSMENT_OBJECT_TYPE = {
                STAFF: 1,
                SUPERVISOR: 2,
                MANAGER: 3,
            }
            
            const AUTO_ASSESSMENT_TYPE = {
                INSPECTION: 1,
                WORK_ORDER: 2,
                ATTENDANCE: 3,
            }
            
            // 考核项目
            const ASSESSMENT_ITEM_TYPE = {
                COMMON_ITEM: 1,
                BUSINESS_ITEM: 2,
            }
            
            const DEFAULT_PAGE = 1;
            const DEFAULT_ROWS = 10;

            
            export default {
                props: {},
                components: {
                    ViewServiceInfo,DevServiceProvideView,ServiceProvideRemarkView
                },
                data () {
                    return {"devServiceProvideInfo":{"$step":{},"index":0,"infos":[]}}    
                },
                mounted() {
                (() =>{
            this._initStep();
        })()
(() =>{
            this.$vc.on("devServiceProvide", "notify", (_info) =>{
                this.devServiceProvideInfo.infos[this.devServiceProvideInfo.index] = _info;
            });

        })()   
                },
                methods: {
                    _initStep:function(){
                this.devServiceProvideInfo.$step = $("#step");
                this.devServiceProvideInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["选择服务","开发服务实现","备注信息"]
                });
                this.devServiceProvideInfo.index = this.devServiceProvideInfo.$step.getIndex();
            },_prevStep:function(){
                this.devServiceProvideInfo.$step.prevStep();
                this.devServiceProvideInfo.index = this.devServiceProvideInfo.$step.getIndex();

                this.$vc.emit('viewServiceInfo', 'onIndex', this.devServiceProvideInfo.index);
this.$vc.emit('devServiceProvideView', 'onIndex', this.devServiceProvideInfo.index);
this.$vc.emit('serviceProvideRemarkView', 'onIndex', this.devServiceProvideInfo.index);

            },_nextStep:function(){
                var _currentData = this.devServiceProvideInfo.infos[this.devServiceProvideInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.devServiceProvideInfo.$step.nextStep();
                this.devServiceProvideInfo.index = this.devServiceProvideInfo.$step.getIndex();

                 this.$vc.emit('viewServiceInfo', 'onIndex', this.devServiceProvideInfo.index);
this.$vc.emit('devServiceProvideView', 'onIndex', this.devServiceProvideInfo.index);
this.$vc.emit('serviceProvideRemarkView', 'onIndex', this.devServiceProvideInfo.index);

            },_finishStep:function(){


                var _currentData = this.devServiceProvideInfo.infos[this.devServiceProvideInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }

                var param = {
                    data:this.devServiceProvideInfo.infos
                }

               this.$vc.http.post(
                   'devServiceProvideBinding',
                   'binding',
                   JSON.stringify(param),
                   {
                       emulateJSON:true
                    },
                    (json,res) =>{
                       if(res.status == 200){

                           this.$vc.message('处理成功',true);
                           //关闭model
                           this.$vc.jumpToPage("/flow/serviceProvideFlow?" + this.$vc.objToGetParam(JSON.parse(json)));
                           return ;
                       }
                       this.$vc.message(json);
                    },
                    (errInfo,error) =>{
                       console.log('请求失败处理');

                       this.$vc.message(errInfo);
                    });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    