
        <template>
            <div id = "chooseFeeConfigModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseFeeConfigModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseFeeConfigModelLabel">选择费用项</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row">

                                <div class="col-sm-7 m-b-xs">
                                </div>
                                <div class="col-sm-5">
                                    <div class="input-group">
                                        <input placeholder="输入费用项名称" type="text" v-model="chooseFeeConfigInfo._currentFeeConfigName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryFeeConfigs()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">费用项ID</th>
                            <th class="text-center">费用类型</th>
                            <th class="text-center">收费项目</th>
                            <th class="text-center">费用标识</th>
                            <th class="text-center">计费起始时间</th>
                            <th class="text-center">计费终止时间</th>
                            <th class="text-center">计算公式</th>
                            <th class="text-center">计费单价</th>
                            <th class="text-center">附加费用</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="feeConfig in chooseFeeConfigInfo.feeConfigs">
                                                                        <td class="text-center">{{feeConfig.configId}}</td>
                            <td class="text-center">{{feeConfig.feeTypeCd}}</td>
                            <td class="text-center">{{feeConfig.feeName}}</td>
                            <td class="text-center">{{feeConfig.feeFlag}}</td>
                            <td class="text-center">{{feeConfig.startTime}}</td>
                            <td class="text-center">{{feeConfig.endTime}}</td>
                            <td class="text-center">{{feeConfig.computingFormula}}</td>
                            <td class="text-center">{{feeConfig.squarePrice}}</td>
                            <td class="text-center">{{feeConfig.additionalAmount}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseFeeConfig(feeConfig)">选择</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
                props: {"emitChooseFeeConfig":"true","emitLoadData":"true"},
                components: {
                    
                },
                data () {
                    return {"chooseFeeConfigInfo":{"feeConfigs":[],"_currentFeeConfigName":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseFeeConfig','openChooseFeeConfigModel',(_param) =>{
                $('#chooseFeeConfigModel').modal('show');
                this._refreshChooseFeeConfigInfo();
                this._loadAllFeeConfigInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllFeeConfigInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseFeeConfig',
                            'list',
                             param,
                             (json) =>{
                                var _feeConfigInfo = JSON.parse(json);
                                this.chooseFeeConfigInfo.feeConfigs = _feeConfigInfo.feeConfigs;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseFeeConfig:function(_feeConfig){
                if(_feeConfig.hasOwnProperty('name')){
                     _feeConfig.feeConfigName = _feeConfig.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseFeeConfig,'chooseFeeConfig',_feeConfig);
                this.$vc.emit(this.$vc._thisemitLoadData,'listFeeConfigData',{
                    feeConfigId:_feeConfig.feeConfigId
                });
                $('#chooseFeeConfigModel').modal('hide');
            },queryFeeConfigs:function(){
                this._loadAllFeeConfigInfo(1,10,this.chooseFeeConfigInfo._currentFeeConfigName);
            },_refreshChooseFeeConfigInfo:function(){
                this.chooseFeeConfigInfo._currentFeeConfigName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    