
                <template>
                    
            <div class="company-selector" @click.stop="() => {}">
                <div class="custom-input" style="width: 256px;" 
                    @click="showPanel = true;">
                    请选择
                </div>
                <div class="company-panel" v-show="showPanel">
                    <input class="custom-input" placeholder="搜索"
                        style="margin: 0 auto;"
                        v-model="keyword">
                    <ul>
                        <li>
                            <p>xxxxxxxxx公司</p>
                            <p>xxxx 【xxx-xxx-xxxxx】</p>    
                        </li>
                    </ul>
                </div>
                
            </div>
        
                </template>
                <script>
                    export default {
                        name: CompanySelect,
                        undefined,
                        data() {
            return {
                showPanel: false,
                keyword: '',
            }
        },
                        mounted() {
            document.querySelector('.contract-modal').addEventListener('click', () => {
                this.showPanel = false;
            })
            console.log('调用次数');
        },
                        [object Object],
                    }
                </script>
            