
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入组名称" v-model="menuGroupManageInfo.conditions.name"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入icon" v-model="menuGroupManageInfo.conditions.icon"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <select class="custom-select" v-model="menuGroupManageInfo.conditions.label">
                                <option selected value="">请选择标签</option>
                                <option value="HOT">HOT</option>
                                <option value="TOP">TOP</option>
                            </select></div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryMenuGroupMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
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
                    <h5>菜单组信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddMenuGroupModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加菜单组
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">组Id</th>
                            <th class="text-center">组名称</th>
                            <th class="text-center">icon</th>
                            <th class="text-center">标签</th>
                            <th class="text-center">序列</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="menuGroup in menuGroupManageInfo.menuGroups">
                            <td class="text-center">{{menuGroup.gId}}</td>
                            <td class="text-center">{{menuGroup.name}}</td>
                            <td class="text-center">{{menuGroup.icon}}</td>
                            <td class="text-center">{{menuGroup.label}}</td>
                            <td class="text-center">{{menuGroup.seq}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditMenuGroupModel(menuGroup)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeleteMenuGroupModel(menuGroup)">删除
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


    <vc:create name="addMenuGroup"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <EditMenuGroup name="editMenuGroup"></EditMenuGroup>
    <DeleteMenuGroup name="deleteMenuGroup"></DeleteMenuGroup>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import EditMenuGroup from './EditMenuGroup.vue';import DeleteMenuGroup from './DeleteMenuGroup.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"menuGroupManageInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listMenuGroups(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function(){
            
            this.$vc.on('menuGroupManage','listMenuGroup',function(_param){
                  this._listMenuGroups(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',function(_currentPage){
                this._listMenuGroups(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listMenuGroups:function(_page, _rows){

                this.menuGroupManageInfo.conditions.page = _page;
                this.menuGroupManageInfo.conditions.row = _rows;
                var param = {
                    params:this.menuGroupManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('menuGroupManage',
                            'list',
                             param,
                             function(json,res){
                                var _menuGroupManageInfo=JSON.parse(json);
                                this.menuGroupManageInfo.total = _menuGroupManageInfo.total;
                                this.menuGroupManageInfo.records = _menuGroupManageInfo.records;
                                this.menuGroupManageInfo.menuGroups = _menuGroupManageInfo.menuGroups;
                                this.$vc.emit('pagination','init',{
                                     total:this.menuGroupManageInfo.records,
                                     currentPage:_page
                                 });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_openAddMenuGroupModal:function(){
                this.$vc.emit('addMenuGroup','openAddMenuGroupModal',{});
            },_openEditMenuGroupModel:function(_menuGroup){
                this.$vc.emit('editMenuGroup','openEditMenuGroupModal',_menuGroup);
            },_openDeleteMenuGroupModel:function(_menuGroup){
                this.$vc.emit('deleteMenuGroup','openDeleteMenuGroupModal',_menuGroup);
            },_queryMenuGroupMethod:function(){
                this._listMenuGroups(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function(){
                if(this.menuGroupManageInfo.moreCondition){
                    this.menuGroupManageInfo.moreCondition = false;
                }else{
                    this.menuGroupManageInfo.moreCondition = true;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    