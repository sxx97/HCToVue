
        <template>
            <div id="component">

    <div class="java110_step">
        <div id="step"></div>
    </div>

    <!-- 选择 应用信息 -->
    <div v-if="configMenuInfo.index == 0">
        <vc:create name="viewMenuGroupInfo"
                   callBackListener="configMenu"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="configMenuInfo.index == 1">
        <vc:create name="addMenuView"
                   callBackListener="configMenu"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="configMenuInfo.index == 2">
        <vc:create name="addPrivilegeView"
                   callBackListener="configMenu"
                   callBackFunction="notify"
        ></vc:create>
    </div>


    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-secondary" v-on:click="_prevStep()">上一步</button>
            <button v-if="configMenuInfo.index != 2" type="button" class="btn btn-primary" style="margin-left:10px;"
                    v-on:click="_nextStep()">下一步
            </button>
            <button v-if="configMenuInfo.index == 2" type="button" class="btn btn-primary" style="margin-left:10px;"
                    v-on:click="_finishStep()">完成
            </button>
        </div>
    </div>

</div>

        </template>
        <script>
            
            import ViewMenuGroupInfo from '@/component/ViewMenuGroupInfo.vue';import AddMenuView from '@/component/AddMenuView.vue';import AddPrivilegeView from '@/component/AddPrivilegeView.vue';



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
                    ViewMenuGroupInfo,AddMenuView,AddPrivilegeView
                },
                data () {
                    return {"configMenuInfo":{"$step":{},"index":0,"infos":[]}}    
                },
                mounted() {
                (() =>{
            this._initStep();
        })()
(() =>{
            this.$vc.on("configMenu", "notify", (_info) =>{
                this.configMenuInfo.infos[this.configMenuInfo.index] = _info;
            });

        })()   
                },
                methods: {
                    _initStep:function(){
                this.configMenuInfo.$step = $("#step");
                this.configMenuInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["选择菜单组","菜单信息","权限信息"]
                });
                this.configMenuInfo.index = this.configMenuInfo.$step.getIndex();
            },_prevStep:function(){
                this.configMenuInfo.$step.prevStep();
                this.configMenuInfo.index = this.configMenuInfo.$step.getIndex();

                this.$vc.emit('viewMenuGroupInfo', 'onIndex', this.configMenuInfo.index);
                this.$vc.emit('addMenuView', 'onIndex', this.configMenuInfo.index);
                this.$vc.emit('addPrivilegeView', 'onIndex', this.configMenuInfo.index);

            },_nextStep:function(){
                var _currentData = this.configMenuInfo.infos[this.configMenuInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.configMenuInfo.$step.nextStep();
                this.configMenuInfo.index = this.configMenuInfo.$step.getIndex();

                 this.$vc.emit('viewMenuGroupInfo', 'onIndex', this.configMenuInfo.index);
                this.$vc.emit('addMenuView', 'onIndex', this.configMenuInfo.index);
                this.$vc.emit('addPrivilegeView', 'onIndex', this.configMenuInfo.index);

            },_finishStep:function(){


                var _currentData = this.configMenuInfo.infos[this.configMenuInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }

                var param = {
                    data:this.configMenuInfo.infos
                }

               this.$vc.http.post(
                   'configMenuBinding',
                   'binding',
                   JSON.stringify(param),
                   {
                       emulateJSON:true
                    },
                    (json,res) =>{
                       if(res.status == 200){

                           this.$vc.message('处理成功',true);
                           //关闭model
                           this.$vc.jumpToPage("/flow/menuFlow?" + this.$vc.objToGetParam(JSON.parse(json)));
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
    