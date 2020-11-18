
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{menuManageInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group input-group">
                                <input type="text" placeholder="请选择菜单组名称" v-model="menuManageInfo.conditions.gName"
                                       class=" form-control">
                                <div class="input-group-prepend">
                                    <button type="button" class="btn btn-primary btn-sm"
                                            v-on:click="_openChooseMenuGroupMethod()"><i
                                            class="glyphicon glyphicon-search"></i> 选择
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入菜单ID" v-model="menuManageInfo.conditions.mId"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入菜单名称" v-model="menuManageInfo.conditions.mName"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryMenuMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="menuManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入权限ID" v-model="menuManageInfo.conditions.pId"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4" v-if="menuManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入权限名称" v-model="menuManageInfo.conditions.pName"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3" v-if="menuManageInfo.moreCondition == true">
                            <select class="custom-select" v-model="menuManageInfo.conditions.domain">
                                <option selected value="">请选择商户类型</option>
                                <option value="800900000001">运营团队</option>
                                <option value="800900000002">代理商</option>
                                <option value="800900000003">物业</option>
                                <option value="800900000000">开发团队</option>
                            </select></div>
                        <div class="col-sm-1">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="menuManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入员工账号" v-model="menuManageInfo.conditions.uName"
                                       class=" form-control">
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
                    <h5>菜单信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddMenuModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            配置菜单
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">菜单ID</th>
                            <th class="text-center">菜单名称</th>
                            <th class="text-center">菜单地址</th>
                            <th class="text-center">序列</th>
                            <th class="text-center">菜单显示</th>
                            <td class="text-center">权限ID</td>
                            <td class="text-center">权限名称</td>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="menu in menuManageInfo.menus">
                            <td class="text-center">{{menu.mId}}</td>
                            <td class="text-center">{{menu.name}}</td>
                            <td class="text-center">{{menu.url}}</td>
                            <td class="text-center">{{menu.seq}}</td>
                            <td class="text-center">{{menu.isShowName}}</td>
                            <td class="text-center">{{menu.pId}}</td>
                            <td class="text-center">{{menu.pName}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditMenuModel(menu)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDeleteMenuModel(menu)">删除
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

    <vc:create name="chooseMenuGroup"
               emitChooseMenuGroup="menuManage"
               emitLoadData="menuManage"
    ></vc:create>


   <!-- <vc:create name="addMenu"
               callBackListener=""
               callBackFunction=""
    ></vc:create>-->
    <EditMenu name="editMenu"></EditMenu>
    <DeleteMenu name="deleteMenu"></DeleteMenu>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import EditMenu from './EditMenu.vue';import DeleteMenu from './DeleteMenu.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"menuManageInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this.menuManageInfo.conditions.mId = this.$vc.getParam("mId");
            this._listMenus(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function(){
            this.$vc.on('menuManage','chooseMenuGroup',function(_param){
            if(_param.hasOwnProperty("name")){
                _param.gName = _param.name;
            }
              this.$vc.copyObject(_param,this.menuManageInfo.conditions);
            });

            this.$vc.on('menuManage','listMenu',function(_param){
                  this._listMenus(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',function(_currentPage){
                this._listMenus(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listMenus:function(_page, _rows){

                this.menuManageInfo.conditions.page = _page;
                this.menuManageInfo.conditions.row = _rows;
                var param = {
                    params:this.menuManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('menuManage',
                            'list',
                             param,
                             function(json,res){
                                var _menuManageInfo=JSON.parse(json);
                                this.menuManageInfo.total = _menuManageInfo.total;
                                this.menuManageInfo.records = _menuManageInfo.records;
                                this.menuManageInfo.menus = _menuManageInfo.menus;
                                this.$vc.emit('pagination','init',{
                                     total:this.menuManageInfo.records,
                                     currentPage:_page
                                 });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_openAddMenuModal:function(){
                //this.$vc.emit('addMenu','openAddMenuModal',{});
                this.$vc.jumpToPage("/flow/configMenuFlow");
            },_openEditMenuModel:function(_menu){
                this.$vc.emit('editMenu','openEditMenuModal',_menu);
            },_openDeleteMenuModel:function(_menu){
                this.$vc.emit('deleteMenu','openDeleteMenuModal',_menu);
            },_queryMenuMethod:function(){
                this._listMenus(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function(){
                if(this.menuManageInfo.moreCondition){
                    this.menuManageInfo.moreCondition = false;
                }else{
                    this.menuManageInfo.moreCondition = true;
                }
            },_openChooseMenuGroupMethod:function(){
                this.$vc.emit('chooseMenuGroup','openChooseMenuGroupModel',{});

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    