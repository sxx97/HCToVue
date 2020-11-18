
                <template>
                    
            <div class="steps">
                <div class="step-group">
                    <div v-for="n in totalStep"
                       :key="n" 
                        :class="['step-item', step >= n ? 'active' : '']">
                        {{n}}
                    </div>    
                </div>
                
                <div class="steps-label"> 
                    <div v-for="n in totalStep"
                       :key="n" 
                        :class="[step >= n ? 'active' : '']">
                        <span></span>
                    </div>
                </div>
            </div>
        
                </template>
                <script>
                    export default {
                        name: ContractSteps,
                        [object Object],
                        data() {
            return {

            }
        },
                        undefined,
                        [object Object],
                    }
                </script>
            