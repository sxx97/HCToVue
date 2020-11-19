
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-content">
                    <div class="row">
                        <div class="form-group">
                            <input v-model="queryParams.month" type="text" placeholder="合同编号、租客、房间"
                                   class="custom-select month">
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group">
                                <select class="custom-select" v-model="queryParams.orgId">
                                    <option value="" selected disabled>请选择合同状态</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary">
                                查询
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>


    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ibox-table-wrap">
                <div class="ibox-title">
                    <div class="ibox-tools">
                        <button type="button" class="btn btn-primary btn-sm" @click="changeOperateContractModalShowStatus(true)">
                            <i class="glyphicon glyphicon-plus"></i>
                            新建合同
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15">
                        <thead>
                            <tr>
                                <th class="text-center">创建时间</th>
                                <th class="text-center">合同编号</th>
                                <th class="text-center">合同状态</th>
                                <th class="text-center">合同开始-截止时间</th>
                                <th class="text-center">租客</th>
                                <th class="text-center">房间</th>
                                <th class="text-center">房间租金</th>
                                <th class="text-center">房间押金</th>
                                <th class="text-center">其它费用</th>
                                <th class="text-center">附件</th>
                                <th class="text-center">创建人、负责人</th>
                                <th class="text-center">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center">2020.08.10 09:00</td>
                                <td class="text-center">
                                    <div class="btn btn-link">1659901</div>
                                </td>
                                <td class="text-center">已签订</td>
                                <td class="text-center">
                                    202.08.10-2021.08.10
                                </td>
                                <td class="text-center">
                                    <div>海外综服国际物流有限公司</div>
                                    <div>李思思【13665588888】</div>
                                </td>
                                <td class="text-center">
                                    <div>楼哦动-101</div>
                                </td>
                                <td class="text-center">3500源</td>
                                <td class="text-center">1500源</td>
                                <td class="text-center">
                                    <div class="btn btn-link">查看</div>
                                </td>
                                <td class="text-center">
                                    <div class="btn btn-link">查看</div>
                                </td>
                                <td class="text-center">
                                    <div>张三【客服】</div>
                                    <div>李斯【客服】</div>
                                </td>
                                <td class="text-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-primary dropdown-toggle"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            操作
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a href="#">续签合同</a></li>
                                            <li><a href="#">变更合同</a></li>
                                            <li><a href="#">终止合同</a></li>
                                            <li><a href="#">解约合同</a></li>
                                            <li><a href="#">作废合同</a></li>
                                            <li><a href="#">转移合同</a></li>
                                        </ul>

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="12">
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


    <operate-contract-modal :modal-status="operateContractModalShowStatus" @change-modal-status="changeOperateContractModalShowStatus"></operate-contract-modal>
</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';



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
                    Pagination
                },
                data () {
                    return {"queryParams":{},"operateContractModalShowStatus":false}    
                },
                mounted() {
                (() => {})()
(() => {})()   
                },
                methods: {
                    changeOperateContractModalShowStatus(isShow) {
        this.operateContractModalShowStatus = isShow;
      },
                },
            }
    
        </script>
        <style>
            .contract-modal {
    position: absolute;
    width: 1200px;
    height: 800px;
    background: #FFFFFF;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.contract-modal-header {
    padding: 15px;
}

.contract-modal-header .close-modal {
    font-size: 28px;
    color: rgba(0, 0, 0, .1);
    cursor: pointer;
}

.contract-modal-content {
    padding: 15px 0;
    height: 525px;
    overflow-y: auto;
}

.contract-modal-footer {
    padding: 30px 0;
    width: 100%;
    border-top: 2px solid rgba(0, 0, 0, .1);
    text-align: center;
}

.steps {
    margin: 20px auto;
    width: 530px;
}

.step-group {
    width: 550px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
}

.step-item {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: 50px;
    background: #999;
    text-align: center;
    line-height: 60px;
    color: #fff;
}

.step-item.active {
    background: #00B694;
}

.steps-label {
    width: 550px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
    margin-top: 20px;
    height: 20px;
}

.steps-label div {
    position: relative;
    flex: 1 0 auto;
    text-align: center;
    height: 20px;
}

