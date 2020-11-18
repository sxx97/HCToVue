
                <template>
                    
            <div v-if="modalStatus" class="modal-layer" @click="hideModal">
                <div class="contract-modal" @click.stop="() => {}">
                    <div class="contract-modal-header">
                        <div class="glyphicon glyphicon-remove float-right close-modal" @click="hideModal"></div>
                        <contract-steps :step="step" :total-step="totalStep"></contract-steps>
                    </div>
                    <div v-show="step <= totalStep">
                        <div class="contract-modal-content">
                            <contract-first-step v-show="step === 1"></contract-first-step>
                            <contract-second-step ref="secondStep" v-show="step === 2"></contract-second-step>
                            <contract-third-step v-show="step === 3"></contract-third-step>
                            <contract-fourth-step v-show="step === 4"></contract-fourth-step>
                        </div>
                    </div>
                    <div v-show="step >  totalStep">
                        <contract-preview @change-contract-step="changeStep" v-show="step === 5"></contract-preview>
                        <div class="contract-modal-content"></div>
                    </div> 
                    <div class="contract-modal-footer">
                        <template v-if="step > 1">
                            <button class="btn btn-primary" @click="step--">
                                上一步
                            </button>
                        </template>
                        <template v-if="step < totalStep">
                            <button class="btn btn-primary"
                                @click="nextStep">
                                下一步
                            </button>
                        </template>
                        <template v-if="step === totalStep + 1">
                            <button class="btn btn-primary"
                                @click="submitContract">
                                提交
                            </button>
                        </template>
                        <template v-if="step === totalStep">
                            <button class="btn btn-primary" @click="nextStep">
                                预览并提交
                            </button>
                        </template>
                    </div>
                </div>
            </div>
                </template>
                <script>
                    export default {
                        name: OperateContractModal,
                        [object Object],
                        data () {
            return {
                step: 1,
                totalStep: 4,
            }
        },
                        undefined,
                        [object Object],
                    }
                </script>
            