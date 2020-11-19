
        <template>
            <div id="component" >

    <!-- 业主信息 -->
    <vc:create name="viewOwnerInfo"
               callBackListener="deleteOwnerRoom"
               callBackFunction="notify"
               showCallBackButton="true"
    ></vc:create>

    <!-- 业主 房间信息 -->
    <vc:create name="showOwnerRoom"
               deleteOwnerRoomFlag="true"
    ></vc:create>

</div>
        </template>
        <script>
            
            import ViewOwnerInfo from '@/component/ViewOwnerInfo.vue';import ShowOwnerRoom from '@/component/ShowOwnerRoom.vue';



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
                    ViewOwnerInfo,ShowOwnerRoom
                },
                data () {
                    return {}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
        })()
(() =>{

        })()   
                },
                methods: {
                    
                },
            }
    
        </script>
        <style>
            
        </style>
    