.steps-label div:not(:first-of-type)::after {
    position: absolute;
    right: 50%;
    top: 50%;
    content: " ";
    transform: translateY(-50%);
    width: 128px;
    height: 4px;
    background: #D8D8D8;
    text-align: left;
}

.steps-label div span {
    display: inline-block;
    background: #D8D8D8;
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.steps-label div.active span, .steps-label div.active::after {
    background: #00B694;
}



.contract-modal-footer .btn {
    width: 200px;
    height: 40px;
    font-size: 24px;
    box-shadow: 0 5px 10px 0 rgba(0, 182, 148, .3);
    border-radius: 4px;
    padding: 0;
}

.contract-modal-footer .btn:not(:last-of-type) {
    margin-right: 50px;
}

/* 合同第二步样式 */

.backgauge {
    margin-right:50px ;
}

/*.step-component {
    position: relative;
}*/
/* 新增样式 */
.col-sm-8{
    width: 750px;
}

.mb-1.backgauge1 {
    margin-right: 5px;
    margin-top: 50px;
}



.step-component {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 1090px;
    max-height: 430px;
    overflow-y: auto;
    font-size: 24px;
}

.step-component .btn {
    font-size: 24px;
}

.step-component .glyphicon-remove-circle {
    color: #ff0000;
}

.room-select {
    position: relative;
}

.room-select-panel {
    position: absolute;
    top: 45px;
    left: 0;
    background: #fff;
    width: 255px;
    height: 280px;
    z-index: 2;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .15);
    border-radius: 10px;
}

.room-select-panel-header {
    text-align: center;
    margin-bottom: 25px;
}

.room-select-panel-header span {
    font-size: 24px;
    display: inline-block;
    position: relative;
    width: 48px;
    height: 33px;
    line-height: 33px;
}

.room-select-panel-header span:not(:last-of-type) {
    margin-right: 99px;
}

.room-select-panel-header span.active::after {
    position: absolute;
    width: 60px;
    height: 4px;
    content: " ";
    background: #00B694;
    border-radius: 2px;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
}

.room-select-panel-content {
    padding: 0 14px;
    height: 200px;
    overflow: auto;
}


.floor-checkbox-panel input[type=checkbox] {
    margin-right: 10px;
}

.floor-checkbox-panel div {
    margin-bottom: 15px;
}

.room-checkbox-panel {
    padding-left: 45px;
    margin-bottom: 0;
}

.floor-checkbox-panel .glyphicon {
    font-size: 16px;
}

.company-selector {
    position: relative;
}

.company-panel {
    width: 380px;
    min-height: 340px;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .15);
    border-radius: 10px;
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 2;
}

.company-panel ul {
    height: 200px;
    overflow-y: auto;
}

.company-panel li {
    font-size: 24px;
    padding: 15px 0;
}

.company-panel li:not(:last-of-type) {
    border-bottom: 1px solid #e6e6e6;
}

.company-panel li div:not(:last-of-type) {
    margin-bottom: 10px;
}

/*合同预览*/
.contract-preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 698px;
    background: #fff;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 0 40px;
}

.contract-preview-header div {
    padding: 20px 0;
    width: 120px;
    text-align: right;
    font-weight: bold;
    font-size: 24px;
}

.contract-preview-item {
    padding: 20px 0;
    border-top: 1px solid #DDDDDD;
    font-size: 20px;
    position: relative;
}

/* .contract-preview-item .btn-step {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    width: 160px;
    height: 40px;
    background: #00B694;
    box-shadow: 0 5px 10px 0 rgba(0, 182, 148, .3);
    border-radius: 4px;
    font-size: 20px;
} */

.contract-preview-item .item-field div {
    display: inline-block;
    vertical-align: top;
}

.contract-preview-item .item-field:not(:last-of-type) {
    margin-bottom: 20px;
}

.contract-preview-item .item-field .field-name {
    margin-right: 60px;
    text-align: right;
    width: 120px;
}
/* 浮动 */
.step-component.leftFloat{
    /* 转换为行内块级元素 */
   display: inline-block;
   margin-right:10px ;
}

.col-sm-2 text-right {
    margin-right: 20px;
}

.contract-preview-item .item-field {

}





        </style>
    