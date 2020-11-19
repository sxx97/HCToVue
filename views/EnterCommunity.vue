
        <template>
            <div id="component" >
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>我的管理区</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openEnterCommunityModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            入驻管理区
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
<!--                            <th>管理区ID</th>-->
                            <th data-hide="phone">名称</th>
<!--                            <th data-hide="phone">联系方式</th>-->
                            <th data-hide="phone">地址</th>
                            <th data-hide="phone">地标</th>
                            <th data-hide="phone,tablet" >城市编码</th>
                            <th data-hide="phone">状态</th>
                            <th class="text-right">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="community in communityInfo.enterCommunityInfo">
                            <!--<td>
                                {{community.communityId}}
                            </td>-->
                            <td>
                                {{community.name}}
                            </td>
                            <!--<td>
                                {{community.tel}}
                            </td>-->
                            <td>
                                {{community.address}}
                            </td>
                            <td>
                                {{community.nearbyLandmarks}}
                            </td>
                            <td>
                                {{community.cityCode}}
                            </td>
                            <td>
                                {{_showCommunityStatus(community.auditStatusCd)}}
                            </td>
                            <td class="text-right">
                                <div class="btn-group" v-if="community.auditStatusCd == '1100' && community.communityId != '7020181217000001'">
                                    <button class="btn-white btn btn-xs" v-on:click="_openExitCommunityModel(community)">申请退出</button>
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

                </div>
            </div>
        </div>
    </div>
    <vc:create name="storeEnterCommunity"></vc:create>
    <vc:create name="storeExitCommunity"></vc:create>

</div>
        </template>
        <script>
            
            import StoreEnterCommunity from '@/component/StoreEnterCommunity.vue';import StoreExitCommunity from '@/component/StoreExitCommunity.vue';



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
                    StoreEnterCommunity,StoreExitCommunity
                },
                data () {
                    return {"communityInfo":{"enterCommunityInfo":[]}}    
                },
                mounted() {
                (() =>{
            this.listMyCommunity();
        })()
(() =>{
            this.$vc.on('enterCommunity','listMyCommunity',(_param) =>{
                  this.listMyCommunity();
            });
        })()   
                },
                methods: {
                    listMyCommunity:function(){
                var param = {
                    params:{
                        msg:this.message,
                        _sb:'123',
                    }

               }
               //发送get请求
               this.$vc.http.get('enterCommunity',
                            'listMyCommunity',
                             param,
                             (json,res) =>{
                                this.communityInfo.enterCommunityInfo=JSON.parse(json);
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openEnterCommunityModal:function(){
                this.$vc.emit('storeEnterCommunity','openStoreEnterCommunity',{});
            },_openExitCommunityModel:function(_community){
                this.$vc.emit('storeExitCommunity','openStoreExitCommunityModal',_community);
            },_showCommunityStatus(_statusCd){
                if(_statusCd == '1000'){
                    return "入驻审核";
                }else if(_statusCd == '1200'){
                    return "入驻失败";
                }else if(_statusCd == '1100'){
                    return "入驻成功";
                }

                return "未知";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    