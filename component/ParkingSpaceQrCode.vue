
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"parkingSpaceQrCodeInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._makeQrCode();
         })()(function(){

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
    