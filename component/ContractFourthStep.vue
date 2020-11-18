
                <template>
                    
            <div class="step-component row">
                <div class="col-sm-11">
                    <div class="row">
                        <div class="col-sm-2 text-right">
                            租客
                        </div>
                        <div class="col-sm-8">
                            <company-select></company-select>
                            <button class="btn btn-primary">新建</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2 text-right">
                            房间
                        </div>
                        <div class="col-sm-8">
                            <room-select></room-select>
                            <button class="btn btn-primary">新建</button>
                        </div>
                    </div>       
                    <div class="row">
                        <div class="col-sm-2 text-right">
                            附件
                        </div>
                        <div class="col-sm-8">
                            <span class="btn btn-link">上传文件</span>
                            注：可上传电子合同、合同照片。
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2 text-right">
                            备注
                        </div>
                        <div class="col-sm-8">
                            <textarea class="custom-input"
                                style="width: 720px;height: 200px;"
                                placeholder="请输入，限50个字"></textarea>
                        </div>
                    </div>                        
                </div>
            </div>
        
                </template>
                <script>
                    export default {
                        name: ContractFourthStep,
                        undefined,
                        data() {
            return {

            }
        },
                        undefined,
                        [object Object],
                    }
                </script>
            