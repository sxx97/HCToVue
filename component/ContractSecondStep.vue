
                <template>
                    
            <div class="step-component row">
               <div class="col-sm-11">
                   <div class="row mb-3">
                        <div class="col-sm-2 mr-1 text-right">
                            房间租金
                        </div>
                        <div class="col-sm-9">
                            <input type="number" 
                                placeholder="1-999999"
                                class="custom-input" style="width: 130px;">
                                元/ 
                                <select class="custom-input" style="width: 75px;">
                                    <option value="">日</option>
                                    <option value="">周</option>
                                    <option value="">月</option>
                                    <option value="">年</option>
                                </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-2 mr-1 text-right">
                            合同金额
                        </div>
                        <div class="col-sm-9">
                            <div>
                                <pay-phase-component ref="secondStepPayPhase" :allow-multiple-phase="true"></pay-phase-component>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-2 mr-1 text-right">
                            房间押金
                        </div>
                        <div class="col-sm-9">
                            <div>
                                <pay-phase-component :allow-multiple-phase="false"></pay-phase-component>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        
                </template>
                <script>
                    export default {
                        name: ContractSecondStep,
                        undefined,
                        data() {
      return {};
    },
                        undefined,
                        [object Object],
                    }
                </script>
            