
        <template>
            <div id="component">
    <div v-for="item in configItems" class="config-item">
        <div>
            {{item.text}}
        </div>
        <div>
            <div v-for="minute in item.timeoutOptions">
                <input type="radio" :value="minute" :name="`timeoutOption${item.type.toString()}`"
                    v-model="checkedTimeoutOptions[`timeoutOption${item.type.toString()}`]">{{minuteToHour(minute)}}
            </div>
        </div>
        <button class="btn btn-primary" @click="setAssignTimeoutConfig(item.type)">保存</button>
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
                    return {"configItems":[{"text":"报事-公共区域清洁,保洁主管判定时限:","timeoutOptions":[5,10,15,20],"type":[1]},{"text":"报事-公共区域报修,工程主管判定时限:","timeoutOptions":[30,45,60,75],"type":[2]},{"text":"报事-其他、投诉,综合主管判定时限:","timeoutOptions":[5,10,15,20],"type":[4,5]},{"text":"报事-物品进出,保安主管判定时限:","timeoutOptions":[15,30,45,60],"type":[3]}],"checkedTimeoutOptions":{}}    
                },
                mounted() {
                (() => {
            this.configItems.forEach(val => {
                this.getAssignTimeoutConfig(val.type);
            })
        })()
(() => {

        })()   
                },
                methods: {
                    setAssignTimeoutConfig(type) {
                const timeout = this.checkedTimeoutOptions[`timeoutOption${type.toString()}`];
                type.forEach(async (val, key) => {
                    const res = await this.editAssignTimeoutRequest(val, timeout);
                    if (key === type.length -1) {
                        this.$vc.toast(res.body.data.code === 0 ? "设置成功" : res.body.data.msg);
                    }
                })
            },getAssignTimeoutConfig(type) {
                let timeoutOption = `timeoutOption${type.toString()}`;
                type = type[0];
                this.$vc.http.get('workOrder', 'getAssignTimeout',
                    {
                        params: {
                            regionId: this.$vc.getCurrentCommunity().communityId,
                            type: type,
                        }
                    },
                    (resText, res) => {
                        let checkedTimeoutOption = res.body.code === 0 &&  res.body.data.length > 0 ? res.body.data[0].timeoutSeconds / 60 : null;
                        Vue.set(this.checkedTimeoutOptions, timeoutOption, checkedTimeoutOption);
                    },
                    (errText, err) => {
                        console.log(err, "获取超时配置失败");
                    })
            },editAssignTimeoutRequest(type, timeout) {
                return new Promise((resolve, reject) => {
                    this.$vc.http.post('workOrder', 'setAssignTimeout',
                        JSON.stringify({
                            type,
                            timeoutSeconds: timeout*60,
                            regionId: this.$vc.getCurrentCommunity().communityId,
                        }),
                        {
                            emulateJSON:true
                        },
                        (resText, res) => {
                            resolve(res);
                            console.log(res, "提交结果成功");
                        },
                        (errText, err) => {
                            reject(err);
                            console.log(err, "提交结果失败");
                        })
                })
            },minuteToHour(minute) {
                if (minute < 60) {
                    return minute+'分钟'
                }
                return parseInt(minute / 60) + '小时' + (minute % 60 > 0 ? minute % 60 + '分钟': '');
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    