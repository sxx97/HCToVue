
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>添加房间</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">

                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">房间编号</label>
                    <div class="col-sm-10">
                        <input v-model="addRoomViewInfo.roomNum" type="text" placeholder="必填，请填写房间编号"
                               class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">房间楼层</label>
                    <div class="col-sm-10">
                        <input v-model="addRoomViewInfo.layer" type="text" placeholder="必填，请填写房间楼层"
                               class="form-control">
                    </div>
                </div>
               <!-- <div class="form-group row">
                    <label class="col-sm-2 col-form-label">房间数</label>
                    <div class="col-sm-10">
                        <input v-model="addRoomViewInfo.section" type="text" placeholder="必填，请填写房间数"
                               class="form-control">
                    </div>
                </div>-->
                <!--
                TODO: 暂时隐藏
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">房间户型</label>
                    <div class="col-sm-5" style="display: inline">
                        <select class="custom-select" v-model="addRoomViewInfo.apartment1">
                            <option selected disabled value="">必填，请选择房间户型</option>
                            <option value="10">一室</option>
                            <option value="20">两室</option>
                            <option value="30">三室</option>
                            <option value="40">四室</option>
                            <option value="50">五室</option>
                            <option value="60">六室</option>
                            <option value="70">七室</option>
                            <option value="80">八室</option>
                        </select>
                    </div>
                    <div class="col-sm-5" style="display: inline">
                    <select class="custom-select" v-model="addRoomViewInfo.apartment2">
                        <option selected disabled value="">必填，请选择房间户型</option>
                        <option value="101">一厅</option>
                        <option value="102">两厅</option>
                        <option value="103">三厅</option>
                        <option value="104">四厅</option>
                        <option value="105">五厅</option>
                        <option value="106">六厅</option>
                        <option value="107">七厅</option>
                        <option value="108">八厅</option>

                    </select>
                    </div>
                </div>-->
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">建筑面积(平方)</label>
                    <div class="col-sm-10">
                        <input v-model="addRoomViewInfo.builtUpArea" type="text" placeholder="必填，请填写建筑面积! 平方"
                               class="form-control">
                    </div>
                </div>
                <!--
                TODO: 暂时隐藏
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">房间单价</label>
                    <div class="col-sm-10">
                        <input v-model="addRoomViewInfo.unitPrice" type="text" placeholder="请填写房间单价(元)"
                               class="form-control">
                    </div>
                </div>-->
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">备注</label>
                    <div class="col-sm-10">
                        <textarea placeholder="选填，请填写备注" class="form-control"
                                  v-model="addRoomViewInfo.remark"></textarea></div>
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
                props: {"callBackListener":"false","callBackFunction":"false"},
                components: {
                    
                },
                data () {
                    return {"addRoomViewInfo":{"flowComponent":"addRoomView","roomNum":"","layer":"","section":"0","apartment":"","apartment1":"","apartment2":"","builtUpArea":"","unitPrice":"","state":"2002","remark":"","communityId":""}}    
                },
                mounted() {
                (() => {

})()
(() => {

            this.$vc.on('addRoomViewInfo', 'onIndex',
            (_index) => {
                this.addRoomViewInfo.index = _index;
            });
        })()   
                },
                methods: {
                    addRoomValidate() {
                this.addRoomViewInfo.apartment = this.addRoomViewInfo.apartment1 + this.addRoomViewInfo.apartment2;
                return this.$vc.validate.validate({
                    addRoomViewInfo: this.addRoomViewInfo
                },
                {
                    'addRoomViewInfo.roomNum': [{
                        limit: "required",
                        param: "",
                        errInfo: "房间编号不能为空"
                    },
                    {
                        limit: "maxLength",
                        param: "12",
                        errInfo: "房间编号长度不能超过12位"
                    },
                    ],
                    'addRoomViewInfo.layer': [{
                        limit: "required",
                        param: "",
                        errInfo: "房间楼层不能为空"
                    },
                    {
                        limit: "num",
                        param: "",
                        errInfo: "房间楼层高度必须为数字"
                    },
                    ],
                    /*
                    TODO: 暂时隐藏功能
                    'addRoomViewInfo.apartment': [{
                        limit: "required",
                        param: "",
                        errInfo: "房间户型不能为空"
                    },
                    {
                        limit: "maxLength",
                        param: "50",
                        errInfo: "房间户型不能大于50"
                    },
                    ],*/
                    'addRoomViewInfo.builtUpArea': [{
                        limit: "required",
                        param: "",
                        errInfo: "建筑面积不能为空"
                    },
                    {
                        limit: "money",
                        param: "",
                        errInfo: "建筑面积错误，如 300.00"
                    },
                    ],
                    'addRoomViewInfo.state': [{
                        limit: "required",
                        param: "",
                        errInfo: "房间状态不能为空"
                    },
                    {
                        limit: "maxLength",
                        param: "12",
                        errInfo: "房间状态 不能超过12位"
                    },
                    ],
                    'addRoomViewInfo.remark': [{
                        limit: "maxLength",
                        param: "200",
                        errInfo: "备注内容不能超过200"
                    },
                    ],

                });
            },saveAddRoomInfo:function() {
                if (this.addRoomValidate()) {
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addRoomViewInfo);
                    return;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    