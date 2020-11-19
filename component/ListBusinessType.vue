
        <template>
            <div id="component" >
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>订单类型信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddBusinessTypeModal(-1)">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加订单类型
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <th>订单ID</th>
                            <th data-hide="phone">订单类型编码</th>
                            <th data-hide="phone">订单类型名称</th>
                            <th data-hide="phone">订单类型说明</th>
                            <th class="text-right">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="BusTypes in listBusinessTypeInfo.BusinessType">
                            <td>
                                {{BusTypes.id}}
                            </td>
                            <td>
                                {{BusTypes.businessTypeCd}}
                            </td>
                            <td>
                                {{BusTypes.name}}
                            </td>
                            <td>
                                {{BusTypes.description}}
                            </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditBusinessTypeModel(owner)">修改</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDelBusinessTypeModel(owner)">删除</button>
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

   <!-- <vc:create
            name="addOwnerRoomBinding"
            notifyLoadDataComponentName="listOwner"
    ></vc:create>
    <vc:create
            name="editOwner"
            notifyLoadDataComponentName="listOwner"

    ></vc:create>
    <vc:create name="deleteBusinessType"
    ></vc:create>-->

</div>
        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import EditOwner from '@/component/EditOwner.vue';import DeleteBusinessType from '@/component/DeleteBusinessType.vue';



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
                    Pagination,EditOwner,DeleteBusinessType
                },
                data () {
                    return {"listBusinessTypeInfo":{"BusinessType":[],"total":0,"records":1}}    
                },
                mounted() {
                (() =>{
            this._listBusinessTypeData(DEFAULT_PAGE,DEFAULT_ROWS);
        })()
(() =>{
            this.$vc.on('listOwner','listOwnerData',() =>{
                this._listBusinessTypeData(DEFAULT_PAGE,DEFAULT_ROWS);
            });
            this.$vc.on('pagination','page_event',(_currentPage) =>{
                this._listBusinessTypeData(_currentPage,DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listBusinessTypeData:function(_page,_row){
                var param = {
                    params:{
                        page:_page,
                        row:_row
                    }
                }

               //发送get请求
               this.$vc.http.get('listBusinessType',
                            'list',
                             param,
                             (json,res) =>{
                                var listBusinessTypeData =JSON.parse(json);

                                this.listBusinessTypeInfo.BusinessType = listBusinessTypeData;

                                this.$vc.emit('pagination','init',{
                                    total:this.listBusinessTypeInfo.records,
                                    currentPage:_page
                                });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );

            },_openAddBusinessTypeModal:function(){ //打开添加框
                this.$vc.emit('addBusinessType','openAddBusinessTypeModal',-1);
            },_openDelBusinessTypeModel:function(_owner){ // 打开删除对话框
                this.$vc.emit('deleteBusinessType','openBusinessTypeModel',_owner);
            },_openEditBusinessTypeModel:function(_owner){
                this.$vc.emit('editBusinessType','openEditBusinessTypeModal',_owner);
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    