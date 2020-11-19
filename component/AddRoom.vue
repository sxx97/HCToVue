
        <template>
            <div id = "addRoomModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加房间</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间编号</label>
                                <div class="col-sm-10"><input v-model="addRoomInfo.roomNum" type="text" placeholder="必填，请填写房间编号" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间楼层</label>
                                <div class="col-sm-10"><input v-model="addRoomInfo.layer" type="number" placeholder="必填，请填写房间楼层" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间单元</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addRoomInfo.unitId">
                                        <option selected  disabled value="">必填，请选择单元</option>
                                        <option v-for="(unit,index) in addRoomUnits" :key="index" v-bind:value="unit.unitId">{{unit.unitNum}}单元</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间数</label>
                                <div class="col-sm-10"><input v-model="addRoomInfo.section" type="number" placeholder="必填，请填写房间楼层" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间户型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addRoomInfo.apartment">
                                        <option selected disabled value="">必填，请选择房间户型</option>
                                        <option value="1010">一室两厅</option>
                                        <option value="2020">两室两厅</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">建筑面积</label>
                                <div class="col-sm-10"><input v-model="addRoomInfo.builtUpArea" type="number" placeholder="必填，请填写房间建筑面积" class="form-control"></div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间单价</label>
                                <div class="col-sm-10"><input v-model="addRoomInfo.unitPrice" type="number" placeholder="必填，请填写房间每平米单价" class="form-control"></div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间状态</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addRoomInfo.state">
                                        <option selected disabled value="">必填，请选择房间状态</option>
                                        <option value="2001">已出售</option>
                                        <option value="2002">未出售</option>
                                        <option value="2003">已交定金</option>
                                        <option value="2004">已出租</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><input v-model="addRoomInfo.remark" type="text" placeholder="请填写备注信息" class="form-control"></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="addRoom()" ><i class="fa fa-check"></i>&nbsp;保存</button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;" data-dismiss="modal">取消</button>
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
                props: {},
                components: {
                    
                },
                data () {
                    return {"addRoomUnits":[],"addRoomInfo":{"unitId":"","roomNum":"","layer":"","section":"","apartment":"","builtUpArea":"","unitPrice":"","state":"","remark":"","communityId":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
             this.$vc.on('addRoom','addRoomModel',(_params) =>{
                this.refreshAddRoomInfo();
                this.loadUnitsFromAddRoom(_params.floorId);
                $('#addRoomModel').modal('show');
                this.addRoomInfo.floorId = _params.floorId;
                this.addRoomInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
                },
                methods: {
                    loadUnitsFromAddRoom:function(_floorId){
                this.addRoomUnits = [];
                var param = {
                    params:{
                        floorId:_floorId,
                        communityId:this.$vc.getCurrentCommunity().communityId
                    }
                }
                this.$vc.http.get(
                    'addRoom',
                    'loadUnits',
                     param,
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            var tmpUnits = JSON.parse(json);
                            this.addRoomUnits = tmpUnits;
                            /*if(tmpUnits == null || tmpUnits.length == 0){
                                return ;
                            }
                            for(var unitIndex = 0; unitIndex < tmpUnits.length;unitIndex++){
                               this.addRoomInfo.units[unitIndex] = tmpUnits[unitIndex];
                            }*/
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },addRoomValidate:function(){
                        return this.$vc.validate.validate({
                            addRoomInfo:this.addRoomInfo
                        },{
                            'addRoomInfo.unitId':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"写字楼房间不能为空"
                                }
                            ],
                            'addRoomInfo.roomNum':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"房间编号不能为空"
                                },
                                {
                                    limit:"maxLength",
                                    param:"12",
                                    errInfo:"房间编号长度不能超过12位"
                                },
                            ],
                            'addRoomInfo.layer':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"房间楼层高度不能为空"
                                },
                                {
                                    limit:"num",
                                    param:"",
                                    errInfo:"房间楼层高度必须为数字"
                                }
                            ],
                            'addRoomInfo.section':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"房间数不能为空"
                                },
                                {
                                    limit:"num",
                                    param:"",
                                    errInfo:"房间数必须为数字"
                                }
                            ],
                            'addRoomInfo.apartment':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"户型不能为空"
                                }
                            ],
                            'addRoomInfo.state':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"房间状态不能为空"
                                }
                            ],
                            'addRoomInfo.builtUpArea':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"建筑面积不能为空"
                                },
                                {
                                    limit:"money",
                                    param:"",
                                    errInfo:"建筑面积错误，如 300.00"
                                },
                                {
                                  limit:"maxLength",
                                  param:"12",
                                  errInfo:"建筑面积数字长度不能超过6位"
                                }
                            ],
                            'addRoomInfo.unitPrice':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"房间单价不能为空"
                                },
                                {
                                    limit:"money",
                                    param:"",
                                    errInfo:"房间单价错误 如 300.00"
                                },
                                 {
                                   limit:"maxLength",
                                   param:"12",
                                   errInfo:"房间单价数字长度不能超过12位"
                                 }
                            ],
                            'addRoomInfo.remark':[
                                {
                                    limit:"maxLength",
                                    param:"200",
                                    errInfo:"备注长度不能超过200位"
                                },
                            ]

                        });
             },addRoom:function(){
                if(!this.addRoomValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }

                this.$vc.http.post(
                    'addRoom',
                    'save',
                    JSON.stringify(this.addRoomInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addRoomModel').modal('hide');
                            this.$vc.emit('room','loadData',{
                                floorId:this.addRoomInfo.floorId
                            });
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },refreshAddRoomInfo:function(){
                this.addRoomInfo= {
                  unitId:'',
                  roomNum:'',
                  layer:'',
                  section:'',
                  apartment:'',
                  builtUpArea:'',
                  unitPrice:'',
                  remark:'',
                  state:'',
                  communityId:''
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    