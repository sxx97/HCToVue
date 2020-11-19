
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>业主信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="openSearchOwnerModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择业主</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <!--<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >业主ID：</label>
                            <label class="">{{ownerInfo.ownerId}}</label>
                        </div>
                    </div>-->
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">名称：</label>
                            <label class="">{{ownerInfo.name}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >性别：</label>
                            <label class="">{{ownerInfo.sex == 0 ? '男' : '女'}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >联系方式：</label>
                            <label class="">{{ownerInfo.link}}</label>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >年龄：</label>
                            <label class="">{{ownerInfo.age}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">创建员工：</label>
                            <label class="">{{ownerInfo.userName}}</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <vc:create name="searchOwner"
               emitChooseOwner="sellRoomSelectOwner"
               emitLoadData="sellRoomOther"
    ></vc:create>
</div>
        </template>
        <script>
            
            import SearchOwner from '@/component/SearchOwner.vue';



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
                props: {"callBackComponent":"true"},
                components: {
                    SearchOwner
                },
                data () {
                    return {"ownerInfo":{"ownerId":"","name":"","age":"","sex":"","userName":"","remark":"","link":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this.loadOwnerData();
        })()
(() =>{
            this.$vc.on('sellRoomSelectOwner','chooseOwner',(_owner) =>{
                this.ownerInfo = _owner;
                this.$vc.emit(this.$vc._thiscallBackComponent,'notify',_owner);
            });

        })()   
                },
                methods: {
                    openSearchOwnerModel(){
                this.$vc.emit('searchOwner','openSearchOwnerModel',{});
            },loadOwnerData:function(){
               this.ownerInfo.ownerId = this.$vc.getParam("ownerId");
               this.ownerInfo.name = this.$vc.getParam("name");
               this.ownerInfo.age = this.$vc.getParam("age");
               this.ownerInfo.sex = this.$vc.getParam("sex");
               this.ownerInfo.userName = this.$vc.getParam("userName");
               this.ownerInfo.link = this.$vc.getParam("link");

               if(this.ownerInfo.ownerId != ''){
                  this.$vc.emit(this.$vc._thiscallBackComponent,'notify',this.ownerInfo);
               }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    