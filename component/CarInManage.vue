
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                        </button>
<!--                        v-on:click="_moreCondition()">{{carInManageInfo.moreCondition == true?'隐藏':'更多'}}-->
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入车牌号" v-model="carInManageInfo.conditions.carNum"
                                       class=" form-control">
                            </div>
                        </div>
                        <!--<div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入进出场ID"
                                       v-model="carInManageInfo.conditions.inoutId" class=" form-control">
                            </div>
                        </div>-->
                        <!--<div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入进场开始时间"
                                       v-model="carInManageInfo.conditions.startTime" class=" form-control">
                            </div>
                        </div>-->
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryCarInoutMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <!--<div class="row">

                        <div class="col-sm-4" v-if="carInManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入进场结束时间"
                                       v-model="carInManageInfo.conditions.endTime" class=" form-control">
                            </div>
                        </div>
                    </div>-->


                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>进场记录</h5>
                    <div class="ibox-tools" style="top:10px;">
                    </div>
                </div>
                <div class="ibox-content">
                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <!--<th class="text-center">进出场ID</th>-->
                            <th class="text-center">车辆状态</th>
                            <th class="text-center">车牌号</th>
                            <th class="text-center">进场时间</th>
                            <th class="text-center">在场时间(小时)</th>
<!--                            <th class="text-center">产生费用</th>-->
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="carIn in carInManageInfo.carIns">
                            <!--<td class="text-center">{{carIn.inoutId}}</td>-->
                            <td class="text-center">{{carIn.stateName}}</td>
                            <td class="text-center">{{carIn.carNum}}</td>
                            <td class="text-center">{{carIn.inTime}}</td>
                            <td class="text-center">{{carIn.inHours}}小时{{carIn.inMin}}分</td>
<!--                            <td class="text-center">{{carIn.money}}元</td>-->
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


</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"carInManageInfo":"[object Object]"}    
            },
            mounted() {
             (function() {
            this._listCarIns(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function() {

            this.$vc.on('carInoutManage', 'listCarInout',
            function(_param) {
                this._listCarIns(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',
            function(_currentPage) {
                this._listCarIns(_currentPage, DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listCarIns:function(_page, _rows) {

                this.carInManageInfo.conditions.page = _page;
                this.carInManageInfo.conditions.row = _rows;
                this.carInManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params: this.carInManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('carInManage', 'list', param,
                function(json, res) {
                    var _carInManageInfo = JSON.parse(json);
                    this.carInManageInfo.total = _carInManageInfo.total;
                    this.carInManageInfo.records = _carInManageInfo.records;
                    var _tmpCarIns = [];
                    for(var carInIndex = 0 ; carInIndex < _carInManageInfo.carInouts.length;carInIndex ++){
                        var _tmpCarIn = _carInManageInfo.carInouts[carInIndex];
                        var _tmpInTime = new Date(_tmpCarIn.inTime);
                        var _tmpNow = new Date();
                        var diff = _tmpNow - _tmpInTime;
                        //计算出小时数
                        var leave1=diff%(24*3600*1000)    //计算天数后剩余的毫秒数
                        var hours=Math.floor(leave1/(3600*1000))
                        //计算相差分钟数
                        var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
                        var minutes=Math.floor(leave2/(60*1000))
                        if (isNaN(hours)) {
                         _tmpCarIn.continueHours = hours;
                        }else{
                          var newHours = hours+":"+minutes;
                          _tmpCarIn.continueHours = newHours;
                        }
                        _tmpCarIns.push(_tmpCarIn);
                    }
                    this.carInManageInfo.carIns = _tmpCarIns;
                    this.$vc.emit('pagination', 'init', {
                        total: this.carInManageInfo.records,
                        currentPage: _page
                    });
                },
                function(errInfo, error) {
                    console.log('请求失败处理');
                });
            },_queryCarInoutMethod:function() {
                this._listCarIns(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function() {
                if (this.carInManageInfo.moreCondition) {
                    this.carInManageInfo.moreCondition = false;
                } else {
                    this.carInManageInfo.moreCondition = true;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    