
        <template>
            <div class="is-select">
    <input type="text" placeholder="请输入" @input="changeKeyword" />
    <!--<select>
        <option value=""></option>
    </select>-->
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
                props: {"remoteMethod":"object","callBackListener":"true","callBackFunction":"true"},
                components: {
                    
                },
                data () {
                    return {"selectKeyword":"","optionList":[]}    
                },
                mounted() {
                (() =>{

        })()
(() =>{

        })()   
                },
                methods: {
                    changeKeyword(params) {
                console.log(params, "输入的内容");
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    