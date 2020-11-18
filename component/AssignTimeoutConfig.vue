
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"configItems":"[object Object],[object Object],[object Object],[object Object]","checkedTimeoutOptions":"[object Object]"}    
            },
            mounted() {
             (_initMethod() {
            this.configItems.forEach(val => {
                this.getAssignTimeoutConfig(val.type);
            })
        })()(_initEvent() {

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
    