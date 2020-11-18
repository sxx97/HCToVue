
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{carInoutManageInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <select class="custom-select" v-model="carInoutManageInfo.conditions.state">
                                <option selected value="">请选择车辆状态</option>
                                <option value="100300">进场状态</option>
                                <option value="100400">支付完成</option>
                                <option value="100500">离场状态</option>
                                <option value="100600">超时重新支付</option>
                            </select></div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入车牌号" v-model="carInoutManageInfo.conditions.carNum"
                                       class=" form-control">
                            </div>
                        </div>
                        <!--<div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入进出场ID"
                                       v-model="carInoutManageInfo.conditions.inoutId" class=" form-control">
                            </div>
                        </div>-->
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryCarInoutMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="carInoutManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入进场开始时间"
                                       v-model="carInoutManageInfo.conditions.startTime" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4" v-if="carInoutManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入进场结束时间"
                                       v-model="carInoutManageInfo.conditions.endTime" class=" form-control">
                            </div>
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
                            <th class="text-center">出场时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="carInout in carInoutManageInfo.carInouts">
                            <!--<td class="text-center">{{carInout.inoutId}}</td>-->
                            <td class="text-center">{{carInout.stateName}}</td>
                            <td class="text-center">{{carInout.carNum}}</td>
                            <td class="text-center">{{carInout.inTime}}</td>
                            <td class="text-center">{{carInout.outTime}}</td>
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
                return {"carInoutManageInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listCarInouts(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function(){
            
            this.$vc.on('carInoutManage','listCarInout',function(_param){
                  this._listCarInouts(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',function(_currentPage){
                this._listCarInouts(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listCarInouts:function(_page, _rows){

                this.carInoutManageInfo.conditions.page = _page;
                this.carInoutManageInfo.conditions.row = _rows;
                this.carInoutManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params:this.carInoutManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('carInoutManage',
                            'list',
                             param,
                             function(json,res){
                                var _carInoutManageInfo=JSON.parse(json);
                                this.carInoutManageInfo.total = _carInoutManageInfo.total;
                                this.carInoutManageInfo.records = _carInoutManageInfo.records;
                                this.carInoutManageInfo.carInouts = _carInoutManageInfo.carInouts;
                                this.$vc.emit('pagination','init',{
                                     total:this.carInoutManageInfo.records,
                                     currentPage:_page
                                 });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_openAddCarInoutModal:function(){
                this.$vc.emit('addCarInout','openAddCarInoutModal',{});
            },_openEditCarInoutModel:function(_carInout){
                this.$vc.emit('editCarInout','openEditCarInoutModal',_carInout);
            },_openDeleteCarInoutModel:function(_carInout){
                this.$vc.emit('deleteCarInout','openDeleteCarInoutModal',_carInout);
            },_queryCarInoutMethod:function(){
                this._listCarInouts(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function(){
                if(this.carInoutManageInfo.moreCondition){
                    this.carInoutManageInfo.moreCondition = false;
                }else{
                    this.carInoutManageInfo.moreCondition = true;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    