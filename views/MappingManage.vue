
        <template>
            <div id="component">
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
                                <input type="text" placeholder="请输入域"
                                       v-model="mappingManageInfo.conditions.domain" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入名称"
                                       v-model="mappingManageInfo.conditions.name" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入键"
                                       v-model="mappingManageInfo.conditions.key" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryMappingMethod()">
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
                    <h5>映射信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddMappingModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                           style="table-layout: fixed;word-break:break-all;"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">编码ID</th>
                            <th class="text-center">域</th>
                            <th class="text-center">名称</th>
                            <th class="text-center">键</th>
                            <th class="text-center">值</th>
                            <th class="text-right">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="mapping in mappingManageInfo.mappings">
                            <td class="text-center">{{mapping.id}}</td>
                            <td class="text-center">{{mapping.domain}}</td>
                            <td class="text-center">{{mapping.name}}</td>
                            <td class="text-center">{{mapping.key}}</td>
                            <td class="text-center">{{mapping.value}}</td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditMappingModel(mapping)">
                                        修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDeleteMappingModel(mapping)">
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

    <vc:create name="addMapping"></vc:create>
    <vc:create name="editMapping"></vc:create>
    <vc:create name="deleteMapping"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import AddMapping from '@/component/AddMapping.vue';import EditMapping from '@/component/EditMapping.vue';import DeleteMapping from '@/component/DeleteMapping.vue';



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
                    Pagination,AddMapping,EditMapping,DeleteMapping
                },
                data () {
                    return {"mappingManageInfo":{"mappings":[],"name":"","total":0,"records":1,"conditions":{"domain":"","name":"","key":""}}}    
                },
                mounted() {
                (() =>{
            this._listMappings(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
(() =>{
            this.$vc.on('mappingManage','listMapping',(_param) =>{
                  this._listMappings(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',(_currentPage) =>{
                this._listMappings(_currentPage,DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listMappings:function(_page, _rows){
                this.mappingManageInfo.conditions.page = _page;
                this.mappingManageInfo.conditions.row = _rows;
                var param = {
                    params:this.mappingManageInfo.conditions
                 };

               //发送get请求
               this.$vc.http.get('mappingManage',
                            'list',
                             param,
                             (json,res) =>{
                                var _mappingManageInfo=JSON.parse(json);
                                this.mappingManageInfo.total = _mappingManageInfo.total;
                                this.mappingManageInfo.records = _mappingManageInfo.records;
                                this.mappingManageInfo.mappings = _mappingManageInfo.mappings;
                                this.$vc.emit('pagination','init',{
                                     total:this.mappingManageInfo.records,
                                     currentPage:_page
                                 });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openAddMappingModal:function(){
                this.$vc.emit('addMapping','openAddMappingModal',{});
            },_openEditMappingModel:function(_mapping){
                this.$vc.emit('editMapping','openEditMappingModal',_mapping);
            },_openDeleteMappingModel:function(_mapping){
                this.$vc.emit('deleteMapping','openDeleteMappingModal',_mapping);
            },_queryMappingMethod:function(){
                this._listMappings(DEFAULT_PAGE, DEFAULT_ROWS);

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    