
        <template>
            <div id = "editRoomModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改房间</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间编号</label>
                                <div class="col-sm-10"><input v-model="editRoomInfo.roomNum" type="text" placeholder="必填，请填写房间编号" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间楼层</label>
                                <div class="col-sm-10"><input v-model="editRoomInfo.layer" type="number" placeholder="必填，请填写房间楼层" class="form-control"></div>
                            </div>
                            <!--<div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间单元</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editRoomInfo.unitId">
                                        <option selected  disabled value="">必填，请选择单元</option>
                                        <option v-for="(unit,index) in editRoomUnits" :key="index" v-bind:value="unit.unitId">{{unit.unitNum}}单元</option>
                                    </select>
                                </div>
                            </div>-->
                            <!--<div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间数</label>
                                <div class="col-sm-10"><input v-model="editRoomInfo.section" type="number" placeholder="必填，请填写房间楼层" class="form-control"></div>
                            </div>-->
                            <!--
                            TODO: 暂时隐藏
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间户型</label>
                                <div class="col-sm-5" style="display: inline">
                                    <select class="custom-select" v-model="editRoomInfo.apartment1">
                                        <option selected  value="">必填，请选择房间户型</option>
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
                                    <select class="custom-select" v-model="editRoomInfo.apartment2">
                                        <option selected  value="">必填，请选择房间户型</option>
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
                                <label class="col-sm-2 col-form-label">建筑面积</label>
                                <div class="col-sm-10"><input v-model="editRoomInfo.builtUpArea" type="number" placeholder="必填，请填写房间建筑面积! 平方" class="form-control"></div>
                            </div>

                            <!--
                            TODO: 暂时隐藏
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间单价</label>
                                <div class="col-sm-10"><input v-model="editRoomInfo.unitPrice" type="number" placeholder="请填写房间单价! 万元" class="form-control"></div>
                            </div>-->
                           <!-- <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间状态</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" disabled="disabled" readonly="true" v-model="editRoomInfo.state">
                                        <option selected  value="">必填，请选择房间状态</option>
                                        <option value="2001">已出售</option>
                                        <option value="2002">未出售</option>
                                        <option value="2003">已交定金</option>
                                        <option value="2004">已出租</option>
                                    </select>
                                </div>
                            </div>-->
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><input v-model="editRoomInfo.remark" type="text" placeholder="请填写备注信息" class="form-control"></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editRoom()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"editRoomUnits":"","editRoomInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('editRoom','openEditRoomModal',function(_room){
                 this.$vc.copyObject(_room,this.editRoomInfo);
                 this.loadUnitsFromEditRoom(_room.floorId);
                 $('#editRoomModel').modal('show');

                this.editRoomInfo.floorId = _room.floorId;
                this.editRoomInfo.communityId = this.$vc.getCurrentCommunity().communityId;

             });
        })()   
            },
            methods: {
                loadUnitsFromEditRoom:function(_floorId){
                this.editRoomUnits = [];
                var param = {
                    params:{
                        floorId:_floorId,
                        communityId:this.$vc.getCurrentCommunity().communityId
                    }
                }
                this.$vc.http.get(
                    'editRoom',
                    'loadUnits',
                     param,
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            var tmpUnits = JSON.parse(json);
                            this.editRoomUnits = tmpUnits;

                            if('0.00' == this.editRoomInfo.unitPrice){
                                this.editRoomInfo.unitPrice='';
                            }
                            this.editRoomInfo.apartment1=this.editRoomInfo.apartment.substr(0,2);
                            this.editRoomInfo.apartment2=this.editRoomInfo.apartment.substr(2,5);
                            /*if(tmpUnits == null || tmpUnits.length == 0){
                                return ;
                            }
                            for(var unitIndex = 0; unitIndex < tmpUnits.length;unitIndex++){
                               this.editRoomInfo.units[unitIndex] = tmpUnits[unitIndex];
                            }*/
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },editRoomValidate:function(){
                        return this.$vc.validate.validate({
                            editRoomInfo:this.editRoomInfo
                        },{
                            'editRoomInfo.unitId':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"写字楼房间不能为空"
                                }
                            ],
                            'editRoomInfo.roomNum':[
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
                            'editRoomInfo.layer':[
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
                            /*'editRoomInfo.section':[
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
                            ],*/
                            'editRoomInfo.state':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"房间状态不能为空"
                                }
                            ],
                            'editRoomInfo.builtUpArea':[
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
                            /*'editRoomInfo.unitPrice':[
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
                            ],*/
                            'editRoomInfo.remark':[
                                {
                                    limit:"maxLength",
                                    param:"200",
                                    errInfo:"备注长度不能超过200位"
                                },
                            ]

                        });
             },editRoom:function(){
                if(!this.editRoomValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }
                this.editRoomInfo.apartment=this.editRoomInfo.apartment1+this.editRoomInfo.apartment2;
                if ('' == this.editRoomInfo.unitPrice || null == this.editRoomInfo.unitPrice){
                    this.editRoomInfo.unitPrice='0';
                }
                this.$vc.http.post(
                    'editRoom',
                    'update',
                    JSON.stringify(this.editRoomInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#editRoomModel').modal('hide');
                            this.$vc.emit('room','loadData',{
                                floorId:this.editRoomInfo.floorId
                            });
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },refreshEditRoomInfo:function(){
                this.editRoomInfo= {
                  unitId:'',
                  roomNum:'',
                  layer:'',
                  section:'0',
                  apartment:'',
                  builtUpArea:'',
                  unitPrice:'',
                  state:'',
                  remark:'',
                  communityId:''
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    