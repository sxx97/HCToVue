
        <template>
            <div class="row">

    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>欠费信息</h5>
                <div class="ibox-tools" style="top: 10px;">

                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button"
                                class="btn btn-light btn-sm"
                                v-bind:class="{'btn-primary': indexArrearsInfo.feeTypeCd == 888800010001}"
                                v-on:click="_switchFeeType(888800010001)"
                        >物业费</button>


                        <button type="button"
                                class="btn btn-light btn-sm"
                                v-bind:class="{'btn-primary': indexArrearsInfo.feeTypeCd == 888800010005}"
                                v-on:click="_switchFeeType(888800010005)"
                        >停车费</button>
                    </div>
                </div>
            </div>
            <div class="ibox-content">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>费用ID </th>
                            <th>业主名称 </th>
                            <th>联系电话 </th>
                            <th>{{indexArrearsInfo.feeTypeCd == 888800010001? '房间' : '车位'}}编号 </th>
                            <th>费用开始时间 </th>
                            <th>费用到期时间 </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="arr in indexArrearsInfo.arrears">
                            <td>{{arr.feeId}}</td>
                            <td>{{arr.ownerName}}</td>
                            <td>{{arr.tel}}</td>
                            <td>{{arr.num}}</td>
                            <td>{{arr.startTime}}</td>
                            <td>{{arr.endTime}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <!-- 分页 -->
                    <vc:create name="pagination"></vc:create>
                </div>

            </div>
        </div>
    </div>

</div>
        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';



            const OWNER_TYPE = {
                OWNER: '1001',
                TENANT: '1003'
            };
            // 考核类型
            const ASSESSMENT_TYPE = {
                BUSINESS: 2,
                COMMON: 1,
                SYSTEM: 3,
            };
            
            // 删除时的类型
            const DELETE_TYPE = {
                TABLE: 1, // 删除通用考核表
                BUSINESS_ITEM: 2,  // 删除业务考核项
                COMMON_ITEM: 3, // 删除通用考核项
            }
            // 考核人员
            const ASSESSMENT_OBJECT_TYPE = {
                STAFF: 1,
                SUPERVISOR: 2,
                MANAGER: 3,
            }
            
            const AUTO_ASSESSMENT_TYPE = {
                INSPECTION: 1,
                WORK_ORDER: 2,
                ATTENDANCE: 3,
            }
            
            // 考核项目
            const ASSESSMENT_ITEM_TYPE = {
                COMMON_ITEM: 1,
                BUSINESS_ITEM: 2,
            }
            
            const DEFAULT_PAGE = 1;
            const DEFAULT_ROWS = 10;

            
            export default {
                props: {},
                components: {
                    Pagination
                },
                data () {
                    return {"indexArrearsInfo":{"arrears":[],"feeTypeCd":"888800010001","total":0,"records":1}}    
                },
                mounted() {
                (() =>{
            this._listArrearsData(DEFAULT_PAGE,DEFAULT_ROWS);
        })()
(() =>{
            this.$vc.on("indexArrears","_listArrearsData",() =>{
                this._listArrearsData(DEFAULT_PAGE,DEFAULT_ROWS);
            });
            this.$vc.on('pagination','page_event',(_currentPage) =>{
                this._listArrearsData(_currentPage,DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listArrearsData:function(_page,_row){
                if(this.$vc.getCurrentCommunity() == null || this.$vc.getCurrentCommunity == undefined){
                    return ;
                }
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        feeTypeCd:this.indexArrearsInfo.feeTypeCd
                    }
                }

               //发送get请求
               this.$vc.http.get('listArrears',
                            'list',
                             param,
                             (json,res) =>{
                                var listArrearsData =JSON.parse(json);

                                this.indexArrearsInfo.total = listArrearsData.total;
                                this.indexArrearsInfo.records = listArrearsData.records;
                                this.indexArrearsInfo.arrears = listArrearsData.arrears;

                                this.$vc.emit('pagination','init',{
                                    total:this.indexArrearsInfo.records,
                                    currentPage:_page
                                });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );

            },_switchFeeType:function(_feeTypeCd){
                console.log('_feeTypeCd')
                this.indexArrearsInfo.feeTypeCd = _feeTypeCd;
                this._listArrearsData(DEFAULT_PAGE,DEFAULT_ROWS);
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    