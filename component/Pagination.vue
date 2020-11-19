
        <template>
            <nav aria-label="Page navigation example" >
    <ul class="pagination justify-content-end">
        <template v-if="paginationInfo.isShowPageSelector">
            <li class="page-item" v-bind:class="{disabled:paginationInfo.currentPage == 1}">
                <a class="page-link" v-on:click="current(1)"> « </a>
            </li>
        </template>
        <li class="page-item" v-bind:class="{disabled:paginationInfo.currentPage == 1}">
            <a class="page-link" v-on:click="previous()"> ‹ </a>
        </li>
        <template v-if="paginationInfo.isShowPageSelector">
            <li class="page-item" v-for="pageInfo in paginationInfo.pageList" v-bind:class="{active:pageInfo.currentPage}">
                <a class="page-link" v-on:click="current(pageInfo.page)">{{pageInfo.pageView}}</a>
            </li>
        </template>
        <li class="page-item" v-bind:class="{disabled: paginationInfo.total > 0 && paginationInfo.currentPage == paginationInfo.total}">
            <a class="page-link" v-on:click="next()"> › </a>
        </li>
        <template v-if="paginationInfo.isShowPageSelector">
            <li class="page-item" v-bind:class="{disabled:paginationInfo.currentPage == paginationInfo.total}">
                <a class="page-link" v-on:click="current(paginationInfo.total)"> » </a>
            </li>
            <span class="total" style="line-height: 30px;margin-left: 10px;" v-if="paginationInfo.dataCount != 0">共 {{paginationInfo.dataCount}} 条</span>
        </template>
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
                    return {"paginationInfo":{"total":0,"dataCount":0,"currentPage":1,"pageList":[]}}    
                },
                mounted() {
                (undefined)()
( () => {
            this.$on('pagination_info_event',  (_paginationInfo) => {
                if(_paginationInfo.hasOwnProperty("total")) {
                    this.paginationInfo.total = _paginationInfo.total;
                }
                if(_paginationInfo.hasOwnProperty("dataCount")){
                    this.paginationInfo.dataCount = _paginationInfo.dataCount;
                }
                this.paginationInfo.currentPage = _paginationInfo.currentPage;
                if(_paginationInfo.hasOwnProperty("isShowPageSelector")) {
                    this.paginationInfo.isShowPageSelector = _paginationInfo.isShowPageSelector;
                    this._freshPageList();
                }
            });

            this.$vc.on('pagination', 'init',  (_paginationInfo) => {
                if(_paginationInfo.hasOwnProperty("total")) {
                    this.paginationInfo.total = _paginationInfo.total;
                }
                if(_paginationInfo.hasOwnProperty("dataCount")) {
                    this.paginationInfo.dataCount = _paginationInfo.dataCount;
                }
                this.paginationInfo.currentPage = _paginationInfo.currentPage;
                if(_paginationInfo.hasOwnProperty("isShowPageSelector")) {
                    this.paginationInfo.isShowPageSelector = _paginationInfo.isShowPageSelector;
                    this._freshPageList();
                }
            });
        })()   
                },
                methods: {
                    previous:function () {
                // 当前页为 1时 不触发消息
                if (this.paginationInfo.currentPage <= 1) {
                    return;
                }
                this.paginationInfo.currentPage = this.paginationInfo.currentPage - 1;
                this.$emit('pagination_page_event', this.paginationInfo.currentPage);
            },next:function () {
                if (this.paginationInfo.isShowPageSelector  && this.paginationInfo.currentPage >= this.paginationInfo.total) {
                    return;
                }
                this.paginationInfo.currentPage = this.paginationInfo.currentPage + 1;
                this.$emit('pagination_page_event', this.paginationInfo.currentPage);
            },current:function (_page) {
                if(_page == -1){
                    return;
                }
                if (_page > this.paginationInfo.total) {
                    return;
                }
                this.paginationInfo.currentPage = _page;

                this.$emit('pagination_page_event', this.paginationInfo.currentPage);
            },_freshPageList:function () {
                var current = this.paginationInfo.currentPage;
                var total = this.paginationInfo.total;
                this.paginationInfo.pageList = [];
                if (total > 6) {
                    //当前页数小于5时显示省略号
                    if (current < 5) {
                        for (var i = 1; i < 6; i++) {
                            if (current == i) {
                                this.paginationInfo.pageList.push({
                                    "page": i,
                                    "pageView": i + "",
                                    "currentPage": true
                                });
                            } else {
                                this.paginationInfo.pageList.push({
                                    "page": i,
                                    "pageView": i + "",
                                    "currentPage": false
                                });
                            }
                        }
                        this.paginationInfo.pageList.push({
                            "page": -1,
                            "pageView": "...",
                            "currentPage": false
                        });
                        this.paginationInfo.pageList.push({
                            "page": total,
                            "pageView": total + "",
                            "currentPage": false
                        });
                    } else {
                        //判断页码在末尾的时候
                        if (current < total - 3) {
                            for (var i = current - 2; i < current + 3; i++) {
                                if (current == i) {
                                    this.paginationInfo.pageList.push({
                                        "page": i,
                                        "pageView": i + "",
                                        "currentPage": true
                                    });
                                } else {
                                    this.paginationInfo.pageList.push({
                                        "page": i,
                                        "pageView": i + "",
                                        "currentPage": false
                                    });
                                }
                            }
                            this.paginationInfo.pageList.push({
                                "page": -1,
                                "pageView": "...",
                                "currentPage": false
                            });
                            this.paginationInfo.pageList.push({
                                "page": total,
                                "pageView": total + "",
                                "currentPage": false
                            });
                            //页码在中间部分时候
                        } else {
                            this.paginationInfo.pageList.push({
                                "page": 1,
                                "pageView": 1 + "",
                                "currentPage": false
                            });
                            this.paginationInfo.pageList.push({
                                "page": -1,
                                "pageView": "...",
                                "currentPage": false
                            });
                            for (var i = total - 4; i < total + 1; i++) {
                                if (current == i) {
                                    this.paginationInfo.pageList.push({
                                        "page": i,
                                        "pageView": i + "",
                                        "currentPage": true
                                    });
                                } else {
                                    this.paginationInfo.pageList.push({
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
                            this.paginationInfo.pageList.push({
                                "page": i,
                                "pageView": i + "",
                                "currentPage": true
                            });
                        } else {
                            this.paginationInfo.pageList.push({
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
    