
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                </div>
                <div class="ibox-content">
                    <div :class="{'d-flex': orderAndMallTab == 1}">
                        <div class="btn-group mr-5 m-3" role="group">
                            <button type="button"
                                    style="width:150px;"
                                    :class="['btn', 'btn-lg', 'btn-secondary', {'btn-primary': orderAndMallTab == 1}]"
                                    @click="changeMallOrOrderTab(1)">
                                订单管理
                            </button>
                            <button type="button"
                                    style="width:150px;"
                                    :class="['btn', 'btn-lg', 'btn-secondary', {'btn-primary': orderAndMallTab == 2}]"
                                    @click="changeMallOrOrderTab(2)">
                                福利商城管理
                            </button>
                        </div>

                        <div class="p-3 d-flex position-relative">
                            <template v-if="orderAndMallTab == 2">
                                <div class="btn-group mr-5" role="group">
                                    <button type="button"
                                            style="width:100px;height:35px;"
                                            :class="['btn',  'btn-sm', 'btn-secondary', {'btn-primary': shelvesTab}]"
                                            @click="changeShelvesTab(1)">
                                        上架商品
                                    </button>
                                    <button type="button"
                                            style="width:100px;height:35px;"
                                            :class="['btn', 'btn-sm', 'btn-secondary', {'btn-primary': !shelvesTab}]"
                                            @click="changeShelvesTab(0)">
                                        下架商品
                                    </button>
                                </div>
                            </template>
                            <template v-if="shelvesTab || orderAndMallTab == 1 ">
                                <form class="form-inline">
                                    <input class="form-control ml-1 mr-2"
                                           type="search"
                                           v-model="keyword"
                                           placeholder="商品ID、标题">
                                    <template v-if="orderAndMallTab == 1">
                                        <input class="form-control ml-1 mr-4"
                                               type="search"
                                               v-model="deliveryAddress"
                                               placeholder="姓名、联系电话">
                                    </template>
                                    <button type="button" class="btn btn-primary btn-sm"
                                            @click="changeMallOrOrderTab(orderAndMallTab)">
                                        <i class="glyphicon glyphicon-search"></i>
                                        搜索
                                    </button>
                                </form>
                            </template>
                            <template v-if="orderAndMallTab == 2">
                                <form class="form-inline">
                                    <input class="form-control ml-1 mr-2"
                                           type="text"
                                           v-model="pickUpAddress"
                                           placeholder="请输入商品自提点">
                                    <button type="button" class="btn btn-primary btn-sm"
                                            @click="updatePickUpAddress">
                                        保存
                                    </button>
                                </form>
                            </template>
                            <template v-if="shelvesTab  && orderAndMallTab == 2">
                                <button class="btn btn-primary pull-right"
                                        @click="showEditCommodityModal(null)">
                                    <i class="glyphicon glyphicon-plus"></i>
                                    上架新商品
                                </button>
                            </template>
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
                    <h5>福利商城信息</h5>
                </div>
                <div class="ibox-content">
                    <!-- 编辑商品弹窗 -->
                    <EditCommodityModal name="editCommodityModal"></EditCommodityModal>
                    <!-- 订单管理表 -->
                    <template v-if="orderAndMallTab == 1">
                        <table class="footable table table-stripped toggle-arrow-tiny"
                               data-page-size="15">
                            <thead>
                            <tr>
                                <th class="text-left">下单时间</th>
                                <th class="text-left">用户信息</th>
                                <th class="text-left">商品信息</th>
                                <th class="text-left">单价(现价)</th>
                                <th class="text-left">购买量</th>
                                <th class="text-left">实付金额</th>
                                <th class="text-left">取货方式</th>
                                <th class="text-left">评价</th>
                                <th class="text-left">订单状态</th>
                                <th class="text-right">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(order, n) in orderList"
                                :key="n">
                                <td>{{formatDateTime(order.createTime) || '--'}}</td>
                                <td>{{order.deliveryAddress || '--'}}</td>
                                <td>
                                    <div class="table-commodity-info"
                                         @click="viewCommodityInfo(returnCommodity(order.commodities))">
                                        <img :src="splitPhotosString(returnCommodity(order.commodities).photos)[0]" alt="">
                                        <div>
                                            <p>{{returnCommodity(order.commodities).title}}</p>
                                            <p>商品id: {{returnCommodity(order.commodities).commodityId}}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {{returnCommodity(order.commodities).currentPrice/100}}
                                </td>
                                <td>
                                    {{order.commodities[0].commodityAmount}}
                                </td>
                                <td>
                                    {{order.commodities[0].commodityAmount * returnCommodity(order.commodities).currentPrice/100 }}
                                </td>
                                <td>
                                    {{deliverMethodText[order.deliverMethod] || '---'}}
                                </td>
                                <td>
                                    <template v-if="order.comment && isExpiredRateTime(order.comment.evaluateTime)">
                                        <p>
                                            <template v-if="isAutoSystemRate(order.comment)">
                                                <span class="label label-success">系统评价</span>
                                            </template>
                                            <tempalte v-else>
                                                <span class="label label-success">用户评价</span>
                                            </tempalte>
                                        </p>
                                        <p>{{order.comment.evaluateStar}}星,{{order.comment.evaluateEffectiveStartTime}}</p>
                                        <p style="max-width:240px;">{{order.comment.evaluateContent}}</p>
                                    </template>
                                    <template v-else>
                                        --
                                    </template>
                                </td>
                                <td>{{order.deliverStatus == 1000 && order.state == '1000' ? '已签收' : orderState[order.state]}}</td>
                                <td class="text-right">
                                    <button class="btn btn-xs btn-white"
                                            v-if="order.deliverStatus != 1000"
                                            @click="showSignCommodityModal(order.orderId)">签收</button>
                                    <button class="btn btn-xs btn-white"
                                            v-if="order.state == '1000'"
                                            @click="refundOrder(order.orderId)">退款</button>
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
                    </template>

                    <!-- 商品上下架表 -->
                    <template v-else>
                        <table  class="footable table table-stripped toggle-arrow-tiny"
                                data-page-size="15">
                            <thead>
                            <tr>
                                <th class="text-left">{{shelvesTab ? '上' : '下'}}架时间</th>
                                <th class="text-left">商品信息</th>
                                <th class="text-left">单价(现价)</th>
                                <th class="text-left">剩余库存量</th>
                                <th class="text-left">已售量</th>
                                <th class="text-right">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in commodityList"
                                :key="index">
                                <td>{{item.issuedTime || '--'}}</td>
                                <td>
                                    <div class="table-commodity-info"
                                         @click="viewCommodityInfo(item)">
                                        <img :src="splitPhotosString(item.photos)[0]" alt="">
                                        <div>
                                            <p>{{item.title}}</p>
                                            <p>商品id: {{item.commodityId}}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{{item.currentPrice/100}}</td>
                                <td>{{item.stockpile}}</td>
                                <td>已售: {{item.salesAmount || 0}}</td>
                                <td class="text-right">
                                    <button class="btn btn-xs btn-white"
                                            @click="showEditCommodityModal(item)">编辑</button>
                                    <button class="btn btn-xs btn-white"
                                            @click="showChangeCommodityStatusModal(item)">{{shelvesTab ? '下架' : '重新上架'}}</button>
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
                    </template>
                    <!-- 上下架商品弹窗 -->
                    <ChangeCommodityStatus name="changeCommodityStatus"></ChangeCommodityStatus>
                    <!-- 分页 -->
                    <Pagination name="pagination"></Pagination>
                    <!-- 查看商品弹窗 -->
                    <ViewCommodityModal name="viewCommodityModal"></ViewCommodityModal>
                    <!-- 返回退款弹窗 -->
                    <RefundOrder name="refundOrder"></RefundOrder>
                    <!-- 签收商品弹窗 -->
                    <SignCommodityStatus name="signCommodityStatus"></SignCommodityStatus>
                </div>
            </div>
        </div>
    </div>
