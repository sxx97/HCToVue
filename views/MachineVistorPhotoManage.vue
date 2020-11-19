
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{machineVistorPhotoManageInfo.moreCondition ==
                            true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入用户名称"
                                       v-model="machineVistorPhotoManageInfo.conditions.name" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <select class="custom-select" v-model="machineVistorPhotoManageInfo.conditions.openTypeCd">
                                <option selected value="">请选择开门方式</option>
                                <option value="1000">人脸开门</option>
                                <option value="2000">钥匙开门</option>
                            </select></div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入用户手机"
                                       v-model="machineVistorPhotoManageInfo.conditions.tel" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm"
                                    v-on:click="_queryMachineRecordMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="machineVistorPhotoManageInfo.moreCondition == true">
                            <select class="custom-select" v-model="machineVistorPhotoManageInfo.conditions.ownerTypeCd">
                                <option selected value="">请选择用户类型</option>
                                <option value="1001">业主</option>
                                <option value="1002">业主成员</option>
                            </select></div>
                        <div class="col-sm-4" v-if="machineVistorPhotoManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入设备名称"
                                       v-model="machineVistorPhotoManageInfo.conditions.machineName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3" v-if="machineVistorPhotoManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入设备编码"
                                       v-model="machineVistorPhotoManageInfo.conditions.machineCode" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>开门记录</h5>
                    <div class="ibox-tools" style="top:10px;">
<!--                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddMachineRecordModal()">-->
<!--                            <i class="glyphicon glyphicon-plus"></i>-->
<!--                            添加开门记录-->
<!--                        </button>-->
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">设备编码</th>
                            <th class="text-center">被呼叫用户名称</th>
                            <th class="text-center">被呼叫方式</th>
                            <th class="text-center">被呼叫用户手机号</th>
                            <th class="text-center">身份证</th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="machineRecord in machineVistorPhotoManageInfo.machineRecords">
                            <td class="text-center">{{machineRecord.machineCode}}</td>
                            <td class="text-center">{{machineRecord.name}}</td>
                            <td class="text-center">{{machineRecord.openTypeName}}</td>
                            <td class="text-center">{{machineRecord.tel}}</td>
                            <td class="text-center">{{machineRecord.idCard}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openMachineRecordDetailModel(machineRecord)">详情
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="7">
                                <ul class="pagination float-right"></ul>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                    <!-- 分页 -->
                    <vc:create name="pagination"></vc:create>
                </div>
            </div>
        </div>
    </div>

    <vc:create name="machineRecordDetail"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import MachineRecordDetail from '@/component/MachineRecordDetail.vue';



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
                    Pagination,MachineRecordDetail
                },
                data () {
                    return {"machineVistorPhotoManageInfo":{"machineRecords":[],"total":0,"records":1,"moreCondition":false,"name":"","conditions":{"name":"","openTypeCd":"","tel":"","ownerTypeCd":"","machineName":"","machineCode":""}}}    
                },
                mounted() {
                ( () => {
            this._listMachineRecords(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {

            this.$vc.on('machineVistorPhotoManage', 'listMachineRecord',  (_param) => {
                this._listMachineRecords(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listMachineRecords(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listMachineRecords:function (_page, _rows) {

                this.machineVistorPhotoManageInfo.conditions.page = _page;
                this.machineVistorPhotoManageInfo.conditions.row = _rows;
                var param = {
                    params: this.machineVistorPhotoManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('machineVistorPhotoManage',
                    'list',
                    param,
                     (json, res) => {
                        var _machineVistorPhotoManageInfo = JSON.parse(json);
                        this.machineVistorPhotoManageInfo.total = _machineVistorPhotoManageInfo.total;
                        this.machineVistorPhotoManageInfo.records = _machineVistorPhotoManageInfo.records;
                        this.machineVistorPhotoManageInfo.machineRecords = _machineVistorPhotoManageInfo.machineRecords;
                        this.$vc.emit('pagination', 'init', {
                            total: this.machineVistorPhotoManageInfo.records,
                            dataCount: this.machineVistorPhotoManageInfo.total,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_queryMachineRecordMethod:function () {
                this._listMachineRecords(DEFAULT_PAGE, DEFAULT_ROWS);
            },_openMachineRecordDetailModel:function(_machineRecord){
                this.$vc.emit('machineRecordDetail', 'openMachineRecordDetailModal',_machineRecord);
            },_moreCondition:function () {
                if (this.machineVistorPhotoManageInfo.moreCondition) {
                    this.machineVistorPhotoManageInfo.moreCondition = false;
                } else {
                    this.machineVistorPhotoManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    