
        <template>
            <div id="component" >

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>剩余车位</h5>
                    <div class="ibox-tools" style="top:10px;">
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <th>总车位数</th>
                            <th data-hide="phone">剩余车位数</th>
                            <th data-hide="phone">采集时间</th>
                            <th class="text-right">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                {{remainingParkingSpaceInfo.total}}位
                            </td>

                            <td>
                                {{remainingParkingSpaceInfo.freeCount}}位
                            </td>
                            <td>
                                {{remainingParkingSpaceInfo.createTime}}
                            </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_freshRemainingParkingSpace()">刷新</button>
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

</div>
        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"remainingParkingSpaceInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._listRemainingParkingSpaceData();
        })()(function () {

        })()   
            },
            methods: {
                _listRemainingParkingSpaceData:function () {
                var param = {
                    params: {
                        communityId: this.$vc.getCurrentCommunity().communityId
                    }
                }

                //发送get请求
                this.$vc.http.get('remainingParkingSpace',
                    'list',
                    param,
                    function (json, res) {
                        var listParkingSpaceData = JSON.parse(json).data;

                        this.remainingParkingSpaceInfo.total = listParkingSpaceData.total;
                        this.remainingParkingSpaceInfo.freeCount = listParkingSpaceData.freeCount;
                        this.remainingParkingSpaceInfo.createTime = this.$vc.dateFormat(new Date().getTime());
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );

            },_freshRemainingParkingSpace:function(){
                this._listRemainingParkingSpaceData();
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    