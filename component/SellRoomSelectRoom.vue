
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>房间信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="openSearchRoomModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择房间</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >房间ID：</label>
                            <label class="">{{roomInfo.roomId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">房间编号：</label>
                            <label class="">{{roomInfo.roomNum}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >单元：</label>
                            <label class="">{{roomInfo.unitNum}}单元</label>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >楼层：</label>
                            <label class="">{{roomInfo.layer}}层</label>
                        </div>
                    </div>
                    <!--<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">房间数：</label>
                            <label class="">{{roomInfo.section}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >户型：</label>
                            <label class="">{{roomInfo.apartmentName}}</label>
                        </div>
                    </div>-->
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >建筑面积：</label>
                            <label class="">{{roomInfo.builtUpArea}}平方米</label>
                        </div>
                    </div>
                    <!--<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">单价：</label>
                            <label class="">{{roomInfo.unitPrice}} 元</label>
                        </div>
                    </div>-->
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >创建员工：</label>
                            <label class="">{{roomInfo.userName}}</label>
                        </div>
                    </div>

                </div>
                <!--<div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >建筑面积：</label>
                            <label class="">{{roomInfo.builtUpArea}}平方米</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">单价：</label>
                            <label class="">{{roomInfo.unitPrice}} 元</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >创建员工：</label>
                            <label class="">{{roomInfo.userName}}</label>
                        </div>
                    </div>

                </div>-->
            </div>
        </div>
    </div>
    <!-- 这里取消 -->
   <!-- <vc:create name="searchRoom"
               emitChooseRoom="sellRoomSelectRoom"
               emitLoadData="sellRoomOther"
               roomFlag="1"
    ></vc:create>-->
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
                props: {"callBackListener":"true","callBackFunction":"true"},
                components: {
                    
                },
                data () {
                    return {"roomInfo":{"flowComponent":"sellRoomSelectRoom","roomId":"","roomNum":"","unitNum":"","layer":"","section":"","apartment":"","apartmentName":"","builtUpArea":"","unitPrice":"","userName":""}}    
                },
                mounted() {
                (() =>{

        })()
(() =>{
            this.$vc.on('sellRoomSelectRoom','chooseRoom',(_room) =>{
                this.$vc.copyObject(_room, this.roomInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.roomInfo);
            });

        })()   
                },
                methods: {
                    showState:function(_state){
                if(_state == '2001'){
                    return "房间已售";
                }else if(_state == '2002'){
                    return "房间未售";
                }else if(_state == '2003'){
                    return "已交定金";
                }
                else if(_state == '2004'){
                    return "已出租";
                }else{
                    return "未知";
                }
            },openSearchRoomModel(){
                this.$vc.emit('searchRoom','openSearchRoomModel',{});
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    