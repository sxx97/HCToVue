
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>车辆信息</h5>
            </div>
            <div class="ibox-content">
                <div>
                    <div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">车牌号</label>
                            <div class="col-sm-10">
                                <input v-model="addCarInfo.carNum" type="text" placeholder="必填，请填写车牌号" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">车品牌</label>
                            <div class="col-sm-10">
                                <input v-model="addCarInfo.carBrand" type="text" placeholder="必填，请填写车品牌，如 宝马X6" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">车类型</label>
                            <div class="col-sm-10">
                                <select class="custom-select" v-model="addCarInfo.carType">
                                    <option selected  disabled value="">必填，请选择类型</option>
                                    <option v-for="carType in carTypes" :key="carType.statusCd" v-bind:value="carType.statusCd">{{carType.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">颜色</label>
                            <div class="col-sm-10">
                                <input v-model="addCarInfo.carColor" type="text" placeholder="必填，请填写车颜色，如白色" class="form-control">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">备注</label>
                            <div class="col-sm-10">
                                <textarea v-model="addCarInfo.carRemark" type="text" placeholder="请填写备注信息" rows="3" class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
            



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
                props: {"callBackComponent":"true","callBackFunction":"true"},
                components: {
                    
                },
                data () {
                    return {"addCarInfo":{"flowComponent":"addCar","carNum":"","carBrand":"","carType":"","carColor":"","carRemark":""},"carTypes":[{"key":"9901","value":"家用小汽车"},{"key":"9902","value":"客车"},{"key":"9903","value":"货车"}]}    
                },
                mounted() {
                (() =>{
            var param={
                params: {
                    name: 'owner_car',
                    type: 'car_type'
                }
            }
            //发送get请求
            this.$vc.http.get('hireParkingSpace',
                'listCarType',
                param,
                 (json, res) => {
                    var carTypes = JSON.parse(json);

                    this.carTypes = carTypes;
                },  (errInfo, error) => {
                    console.log('请求失败处理');
                }
            );
        })()
(() =>{
            this.$vc.on('addCar', 'onIndex', (_index) =>{
                this.addCarInfo.index = _index;
            });

        })()   
                },
                methods: {
                    addCarValidate:function(){
                    return this.$vc.validate.validate({
                            addCarInfo:this.addCarInfo
                        },{

                            'addCarInfo.carNum':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"车牌号不能为空"
                                },
                                {
                                    limit:"maxin",
                                    param:"2,12",
                                    errInfo:"车牌号不正确"
                                }
                            ],
                            'addCarInfo.carBrand':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"车品牌不能为空"
                                },
                                {
                                    limit:"maxLength",
                                    param:"50",
                                    errInfo:"车品牌超出限制"
                                }
                            ],
                            'addCarInfo.carType':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"车类型不能为空"
                                }
                            ],
                            'addCarInfo.carColor':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"车颜色不能为空"
                                },
                                {
                                    limit:"maxLength",
                                    param:"12",
                                    errInfo:"车颜色超出限制"
                                }
                            ]
                        });
            },saveAddCarInfo:function(){
                if(this.addCarValidate()){
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackComponent,this.$vc._thiscallBackFunction, this.addCarInfo);
                    return ;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    