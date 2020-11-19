
        <template>
            <div class="row" id="component">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>banner信息</h5>
                <div class="ibox-tools"
                    style="top: 10px;">
                    <button class="btn btn-primary">
                        <i class="glyphicon gyphicon-plus"></i>
                        添加
                    </button>
                </div>
            </div>

            <div class="ibox-content">
                <table class="footable table table-stripped toggle-arrow-tiny"
                   data-page-size="15">
                    <thead>
                        <tr>
                            <th class="text-left">添加时间</th>
                            <th class="text-left">banner标题</th>
                            <th class="text-left">位置</th>
                            <th class="text-left">落地页类型</th>
                            <th class="text-left">内容</th>
                            <th class="text-left">显示日期</th>
                            <th class="text-left">权重</th>
                            <th class="text-left">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
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
                    return {}    
                },
                mounted() {
                (() => {

        })()
(() => {

        })()   
                },
                methods: {
                    
                },
            }
    
        </script>
        <style>
            
        </style>
    