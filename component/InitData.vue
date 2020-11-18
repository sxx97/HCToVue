
        <template>
            <div>
    <!-- 只是负责数据加载 -->
</div>
        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"initDataInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {
            this.$vc.on('initData', 'loadCommunityInfo', function (_param) {
                this._loadCommunityInfo(_param);
            })
        })()   
            },
            methods: {
                _loadCommunityInfo:function (_param) {
                var param = {
                    params:{
                        _uId:'ccdd00opikookjuhyyttvhnnjuuu'
                    }
                };
                this.$vc.http.get('initData',
                    'getCommunitys',
                    param,
                    function (json, res) {
                        if (res.status == 200) {
                            var _communityInfos = JSON.parse(json).communitys;
                            if (_communityInfos != null && _communityInfos.length > 0) {
                                this.$vc.setCurrentCommunity(_communityInfos[0]);
                                this.$vc.setCommunitys(_communityInfos);
                            }
                            if (_communityInfos == undefined) {
                                this.$vc.jumpToPage('/flow/init_company');
                            } else {
                                this.$vc.jumpToPage(_param.url);
                            }
                            return ;
                        }
                        this.$vc.jumpToPage('/flow/init_company');
                    }, function (err) {
                        this.$vc.jumpToPage('/flow/init_company');
                    }
                );
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    