</div>


        </template>
        <script>
            import EditCommodityModal from './EditCommodityModal.vue';import ChangeCommodityStatus from './ChangeCommodityStatus.vue';import Pagination from './Pagination.vue';import ViewCommodityModal from './ViewCommodityModal.vue';import RefundOrder from './RefundOrder.vue';import SignCommodityStatus from './SignCommodityStatus.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"orderAndMallTab":"1","shelvesTab":"1","commodityList":"","orderList":"","keyword":"","deliveryAddress":"","orderState":"[object Object]","deliverMethodText":"[object Object]","pickUpAddress":""}    
            },
            mounted() {
             (_initMethod() {
            this.changeMallOrOrderTab(orderAndMallTab.ORDER_TAB);
            if (localStorage.getItem('hc_currentCommunityInfo') != null){
                const currentCommunity = JSON.parse(localStorage.getItem('hc_currentCommunityInfo'));
                this.pickUpAddress = currentCommunity.pickUpAddress;
            }
        })()(_initEvent() {
            this.$vc.on('pagination', 'page_event', (page, count) => {
                if (this.$vc.compoent.orderAndMallTab == orderAndMallTab.ORDER_TAB) {
                    this.getOrderList(page, count);
                } else {
                    this.getCommodityList(page, count);
                }

            });
            this.$vc.on('mallMange', 'orderList', 'refresh', this.getOrderList);
            this.$vc.on('mallMange', 'commodityList', 'refresh', this.getCommodityList);
        })()   
            },
            methods: {
                updatePickUpAddress() {
                const currentCommunity = JSON.parse(localStorage.getItem('hc_currentCommunityInfo'));
                let params = {
                    ...currentCommunity,
                    pickUpAddress: this.pickUpAddress,
                };
                this.$vc.http.post('editCommunity', 'update',
                    JSON.stringify(params),
                    {
                        emulateJSON: true
                    },
                    (resText, res) => {
                        localStorage.setItem('hc_currentCommunityInfo', JSON.stringify(params));
                    },
                    (errText, err) => {

                    })
            },formatDateTime(inputTime) {
                var date = new Date(inputTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
            },isExpiredRateTime(expiredTime) {
                if (new Date(expiredTime).getTime() <= new Date().getTime()) {
                    return true;
                }
                return false;
            },isAutoSystemRate(rateInfo) {
                if(this.isExpiredRateTime(rateInfo.evaluateTime)  && rateInfo.evaluateType == 0) {
                    return true;
                }
                return false;
            },showSignCommodityModal(mOrderId) {
                this.$vc.emit('mallManage', 'signCommodity', 'show', mOrderId);
            },viewCommodityInfo(commodityInfo) {
                this.$vc.emit('viewCommodityModal', 'view', commodityInfo);
            },showEditCommodityModal(commodityInfo) {
                this.$vc.emit('editCommodityModal', 'show', commodityInfo);
            },showChangeCommodityStatusModal(commodityInfo) {
                this.$vc.emit('changeCommodityStatus', 'change', commodityInfo);
            },changeMallOrOrderTab(tab) {
                if (this.orderAndMallTab != tab){
                    this.keyword = '';
                    this.deliveryAddress = '';
                }
                this.orderAndMallTab = tab;
                if (tab == orderAndMallTab.ORDER_TAB) {
                    this.getOrderList();
                } else {
                    this.changeShelvesTab(shelvesTab.SHELVES_ON_TAB);
                }
            },changeShelvesTab(show) {
                if (this.shelvesTab != show){
                    this.keyword = '';
                }
                this.shelvesTab = show;
                this.getCommodityList();
            },splitPhotosString(photosStr) {
                if (typeof photosStr == 'string' ) {
                    return  photosStr.split(',');
                }
                return photosStr || [];
            },getCommodityList(page = 1, count = 10) {
                this.$vc.http.get('listCommodity', 'list',
                    {
                        params: {
                            communityId: JSON.parse(localStorage.getItem('hc_currentCommunityInfo')).communityId,
                            title: '',
                            commodityId: '',
                            show: this.shelvesTab,
                            page: page,
                            row: count,
                            keyword: this.keyword,
                        }
                    },
                    (resText, res) => {
                        console.log(res, '商品信息列表成功信息');
                        this.$vc.emit('pagination', 'init', {
                            total: res.body.records,
                            dataCount: res.body.total,
                            currentPage: page,
                        });
                        this.commodityList = res.body.commodities || [];
                    },
                    (errText, err) => {
                        console.log(err, '商品信息列表错误信息');
                    })
            },getOrderList(page = 1, count = 10) {
                this.$vc.http.get('listOrderComponent', 'list', {
                    params: {
                        communityId: JSON.parse(localStorage.getItem('hc_currentCommunityInfo')).communityId,
                        row: count,
                        keyword: this.keyword,
                        deliveryAddress: this.deliveryAddress,
                        states: '1000,3000,4000',
                        page,
                    }
                },
                (resText, res) => {
                    console.log(res, '订单列表成功信息');
                    this.$vc.emit('pagination', 'init', {
                        total: res.body.records,
                        dataCount: res.body.total,
                        currentPage: page,
                    });
                    this.orderList = res.body.mOrders;
                },
                (errText, err) => {
                    console.log(err, '订单列表失败信息');
                });
            },refundOrder(orderId) {
                this.$vc.emit('refundOrder', 'showRefundOrderModal', orderId);
            },returnCommodity(commodities) {
                return commodities[0].commodity;
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    