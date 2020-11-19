
        <template>
            <div id="writeAdvertMachineModal" class="modal fade" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">广告设备码</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">设备编码</label>
                                <div class="col-sm-10">
                                    <input v-model="writeAdvertMachineInfo.machineCode" type="text" placeholder="必填，请填写设备编码"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="_viewMachineAdvertInfo()">
                                    <i class="fa fa-check"></i>&nbsp;查看广告
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
                props: {},
                components: {
                    
                },
                data () {
                    return {"writeAdvertMachineInfo":{"machineCode":""}}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('writeAdvertMachine', 'openWriteAdvertMachineModal',  () => {
                $('#writeAdvertMachineModal').modal('show');
            });

        })()   
                },
                methods: {
                    _viewMachineAdvertInfo:function () {
                if (!this.$vc.notNull(this.writeAdvertMachineInfo.machineCode)) {
                    this.$vc.toast("设备码为空！");
                    return;
                }

                this.$vc.jumpToPage("/flow/advertVedioFlow?machineCode="
                    + this.writeAdvertMachineInfo.machineCode
                    + "&communityId=" + this.$vc.getCurrentCommunity().communityId);
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    