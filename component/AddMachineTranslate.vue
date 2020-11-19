
        <template>
            <div id = "addMachineTranslateModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加设备同步</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <!--<div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼名称</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.name" type="text" placeholder="必填，请填写名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼编号</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.floorNum" type="email" placeholder="必填，请填写编号" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.remark" type="tel" placeholder="可填，请填写备注" class="form-control"></div>
                            </div>-->

                            <div class="form-group row">
         <label class="col-sm-2 col-form-label">设备编码</label>
         <div class="col-sm-10">
           <input v-model="addMachineTranslateInfo.machineCode"                   type="text" placeholder="必填，请填写设备编码" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">设备ID</label>
         <div class="col-sm-10">
           <input v-model="addMachineTranslateInfo.machineId"                   type="text" placeholder="必填，请填写设备ID" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">对象类型</label>
         <div class="col-sm-10">
<select class="custom-select" v-model="addMachineTranslateInfo.typeCd">
         <option selected  disabled value="">必填，请选择对象类型</option>
         <option  value="8899">业主</option>
<option  value="9988">写字楼</option>
  </select>         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">对象名称</label>
         <div class="col-sm-10">
           <input v-model="addMachineTranslateInfo.objName"                   type="text" placeholder="必填，请填写对象名称" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">对象Id</label>
         <div class="col-sm-10">
           <input v-model="addMachineTranslateInfo.objId"                   type="text" placeholder="必填，请填写对象Id" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">状态</label>
         <div class="col-sm-10">
<select class="custom-select" v-model="addMachineTranslateInfo.state">
         <option selected  disabled value="">必填，请选择状态</option>
         <option  value="10000">未同步</option>
<option  value="20000">已同步</option>
  </select>         </div>
</div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveMachineTranslateInfo()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
                props: {"callBackListener":"true","callBackFunction":"true"},
                components: {
                    
                },
                data () {
                    return {"addMachineTranslateInfo":{"machineTranslateId":"","machineCode":"","machineId":"","typeCd":"","objName":"","objId":"","state":""}}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('addMachineTranslate', 'openAddMachineTranslateModal',  () => {
                $('#addMachineTranslateModel').modal('show');
            });
        })()   
                },
                methods: {
                    addMachineTranslateValidate() {
                return this.$vc.validate.validate({
                    addMachineTranslateInfo: this.addMachineTranslateInfo
                }, {
                    'addMachineTranslateInfo.machineCode': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "设备编码不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,30",
                            errInfo: "设备编码不能超过30位"
                        },
                    ],
                    'addMachineTranslateInfo.machineId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "设备ID不能为空"
                        }],
                    'addMachineTranslateInfo.typeCd':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "对象类型不能为空"
                            },
                            {
                                limit: "num",
                                param: "",
                                errInfo: "对象类型格式错误"
                            },
                        ],
                    'addMachineTranslateInfo.objName':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "对象名称不能为空"
                            }],
                    'addMachineTranslateInfo.objId':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "对象Id不能为空"
                            },
                            {
                                limit: "num",
                                param: "",
                                errInfo: "对象Id必须为数字"
                            },
                        ],
                    'addMachineTranslateInfo.state':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "状态不能为空"
                            },
                            {
                                limit: "num",
                                param: "",
                                errInfo: "状态格式错误"
                            },
                        ],


                })
                    ;
            },saveMachineTranslateInfo:function () {
                if (!this.addMachineTranslateValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                this.addMachineTranslateInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addMachineTranslateInfo);
                    $('#addMachineTranslateModel').modal('hide');
                    return;
                }

                this.$vc.http.post(
                    'addMachineTranslate',
                    'save',
                    JSON.stringify(this.addMachineTranslateInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#addMachineTranslateModel').modal('hide');
                            this.clearAddMachineTranslateInfo();
                            this.$vc.emit('machineTranslateManage', 'listMachineTranslate', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearAddMachineTranslateInfo:function () {
                this.addMachineTranslateInfo = {
                    machineCode: '',
                    machineId: '',
                    typeCd: '',
                    objName: '',
                    objId: '',
                    state: '',

                };
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    