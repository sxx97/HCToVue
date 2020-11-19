
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>物品管理信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewResourceStoreInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectResourceStoreInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择物品管理</button>

                    <button type="button" v-if="viewResourceStoreInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddResourceStoreInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加物品管理</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >物品名称：</label>
                            <label class="">{{viewResourceStoreInfo.resName}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >物品编码：</label>
                            <label class="">{{viewResourceStoreInfo.resCode}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >物品价格：</label>
                            <label class="">{{viewResourceStoreInfo.price}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >物品库存：</label>
                            <label class="">{{viewResourceStoreInfo.stock}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >描述：</label>
                            <label class="">{{viewResourceStoreInfo.description}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addResourceStore"
               callBackListener="viewResourceStoreInfo"
               callBackFunction="chooseResourceStore"
    ></vc:create>


    <vc:create name="chooseResourceStore"
               emitChooseResourceStore="viewResourceStoreInfo"
               emitLoadData="viewResourceStoreInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddResourceStore from '@/component/AddResourceStore.vue';import ChooseResourceStore from '@/component/ChooseResourceStore.vue';



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
                props: {"callBackListener":"false","callBackFunction":"false"},
                components: {
                    AddResourceStore,ChooseResourceStore
                },
                data () {
                    return {"viewResourceStoreInfo":{"index":0,"flowComponent":"viewResourceStoreInfo","resName":"","resCode":"","price":"","stock":"","description":""}}    
                },
                mounted() {
                ( () => {
            //根据请求参数查询 查询 业主信息
            this._loadResourceStoreInfoData();
        })()
( () => {
            this.$vc.on('viewResourceStoreInfo', 'chooseResourceStore',  (_app) => {
                this.$vc.copyObject(_app, this.viewResourceStoreInfo);
                this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.viewResourceStoreInfo);
            });

            this.$vc.on('viewResourceStoreInfo', 'onIndex',  (_index) => {
                this.viewResourceStoreInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectResourceStoreInfoModel() {
                this.$vc.emit('chooseResourceStore', 'openChooseResourceStoreModel', {});
            },_openAddResourceStoreInfoModel() {
                this.$vc.emit('addResourceStore', 'openAddResourceStoreModal', {});
            },_loadResourceStoreInfoData:function () {

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    