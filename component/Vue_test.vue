
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
                return {"listDemoStudyInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listDemoStudyData(DEFAULT_PAGE,DEFAULT_ROWS);
        })()(function(){
            /*this.$vc.on('listFloor','listFloorData',function(){
                this._listFloorData(DEFAULT_PAGE,DEFAULT_ROWS);
            });*/
            this.$vc.on('pagination','page_event',function(_currentPage){
                this._listDemoStudyData(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listDemoStudyData:function(_page,_rows){
                var param = {
                    params:{
                        page:_page,
                        row:_rows,
                        communityId:this.$vc.getCurrentCommunity().communityId
                    }
                }

               //发送get请求
               this.$vc.http.get('listDemoStudy',
                            'list',
                             param,
                             function(json,res){
                                var listData =JSON.parse(json);

                                this.listDemoStudyInfo.total = listData[0].total;
                                this.listDemoStudyInfo.records = listData[0].records;
                                this.listDemoStudyInfo.demos = listData;

                                this.$vc.emit('pagination','init',{
                                    total:this.listDemoStudyInfo.records,
                                    currentPage:_page
                                });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );

            },_openAddDemoStudyModal:function(){ //打开添加框
                //this.$vc.emit('addFloor','openAddFloorModal',{});
            },_openDelDemoStudyModel:function(_floor){ // 打开删除对话框
                //this.$vc.emit('deleteFloor','openFloorModel',_floor);
            },_openEditDemoStudyModel:function(_floor){
                //this.$vc.emit('editFloor','openEditFloorModal',_floor);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    