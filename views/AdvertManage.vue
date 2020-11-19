
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{advertManageInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入广告名称" v-model="advertManageInfo.conditions.name"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <select class="custom-select" v-model="advertManageInfo.conditions.adTypeCd">
                                <option selected value="">请选择广告类型</option>
                                <option value="10000">门禁机</option>
                                <option value="20000">其他设备</option>
                            </select></div>
                        <div class="col-sm-3">
                            <select class="custom-select" v-model="advertManageInfo.conditions.classify">
                                <option selected value="">请选择广告分类</option>
                                <option value="9001">物流</option>
                                <option value="9002">餐饮</option>
                                <option value="9003">旅游</option>
                                <option value="9004">酒店</option>
                                <option value="9005">教育</option>
                                <option value="9006">互联网</option>
                            </select></div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryAdvertMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="advertManageInfo.moreCondition == true">
                            <select class="custom-select" v-model="advertManageInfo.conditions.state">
                                <option selected value="">请选择状态</option>
                                <option value="1000">未审核</option>
                                <option value="2000">审核通过</option>
                                <option value="3000">审核拒绝</option>
                                <option value="4000">未播放</option>
                                <option value="5000">播放中</option>
                            </select></div>
                    </div>


                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>广告信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddAdvertModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            发布
                        </button>

                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_viewAdvertPhotoOrPhoto()">
                            查看广告
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">广告ID</th>
                            <th class="text-center">广告名称</th>
                            <th class="text-center">广告分类</th>
                            <th class="text-center">具体位置</th>
                           <!-- <th class="text-center">广告状态</th>-->
                            <th class="text-center">投放时间</th>
                            <th class="text-center">结束时间</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="advert in advertManageInfo.adverts">
                            <td class="text-center">{{advert.advertId}}</td>
                            <td class="text-center">{{advert.adName}}</td>
                            <td class="text-center">{{advert.classifyName}}</td>
                            <td class="text-center">{{advert.locationObjName}}</td>
                            <!--<td class="text-center">{{advert.stateName}}</td>-->
                            <td class="text-center">{{advert.startTime}}</td>
                            <td class="text-center">{{advert.endTime}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditAdvertModel(advert)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDeleteAdvertModel(advert)">
                                        删除
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


    <vc:create name="addAdvert"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <vc:create name="editAdvert"></vc:create>
    <vc:create name="deleteAdvert"></vc:create>
    <vc:create name="writeAdvertMachine"></vc:create>


</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import AddAdvert from '@/component/AddAdvert.vue';import EditAdvert from '@/component/EditAdvert.vue';import DeleteAdvert from '@/component/DeleteAdvert.vue';import WriteAdvertMachine from '@/component/WriteAdvertMachine.vue';



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
                    Pagination,AddAdvert,EditAdvert,DeleteAdvert,WriteAdvertMachine
                },
                data () {
                    return {"advertManageInfo":{"adverts":[],"total":0,"records":1,"moreCondition":false,"adName":"","conditions":{"name":"","adTypeCd":"","classify":"","state":""}}}    
                },
                mounted() {
                ( () => {
            this._listAdverts(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {

            this.$vc.on('advertManage', 'listAdvert',  (_param) => {
                this._listAdverts(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listAdverts(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listAdverts:function (_page, _rows) {

                this.advertManageInfo.conditions.page = _page;
                this.advertManageInfo.conditions.row = _rows;
                this.advertManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params: this.advertManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('advertManage',
                    'list',
                    param,
                     (json, res) => {
                        var _advertManageInfo = JSON.parse(json);
                        this.advertManageInfo.total = _advertManageInfo.total;
                        this.advertManageInfo.records = _advertManageInfo.records;
                        this.advertManageInfo.adverts = _advertManageInfo.adverts;
                        this.$vc.emit('pagination', 'init', {
                            total: this.advertManageInfo.records,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAddAdvertModal:function () {
                this.$vc.emit('addAdvert', 'openAddAdvertModal', {});
            },_openEditAdvertModel:function (_advert) {
                this.$vc.emit('editAdvert', 'openEditAdvertModal', _advert);
            },_openDeleteAdvertModel:function (_advert) {
                this.$vc.emit('deleteAdvert', 'openDeleteAdvertModal', _advert);
            },_queryAdvertMethod:function () {
                this._listAdverts(DEFAULT_PAGE, DEFAULT_ROWS);

            },_viewAdvertPhotoOrPhoto:function(){
                this.$vc.emit('writeAdvertMachine', 'openWriteAdvertMachineModal',{});
            },_moreCondition:function () {
                if (this.advertManageInfo.moreCondition) {
                    this.advertManageInfo.moreCondition = false;
                } else {
                    this.advertManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    