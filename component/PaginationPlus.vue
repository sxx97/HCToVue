
        <template>
            <nav aria-label="Page navigation example" v-if="this.paginationPlusInfo.total != 0">
    <ul class="pagination justify-content-end">
        <li class="page-item" v-bind:class="{disabled:this.paginationPlusInfo.currentPage == 1}">
            <a class="page-link" v-on:click="this.current(1)"> « </a>
        </li>
        <li class="page-item" v-bind:class="{disabled:this.paginationPlusInfo.currentPage == 1}">
            <a class="page-link" v-on:click="this.previous()"> ‹ </a>
        </li>
        <li class="page-item" v-for="pageInfo in this.paginationPlusInfo.pageList" v-bind:class="{active:pageInfo.currentPage}">
            <a class="page-link" v-on:click="this.current(pageInfo.page)">{{pageInfo.pageView}}</a>
        </li>
        <li class="page-item" v-bind:class="{disabled:this.paginationPlusInfo.currentPage == this.paginationPlusInfo.total}">
            <a class="page-link" v-on:click="this.next()"> › </a>
        </li>
        <li class="page-item" v-bind:class="{disabled:this.paginationPlusInfo.currentPage == this.paginationPlusInfo.total}">
            <a class="page-link" v-on:click="this.current(this.paginationPlusInfo.total)"> » </a>
        </li>
        <span class="total" style="line-height: 30px;margin-left: 10px;" v-if="this.paginationPlusInfo.dataCount != 0">共 {{this.paginationPlusInfo.dataCount}} 条</span>
    </ul>
</nav>
        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"deleteParkingAreaInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('deleteParkingArea','openDeleteParkingAreaModal',function(_params){

                this.deleteParkingAreaInfo = _params;
                $('#deleteParkingAreaModel').modal('show');

            });
        })()   
            },
            methods: {
                deleteParkingArea:function(){
                this.deleteParkingAreaInfo.communityId=this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'deleteParkingArea',
                    'delete',
                    JSON.stringify(this.deleteParkingAreaInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#deleteParkingAreaModel').modal('hide');
                            this.$vc.emit('parkingAreaManage','listParkingArea',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.message(json);

                     });
            },closeDeleteParkingAreaModel:function(){
                $('#deleteParkingAreaModel').modal('hide');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    