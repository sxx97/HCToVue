
        <template>
            <div id="component" >

    <div class="java110_step">
        <div id="step" ></div>
    </div>

    <!-- 选择 应用信息 -->
   <div v-if="addRoomBindingInfo.index == 0">
        <vc:create name="viewFloorInfo"
                   callBackListener="addRoomBinding"
                   callBackFunction="notify"
        ></vc:create>
    </div>
<!--<div v-if="addRoomBindingInfo.index == 1">
        <vc:create name="viewUnitInfo"
                   callBackListener="addRoomBinding"
                   callBackFunction="notify"
        ></vc:create>
    </div>-->
<div v-if="addRoomBindingInfo.index == 1">
        <vc:create name="addRoomView"
                   callBackListener="addRoomBinding"
                   callBackFunction="notify"
        ></vc:create>
    </div>



    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-secondary" v-on:click="_prevStep()">上一步</button>
            <button v-if="addRoomBindingInfo.index != 1" type="button" class="btn btn-primary" style="margin-left:10px;" v-on:click="_nextStep()">下一步</button>
            <button v-if="addRoomBindingInfo.index == 1" type="button" class="btn btn-primary" style="margin-left:10px;" v-on:click="_finishStep()">完成</button>
        </div>
    </div>

</div>

        </template>
        <script>
            
            import ViewFloorInfo from '@/component/ViewFloorInfo.vue';import ViewUnitInfo from '@/component/ViewUnitInfo.vue';import AddRoomView from '@/component/AddRoomView.vue';



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
                    ViewFloorInfo,ViewUnitInfo,AddRoomView
                },
                data () {
                    return {"addRoomBindingInfo":{"$step":{},"index":0,"infos":[]}}    
                },
                mounted() {
                (() =>{
            this._initStep();
        })()
(() =>{
            this.$vc.on("addRoomBinding", "notify", (_info) =>{
                let stepIndex = this.addRoomBindingInfo.index;
                _info.communityId=this.$vc.getCurrentCommunity().communityId;

                if (stepIndex === 1) {
                    stepIndex += 1;
                }
                this.addRoomBindingInfo.infos[stepIndex] = _info;
                if (stepIndex === 0) {
                    this.getUnitInfo();
                }
            });

        })()   
                },
                methods: {
                    getUnitInfo() {
                var param = {
                    params:{
                        page:0,
                        row:1,
                        communityId: this.$vc.getCurrentCommunity().communityId,
                        floorId: this.addRoomBindingInfo.infos[0].floorId,
                        name: "",
                    }
                };

                //发送get请求
                this.$vc.http.get('chooseUnit',
                    'list',
                    param,
                    (json) =>{
                        var _unitInfo = JSON.parse(json);
                        if (_unitInfo && _unitInfo.length > 0) {
                            this.addRoomBindingInfo.infos[1] = _unitInfo[0];
                            this.addRoomBindingInfo.infos[1]['flowComponent'] = 'viewUnitInfo';
                        } else {
                            this.addRoomBindingInfo.infos[1] = [];
                        }
                    },() =>{
                        console.log('请求失败处理');
                    }
                );
            },_initStep:function(){
                this.addRoomBindingInfo.$step = $("#step");
                this.addRoomBindingInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["选择楼","添加房间"]
                });
                this.addRoomBindingInfo.index = this.addRoomBindingInfo.$step.getIndex();
            },_prevStep:function(){
                this.addRoomBindingInfo.$step.prevStep();
                this.addRoomBindingInfo.index = this.addRoomBindingInfo.$step.getIndex();

                this.$vc.emit('viewFloorInfo', 'onIndex', this.addRoomBindingInfo.index);
                // this.$vc.emit('viewUnitInfo', 'onIndex', this.addRoomBindingInfo.index);
                this.$vc.emit('addRoomView', 'onIndex', this.addRoomBindingInfo.index);

            },_nextStep:function(){
                var _currentData = this.addRoomBindingInfo.infos[this.addRoomBindingInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.addRoomBindingInfo.$step.nextStep();
                this.addRoomBindingInfo.index = this.addRoomBindingInfo.$step.getIndex();

                 this.$vc.emit('viewFloorInfo', 'onIndex', this.addRoomBindingInfo.index);
                this.$vc.emit('viewUnitInfo', 'onIndex', this.addRoomBindingInfo.index);
                this.$vc.emit('addRoomView', 'onIndex', this.addRoomBindingInfo.index);

            },_finishStep:function(){


                var _currentData = this.addRoomBindingInfo.infos[this.addRoomBindingInfo.index];
                if ('' == this.addRoomViewInfo.unitPrice || null == this.addRoomViewInfo.unitPrice){
                    this.addRoomViewInfo.unitPrice='0';
                }
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }

                var param = {
                    data:this.addRoomBindingInfo.infos
                }

               this.$vc.http.post(
                   'addRoomBindingBinding',
                   'binding',
                   JSON.stringify(param),
                   {
                       emulateJSON:true
                    },
                    (json,res) =>{
                       if(res.status == 200){

                           this.$vc.message('处理成功',true);
                           //关闭model
                           var _tmpResJson = JSON.parse(json);
                          /* _tmpResJson[floorName] = this._getFloorName();*/
                           this.$vc.jumpToPage("/flow/roomFlow");
                           return ;
                       }
                       this.$vc.message(json);
                    },
                    (errInfo,error) =>{
                       console.log('请求失败处理');

                       this.$vc.message(errInfo);
                    });
            },_getFloorName:function(){
                var _tmpInfos = this.addRoomBindingInfo.infos;

                for(var _tmpIndex = 0 ; _tmpIndex < _tmpInfos.length; _tmpIndex ++){
                    if(_tmpInfos[_tmpIndex].flowComponent == 'viewFloorInfo'){
                        return _tmpInfos[_tmpIndex].floorName;
                    }
                }

                return "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    