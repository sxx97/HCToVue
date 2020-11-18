
        <template>
            <div id="vueTest">
    <span>
        {{message}}
        {{version}}
    </span>

</div>
        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"addDemoInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
            this.$vc.on('addDemo','openAddDemoModal',function(){
                $('#addDemoModel').modal('show');
            });
        })()   
            },
            methods: {
                addDemoValidate(){
                return this.$vc.validate.validate({
                    addDemoInfo:this.addDemoInfo
                },{
                    'addDemoInfo.demoName':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"名称不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,20",
                            errInfo:"名称长度必须在2位至10位"
                        },
                    ],
                    'addDemoInfo.demoValue':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"值不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,20",
                            errInfo:"描述不能为空"
                        },
                    ],
                    'addDemoInfo.demoRemark':[

                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注长度不能超过200位"
                        }
                    ]

                });
            },saveDemoInfo:function(){
                if(!this.addDemoValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return ;
                }
                this.$vc.http.post(
                    'addDemo',
                    'saveDemo',
                    JSON.stringify(this.addDemoInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#addDemoModel').modal('hide');
                            this.clearAddFloorInfo();
                            this.$vc.emit('listDemo','listDemoData',{});

                            return ;
                        }
                        this.addFloorInfo.errorInfo = json;

                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.addFloorInfo.errorInfo = errInfo;

                     });
            },clearAddFloorInfo:function(){
                this.addFloorInfo = {
                                            name:'',
                                            floorNum:'',
                                            remark:'',
                                            errorInfo:''
                                        };
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    