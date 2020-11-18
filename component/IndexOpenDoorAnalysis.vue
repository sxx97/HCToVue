
        <template>
            <div class="row">

    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>项目</h5>
                <div class="ibox-tools" style="top: 10px;">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button"
                                class="btn btn-light btn-sm"
                                v-bind:class="{'btn-primary': indexOpenDoorAnalysisInfo.openTypeCd == 1000}"
                                v-on:click="_switchOpenType(1000)"
                        >刷脸开门
                        </button>


                        <button type="button"
                                class="btn btn-light btn-sm"
                                v-bind:class="{'btn-primary': indexOpenDoorAnalysisInfo.openTypeCd == 2000}"
                                v-on:click="_switchOpenType(2000)"
                        >密码开门
                        </button>
                    </div>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-2">
                        <span>开门次数趋势</span>
                    </div>
                    <div class="col-sm-6">

                    </div>
                    <div class="col-sm-2">
                        <input size="16" type="text" placeholder="请选择开始时间" readonly
                               class="form-control form-control-sm start_time">
                    </div>
                    <div class="col-sm-2">
                        <input size="16" type="text" placeholder="请选择结束时间" readonly
                               class="form-control form-control-sm end_time">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div id="machine-record" style="height: 400px"></div>
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
                return {"indexOpenDoorAnalysisInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            //this._listAnalysisData(DEFAULT_PAGE,DEFAULT_ROWS);
            this._initMachineRecordData();
            this._initOpenDoorAnalysisDateInfo();
        })()(function () {
            this.$vc.on("indexOpenDoorAnalysis", "_listAnalysisData", function () {
                this._listAnalysisData(DEFAULT_PAGE, DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _initMachineRecordData:function () {
                var dom = document.getElementById("machine-record");
                dom.style.width = (window.innerWidth * 0.9) + 'px';
                var myChart = echarts.init(dom);

                var app = {};
                option = null;
                app.title = '坐标轴刻度与标签对齐';

                option = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['12月9日', '12月10日', '12月11日', '12月12日', '12月13日', '12月14日', '12月15日'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '开门次数',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
            },_initOpenDoorAnalysisDateInfo:function () {
                this.indexOpenDoorAnalysisInfo.startTime = this.$vc.dateFormat(new Date().getTime());
                $('.start_time').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.start_time').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".start_time").val();
                        this.indexOpenDoorAnalysisInfo.startTime = value;
                    });
                $('.end_time').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.end_time').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".end_time").val();
                        this.indexOpenDoorAnalysisInfo.endTime = value;
                    });
            },_listOpenDoorData:function (_page, _row) {
                if (this.$vc.getCurrentCommunity() == null || this.$vc.getCurrentCommunity == undefined) {
                    return;
                }
                var param = {
                    params: {
                        page: _page,
                        row: _row,
                        communityId: this.$vc.getCurrentCommunity().communityId,
                        openTypeCd: this.indexOpenDoorAnalysisInfo.openTypeCd
                    }
                }

                //发送get请求
                this.$vc.http.get('listAnalysis',
                    'list',
                    param,
                    function (json, res) {
                        var listAnalysisData = JSON.parse(json);

                        this.indexOpenDoorAnalysisInfo.total = listAnalysisData.total;
                        this.indexOpenDoorAnalysisInfo.records = listAnalysisData.records;
                        this.indexOpenDoorAnalysisInfo.arrears = listAnalysisData.arrears;

                        this.$vc.emit('pagination', 'init', {
                            total: this.indexOpenDoorAnalysisInfo.records,
                            currentPage: _page
                        });
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );

            },_switchOpenType:function (_openTypeCd) {
                console.log('_openTypeCd')
                this.indexOpenDoorAnalysisInfo.openTypeCd = _openTypeCd;
                this._listOpenDoorData(DEFAULT_PAGE, DEFAULT_ROWS);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    