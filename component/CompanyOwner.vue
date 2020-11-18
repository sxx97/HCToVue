
        <template>
            <div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <!--<div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                @click="changeMoreCondition">{{companyListOwnerInfo.companyMoreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>-->
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入企业名称"
                                       v-model="companyListOwnerInfo.companyConditions.enterpriseName" class=" form-control">
                            </div>
                        </div>
                        <!--<div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入业主身份证号"
                                       v-model="companyListOwnerInfo.companyConditions.idCard" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="number" placeholder="请输入联系方式"
                                       v-model="companyListOwnerInfo.companyConditions.link" class=" form-control">
                            </div>
                        </div>-->
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="queryCompanyOwnerMethod"><i
                                    class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row" v-show="companyListOwnerInfo.companyMoreCondition == true">
                        <div class="col-sm-4">
                            <div class="form-group input-group">
                                <vc:create name="floorSelect2"
                                           parentModal="listOwnerModel"
                                           namespace="companyOwner"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <vc:create name="unitSelect2"
                                           parentModal="listOwnerModel"
                                           callBackListener="companyOwner"
                                           callBackFunction="notify"
                                           namespace="companyOwner"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <vc:create name="roomSelect2"
                                           parentModal="listOwnerModel"
                                           callBackListener="companyOwner"
                                           callBackFunction="notify"
                                           namespace="companyOwner"
                                ></vc:create>
                            </div>
                        </div>
                    </div>
                    <!--<div class="row" v-if="companyListOwnerInfo.companyMoreCondition == true">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入业主ID"
                                       v-model="companyListOwnerInfo.companyConditions.ownerId" class=" form-control">
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
                    <h5>业主信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" @click="openEditOwnerModel(null)">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加业主
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <!--<th>业主ID</th>-->
                            <th data-hide="phone">企业名称</th>
                            <th data-hide="phone">法人代表</th>
                            <th data-hide="phone">统一社会信用代码</th>
                            <th data-hide="phone">企业代表</th>
                            <th data-hide="phone">性别</th>
                            <th data-hide="phone">联系方式</th>
                            <th data-hide="phone">创建员工</th>
                            <th data-hide="phone">通行方式</th>
                            <th class="text-right">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="owner in companyListOwnerInfo.companyOwners">
                            <!--<td>
                                {{owner.memberId}}
                            </td>-->

                            <td>
                                {{owner.enterpriseName}}
                            </td>
                            <td>
                                {{owner.legalPerson}}
                            </td>
                            <td>
                                {{owner.unifiedSocialCreditCode}}
                            </td>
                            <td>
                                {{owner.name}}
                            </td>
                            <td>
                                {{owner.sex == 0 ? '男' : '女'}}
                            </td>
                            <td>
                                {{owner.link}}
                            </td>
                            <td>
                                {{owner.userName}}
                            </td>
                            <td>
                                人脸、RFID卡
                                <input type="text" :class="['form-control', 'rfid'+owner.memberId]"
                                       :value="owner.passageWayRfidCardMeterial"
                                       style="width: 120px;display:inline-block;">
                                <button class="btn-white btn" @click="saveRFID(owner)">保存</button>
                            </td>
                            <td class="text-right">
                                <!--<div class="btn-group">
                                    <button class="btn-white btn btn-xs "
                                            v-on:click="_openEditOwnerModel(owner)">修改
                                    </button>
                                </div>-->
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs dropdown-toggle" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">变更
                                    </button>


                                    <div class="dropdown-menu p-4 text-muted" style="max-width: 200px;">
                                        <p style="margin:10px 0;">
                                            <a href="#"
                                               v-on:click="openEditOwnerModel(owner)">修改业主</a>
                                            <span>|</span>
                                            <a href="#"
                                               v-on:click="openDelOwnerModel(owner)">删除业主</a>
                                        </p>
                                        <p style="margin:10px 0;">
                                            <a href="#"
                                               v-on:click="_openAddOwnerRoom(owner)">绑定房间</a>
                                            <span>|</span>
                                            <a href="#"
                                               v-on:click="_openDeleteOwnerRoom(owner)">房间解绑</a>
                                        </p>
                                        <!--<p style="margin:10px 0;">
                                            <a href="#"
                                               v-on:click="_openHireParkingSpace(owner)">车位出租</a>
                                            <span>|</span>
                                            <a href="#"
                                               v-on:click="_openSellParkingSpace(owner)">车位出售</a>
                                        </p>-->
                                        <!--
                                            TODO:暂时隐藏费用相关内容
                                        <p style="margin:10px 0;">
                                            <a href="#"
                                               v-on:click="_openPayPropertyFee(owner)">物业费用</a>
                                            <span>|</span>
                                            <a href="#"
                                               v-on:click="_openPayParkingSpaceFee(owner)">停车费用</a>
                                        </p>-->
                                        <!--<p style="margin:10px 0;">
                                            <a href="#"
                                               v-on:click="_openOwnerRepair(owner)">业主报修</a>
                                            <span>|</span>

                                        </p>-->
                                    </div>
                                </div>

                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs "
                                            v-on:click="_openOwnerDetailModel(owner)">详情
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


    <vc:create name="editCompanyOwner"
       componentTitle="业主"
       ownerTypeCd="1001"
       notifyLoadDataComponentName="listCompanyOwner"></vc:create>
</div>
        </template>
        <script>
            import Pagination from './Pagination.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"companyListOwnerInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            console.log('CompanyOwner组件触发', this);
        })()(function () {
            this.$vc.on('listCompanyOwner', 'listCompanyOwnerData', () => {
                this.companyListOwner(DEFAULT_PAGE, DEFAULT_ROWS);
            })
            this.$vc.on("companyOwner", "notify", function (_param) {
                if (_param.hasOwnProperty("floorId")) {
                    this.companyListOwnerInfo.companyConditions.floorId = _param.floorId;
                }

                if (_param.hasOwnProperty("unitId")) {
                    this.companyListOwnerInfo.companyConditions.unitId = _param.unitId;
                }

                if (_param.hasOwnProperty("roomId")) {
                    this.companyListOwnerInfo.companyConditions.roomId = _param.roomId;
                    this.companyListOwner(DEFAULT_PAGE, DEFAULT_ROWS);
                }
            });
        })()   
            },
            methods: {
                saveRFID(owner) {
                this.$vc.http.post('editOwner', 'changeOwner',
                    JSON.stringify({
                        communityId: this.$vc.getCurrentCommunity().communityId,
                        ...owner,
                        passageWayRfidCardMeterial: document.getElementsByClassName('rfid'+owner.memberId)[0].value,
                        passageWayHumanFaceEnable: 1,
                        passageWayRfidCardEnable: 1,
                    }),
                    {
                        emulateJSON: true
                    },
                    function(resText, res){
                        if (res.body instanceof Array) {
                            return ;
                        }
                        this.$vc.toast(resText);
                    },
                    function(errText, err) {
                        this.$vc.toast(errText);
                    }
                )
            },companyListOwner(page = 1, row = 10) {
                this.companyListOwnerInfo.companyConditions.page = page;
                this.companyListOwnerInfo.companyConditions.row = row;
                this.companyListOwnerInfo.companyConditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params: this.companyListOwnerInfo.companyConditions
                }

                //发送get请求
                this.$vc.http.get('listOwner',
                    'list',
                    param,
                    function (json, res) {
                        var listOwnerData = JSON.parse(json);
                        this.companyListOwnerInfo.total = listOwnerData.total;
                        this.companyListOwnerInfo.records = listOwnerData.records;
                        this.companyListOwnerInfo.companyOwners = listOwnerData.owners;
                        this.$vc.emit('pagination', 'init', {
                            total: this.companyListOwnerInfo.records,
                            dataCount: this.companyListOwnerInfo.total,
                            currentPage: page
                        });
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
            },changeMoreCondition() {
                this.companyListOwnerInfo.companyMoreCondition = !this.companyListOwnerInfo.companyMoreCondition;
            },openEditOwnerModel(owner) {
                this.$vc.emit('companyOwner', 'editCompanyOwner', 'show', owner);
            },openDelOwnerModel(owner) {
                this.$vc.emit('deleteOwner', 'openOwnerModel', owner);
                this.listOwnerInfo.moreCondition = false;
            },queryCompanyOwnerMethod() {
                this.companyListOwner(DEFAULT_PAGE, DEFAULT_ROWS);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    