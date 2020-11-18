
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <select class="custom-select" v-model="feeConfigManageInfo.conditions.feeFlag">
                                <option selected value="">请选择费用标识</option>
                                <option value="1003006">周期性费用</option>
                                <option value="2006012">一次性费用</option>
                            </select></div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入费用项目"
                                       v-model="feeConfigManageInfo.conditions.feeName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <select class="custom-select" v-model="feeConfigManageInfo.conditions.feeTypeCd">
                                <option selected value="">请选择费用类型</option>
                                <option v-for="(item,index) in feeConfigManageInfo.feeTypeCds" :key="index"
                                        v-bind:value="item.statusCd">{{item.name}}
                                </option>
                            </select></div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryFeeConfigMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
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
                    <h5>费用项信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddFeeConfigModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">费用项ID</th>
                            <th class="text-center">费用类型</th>
                            <th class="text-center">收费项目</th>
                            <th class="text-center">费用标识</th>
                            <th class="text-center">计费起始时间</th>
                            <th class="text-center">计费终止时间</th>
                            <th class="text-center">计费单价</th>
                            <th class="text-center">附加/固定费用</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="feeConfig in feeConfigManageInfo.feeConfigs">
                            <td class="text-center">{{feeConfig.configId}}</td>
                            <td class="text-center">{{feeConfig.feeTypeCdName}}</td>
                            <td class="text-center">{{feeConfig.feeName}}</td>
                            <td class="text-center">{{feeConfig.feeFlagName}}</td>
                            <td class="text-center">{{feeConfig.startTime}}</td>
                            <td class="text-center">{{feeConfig.endTime}}</td>
                            <td class="text-center">{{feeConfig.computingFormula == '2002' ?
                                '-':feeConfig.squarePrice+'元'}}
                            </td>
                            <td class="text-center">{{feeConfig.additionalAmount}}元</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditFeeConfigModel(feeConfig)">修改
                                    </button>
                                </div>
                                <div class="btn-group" v-if="feeConfig.isDefault=='F'">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeleteFeeConfigModel(feeConfig)">删除
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
                    <Pagination name="pagination"></Pagination>
                </div>
            </div>
        </div>
    </div>


    <vc:create name="addFeeConfig"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <EditFeeConfig name="editFeeConfig"></EditFeeConfig>
    <DeleteFeeConfig name="deleteFeeConfig"></DeleteFeeConfig>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import EditFeeConfig from './EditFeeConfig.vue';import DeleteFeeConfig from './DeleteFeeConfig.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"feeConfigManageInfo":"[object Object]"}    
            },
            mounted() {
             (function() {
            this._listFeeConfigs(DEFAULT_PAGE, DEFAULT_ROWS);

            this.$vc.getDict('pay_fee_config',"fee_type_cd",function(_data){
                this.feeConfigManageInfo.feeTypeCds = _data;
            });
        })()(function() {

            this.$vc.on('feeConfigManage', 'listFeeConfig',
            function(_param) {
                this._listFeeConfigs(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',
            function(_currentPage) {
                this._listFeeConfigs(_currentPage, DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listFeeConfigs:function(_page, _rows) {

                this.feeConfigManageInfo.conditions.page = _page;
                this.feeConfigManageInfo.conditions.row = _rows;
                this.feeConfigManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;

                var param = {
                    params: this.feeConfigManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('feeConfigManage', 'list', param,
                function(json, res) {
                    var _feeConfigManageInfo = JSON.parse(json);
                    this.feeConfigManageInfo.total = _feeConfigManageInfo.total;
                    this.feeConfigManageInfo.records = _feeConfigManageInfo.records;
                    this.feeConfigManageInfo.feeConfigs = _feeConfigManageInfo.feeConfigs;
                    this.$vc.emit('pagination', 'init', {
                        total: this.feeConfigManageInfo.records,
                        currentPage: _page
                    });
                },
                function(errInfo, error) {
                    console.log('请求失败处理');
                });
            },_openAddFeeConfigModal:function() {
                this.$vc.emit('addFeeConfig', 'openAddFeeConfigModal', {});
            },_openEditFeeConfigModel:function(_feeConfig) {
                this.$vc.emit('editFeeConfig', 'openEditFeeConfigModal', _feeConfig);
            },_openDeleteFeeConfigModel:function(_feeConfig) {
                this.$vc.emit('deleteFeeConfig', 'openDeleteFeeConfigModal', _feeConfig);
            },_queryFeeConfigMethod:function() {
                this._listFeeConfigs(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function() {
                if (this.feeConfigManageInfo.moreCondition) {
                    this.feeConfigManageInfo.moreCondition = false;
                } else {
                    this.feeConfigManageInfo.moreCondition = true;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    