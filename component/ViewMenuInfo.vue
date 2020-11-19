
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>菜单信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewMenuInfo.index != 2" class="btn btn-primary btn-sm"
                            style="margin-right:10px;" v-on:click="_openSelectMenuInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择菜单
                    </button>

                    <button type="button" v-if="viewMenuInfo.index != 2" class="btn btn-primary btn-sm"
                            v-on:click="_openAddMenuInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加菜单
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">菜单名称：</label>
                            <label class="">{{viewMenuInfo.name}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">菜单地址：</label>
                            <label class="">{{viewMenuInfo.url}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">序列：</label>
                            <label class="">{{viewMenuInfo.seq}}</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">菜单显示：</label>
                            <label class="">{{viewMenuInfo.isShow}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">描述：</label>
                            <label class="">{{viewMenuInfo.description}}</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <vc:create name="addMenu"
               callBackListener="viewMenuInfo"
               callBackFunction="chooseMenu"
    ></vc:create>


    <vc:create name="chooseMenu"
               emitChooseMenu="viewMenuInfo"
               emitLoadData="viewMenuInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddMenu from '@/component/AddMenu.vue';import ChooseMenu from '@/component/ChooseMenu.vue';



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
                props: {"callBackListener":"true","callBackFunction":"true"},
                components: {
                    AddMenu,ChooseMenu
                },
                data () {
                    return {"viewMenuInfo":{"index":0,"flowComponent":"viewMenuInfo","name":"","url":"","seq":"","isShow":"","description":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadMenuInfoData();
        })()
(() =>{
            this.$vc.on('viewMenuInfo','chooseMenu',(_app) =>{
                this.$vc.copyObject(_app, this.viewMenuInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewMenuInfo);
            });

            this.$vc.on('viewMenuInfo', 'onIndex', (_index) =>{
                this.viewMenuInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectMenuInfoModel(){
                this.$vc.emit('chooseMenu','openChooseMenuModel',{});
            },_openAddMenuInfoModel(){
                this.$vc.emit('addMenu','openAddMenuModal',{});
            },_loadMenuInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    