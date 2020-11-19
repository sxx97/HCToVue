
                <template>
                    
            <div>
                <template v-for="(phase, n) in payPhase" :key="n">
                    <div class="mb-1">
                        <template v-if="allowMultiplePhase">
                            【第{{n+1}}期】
                        </template>
                        <span class="backgauge1">支付日期</span> <input type="text" style="width:200px;" 
                            v-model="phase.date"
                            class="custom-input" placeholder="请选择" calss="backgauge1">
                            <span class="backgauge1">支付金额</span> <input type="number" style="width: 130px;" 
                            v-model="phase.amount"
                            placeholder="1-999999" calss="backgauge1"> 元
                        <template v-if="allowMultiplePhase">
                            <div class="glyphicon glyphicon-remove-circle" 
                                @click="changePayPhase(n)">
                            </div>
                        </template>
                    </div>
                    <div style="height: 40px;"  class="mb-1">
                        <label class="backgauge">
                            <input type="checkbox" v-model="phase.isChecked">
                            <span>抵扣金额</span>
                        </label>
                        <template v-if="phase.isChecked">
                            <input type="text" class="custom-input" placeholder="1-999999"
                                style="width: 130px"  v-model="phase.deductionAmount" class="backgauge1">元
                            <label class="ml-1">
                            <span >抵扣说明</span> <input type="text" class="custom-input" calss="backgauge1" placeholder="限15个字"
                                    style="width: 240px;" v-model="phase.deductionReason">
                            </label>
                        </template>            
                    </div>
                </template>
                <template v-if="allowMultiplePhase">
                    <button class="btn btn-primary" @click="changePayPhase()">
                        <i class="glyphicon glyphicon-plus"></i>添加支付日期及支付金额
                    </button>
                </template>
            </div>
        
                </template>
                <script>
                    export default {
                        name: PayPhaseComponent,
                        [object Object],
                        data() {
      return {
        payPhase: [
          {
            isChecked: false,
            date: "",
            amount: "",
            deductionAmount: "",
            deductionReason: "",
          },
        ],
      };
    },
                        undefined,
                        [object Object],
                    }
                </script>
            