
        <template>
            <div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>二维码信息</h5>
                    <div class="ibox-tools" style="top:10px;">

                        <form>
                            <div class="form-row">
                                <div class="col">
                                    <button type="button" class="btn btn-primary btn-sm"
                                            v-on:click="_downLoadQrCode()">
                                        <i class="glyphicon glyphicon-download-alt"></i>
                                        下载二维码
                                    </button>
                                </div>
                            </div>
                        </form>


                    </div>
                </div>
                <div class="ibox-content">
                    <div id="qrcode" style="width:350px; height:350px; margin:15px auto;"></div>
                </div>
            </div>
        </div>
    </div>
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
                    return {"parkingSpaceQrCodeInfo":{"url":""}}    
                },
                mounted() {
                (() =>{
            this._makeQrCode();
         })()
(() =>{

        })()   
                },
                methods: {
                    _makeQrCode:function(){
                var qrcode = new QRCode(document.getElementById("qrcode"), {
                	text: this.$vc.getData("_sysInfo").logo,  //你想要填写的文本
                    width: 350, //生成的二维码的宽度
                    height: 350, //生成的二维码的高度
                    colorDark : "#000000", // 生成的二维码的深色部分
                    colorLight : "#ffffff", //生成二维码的浅色部分
                    correctLevel : QRCode.CorrectLevel.H
                });
                var _url = this.parkingSpaceQrCodeInfo.url +"/tempParkingFeePay?communityId="+this.$vc.getCurrentCommunity().communityId + "&communityName="+this.$vc.getCurrentCommunity().name;
                qrcode.makeCode(_url);
            },_downLoadQrCode:function(){
                var qrcode = document.getElementById('qrcode');
                        var img = qrcode.getElementsByTagName('img')[0];
                        var link = document.createElement("a");
                        var url = img.getAttribute("src");
                        link.setAttribute("href",url);
                        link.setAttribute("download",this.$vc.getData("_sysInfo").logo+'临时车支付二维码.png');
                        link.click();
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    