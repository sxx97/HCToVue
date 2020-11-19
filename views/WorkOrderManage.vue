
        <template>
            <div  id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    查询条件
                </div>
                <div class="ibox-content">
                    <div class="btn-group mr-5 m-3" role="group">
                        <button type="button"
                                v-for="item in orderState"
                                style="width:150px;"
                                @click="changeTabBar(item.state)"
                                :class="['btn', 'btn-lg', 'btn-secondary', item.state == workOrderQueryParam.state ? 'btn-primary' : '']">
                            {{item.name}}
                        </button>
                    </div>
                    <div class="btn pull-right btn-primary" @click="changeAddWorkOrderModal(true)">添加</div>
                    <form class="form-inline row">
                        <div class="form-group">
                            <input v-model="workOrderQueryParam.startTime" type="text" placeholder="请填写开始时间"
                                   class="form-control startTime">
                        </div>
                        <span>-</span>
                        <div class="form-group">
                            <input v-model="workOrderQueryParam.endTime" type="text" placeholder="请填写结束时间"
                                   class="form-control endTime">
                        </div>

                        <div class="form-group">
                            <select class="form-control"
                                    v-model="workOrderQueryParam.type">
                                <option value="" disabled>请选择类型</option>
                                <option v-for="item in orderType"
                                        :value="item.id">
                                    {{item.name}}
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <input class="form-control"
                                   type="search"
                                   v-model="workOrderQueryParam.keyword"
                                   placeholder="姓名、联系电话">
                        </div>

                        <template v-if="workOrderQueryParam.state != 1">
                            <div class="form-group">
                                <select class="form-control"
                                        v-model="workOrderQueryParam.origin">
                                    <option value="" disabled>请选择添加方式</option>
                                    <option :value="1">用户提交</option>
                                    <option :value="2">客服提交</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <select class="form-control"
                                        v-model="workOrderQueryParam.isDuplicate">
                                    <option value="" disabled>是否重复单</option>
                                    <option :value="0">否</option>
                                    <option :value="1">是</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <select class="form-control"
                                        v-model="workOrderQueryParam.isTimeout">
                                    <option value="" disabled>是否超时</option>
                                    <option :value="0">未超时</option>
                                    <option :value="1">超时</option>
                                </select>
                            </div>
                        </template>

                        <tempalte v-if="workOrderQueryParam.state == 3">
                            <div class="form-group">
                                <select class="form-control"
                                        v-model="workOrderQueryParam.score">
                                    <option value="" disabled>评分</option>
                                    <option v-for="n in 5"
                                            :value="n">{{n}}</option>
                                </select>
                            </div>
                        </tempalte>


                        <button type="button" class="btn btn-primary btn-sm"
                                @click="queryWorkOrder">
                            <i class="glyphicon glyphicon-search"></i>
                            查询
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>工单信息</h5>
                </div>
                <div class="ibox-content">
                    <!--                待分配-->
                    <template v-if="workOrderQueryParam.state == 1">
                        <table class="footable table table-stripped toggle-arrow-tiny"
                               data-page-size="15">
                            <thead>
                            <tr>
                                <th class="text-left">添加时间</th>
                                <th class="text-left">添加方式</th>
                                <th class="text-left">类型</th>
                                <th class="text-left">姓名</th>
                                <th class="text-left">手机号</th>
                                <th class="text-left">内容</th>
                                <!--                            <th class="text-left">录音</th>-->
                                <th class="text-left">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in responseData">
                                <td>{{formatDate(item.createTime)}}</td>
                                <td>{{submitterMapping[item.origin]}}</td>
                                <td>{{getOrderTypeName(item.type)}}</td>
                                <td>{{item.informantName}}</td>
                                <td>{{item.informantPhone}}</td>
                                <td><button @click="showOrderContentModal(item.content)" class="btn btn-link btn-content">{{item.content}}</button></td>
                                <!--                                <td>&#45;&#45;</td>-->
                                <td>
                                    <button class="btn btn-primary" @click="assignWorkOrder(item.id, item.type)">分配工单</button>
                                    <button class="btn btn-primary" @click="changeAddWorkOrderModal(true, item)">编辑工单</button>
                                    <button class="btn btn-primary" @click="showDeleteWorkOrder(item.id)">删除工单</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </template>
                    <!--                处理中-->
                    <template v-if="workOrderQueryParam.state == 2">
                        <table class="footable table table-stripped toggle-arrow-tiny"
                               data-page-size="15">
                            <thead>
                            <tr>
                                <th class="text-left">分配时间</th>
                                <th class="text-left">添加方式</th>
                                <th class="text-left">类型</th>
                                <th class="text-left">姓名</th>
                                <th class="text-left">手机号</th>
                                <th class="text-left">内容</th>
                                <th class="text-left">图片</th>
                                <!--                            <th class="text-left">录音</th>-->
                                <th class="text-left">是否重复单</th>
                                <th class="text-left">是否异常</th>
                                <th class="text-left">处理过程</th>
                                <th class="text-left">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="item in responseData">
                                <tr >
                                    <td>{{formatDate(item.createTime)}}</td>
                                    <td>{{submitterMapping[item.origin]}}</td>
                                    <td>{{getOrderTypeName(item.type)}}</td>
                                    <td>{{item.informantName}}</td>
                                    <td>{{item.informantPhone}}</td>
                                    <td>
                                        <button @click="showOrderContentModal(item.content)"
                                                class="btn btn-link btn-content">
                                            {{item.content}}
                                        </button>
                                    </td>
                                    <td>
                                        <template v-if="item.photos != null &&　item.photos.length >= 1">
                                            <button class="btn btn-link" @click="lookImage(item.photos)">查看</button>
                                        </template>
                                        <template v-else>--</template>
                                    </td>
                                    <!--                                <td>&#45;&#45;</td>-->
                                    <td>{{item.duplicate ? '是' : '否'}}</td>
                                    <td>{{item.timeout == 1 ? '是' : '否'}}</td>
                                    <td>
                                        <template v-if="item.logs && item.logs.length >= 1">
                                            <button class="btn btn-link" @click="changeViewLogsStatus(item.id)">查看</button>
                                        </template>
                                        <template v-else>
                                            --
                                        </template>
                                    </td>
                                    <td>
                                        --
                                    </td>
                                </tr>
                                <tr v-if="viewLogsStatus[`${item.id}log${workOrderQueryParam.state}`]">
                                    <td colspan="12" style="background: #e6e4e4;height:300px;overflow-y:auto;">
                                        <table style="width: 100%;">
                                            <thead>
                                            <th>操作时间</th>
                                            <th>事件类型</th>
                                            <th>事件详情</th>
                                            <!--                                            <th>时限类型</th>-->
                                            <th>时限</th>
                                            <th>用时</th>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(log, logIndex) in item.logs">
                                                <td>{{formatDate(log.assignTime)}}</td>
                                                <td>{{getOrderLogTitle(log, item)}}</td>
                                                <td>
                                                    {{getLogContent(log)}}
                                                    <template v-if="[1,2,3,4,5,7].includes(log.state)">
                                                        <button class="btn btn-link" @click="showOrderContentModal(log)">
                                                            {{workOrderOperateReason(log)}}
                                                        </button>
                                                    </template>
                                                </td>
                                                <!--                                                <td>-&#45;&#45;</td>-->
                                                <td>{{log.expectedCostSeconds ? minuteToHour(log.expectedCostSeconds / 60) : "--"}}</td>
                                                <template v-if="logIndex > 0">
                                                    <td>{{timeDifference(log.state == 7 ? log.finishTime : item.logs[logIndex -1].assignTime,  log.assignTime)}}</td>
                                                </template>
                                                <template v-else>
                                                    <td>--</td>
                                                </template>

                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </template>
                            </tbody>
                        </table>
                    </template>

                    <!--                已处理-->
                    <template v-if="workOrderQueryParam.state == 3">
                        <table class="footable table table-stripped toggle-arrow-tiny"
                               data-page-size="15">
                            <thead>
                            <tr>
                                <th class="text-left">处理时间</th>
                                <th class="text-left">添加方式</th>
                                <th class="text-left">类型</th>
                                <th class="text-left">姓名</th>
                                <th class="text-left">手机号</th>
                                <th class="text-left">内容</th>
                                <th class="text-left">图片</th>
                                <!--                            <th class="text-left">录音</th>-->
                                <th class="text-left">是否重复单</th>
                                <th class="text-left">是否异常</th>
                                <th class="text-left">处理过程</th>
                                <th class="text-left">用户评价星级</th>
                                <th class="text-left">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="item in responseData">
                                <tr >
                                    <td>{{formatDate(item.createTime)}}</td>
                                    <td>{{submitterMapping[item.origin]}}</td>
                                    <td>{{getOrderTypeName(item.type)}}</td>
                                    <td>{{item.informantName}}</td>
                                    <td>{{item.informantPhone}}</td>
                                    <td><button @click="showOrderContentModal(item.content)" class="btn btn-link btn-content">{{item.content}}</button></td>
                                    <td>
                                        <template v-if="item.photos != null &&　item.photos.length >= 1">
                                            <button class="btn btn-link" @click="lookImage(item.photos)">查看</button>
                                        </template>
                                        <template v-else>--</template>
                                    </td>
                                    <!--                            <td>&#45;&#45;</td>-->
                                    <td>{{item.duplicate == 1 ? '是' : '否'}}</td>
                                    <td>{{item.timeout == 1 ? '是' : '否'}}</td>
                                    <td>
                                        <template v-if="item.logs && item.logs.length >= 1">
                                            <button class="btn btn-link" @click="changeViewLogsStatus(item.id)">查看</button>
                                        </template>
                                        <template v-else>
                                            --
                                        </template>
                                    </td>
                                    <td>
                                        <template v-if="item.score">
                                            <button class="btn btn-link" @click="showOrderContentModal(`${item.score}星,评价时间:${formatDate(item.commentTime)}

                                    ${item.comment}`)">{{item.score+"星"}}</button>
                                        </template>
                                        <template v-else>
                                            --
                                        </template>
                                    </td>
                                    <td>
                                        <!--                                <button class="btn btn-primary">反馈结果记录</button>-->
                                        <button class="btn btn-primary" @click="showReopenWorkOrderModal(item.id)">修改工单状态</button>
                                    </td>

                                </tr>
                                <tr v-if="viewLogsStatus[`${item.id}log${workOrderQueryParam.state}`]">
                                    <td colspan="12" style="background: #e6e4e4;height:300px;overflow-y:auto;">
                                        <table style="width: 100%">
                                            <thead>
                                            <th>操作时间</th>
                                            <th>事件类型</th>
                                            <th>事件详情</th>
                                            <!--                                            <th>时限类型</th>-->
                                            <th>时限</th>
                                            <th>用时</th>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(log, logIndex) in item.logs"
                                                v-if="([3,4,5].includes(item.state) && item.assigner && item.assignee) || ![3,4,5].includes(item.state)">
                                                <td>{{formatDate(log.assignTime)}}</td>
                                                <td>{{getOrderLogTitle(log, item)}}</td>
                                                <td>
                                                    {{getLogContent(log)}}
                                                    <template v-if="[1,2,3,4,5,7].includes(log.state)">
                                                        <button class="btn btn-link" @click="showOrderContentModal(log)">
                                                            {{workOrderOperateReason(log)}}
                                                        </button>
                                                    </template>
                                                </td>
                                                <!--                                                <td>-&#45;&#45;</td>-->
                                                <td>{{log.expectedCostSeconds ? minuteToHour(log.expectedCostSeconds / 60) : "--"}}</td>
                                                <template v-if="logIndex > 0">
                                                    <td>{{timeDifference(log.state == 7 ? log.finishTime : item.logs[logIndex -1].assignTime,  log.assignTime)}}</td>
                                                </template>
                                                <template v-else>
                                                    <td>--</td>
                                                </template>

                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </template>
                            </tbody>
                        </table>
                    </template>

                    <ul class="pagination float-right">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-end">
                                <li class="page-item" @click="prevPage()"> <a> ‹ </a>
                                </li>
                                <li class="page-item" @click="nextPage()"> <a> › </a>
                                </li>
                            </ul>
                        </nav>
                    </ul>

                </div>
            </div>
        </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="orderContentModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="width: 800px;">
                <div class="modal-body">
                    <div class="row">
                        <template v-if="modalInfo.photos && modalInfo.photos.length > 0">
                            <div :class="[modalInfo.content && modalInfo.content != '' ? 'col-sm-5' : 'col-sm-12']">
                                <div id="demo" class="carousel slide" data-ride="carousel">
                                    <!-- 指示符 -->
                                    <ul class="carousel-indicators">
                                        <li data-target="#demo"
                                            v-for="(item, n) in modalInfo.photos"
                                            :key="n"
                                            :data-slide-to="n" class="active"></li>
                                    </ul>

                                    <!-- 轮播图片 -->
                                    <div class="carousel-inner">
                                        <div v-for="(item, n) in modalInfo.photos"
                                             :class="['carousel-item', {'active': n == 0}]"
                                             :key="n">
                                            <img :src="item"
                                                 style="max-height:400px;max-width: 300px;">
                                        </div>
                                    </div>
                                    <!-- 左右切换按钮 -->
                                    <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                        <span class="carousel-control-prev-icon"></span>
                                    </a>
                                    <a class="carousel-control-next" href="#demo" data-slide="next">
                                        <span class="carousel-control-next-icon"></span>
                                    </a>
                                </div>
                            </div>
                        </template>
                        <template v-if="modalInfo.content && modalInfo.content != ''">
                            <div :class="[modalInfo.photos && modalInfo.photos.length > 0 ? 'col-sm-7' : 'col-sm-12']">
                                {{modalInfo.content}}
                            </div>
                        </template>
                    </div>
                </div>
                <div class="modal-footer" style="text-align: center">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" tabindex="-1" role="dialog" id="reopenOrderModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <p>是否将工单撤回到"处理中"</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="reopenWorkOrder">撤回</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" tabindex="-1" role="dialog" id="deleteOrderModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <p>确认删除工单吗?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="deleteWorkOrder">删除</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" tabindex="-1" role="dialog" id="addWorkOrderModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="form-group row">
                        <label  class="col-sm-2 col-form-label">类型</label>
                        <div class="col-sm-10">
                            <select v-model="addWorkOrderParams.type" class="col-sm-4 form-control">
                                <option value="" disabled>请选择</option>
                                <option v-for="item in orderType"
                                        :value="item.id">{{item.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label  class="col-sm-2 col-form-label">姓名</label>
                        <div class="col-sm-10">
                            <input  type="text" class="col-sm-12 form-control"
                                    v-model="addWorkOrderParams.informantName"
                                    placeholder="请输入">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label  class="col-sm-2 col-form-label">手机号</label>
                        <div class="col-sm-10">
                            <input  type="text" class="col-sm-12 form-control"
                                    v-model="addWorkOrderParams.informantPhone"
                                    placeholder="请输入">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label  class="col-sm-2 col-form-label">内容</label>
                        <div class="col-sm-10">
                            <textarea  type="number" class="col-sm-12 form-control"
                                       v-model="addWorkOrderParams.content"
                                       placeholder="请输入">
                            </textarea>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="addWorkOrder">确认</button>
                </div>
            </div>
        </div>
    </div>
    <vc:create name="viewImageModal"></vc:create>
</div>


        </template>
        <script>
            
            import ViewImageModal from '@/component/ViewImageModal.vue';



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
                    ViewImageModal
                },
                data () {
                    return {"lastTimeOrderIds":[null],"submitterMapping":{"1":"用户提交","2":"客服提交"},"workOrderAssignType":{"1":"同部门转单","2":"跨部门转单","3":"申请暂缓","4":"同意暂缓","5":"驳回暂缓","6":"反馈进度","7":"已处理","8":"反馈结果","9":"跟进处理"},"orderType":[{"id":1,"name":"公共区域清洁"},{"id":2,"name":"公共区域报修"},{"id":3,"name":"物品进出"},{"id":4,"name":"其它"},{"id":5,"name":"投诉"}],"orderState":[{"state":1,"name":"待分配"},{"state":2,"name":"处理中"},{"state":3,"name":"已处理"}],"workOrderQueryParam":{"startTime":"","endTime":"","regionId":"","type":"","state":1,"origin":"","isDuplicate":"","isTimeout":"","keyword":"","score":"","lastId":null},"addWorkOrderParams":{},"viewLogsStatus":{},"responseData":[],"modalInfo":{}}    
                },
                mounted() {
                (() => {
            this.initTimePlugin();
            this.changeTabBar(this.workOrderQueryParam.state);
        })()
(() => {

        })()   
                },
                methods: {
                    workOrderOperateReason(log) {
                switch(log.state){
                    case 1:
                        return !log.assigner.includes('主管') ? '转单原因' : '';
                    case 2:
                        return log.comment && log.comment !== '' ? "转单原因" : '';
                    case 3:
                        return '暂缓原因';
                    case 5:
                        return '驳回原因';
                    case 7:
                        return '处理结果';
                    default:
                        return "";
                }
            },reverseLog(arr) {
              return arr.reverse();
            },getOrderLogTitle(log, item) {
                if(item.state == 9 ) {
                    return "无效";
                }
                if (log.state == 9) {
                    if (log.assignee && log.assignee.indexOf("主管") > -1 || log.assigner == "系统") {
                        return "分配工单";
                    }
                }
                if (log.state == 1) {
                    if (log.assigner && log.assigner.indexOf("主管") > -1) {
                        return "指派员工";
                    }
                }
                if (log.state != 1) {
                    return this.workOrderAssignType[log.state];
                }
                if (log.state == 2) {
                    if (log.assigner.indexOf("前台")) {
                        return "分配工单";
                    }
                    return this.workOrderAssignType[log.state];
                }
                return this.workOrderAssignType[log.state];
            },getLogContent(log) {
                if (log.state == 9) {
                    if (log.assigner.includes("系统")) {
                        return `系统已分配给${log.assignee}处理`
                    }
                }
                if (log.state == 1) {
                    if (log.assigner.includes("主管")) {
                        return `${log.assigner}已指派${log.assignee}处理`
                    }
                    return `${log.assigner}已转给${log.assignee}处理`;
                }
                if (log.state == 2) {
                    if (log.assigner.includes("前台")) {
                        return `${log.assigner}已分配给${log.assignee}处理`
                    }
                    return `${log.assigner}已转给${log.assignee}处理`;
                }

                if ([3, 4, 5].includes(log.state)) {
                    return log.state == 3 ? `${log.assigner}申请暂缓` : `${log.assignee}${log.state == 4 ? '同意暂缓工单' : '驳回暂缓工单'}`;
                }

                if (log.state == 7) {
                    return `${log.assignee}已处理`;
                }
                return `${log.assigner}已转给${log.assignee}处理`;
            },changeViewLogsStatus(orderId) {
                Vue.set(this.viewLogsStatus, `${orderId}log${this.workOrderQueryParam.state}`, !this.viewLogsStatus[`${orderId}log${this.workOrderQueryParam.state}`]);
                console.log(this.viewLogsStatus[`${orderId}log${this.workOrderQueryParam.state}`], "修改查看记录状态的值", `${orderId}log${this.workOrderQueryParam.state}`);
            },formatDate(timestamp, formatType = "YYYY-MM-DD HH:mm") {
                return dayjs(timestamp).format(formatType);
            },changeAddWorkOrderModal(isShow, orderInfo) {
                if (orderInfo == null) {
                    this.addWorkOrderParams = {
                        regionId: this.$vc.getCurrentCommunity().communityId,
                        type:  '',
                        origin: 2,
                        informantId: '',
                        informantName: '',
                        informantPhone: '',
                        content: '',
                        photos: '',
                    };
                } else {
                    this.addWorkOrderParams = {
                        regionId: this.$vc.getCurrentCommunity().communityId,
                        type: orderInfo.type,
                        informantName: orderInfo.informantName,
                        informantPhone: orderInfo.informantPhone,
                        content: orderInfo.content,
                        photos: '',
                        ticketId: orderInfo.id,
                    };
                }

                $('#addWorkOrderModal').modal(isShow ? 'show' : 'hide');
            },showReopenWorkOrderModal(id) {
                this.reopenTicketId = id;
                $('#reopenOrderModal').modal('show');
            },reopenWorkOrder() {
                this.$vc.http.get('workOrder', 'reopenWorkOrder',
            {
                        params: {
                            ticketId: this.reopenTicketId,
                        }
                    },
                    (resText, res) => {
                        this.$vc.toast(res.body.code == 0 ? "操作成功" : res.body.msg);
                        $('#reopenOrderModal').modal('hide');
                    },
                    (errText, err) => {
                        console.log(err, '错误信息');
                    })
            },initTimePlugin() {
                $('.startTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.startTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".startTime").val();
                        this.workOrderQueryParam.startTime = value;
                    });
                $('.endTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                this.workOrderQueryParam.startTime = dayjs().add(-7, "day").format("YYYY-MM-DD") + " 00:00:00";
                this.workOrderQueryParam.endTime = dayjs().format("YYYY-MM-DD") + " 23:59:59";
                $('.endTime').datetimepicker().on('changeDate',  (ev) => {
                    var value = $(".endTime").val();
                    this.workOrderQueryParam.endTime = value;
                });
            },getOrderTypeName(type) {
                let typeName = '';
                this.orderType.forEach(val => {
                    if (val.id === type) {
                        typeName = val.name;
                    }
                });
                return typeName;
            },changeTabBar(state) {
                this.workOrderQueryParam.lastTimeOrderIds = [null];
                this.workOrderQueryParam = {
                        startTime: this.workOrderQueryParam.startTime,
                        endTime: this.workOrderQueryParam.endTime,
                        regionId: this.$vc.getCurrentCommunity().communityId,
                        type: "",
                        state: state,
                        origin: "", // 1: 用户提交 2:客服提交
                        isDuplicate: "", // 0:未重复  1:重复
                        isTimeout: "",    // 0:未超时  1: 超时
                        keyword: '',
                        score: "", // 评分
                        lastId: null,
                };
                if (state == 1) {
                    this.workOrderQueryParam.origin = 2;
                }
                this.queryWorkOrder();
            },lookImage(photos) {
                this.$vc.emit('viewImageModal', 'view', photos.toString())
            },timeDifference(endDate, startDate) {
                const costTimes = (endDate - startDate) / 1000 ;
                const seconds = costTimes % 60 > 0 ? costTimes % 60 + '秒' : '';
                return costTimes / 60 > 60 * 60 ? `${parseInt(costTimes / 60 / 60)}小时${parseInt(costTimes / 60)}分${seconds}` : `${parseInt(costTimes / 60)}分${seconds}`;
            },removeNullProperty(obj) {
                for(let key in obj) {
                    if(obj.hasOwnProperty(key) && (obj[key] === null || obj[key] === "")) {
                        delete obj[key];
                    }
                }
                return obj;
            },assignWorkOrder(id, type) {
                this.$vc.http.post('workOrder', 'assignWorkOrder',
                    JSON.stringify({
                        ticketId: id,
                        regionId: this.$vc.getCurrentCommunity().communityId,
                        type,
                    }),
                    {
                        emulateJSON:true
                    },
                    (resText, res) => {
                        this.$vc.toast(res.body.code == 0 ? "操作成功" : res.body.msg);
                        this.queryWorkOrder();
                    },
                    (errText, err) => {
                        console.log(err, '错误信息');
                    })
            },showDeleteWorkOrder(id) {
                this.deleteTicketId = id;
                $('#deleteOrderModal').modal('show');
            },deleteWorkOrder() {
                this.$vc.http.post('workOrder', 'deleteWorkOrder',
                    JSON.stringify({
                        ticketId: this.deleteTicketId,
                        regionId: this.$vc.getCurrentCommunity().communityId,
                    }),
                    {
                        emulateJSON:true
                    },
                    (resText, res) => {
                        this.$vc.toast(res.body.code == 0 ? "操作成功" : res.body.msg);
                        $('#deleteOrderModal').modal('hide');
                        this.queryWorkOrder();
                    },
                    (errText, err) => {
                        console.log(err, '错误信息');
                    })
            },addWorkOrder() {
                let componentMethod = "addWorkOrder";
                if (this.addWorkOrderParams.ticketId != null) {
                    componentMethod =  "editWorkOrder";
                }

                this.$vc.http.post('workOrder', componentMethod,
                    JSON.stringify(this.addWorkOrderParams),
                    {
                        emulateJSON:true
                    },
                    (resText, res) => {
                        this.changeAddWorkOrderModal(false);
                        this.$vc.toast(res.body.code == 0 ? "操作成功" : res.body.msg);
                        this.changeTabBar(this.workOrderQueryParam.state);
                    },
                    (errText, err) => {
                        console.log(err, '错误信息');
                    })
            },showOrderContentModal(content) {
                let modalInfo = {};

                if (typeof content != "string"){
                    if (content.comment !== "") {
                        modalInfo.content = content.comment;
                    }
                    modalInfo.photos = content.photos;
                } else {
                    modalInfo.content = content;
                }
                $('#orderContentModal').modal('show');
                this.modalInfo = modalInfo;
            },minuteToHour(minute) {
                minute = Math.round(minute);
                if (minute < 60) {
                    return minute+'分钟'
                }
                return parseInt(minute / 60) + '小时' + (minute % 60 > 0 ? minute % 60 + '分钟': '');
            },queryWorkOrder() {
                if (this.workOrderQueryParam.origin === "" || this.workOrderQueryParam.origin == null) {
                    delete this.workOrderQueryParam.origin;
                }
                this.$vc.http.post('workOrder', 'list',
                JSON.stringify(this.removeNullProperty(this.workOrderQueryParam)),
                {
                    emulateJSON:true
                },
                (resText, res) => {
                    this.responseData = res.body.data;
                    const workOrderQueryParam = {
                        startTime: '',
                        endTime: '',
                        regionId: this.$vc.getCurrentCommunity().communityId,
                        type: "",
                        state: 1,
                        origin: "", // 1: 用户提交 2:客服提交
                        isDuplicate: "", // 0:未重复  1:重复
                        isTimeout: "",    // 0:未超时  1: 超时
                        keyword: '',
                        score: "", // 评分
                        lastId: null,
                        ...this.workOrderQueryParam,
                    };
                    this.workOrderQueryParam = workOrderQueryParam;
                    console.log(res, '查询结果');
                },
                (errText, err) => {
                    this.workOrderQueryParam.origin= "";
                    console.log(err, '错误信息');
                })
            },prevPage() {
                if (this.lastTimeOrderIds.length > 1) {
                    this.workOrderQueryParam.lastId = this.lastTimeOrderIds[this.lastTimeOrderIds.length -1];
                    this.lastTimeOrderIds.pop();
                }
                this.queryWorkOrder();
            },nextPage() {
                const lastId = this.responseData[this.responseData.length -1].id;
                this.lastTimeOrderIds.push(this.workOrderQueryParam.lastId);
                this.workOrderQueryParam.lastId = lastId;
                this.queryWorkOrder();
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    