
        <template>
            <div id = "chooseMenuModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseMenuModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseMenuModelLabel">选择菜单</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row">

                                <div class="col-sm-7 m-b-xs">
                                </div>
                                <div class="col-sm-5">
                                    <div class="input-group">
                                        <input placeholder="输入菜单名称" type="text" v-model="chooseMenuInfo._currentMenuName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryMenus()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">菜单ID</th>
                            <th class="text-center">菜单名称</th>
                            <th class="text-center">菜单地址</th>
                            <th class="text-center">序列</th>
                            <th class="text-center">菜单显示</th>
                            <th class="text-center">描述</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="menu in chooseMenuInfo.menus">
                                                                        <td class="text-center">{{menu.mId}}</td>
                            <td class="text-center">{{menu.name}}</td>
                            <td class="text-center">{{menu.url}}</td>
                            <td class="text-center">{{menu.seq}}</td>
                            <td class="text-center">{{menu.isShow}}</td>
                            <td class="text-center">{{menu.description}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseMenu(menu)">选择</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

        </template>
        <script>
            
        export default {
            props: {"emitChooseMenu":"true","emitLoadData":"true"},
            components: {
                
            },
            data () {
                return {"chooseMenuInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
        })()(function(){
            this.$vc.on('chooseMenu','openChooseMenuModel',function(_param){
                $('#chooseMenuModel').modal('show');
                this._refreshChooseMenuInfo();
                this._loadAllMenuInfo(1,10,'');
            });
        })()   
            },
            methods: {
                _loadAllMenuInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseMenu',
                            'list',
                             param,
                             function(json){
                                var _menuInfo = JSON.parse(json);
                                this.chooseMenuInfo.menus = _menuInfo.menus;
                             },function(){
                                console.log('请求失败处理');
                             }
                           );
            },chooseMenu:function(_menu){
                if(_menu.hasOwnProperty('name')){
                     _menu.menuName = _menu.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseMenu,'chooseMenu',_menu);
                this.$vc.emit(this.$vc._thisemitLoadData,'listMenuData',{
                    menuId:_menu.menuId
                });
                $('#chooseMenuModel').modal('hide');
            },queryMenus:function(){
                this._loadAllMenuInfo(1,10,this.chooseMenuInfo._currentMenuName);
            },_refreshChooseMenuInfo:function(){
                this.chooseMenuInfo._currentMenuName = "";
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    