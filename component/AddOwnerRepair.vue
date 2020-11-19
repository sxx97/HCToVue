
        <template>
            <div id="addOwnerRepairModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">报修登记</h3>
                <div class="ibox-content">
                    <div>
                        <div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">报修类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addOwnerRepairInfo.repairType">
                                        <option selected disabled value="">必填，请选择报修类型</option>
                                        <option value="10001">水电报修</option>
                                        <option value="10002">管道报修</option>
                                        <option value="10003">其它</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">报修人</label>
                                <div class="col-sm-10">
                                    <input v-model="addOwnerRepairInfo.repairName" type="text" placeholder="必填，请填写报修人"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">联系方式</label>
                                <div class="col-sm-10">
                                    <input v-model="addOwnerRepairInfo.tel" type="number" placeholder="必填，请填写联系方式"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">房间编号</label>
                                <div class="col-sm-10">
                                    <input v-model="addOwnerRepairInfo.roomName" readonly type="text" placeholder="必填，请填写房间编号"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">预约时间</label>
                                <div class="col-sm-10">
                                    <input v-model="addOwnerRepairInfo.appointmentTime" type="text"
                                           placeholder="必填，请填写预约时间" class="form-control addAppointmentTime">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">报修内容</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="必填，请填写报修内容" cols="15" class="form-control"
                                              v-model="addOwnerRepairInfo.context"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveOwnerRepairInfo()"><i class="fa fa-check"></i>&nbsp;提交
                                </button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                                        data-dismiss="modal">取消
                                </button>
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
                props: {"callBackListener":"false","callBackFunction":"false"},
                components: {
                    
                },
                data () {
                    return {"addOwnerRepairInfo":{"repairId":"","repairType":"","repairName":"","tel":"","roomId":"","roomName":"","appointmentTime":"","context":""}}    
                },
                mounted() {
                (() =>{
            this._initAddOwnerRepairInfo();
         })()
(() =>{
            this.$vc.on('addOwnerRepair','openAddOwnerRepairModal',(_ownerInfo) =>{
                this._freshOwnerInfo(_ownerInfo);
                $('#addOwnerRepairModel').modal('show');
            });
        })()   
                },
                methods: {
                    addOwnerRepairValidate(){
                return this.$vc.validate.validate({
                    addOwnerRepairInfo:this.addOwnerRepairInfo
                },{
                    'addOwnerRepairInfo.repairType':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"报修类型不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,50",
                            errInfo:"报修类型错误"
                        },
                    ],
                        'addOwnerRepairInfo.repairName':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"报修人不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,50",
                            errInfo:"报修人名称必须在2至50字符之间"
                        },
                    ],
                        'addOwnerRepairInfo.tel':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"联系方式不能为空"
                        },
                        {
                            limit:"phone",
                            param:"",
                            errInfo:"联系方式格式不正确"
                        },
                    ],
                    'addOwnerRepairInfo.roomId':[
                    {
                            limit:"required",
                            param:"",
                            errInfo:"房间ID不能为空"
                        },
                    {
                            limit:"num",
                            param:"",
                            errInfo:"房间ID错误"
                        },
                    ],
                    'addOwnerRepairInfo.appointmentTime':[
                    {
                            limit:"required",
                            param:"",
                            errInfo:"预约时间不能为空"
                        },
                        {
                            limit:"dateTime",
                            param:"",
                            errInfo:"预约时间格式错误"
                        },
                    ],
                    'addOwnerRepairInfo.context':[
                    {
                            limit:"required",
                            param:"",
                            errInfo:"报修内容不能为空"
                        },
                        {
                            limit:"maxLength",
                            param:"2000",
                            errInfo:"报修内容不能超过2000"
                        },
                    ],
                });
            },saveOwnerRepairInfo:function(){
                if(!this.addOwnerRepairValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }

                this.addOwnerRepairInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if(this.$vc.notNull(this.$vc._thiscallBackListener)){
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.addOwnerRepairInfo);
                    $('#addOwnerRepairModel').modal('hide');
                    return ;
                }

                this.$vc.http.post(
                    'addOwnerRepair',
                    'save',
                    JSON.stringify(this.addOwnerRepairInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addOwnerRepairModel').modal('hide');
                            this.clearAddOwnerRepairInfo();
                            this.$vc.emit('ownerRepairManage','listOwnerRepair',{});

                            return ;
                        }
                        this.$vc.message(json);

                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                     });
            },clearAddOwnerRepairInfo:function(){
                this.addOwnerRepairInfo = {
                        repairType:'',
                        repairName:'',
                        tel:'',
                        roomId:'',
                        appointmentTime:'',
                        context:'',
                    };
            },_freshOwnerInfo:function(_ownerInfo){
                this.addOwnerRepairInfo.roomId = _ownerInfo.roomId;
                this.addOwnerRepairInfo.roomName = _ownerInfo.roomName;

                var param={
                    params:{
                        ownerId:_ownerInfo.ownerId,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        ownerTypeCd:'1001',
                        page:1,
                        row:1
                    }
                }
                //查询房间信息 业主信息
               this.$vc.http.get('addOwnerRepair',
                            'getOwner',
                             param,
                             (json,res) =>{
                                var _ownerInfos=JSON.parse(json);
                                var _ownerInfo = _ownerInfos.owners[0];
                               this.addOwnerRepairInfo.repairName= _ownerInfo.name;
                                this.addOwnerRepairInfo.tel= _ownerInfo.link;
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_initAddOwnerRepairInfo:function(){
                    this.addOwnerRepairInfo.appointmentTime = this.$vc.dateFormat(new Date().getTime());
                     $('.addAppointmentTime').datetimepicker({
                        language: 'zh-CN',
                        format: 'yyyy-mm-dd hh:ii:ss',
                        initTime: true,
                        initialDate: new Date(),
                        autoClose: 1,
                        todayBtn: true

                    });
                    $('.addAppointmentTime').datetimepicker()
                        .on('changeDate',  (ev) => {
                            var value = $(".addAppointmentTime").val();
                            this.addOwnerRepairInfo.appointmentTime = value;
                    });

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    