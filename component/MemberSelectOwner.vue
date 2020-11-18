
        <template>
            <template v-if="ownerInfo.isEnterprise == 1">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>{{isTenant ? '租客' : '业主'}}信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="openSearchOwnerModel()">
                            <i class="glyphicon glyphicon-search"></i> 选择{{isTenant ? '企业租客' : '业主'}}
                        </button>
                        <!--<button type="button" class="btn btn-primary btn-sm"
                                v-if="ownerInfo.ownerId != null && ownerInfo.ownerId != ''"
                                style="margin-left:10px" v-on:click="openAddMemberModel()">
                            <i class="glyphicon glyphicon-plus"></i> 添加成员
                        </button>-->
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">{{ownerInfo.ownerTypeCd == '1003' ? '租客' : '业主'}}ID：</label>
                                        <label class="">{{ownerInfo.ownerId}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">企业名称：</label>
                                        <label class="">{{ownerInfo.enterpriseName}}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">法人代表：</label>
                                        <label class="">{{ownerInfo.legalPerson}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">统一社会信用代码：</label>
                                        <label class="">{{ownerInfo.unifiedSocialCreditCode}}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="col-form-label"
                                       style="vertical-align:top;">营业执照：</label>
                                <image style="vertical-align:top;border:1px solid #e6e6e6;border-radius:2px;" width="180px" height="220px" :src="ownerInfo.businessLicense"
                                       @error="errorLoadImg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                                        <label class="">{{ownerInfo.name}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">性别：</label>
                                        <label class="">{{ownerInfo.sex == 0 ? '男' : '女'}}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">身份证：</label>
                                        <label class="">{{ownerInfo.idCard}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="col-form-label">联系方式：</label>
                                        <label class="">{{ownerInfo.link}}</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-9">
                                    <div class="form-group">
                                        <label class="col-form-label">备注：</label>
                                        <label class="">{{ownerInfo.remark}}</label>
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
                    <h5>业主信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="openSearchOwnerModel()">
                            <i class="glyphicon glyphicon-search"></i> 选择业主
                        </button>
                        <button type="button" class="btn btn-primary btn-sm"
                                v-if="ownerInfo.ownerId != null && ownerInfo.ownerId != ''"
                                style="margin-left:10px" v-on:click="openAddMemberModel()">
                            <i class="glyphicon glyphicon-plus"></i> 添加成员
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-2">
                            <image width="120px" height="140px" v-bind:src="ownerInfo.ownerPhoto" @error="errorLoadImg"/>
                        </div>
                        <div class="col-sm-9">
                            <div class="row">
                                <!--<div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">业主ID：</label>
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
                                        <label class="col-form-label">性别：</label>
                                        <label class="">{{ownerInfo.sexName}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">联系方式：</label>
                                        <label class="">{{ownerInfo.link}}</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">年龄：</label>
                                        <label class="">{{ownerInfo.age}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">身份证：</label>
                                        <label class="">{{ownerInfo.idCard}}</label>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">创建员工：</label>
                                        <label class="">{{ownerInfo.userName}}</label>
                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label class="col-form-label">备注：</label>
                                        <label class="">{{ownerInfo.remark}}</label>
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
           emitChooseOwner="memberSelectOwner"
           emitLoadData="listOwnerMember"
></vc:create>


<vc:create
        name="addOwner"
        notifyLoadDataComponentName="listOwnerMember"
        componentTitle="成员"
></vc:create>
        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"isTenant":"false","ownerInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

        })()(function(){
            this.$vc.on('memberSelectOwner','chooseOwner',function(_owner){
                this.$vc.copyObject(_owner,this.ownerInfo);
                this.ownerInfo.sexName = (this.ownerInfo.sex == 0 ? '男' : '女');
                this._loadOwnerPhoto();
            });

        })()   
            },
            methods: {
                openSearchOwnerModel(){
                this.$vc.emit('searchOwner','openSearchOwnerModel',{});
            },openAddMemberModel(){
                this.$vc.emit('addOwner','openAddOwnerModal',this.ownerInfo.ownerId
                );
            },_loadOwnerPhoto:function(){
                this.ownerInfo.ownerPhoto = _fileUrl+"?objId="+
                               this.ownerInfo.ownerId +"&communityId="+this.$vc.getCurrentCommunity().communityId+"&fileTypeCd=10000&time="+new Date();
            },errorLoadImg:function(){
                this.ownerInfo.ownerPhoto="/img/noPhoto.png";
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    