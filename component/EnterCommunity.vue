
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
    <StoreEnterCommunity name="storeEnterCommunity"></StoreEnterCommunity>
    <StoreExitCommunity name="storeExitCommunity"></StoreExitCommunity>

</div>
        </template>
        <script>
            import StoreEnterCommunity from './StoreEnterCommunity.vue';import StoreExitCommunity from './StoreExitCommunity.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"communityInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this.listMyCommunity();
        })()(function(){
            this.$vc.on('enterCommunity','listMyCommunity',function(_param){
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
                             function(json,res){
                                this.communityInfo.enterCommunityInfo=JSON.parse(json);
                             },function(errInfo,error){
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
    