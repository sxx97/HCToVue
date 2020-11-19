
        <template>
            <template v-if="viewOwnerInfo.isEnterprise == 0">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>{{viewOwnerInfo.ownerTypeCd == '1003' ? '租客' : '业主'}}信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-if="viewOwnerInfo.showCallBackButton=='true'"
                                v-on:click="_callBackListOwner(viewOwnerInfo.ownerId)">
                            返回
                        </button>
                        <button type="button" class="btn btn-primary btn-sm" v-if="viewOwnerInfo.viewOwnerFlag!='Owner'"
                                v-on:click="_openChooseOwner()">
                            选择{{viewOwnerInfo.ownerTypeCd == '1003' ? '租客' : '业主'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-2">
                            <img width="120px" height="140px" :src="viewOwnerInfo.ownerPhoto"
                                   @error="errorLoadImg"/>
                        </div>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">{{viewOwnerInfo.ownerTypeCd == '1003' ? '租客' : '业主'}}ID：</label>
                                        <label class="">{{viewOwnerInfo.ownerTypeCd == '1003' ? viewOwnerInfo.memberId : viewOwnerInfo.ownerId}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">名称：</label>
                                        <label class="">{{viewOwnerInfo.name}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">性别：</label>
                                        <label class="">{{viewOwnerInfo.sex == 0 ? '男' : '女'}}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">年龄：</label>
                                        <label class="">{{viewOwnerInfo.age}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">身份证：</label>
                                        <label class="">{{viewOwnerInfo.idCard}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">联系方式：</label>
                                        <label class="">{{viewOwnerInfo.link}}</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">创建员工：</label>
                                        <label class="">{{viewOwnerInfo.userName}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">备注：</label>
                                        <label class="">{{viewOwnerInfo.remark}}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<template v-else>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>{{viewOwnerInfo.ownerTypeCd == '1003' ? '租客' : '业主'}}信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-if="viewOwnerInfo.showCallBackButton=='true'"
                                v-on:click="_callBackListOwner(viewOwnerInfo.ownerId)">
                            返回
                        </button>
                        <button type="button" class="btn btn-primary btn-sm" v-if="viewOwnerInfo.viewOwnerFlag!='Owner'"
                                v-on:click="_openChooseOwner()">
                            选择{{viewOwnerInfo.ownerTypeCd == '1003' ? '租客' : '业主'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">{{viewOwnerInfo.ownerTypeCd == '1003' ? '租客' : '业主'}}ID：</label>
                                        <label class="">{{viewOwnerInfo.ownerTypeCd == '1003' ? viewOwnerInfo.memberId : viewOwnerInfo.ownerId}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">企业名称：</label>
                                        <label class="">{{viewOwnerInfo.enterpriseName}}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">法人代表：</label>
                                        <label class="">{{viewOwnerInfo.legalPerson}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">统一社会信用代码：</label>
                                        <label class="">{{viewOwnerInfo.unifiedSocialCreditCode}}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="col-form-label"
                                    style="vertical-align:top;">营业执照：</label>
                                <img style="vertical-align:top;border:1px solid #e6e6e6;border-radius:2px;" width="180px" height="220px"
                                       :src="viewOwnerInfo.businessLicense || '/img/noBusinessLicense.png'"
                                       @error="errorLoadImg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <vc:create name="searchOwner"
                   emitChooseOwner="viewOwnerInfo"
                   emitLoadData="viewOwnerInfo"
        ></vc:create>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>企业代表</h5>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-10">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">名称：</label>
                                        <label class="">{{viewOwnerInfo.name}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">性别：</label>
                                        <label class="">{{viewOwnerInfo.sex == 0 ? '男' : '女'}}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">身份证：</label>
                                        <label class="">{{viewOwnerInfo.idCard}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">联系方式：</label>
                                        <label class="">{{viewOwnerInfo.link}}</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-9">
                                    <div class="form-group">
                                        <label class="col-form-label">备注：</label>
                                        <label class="">{{viewOwnerInfo.remark}}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<vc:create name="searchOwner"
           emitChooseOwner="viewOwnerInfo"
           emitLoadData="viewOwnerInfo"
></vc:create>



        </template>
        <script>
            
            import SearchOwner from '@/component/SearchOwner.vue';import SearchOwner from '@/component/SearchOwner.vue';



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
                props: {"callBackListener":"false","callBackFunction":"false","showCallBackButton":"false"},
                components: {
                    SearchOwner,SearchOwner
                },
                data () {
                    return {"viewOwnerInfo":{"flowComponent":"viewOwnerInfo","viewOwnerFlag":"","ownerId":"","name":"","age":"","sex":"","userName":"","remark":"","idCard":"","link":"","memberId":"","ownerTypeCd":"","ownerPhoto":"/img/noPhoto.png","isEnterprise":0,"legalPerson":"","enterpriseName":"","businessLicense":"","unifiedSocialCreditCode":""}}    
                },
                mounted() {
                (() =>{
            if (window.location.pathname.includes('tenantDetailFlow') || window.location.search.includes('tenant')) {
                this.loadTenantInfo();
            } else {
                this._loadOwnerInfo();
            }

        })()
(() =>{
            this.$vc.on('viewOwnerInfo','onIndex',(_index) =>{
                /*if(_index == 2){
                   this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewOwnerInfo);
                }*/
            });

            this.$vc.on('viewOwnerInfo','chooseOwner',(_owner) =>{
                this.$vc.copyObject(_owner,this.viewOwnerInfo);
            });

            this.$vc.on('viewOwnerInfo','callBackOwnerInfo',(_info) =>{
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewOwnerInfo);
            });

        })()   
                },
                methods: {
                    loadTenantInfo() {
                var _ownerId = this.$vc.getParam('ownerId')
                if(!this.$vc.notNull(_ownerId)){
                    return ;
                }

                this.viewOwnerInfo.viewOwnerFlag = 'Owner';
                this.$vc.http.get('listOwner',
                    'list',
                    {
                        params: {
                            memberId: _ownerId,
                            page: 1,
                            row: 1,
                            ownerTypeCd: OWNER_TYPE.TENANT,
                            communityId:this.$vc.getCurrentCommunity().communityId,
                        }
                    },
                     (json, res) => {
                        var listOwnerData = JSON.parse(json);
                        this.$vc.copyObject(listOwnerData.owners[0],this.viewOwnerInfo);
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_loadOwnerInfo:function(){
                //加载 业主信息
                var _ownerId = this.$vc.getParam('ownerId')

                if(!this.$vc.notNull(_ownerId)){
                    return ;
                }

                this.viewOwnerInfo.viewOwnerFlag = 'Owner';

               var param = {
                    params:{
                        ownerId:_ownerId,
                        page:1,
                        row:1,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        ownerTypeCd:  window.location.href.includes('tenantDetailFlow') ?  OWNER_TYPE.TENANT : OWNER_TYPE.OWNER,
                    }
               }

                //发送get请求
               this.$vc.http.get('viewOwner',
                            'getOwner',
                             param,
                             (json,res) =>{
                                var listOwnerData =JSON.parse(json);
                                this.$vc.copyObject(listOwnerData.owners[0],this.viewOwnerInfo);
                                //加载图片
                                this._loadOwnerPhoto();
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );

            },_callBackListOwner:function(_ownerId){
                if (this.viewOwnerInfo.ownerTypeCd == OWNER_TYPE.TENANT){
                    this.$vc.jumpToPage("/flow/tenantFlow" /*?ownerId="+_ownerId*/);
                } else {
                    this.$vc.jumpToPage("/flow/ownerFlow" /*?ownerId="+_ownerId*/);
                }

            },_loadOwnerPhoto:function(){
                this.viewOwnerInfo.ownerPhoto = _fileUrl+"?objId="+
                               this.viewOwnerInfo.ownerId +"&communityId="+this.$vc.getCurrentCommunity().communityId+"&fileTypeCd=10000&time="+new Date();
            },errorLoadImg:function(){
                this.viewOwnerInfo.ownerPhoto="/img/noPhoto.png";
            },_openChooseOwner:function(){
                this.$vc.emit('searchOwner','openSearchOwnerModel',{});
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    