
                <template>
                    
            <div class="step-component row">
                <div class="col-sm-11">
                    <div class="row mb-3">
                        <div class="col-sm-2 mr-1 text-right">
                            其它费用
                        </div>
                        <div class="col-sm-8 row">
                            <div class="mb-3">
                                <div class="row mb-1">
                                    <div class="col-sm-6">
                                        <input type="checkbox">
                                        一次性付清【例：钥匙押金等】                            
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="checkbox">
                                        分期支付【例：物业费等】
                                        <div class="glyphicon glyphicon-remove-circle"></div>
                                    </div>
                                </div>
                                <div class="mb-1">
                                    费用名称
                                    <input type="text" class="custom-input" placeholder="限10个字">
                                </div>
                                <pay-phase-component ref="thirdStepPayPhase" :allow-multiple-phase="true"></pay-phase-component>
                            </div>   
                            <button class="btn btn-primary">
                                <i class="glyphicon glyphicon-plus"></i>
                                添加其它费用
                            </button>     
                        </div>
                    </div>
                 </div>
            </div>
        
                </template>
                <script>
                    export default {
                        name: ContractThirdStep,
                        undefined,
                        data() {
      return {};
    },
                        undefined,
                        [object Object],
                    }
                </script>
            