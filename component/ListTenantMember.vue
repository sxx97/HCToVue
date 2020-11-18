
        <template>
            <div id="component">
    <MemberSelectOwner name="memberSelectOwner"></MemberSelectOwner>

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-content">
                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                            <tr>
                                <!--<th data-hide="phone">成员ID</th>-->
                                <th data-hide="phone">名称</th>
                                <th data-hide="phone">性别</th>
                                <th data-hide="phone">年龄</th>
                                <th data-hide="phone">类型</th>
                                <th data-hide="phone">身份证</th>
                                <th data-hide="phone">联系方式</th>
                                <th data-hide="phone">通行方式</th>
                                <th data-hide="phone">创建员工</th>
                                <th data-hide="phone">备注</th>
                                <th class="text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="owner in memberInfo.members">
                            <!--<td>
                                {{owner.memberId}}
                            </td>-->

                            <td>
                                {{owner.name}}
                                <template v-if="owner.ownerTypeCd == 1003">
                                    <span class="label label-info">企业代表</span>
                                </template>
                                <template v-if="owner.passageWayLongTermEffective == 1 && owner.ownerTypeCd == 1004">
                                    <span class="label label-info">长期</span>
                                </template>
                            </td>
                            <td>
                                {{owner.sex == 0 ? '男' : '女'}}
                            </td>
                            <td>
                                {{owner.age}}
                            </td>
                            <td>
                                {{owner.ownerTypeName}}
                            </td>
                            <td>
                                {{owner.idCard}}
                            </td>
                            <td>
                                {{owner.link}}
                            </td>
                            <td>
                                人脸、RFID卡
                                <input type="text" :class="['form-control', 'rfid'+owner.memberId]"
                                       :value="owner.passageWayRfidCardMeterial"
                                       style="width: 120px;display:inline-block;">
                                <button class="btn-white btn" @click="saveRFID(owner)">保存</button>
                            </td>
                            <td>
                                {{owner.userName}}
                            </td>
                            <td>
                                {{owner.remark}}
                            </td>
                            <!--<td>
                                {{owner.companyFloor}}
                            </td>
                            <td>
                                {{owner.companyName}}
                            </td>-->
                            <td class="text-right">
                                <template v-if="owner.ownerTypeCd == 1004">
                                    <div class="btn-group">
                                        <button class="btn-white btn btn-xs" v-on:click="changeLongVisitorsState(owner)">
                                            {{owner.passageWayLongTermEffective == 1 ? '取消' : '设置'}}长期访客
                                        </button>
                                    </div>
                                </template>

                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditOwnerModel(owner)">修改</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDeleteOwnerModel(owner)">删除</button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="11">
                                    <ul class="pagination float-right"></ul>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- 删除员工权限 -->
    <vc:create name="editOwner"
               notifyLoadDataComponentName="listOwnerMember"
               componentTitle="成员"
    ></vc:create>
    <vc:create name="deleteOwner"
               notifyLoadDataComponentName="listOwnerMember"
    ></vc:create>
</div>
        </template>
        <script>
            import MemberSelectOwner from './MemberSelectOwner.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"memberInfo":"[object Object]"}    
            },
            mounted() {
             (_initMethod() {

        })()(_initEvent() {
            this.$vc.on('listOwnerMember','loadOwner',function(_param){
                this._loadOwners(_param);
            });
            this.$vc.on('listOwnerMember','listOwnerData',function(_param){
                this._loadOwners(_param);
            });
        })()   
            },
            methods: {
                saveRFID(owner) {
                this.$vc.http.post('editOwner', 'changeOwner',
                    JSON.stringify({
                        communityId: this.$vc.getCurrentCommunity().communityId,
                        ...owner,
                        passageWayRfidCardMeterial: document.getElementsByClassName('rfid'+owner.memberId)[0].value,
                        passageWayHumanFaceEnable: 1,
                        passageWayRfidCardEnable: 1,
                    }),
                    {
                        emulateJSON: true
                    },
                    function(resText, res){
                        if (res.body instanceof Array) {
                            return ;
                        }
                        this.$vc.toast(resText);
                    },
                    function(errText, err) {
                        this.$vc.toast(errText);
                    }
                )
            },_loadOwners:function(_param){
                let ownerIds = _param.ownerId;
                /*if(_param.hasOwnProperty('ownerId')){
                    this.memberInfo._currentOwnerId= _param.ownerId;
                }*/
                this.memberInfo._currentOwnerId = _param.ownerId;
                this.memberInfo._currentMemberId = _param.memberId;
                if (_param.memberId !==  _param.ownerId) {
                    ownerIds = _param.ownerId + ',' + _param.memberId;
                }
                var param = {
                    params:{
                        ownerIds: ownerIds,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                    }
                };
                //发送get请求
                this.$vc.http.get('listOwnerMember',
                    'list',
                    param,
                    function(json){
                        var _memberInfo = JSON.parse(json);
                        this.memberInfo.members = _memberInfo.owners;

                    },function(){
                        console.log('请求失败处理');
                    });
            },_openDeleteOwnerModel:function(_member){
                _member.ownerId = this.memberInfo._currentOwnerId;
                this.$vc.emit('deleteOwner','openOwnerModel',_member);
            },_openEditOwnerModel:function(_member){
                _member.ownerId = this.memberInfo._currentOwnerId;
                this.$vc.emit('editOwner','openEditOwnerModal',_member);
            },changeLongVisitorsState(owner) {
                if (owner.passageWayLongTermEffective == 1) {
                    owner.passageWayLongTermEffective = 0;
                } else {
                    owner.passageWayLongTermEffective = 1;
                }
                owner.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post('editOwner', 'changeOwner',
                    JSON.stringify(owner),
                    {
                        emulateJSON:true
                    },
                    (resText, res) => {
                        // this.$vc.toast(resText);
                        this._loadOwners({
                            'ownerId': this._currentOwnerId,
                            'memberId': this._currentMemberId,
                        });
                    },
                    (errText, err) => {
                        // this.$vc.toast(errText);
                })
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    