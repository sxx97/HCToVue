
        <template>
            <div>
    <!-- 只是负责数据加载 -->
</div>
        </template>
        <script>
            
            



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
                    
                },
                data () {
                    return {"initDataInfo":{}}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('initData', 'loadCommunityInfo',  (_param) => {
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
                     (json, res) => {
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
                    },  (err) => {
                        this.$vc.jumpToPage('/flow/init_company');
                    }
                );
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    