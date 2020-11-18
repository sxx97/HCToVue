
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>添加访客拜访事由</h5>
            </div>
            <div class="ibox-content">
                <div>
                    <div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">访客拜访事由</label>
                            <div class="col-sm-10">
                                <textarea v-model="addVisitCase.visitCase" type="text" placeholder="请填写访客拜访事由" rows="3"
                                          class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"addVisitCase":"[object Object]"}    
            },
            mounted() {
             (function(){

        })()(function(){
            this.$vc.on('addVisitCase', 'onIndex', function(_index){
                console.log("侦听到addVisitCase的index为  "+_index);
                // this.addCarInfo.index = _index;
                this.$vc.emit('addVisitSpace', 'notify', _index);
            });

        })()   
            },
            methods: {
                addCarValidate:function(){

            },saveAddCarInfo:function(){
                if(this.addCarValidate()){
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackComponent,this.$vc._thiscallBackFunction, this.addCarInfo);
                    return ;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    