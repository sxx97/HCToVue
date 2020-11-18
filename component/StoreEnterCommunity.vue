
        <template>
            <div id = "storeEnterCommunityModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="addPrivilegeModalLabel">申请入驻</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p style="color: red;">{{storeEnterCommunityInfo.errorInfo}}</p>
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row">

                                <div class="col-sm-7 m-b-xs">

                                </div>
                                <div class="col-sm-5">
                                    <div class="input-group">
                                        <input placeholder="输入写字楼名称" v-model="storeEnterCommunityInfo.searchCommunityName" type="text" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="listNoEnterCommunity()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>写字楼ID</th>
                                            <th data-hide="phone">名称</th>
                                           <!-- <th data-hide="phone">联系方式</th>-->
                                            <th data-hide="phone">地址</th>
                                           <!-- <th data-hide="phone">地标</th>
                                            <th data-hide="phone,tablet" >城市编码</th>-->
                                            <th class="text-right">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="community in storeEnterCommunityInfo.communityInfo">
                                            <td>
                                                {{community.communityId}}
                                            </td>
                                            <td>
                                                {{community.name}}
                                            </td>
                                            <!--<td>
                                                {{community.tel}}
                                            </td>-->
                                            <td>
                                                {{community.address}}
                                            </td>
                                           <!-- <td>
                                                {{community.nearbyLandmarks}}
                                            </td>
                                            <td>
                                                {{community.cityCode}}
                                            </td>-->
                                            <td class="text-right">
                                                <div class="btn-group">
                                                    <button class="btn-white btn btn-xs" v-on:click="_saveEnterCommunity(community)">申请入驻</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"storeEnterCommunityInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
            this.$vc.on('storeEnterCommunity','openStoreEnterCommunity',function(_params){
                $('#storeEnterCommunityModel').modal('show');
                this.storeEnterCommunityInfo.searchCommunityName = '';
                this.listNoEnterCommunity();
            });
        })()   
            },
            methods: {
                listNoEnterCommunity:function(){
                    var param = {
                        params:{
                            communityName:this.storeEnterCommunityInfo.searchCommunityName
                        }

                   }
                   //发送get请求
                   this.$vc.http.get('storeEnterCommunity',
                                'listNoEnterCommunity',
                                 param,
                                 function(json,res){
                                    this.storeEnterCommunityInfo.communityInfo=JSON.parse(json);
                                 },function(errInfo,error){
                                    console.log('请求失败处理');
                                 }
                   );
             },_saveEnterCommunity:function(_communityInfo){
                var _param = {
                    communityId:_communityInfo.communityId
                };
                //发送get请求
               this.$vc.http.post('storeEnterCommunity',
                            '_saveEnterCommunity',
                             JSON.stringify(_param),
                             {
                                 emulateJSON:true
                              },
                             function(json,res){
                                if(res.status == 200){
                                    this.$vc.emit('enterCommunity','listMyCommunity',{
                                    });
                                    $('#storeEnterCommunityModel').modal('hide');

                                    return ;
                                }
                                this.storeEnterCommunityInfo.errorInfo = json;
                             },function(errInfo,error){
                                console.log('请求失败处理');
                                this.storeEnterCommunityInfo.errorInfo = json;

                             }
                           );

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    