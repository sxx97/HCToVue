
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
                    
                },
                data () {
                    return {"paginationPlusInfo":{"total":0,"dataCount":0,"currentPage":1,"pageList":[]}}    
                },
                mounted() {
                (undefined)()
( () => {
            this.$vc.on($namespace,'paginationPlus','info_event',  (_paginationPlusInfo) => {
                this.paginationPlusInfo.total = _paginationPlusInfo.total;
                if(_paginationPlusInfo.hasOwnProperty("dataCount")){
                    this.paginationPlusInfo.dataCount = _paginationPlusInfo.dataCount;
                }
                this.paginationPlusInfo.currentPage = _paginationPlusInfo.currentPage;
                this._freshPageList();
            });

            this.$vc.on($namespace,'paginationPlus', 'init',  (_paginationPlusInfo) => {
                this.paginationPlusInfo.total = _paginationPlusInfo.total;
                if(_paginationPlusInfo.hasOwnProperty("dataCount")) {
                    this.paginationPlusInfo.dataCount = _paginationPlusInfo.dataCount;
                }
                this.paginationPlusInfo.currentPage = _paginationPlusInfo.currentPage;
                this._freshPageList();
            });
        })()   
                },
                methods: {
                    previous:function () {
                // 当前页为 1时 不触发消息
                if (this.paginationPlusInfo.currentPage <= 1) {
                    return;
                }
                this.paginationPlusInfo.currentPage = this.paginationPlusInfo.currentPage - 1;
                this.$vc.emit($namespace,'paginationPlus','page_event', this.paginationPlusInfo.currentPage);
            },next:function () {
                if (this.paginationPlusInfo.currentPage >= this.paginationPlusInfo.total) {
                    return;
                }
                this.paginationPlusInfo.currentPage = this.paginationPlusInfo.currentPage + 1;
                this.$vc.emit($namespace,'paginationPlus','page_event', this.paginationPlusInfo.currentPage);

            },current:function (_page) {
                if(_page == -1){
                    return;
                }
                if (_page > this.paginationPlusInfo.total) {
                    return;
                }
                this.paginationPlusInfo.currentPage = _page;

                this.$vc.emit($namespace,'paginationPlus','page_event', this.paginationPlusInfo.currentPage);
            },_freshPageList:function () {
                var current = this.paginationPlusInfo.currentPage;
                var total = this.paginationPlusInfo.total;
                this.paginationPlusInfo.pageList = [];
                if (total > 6) {
                    //当前页数小于5时显示省略号
                    if (current < 5) {
                        for (var i = 1; i < 6; i++) {
                            if (current == i) {
                                this.paginationPlusInfo.pageList.push({
                                    "page": i,
                                    "pageView": i + "",
                                    "currentPage": true
                                });
                            } else {
                                this.paginationPlusInfo.pageList.push({
                                    "page": i,
                                    "pageView": i + "",
                                    "currentPage": false
                                });
                            }
                        }
                        this.paginationPlusInfo.pageList.push({
                            "page": -1,
                            "pageView": "...",
                            "currentPage": false
                        });
                        this.paginationPlusInfo.pageList.push({
                            "page": total,
                            "pageView": total + "",
                            "currentPage": false
                        });
                    } else {
                        //判断页码在末尾的时候
                        if (current < total - 3) {
                            for (var i = current - 2; i < current + 3; i++) {
                                if (current == i) {
                                    this.paginationPlusInfo.pageList.push({
                                        "page": i,
                                        "pageView": i + "",
                                        "currentPage": true
                                    });
                                } else {
                                    this.paginationPlusInfo.pageList.push({
                                        "page": i,
                                        "pageView": i + "",
                                        "currentPage": false
                                    });
                                }
                            }
                            this.paginationPlusInfo.pageList.push({
                                "page": -1,
                                "pageView": "...",
                                "currentPage": false
                            });
                            this.paginationPlusInfo.pageList.push({
                                "page": total,
                                "pageView": total + "",
                                "currentPage": false
                            });
                            //页码在中间部分时候
                        } else {
                            this.paginationPlusInfo.pageList.push({
                                "page": 1,
                                "pageView": 1 + "",
                                "currentPage": false
                            });
                            this.paginationPlusInfo.pageList.push({
                                "page": -1,
                                "pageView": "...",
                                "currentPage": false
                            });
                            for (var i = total - 4; i < total + 1; i++) {
                                if (current == i) {
                                    this.paginationPlusInfo.pageList.push({
                                        "page": i,
                                        "pageView": i + "",
                                        "currentPage": true
                                    });
                                } else {
                                    this.paginationPlusInfo.pageList.push({
                                        "page": i,
                                        "pageView": i + "",
                                        "currentPage": false
                                    });
                                }
                            }
                        }
                    }
                    //页面总数小于6的时候
                } else {
                    for (var i = 1; i < total + 1; i++) {
                        if (current == i) {
                            this.paginationPlusInfo.pageList.push({
                                "page": i,
                                "pageView": i + "",
                                "currentPage": true
                            });
                        } else {
                            this.paginationPlusInfo.pageList.push({
                                "page": i,
                                "pageView": i + "",
                                "currentPage": false
                            });
                        }
                    }
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    