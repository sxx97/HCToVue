
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>菜单组信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewMenuGroupInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectMenuGroupInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择菜单组</button>

                    <button type="button" v-if="viewMenuGroupInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddMenuGroupInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加菜单组</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >组名称：</label>
                            <label class="">{{viewMenuGroupInfo.name}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >icon：</label>
                            <label class="">{{viewMenuGroupInfo.icon}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >标签：</label>
                            <label class="">{{viewMenuGroupInfo.label}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >序列：</label>
                            <label class="">{{viewMenuGroupInfo.seq}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >描述：</label>
                            <label class="">{{viewMenuGroupInfo.description}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addMenuGroup"
               callBackListener="viewMenuGroupInfo"
               callBackFunction="chooseMenuGroup"
    ></vc:create>


    <vc:create name="chooseMenuGroup"
               emitChooseMenuGroup="viewMenuGroupInfo"
               emitLoadData="viewMenuGroupInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddMenuGroup from '@/component/AddMenuGroup.vue';import ChooseMenuGroup from '@/component/ChooseMenuGroup.vue';



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
                    AddMenuGroup,ChooseMenuGroup
                },
                data () {
                    return {"viewMenuGroupInfo":{"index":0,"flowComponent":"viewMenuGroupInfo","name":"","icon":"","label":"","seq":"","description":"","gId":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadMenuGroupInfoData();
        })()
(() =>{
            this.$vc.on('viewMenuGroupInfo','chooseMenuGroup',(_app) =>{
                this.$vc.copyObject(_app, this.viewMenuGroupInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewMenuGroupInfo);
            });

            this.$vc.on('viewMenuGroupInfo', 'onIndex', (_index) =>{
                this.viewMenuGroupInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectMenuGroupInfoModel(){
                this.$vc.emit('chooseMenuGroup','openChooseMenuGroupModel',{});
            },_openAddMenuGroupInfoModel(){
                this.$vc.emit('addMenuGroup','openAddMenuGroupModal',{});
            },_loadMenuGroupInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    