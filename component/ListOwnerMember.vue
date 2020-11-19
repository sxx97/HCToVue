
        <template>
            <div id="component" >
    <vc:create name="memberSelectOwner"></vc:create>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15"



                    >
                        <thead>
                        <tr>
                            <!--<th>成员ID</th>-->
                            <th data-hide="phone">名称</th>
                            <th data-hide="phone">性别</th>
                            <th data-hide="phone">年龄</th>
                            <th data-hide="phone">类型</th>
                            <th data-hide="phone">身份证</th>
                            <th data-hide="phone">联系方式</th>
                            <th data-hide="phone">创建员工</th>
                            <th data-hide="phone">备注</th>
                            <th data-hide="phone">公司楼层</th>
                            <th data-hide="phone">公司名称</th>
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
                                {{owner.userName}}
                            </td>
                            <td>
                                {{owner.remark}}
                            </td>
                            <td>
                                {{owner.companyFloor}}
                            </td>
                            <td>
                                {{owner.companyName}}
                            </td>
                            <td class="text-right">
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
                            <td colspan="12">
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
            
            import MemberSelectOwner from '@/component/MemberSelectOwner.vue';import EditOwner from '@/component/EditOwner.vue';import DeleteOwner from '@/component/DeleteOwner.vue';



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
                    MemberSelectOwner,EditOwner,DeleteOwner
                },
                data () {
                    return {"memberInfo":{"members":[],"_currentOwnerId":""}}    
                },
                mounted() {
                (() =>{

        })()
(() =>{

            this.$vc.on('listOwnerMember','loadOwner',(_param) =>{
                this._loadOwners(_param);
            });
            this.$vc.on('listOwnerMember','listOwnerData',(_param) =>{
                this._loadOwners(_param);
            });
        })()   
                },
                methods: {
                    _loadOwners:function(_param){
                if(_param.hasOwnProperty('ownerId')){
                    this.memberInfo._currentOwnerId=_param.ownerId;
                }
                var param = {
                    params:{
                        ownerId: this.memberInfo._currentOwnerId,
                        communityId: this.$vc.getCurrentCommunity().communityId,
                        ownerTypeCd: OWNER_TYPE.TENANT,
                    }
                };
             //发送get请求
            this.$vc.http.get('listOwnerMember',
                         'list',
                          param,
                          (json) =>{
                             var _memberInfo = JSON.parse(json);
                             this.memberInfo.members = _memberInfo.owners;

                          },() =>{
                             console.log('请求失败处理');
                          });
            },_openDeleteOwnerModel:function(_member){
                _member.ownerId = this.memberInfo._currentOwnerId;
                this.$vc.emit('deleteOwner','openOwnerModel',_member);
            },_openEditOwnerModel:function(_member){
                _member.ownerId = this.memberInfo._currentOwnerId;
                this.$vc.emit('editOwner','openEditOwnerModal',_member);
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    