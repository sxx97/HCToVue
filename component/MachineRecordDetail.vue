
        <template>
            <div id="editMachineRecordModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">开门详情</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">开门记录ID</label>
                                <div class="col-sm-10">
                                    <input v-model="machineRecordDetailInfo.machineRecordId" type="text"
                                           placeholder="必填，请填写开门记录ID" readonly class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">设备编码</label>
                                <div class="col-sm-10">
                                    <input v-model="machineRecordDetailInfo.machineCode" type="text"
                                           placeholder="必填，请填写设备编码" readonly class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">设备ID</label>
                                <div class="col-sm-10">
                                    <input v-model="machineRecordDetailInfo.machineId" type="text"
                                           placeholder="必填，请填写设备ID" readonly class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">用户名称</label>
                                <div class="col-sm-10">
                                    <input v-model="machineRecordDetailInfo.name" readonly type="text" placeholder="必填，请填写用户名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">开门方式</label>
                                <div class="col-sm-10">
                                    <input v-model="machineRecordDetailInfo.openTypeCd" type="text"
                                           placeholder="必填，请填写开门方式" readonly class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">用户手机号</label>
                                <div class="col-sm-10">
                                    <input v-model="machineRecordDetailInfo.tel" readonly type="text" placeholder="必填，请填写用户手机号"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">身份证</label>
                                <div class="col-sm-10">
                                    <input v-model="machineRecordDetailInfo.idCard" readonly type="text" placeholder="必填，请填写身份证"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row" v-if="machineRecordDetailInfo.openTypeCd == '1000'">
                                <label class="col-sm-2 col-form-label">人脸照片</label>
                                <div class="col-sm-10">
                                    <image width="120px" height="140px" v-bind:src="machineRecordDetailInfo.photo" @error="errorLoadImg"/>
                                </div>
                            </div>


                            <div class="ibox-content">
                                <button type="button" class="btn btn-warning float-right"
                                        data-dismiss="modal">关闭
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
                props: {},
                components: {
                    
                },
                data () {
                    return {"machineRecordDetailInfo":{"machineRecordId":"","machineCode":"","machineId":"","name":"","openTypeCd":"","tel":"","idCard":"","photo":""}}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('machineRecordDetail', 'openMachineRecordDetailModal',  (_params) => {
                this.refreshEditMachineRecordInfo();
                $('#editMachineRecordModel').modal('show');
                this.$vc.copyObject(_params, this.machineRecordDetailInfo);
                this._loadMachineRecordImage();
                this.machineRecordDetailInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
                },
                methods: {
                    refreshEditMachineRecordInfo:function () {
                this.machineRecordDetailInfo = {
                    machineRecordId: '',
                    machineCode: '',
                    machineId: '',
                    name: '',
                    openTypeCd: '',
                    tel: '',
                    idCard: '',
                    photo:'',

                }
            },errorLoadImg:function(){
                this.machineRecordDetailInfo.photo="/img/noPhoto.png";
            },_loadMachineRecordImage:function () {
                this.machineRecordDetailInfo.photo = _fileUrl+"?objId="+
                    this.machineRecordDetailInfo.machineRecordId +"&communityId="+this.$vc.getCurrentCommunity().communityId+"&fileTypeCd=60000&time="+new Date();
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    