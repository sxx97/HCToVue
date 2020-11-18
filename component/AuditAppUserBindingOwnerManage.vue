
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <!--<div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{auditAppUserBindingOwnerManageInfo.moreCondition ==
                            true?'隐藏':'更多'}}
                        </button>
                    </div>-->
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入姓名"
                                       v-model="auditAppUserBindingOwnerManageInfo.conditions.appUserName"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入身份证"
                                       v-model="auditAppUserBindingOwnerManageInfo.conditions.idCard"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <select class="custom-select" v-model="auditAppUserBindingOwnerManageInfo.conditions.state">
                                <option selected value="">请选择状态</option>
                                <option value="10000">审核中</option>
                                <option value="12000">审核成功</option>
                                <option value="13000">审核失败</option>
                            </select></div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm"
                                    v-on:click="_queryAuditAppUserBindingOwnerMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                   <!-- <div class="row">
                        <div class="col-sm-4" v-if="auditAppUserBindingOwnerManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入手机号"
                                       v-model="auditAppUserBindingOwnerManageInfo.conditions.link"
                                       class=" form-control">
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
                    <h5>注册审核</h5>
                    <div class="ibox-tools" styleownerFlow="top:10px;">
                    </div>
                </div>
                <div class="ibox-content">
                    <table class="footable table table-stripped toggle-arrow-tiny"
                       data-page-size="15">
                        <thead>
                        <tr>
                            <!--<th class="text-center">注册ID</th>
                            <th class="text-center">个人ID</th>
                            <th class="text-center">管理区ID</th>-->
                            <th class="text-center">管理区</th>
                            <th class="text-center">楼宇</th>
                            <th class="text-center">姓名</th>
                            <th class="text-center">身份</th>
                            <th class="text-center">企业/房间号</th>
                            <th class="text-center">身份证</th>
                            <th class="text-center">手机号</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">申请时间</th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="auditAppUserBindingOwner in auditAppUserBindingOwnerManageInfo.auditAppUserBindingOwners">
                            <!--<td class="text-center">{{auditAppUserBindingOwner.appUserId}}</td>
                            <td class="text-center">{{auditAppUserBindingOwner.memberId}}</td>
                            <td class="text-center">{{auditAppUserBindingOwner.communityId}}</td>-->
                            <td class="text-center">{{auditAppUserBindingOwner.communityName}}</td>
                            <td class="text-center">{{auditAppUserBindingOwner.attr.building}}</td>
                            <td class="text-center">{{auditAppUserBindingOwner.appUserName}}</td>
                            <td class="text-center">{{ownerTypeText[auditAppUserBindingOwner.ownerTypeCd]}}</td>
                            <td class="text-center">{{auditAppUserBindingOwner.attrRoomName || auditAppUserBindingOwner.attrEnterpriseName}}</td>
                            <td class="text-center">{{auditAppUserBindingOwner.idCard}}</td>
                            <td class="text-center">{{auditAppUserBindingOwner.link}}</td>
                            <td class="text-center">{{auditStateName[auditAppUserBindingOwner.state]}}</td>
                            <td class="text-center">{{auditAppUserBindingOwner.createTime}}</td>
                            <td class="text-center">
                                <template v-if="auditAppUserBindingOwner.state == '10000' || auditAppUserBindingOwner.state == '14000'">
                                    <div class="btn-group">
                                        <button class="btn-white btn btn-xs"
                                                v-on:click="_openAuditAppUserBindingOwnerModel(auditAppUserBindingOwner)">
                                            审核
                                        </button>
                                    </div>
                                </template>
                                <template v-else>
                                    ---
                                </template>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="11">
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
    <vc:create name="audit"
               callBackListener="auditAppUserBindingOwnerManage"
               callBackFunction="auditMessage"
    >

    </vc:create>
</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"auditAppUserBindingOwnerManageInfo":"[object Object]","ownerTypeText":"[object Object]","auditStateName":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listAuditAppUserBindingOwners(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function(){
            
            this.$vc.on('auditAppUserBindingOwnerManage','listAuditAppUserBindingOwner',function(_param){
                  this._listAuditAppUserBindingOwners(DEFAULT_PAGE, DEFAULT_ROWS);
            });

             this.$vc.on('auditAppUserBindingOwnerManage', 'auditMessage', function (_auditInfo) {
                this._auditAppUserBindingOwner(_auditInfo);
            });
             this.$vc.on('pagination','page_event',function(_currentPage){
                this._listAuditAppUserBindingOwners(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listAuditAppUserBindingOwners:function(_page, _rows){

                this.auditAppUserBindingOwnerManageInfo.conditions.page = _page;
                this.auditAppUserBindingOwnerManageInfo.conditions.row = _rows;
                this.auditAppUserBindingOwnerManageInfo.conditions.states = "10000,12000,13000";
                this.auditAppUserBindingOwnerManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params:this.auditAppUserBindingOwnerManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('auditAppUserBindingOwnerManage',
                            'list',
                             param,
                             function(json,res){
                                var _auditAppUserBindingOwnerManageInfo=JSON.parse(json);
                                this.auditAppUserBindingOwnerManageInfo.total = _auditAppUserBindingOwnerManageInfo.total;
                                this.auditAppUserBindingOwnerManageInfo.records = _auditAppUserBindingOwnerManageInfo.records;
                                this.auditAppUserBindingOwnerManageInfo.auditAppUserBindingOwners = _auditAppUserBindingOwnerManageInfo.auditAppUserBindingOwners;
                                this.$vc.emit('pagination','init',{
                                     total:this.auditAppUserBindingOwnerManageInfo.records,
                                     currentPage:_page
                                 });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_openAuditAppUserBindingOwnerModel:function(_auditAppUserBindingOwner){
                this.auditAppUserBindingOwnerManageInfo.currentAppUserId = _auditAppUserBindingOwner.appUserId;
                this.$vc.emit('audit', 'openAuditModal', {});
            },_auditAppUserBindingOwner:function (_auditInfo) {
                _auditInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                _auditInfo.appUserId = this.auditAppUserBindingOwnerManageInfo.currentAppUserId;
                //发送get请求
                this.$vc.http.post('auditAppUserBindingOwnerManage',
                    'audit',
                    JSON.stringify(_auditInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        this.$vc.message("处理成功", true);
                        this._listAuditAppUserBindingOwners(DEFAULT_PAGE, DEFAULT_ROWS);
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                        this.$vc.message("处理失败：" + errInfo);
                    }
                );
            },_moreCondition:function(){
                if(this.auditAppUserBindingOwnerManageInfo.moreCondition){
                    this.auditAppUserBindingOwnerManageInfo.moreCondition = false;
                }else{
                    this.auditAppUserBindingOwnerManageInfo.moreCondition = true;
                }
            },_queryAuditAppUserBindingOwnerMethod:function () {
                this._listAuditAppUserBindingOwners(DEFAULT_PAGE, DEFAULT_ROWS);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    