
        <template>
            <div id="component" >
    <img id="imgView" v-bind:src="advertVedioViewInfo.imgUrl" style="width: 100%;position:absolute;top:0;left:0;height:100%;" class="thumbnail" />
    <!--autoplay="autoplay" controls  muted="muted"-->
    <video id="videoView" src=""   style="object-fit: fill;width: 100%;height:100%" volume="true" ></video>
</div>
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
                    return {"advertVedioViewInfo":{"imgUrl":"","notices":"","imgsAndVideos":[],"words":""}}    
                },
                mounted() {
                ( () => {
            this._loadAdvertVedioData();
            var h = document.documentElement.clientHeight;//获取页面可见高度
            $("#videoView").height(h + "px");//掐头去尾，减去100px
        })()
( () => {

        })()   
                },
                methods: {
                    _loadAdvertVedioData:function () {
                var _machineCode = this.$vc.getParam("machineCode");
                if (!this.$vc.notNull(_machineCode)) {
                    this.$vc.toast("请求参数中未包含设备编码");
                    return;
                }

                var _communityId = this.$vc.getParam("communityId");
                if (!this.$vc.notNull(_communityId)) {
                    this.$vc.toast("请求参数中未包含写字楼信息");
                    return;
                }

                var param = {
                    params: {
                        machineCode: _machineCode,
                        communityId: _communityId
                    }
                };

                //发送get请求
                this.$vc.http.get('advertVedioView',
                    'list',
                    param,
                     (json) => {
                        var _advertInfo = JSON.parse(json);
                        _advertInfo = this._refreshAdvertActive(_advertInfo);
                        this.startInterval(_advertInfo);
                    },  () => {
                        console.log('请求失败处理');
                    }
                );
            },startInterval:function (data) {
                this.advertVedioViewInfo.imgsAndVideos = data;
                myvideo = document.getElementById("videoView")
                this.handleImgVideoUrl(this.advertVedioViewInfo.imgsAndVideos);
            },handleImgVideoUrl:function (_imgsAndVideos) {
                // 设置图片和视频播放
                // let iavSize = imgsAndVideos.length;
                var vList = [];
                // var vList = ['0:https://www.runoob.com/try/demo_source/movie.mp4','1:http://www.runoo.png']; // 播放列表
                for (var index = 0; index < _imgsAndVideos.length; index++) {
                    vList.push(_imgsAndVideos[index].suffix + ":" + _imgsAndVideos[index].url);
                }

                var vLen = vList.length;
                console.log("当前url", vList[curr]);
                if (vList[curr].indexOf('VIDEO:') >= 0) {
                    $("#imgView").hide();
                    $("#videoView").show();
                    var url = vList[curr].replace('VIDEO:', '');
                    $('#videoView').attr('src', url);
                    myvideo.load();
                    myvideo.play();
                    //curr++;
                } else {
                    var url = vList[curr].replace('JPEG:', '');
                    $("#imgView").attr("src", url);
                    $("#videoView").hide();
                    $("#imgView").show();
                    curr++;
                    // console.log("当前图片地址：1" );
                    setTimeout( () => {
                        if (curr >= vLen) {
                            curr = 0; //重新循环播放
                            this._loadAdvertVedioData();
                            return;
                        }
                        console.log("当前图片地址：2" + vList[curr]);
                        this.handleImgVideoUrl(_imgsAndVideos);
                    }, _imagePlayTime);
                }

                //视频播放完执行的方法
                myvideo.onended = function () {
                    if (vList[curr].indexOf('VIDEO:') >= 0) {
                        curr++;
                        if (curr >= vLen) {
                            curr = 0; //重新循环播放
                        }
                        this.handleImgVideoUrl(_imgsAndVideos);
                    } else {
                        // 图片
                        // let imgUrl = prefixUrl.substring(2);
                        var url = vList[curr].replace('JPEG:', '');
                        $("#imgView").attr("src", url);
                        $("#videoView").hide();
                        $("#imgView").show();
                        //$('#videoView').get(0).pause();
                        console.log("当前图片地址：" + url);
                        curr++;

                        setTimeout( () => {
                            if (curr >= vLen) {
                                curr = 0; //重新循环播放
                                this._loadAdvertVedioData();
                                return;
                            }
                            this.handleImgVideoUrl(_imgsAndVideos);
                        }, _imagePlayTime);

                    }

                };
            },_refreshAdvertActive:function (_advertInfo) {
                _advertInfo.sort( (_child, _newChild) => {
                    return _child.seq - _newChild.seq
                });

                return _advertInfo;
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    