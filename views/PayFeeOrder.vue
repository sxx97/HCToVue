
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>订单收费</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-7" style="border-right: solid #f4f4f4 1px;padding-left: 30px;">
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">费用ID</label>
                                <div class="col-sm-10">
                                    <label class=" col-form-label">{{payFeeOrderInfo.feeId}}</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">费用项目</label>
                                <div class="col-sm-10">
                                    <label class=" col-form-label">{{payFeeOrderInfo.feeName}}</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">费用类型</label>
                                <div class="col-sm-10">
                                    <label class=" col-form-label">{{payFeeOrderInfo.feeTypeCdName}}</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">到期时间</label>
                                <div class="col-sm-10">
                                    <label class=" col-form-label">{{payFeeOrderInfo.endTime}}</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">缴费周期</label>
                                <div class="col-sm-6">
                                    <select class="custom-select" v-model="payFeeOrderInfo.cycles" @change="_changeMonth(payFeeOrderInfo.cycles)">
                                        <option disabled value="">必填，请选择缴费周期</option>
                                        <option value="1">1个月</option>
                                        <option value="2">2个月</option>
                                        <option value="3">3个月</option>
                                        <option value="4">4个月</option>
                                        <option value="5">5个月</option>
                                        <option value="6">6个月</option>
                                        <option value="12">一年</option>
                                        <option value="24">两年</option>
                                        <option value="-101">自定义</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-4" style="padding-left: 30px;">
                            <div class="row">
                                <label class="col-sm-3 col-form-label" style="line-height: 50px;padding-right:0px;" >应收款：</label>
                                <label class="col-sm-8 col-form-label" style="font-size: 30px;color: red;padding-left:0px;">￥{{payFeeOrderInfo.totalFeePrice}}</label>
                            </div>
                            <div class="row form-group">
                                <label class="col-sm-3 col-form-label" style="padding-right:0px;">支付方式:</label>
                                <label class="col-sm-4 col-form-label" style="padding-left:5px;">现金</label>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label"  style="padding-right:0px;">实收款</label>
                                <div class="col-sm-8" style="padding-left:5px;"><input type="text" placeholder="请输入实际收款金额" v-model="payFeeOrderInfo.receivedAmount"
                                                             class="form-control"></div>
                            </div>
                            <div class="form-group row">
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-8">
                                    <button type="button" class="btn btn-warning btn-lg btn-block" @click="_payFee()">提交收费</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="payFeeResult" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">缴费提示</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>缴费成功</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="_back()">返回</button>
                    <button type="button" class="btn btn-primary" @click="_printAndBack()">打印收据</button>
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
                    return {"payFeeOrderInfo":{"feeId":"","feeName":"","feeTypeCdName":"","endTime":"","feePrice":0,"cycles":"1","totalFeePrice":0,"receivedAmount":"","communityId":""}}    
                },
                mounted() {
                (() =>{
            if(this.$vc.notNull(this.$vc.getParam("feeId"))){
                  this.payFeeOrderInfo.feeId = this.$vc.getParam('feeId');
                  this.payFeeOrderInfo.feeName = this.$vc.getParam('feeName');
                  this.payFeeOrderInfo.feeTypeCdName = this.$vc.getParam('feeTypeCdName');
                  this.payFeeOrderInfo.endTime = this.$vc.getParam('endTime').replace(/%3A/g,':');
                  this.payFeeOrderInfo.feePrice = this.$vc.getParam('feePrice');
            };

            this.payFeeOrderInfo.totalFeePrice = this.payFeeOrderInfo.feePrice;
            this.payFeeOrderInfo.receivedAmount = this.payFeeOrderInfo.totalFeePrice ;


        })()
(() =>{

        })()   
                },
                methods: {
                    payFeeValidate:function(){
                        return this.$vc.validate.validate({
                            payFeeOrderInfo:this.payFeeOrderInfo
                        },{
                            'payFeeOrderInfo.feeId':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"费用ID不能为空"
                                }
                            ],
                            'payFeeOrderInfo.cycles':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"缴费周期不能为空"
                                }
                            ],
                            'payFeeOrderInfo.receivedAmount':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"实收金额不能为空"
                                },
                                {
                                    limit:"money",
                                    param:"",
                                    errInfo:"实收金额不是有效的金额"
                                }
                            ]
                        });
             },_payFee:function(_page,_row){
                if(!this.payFeeValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }

                this.$vc.http.post(
                    'propertyPay',
                    'payFee',
                    JSON.stringify(this.payFeeOrderInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                             $("#payFeeResult").modal({
                                           backdrop: "static",//点击空白处不关闭对话框
                                           show:true
                                        });
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                     });
            },_changeMonth:function(_cycles){
                if('-101' == _cycles){
                    this.payFeeOrderInfo.totalFeePrice = 0.00;
                    this.payFeeOrderInfo.receivedAmount = '';
                    return ;
                }
                this.payFeeOrderInfo.totalFeePrice = Math.floor(parseFloat(_cycles)*parseFloat(this.payFeeOrderInfo.feePrice)*100)/100;
                this.payFeeOrderInfo.receivedAmount = this.payFeeOrderInfo.totalFeePrice ;
            },_back:function(){
                $('#payFeeResult').modal("hide");
                this.$vc.getBack();
            },_printAndBack:function(){
                $('#payFeeResult').modal("hide");

                this.$vc.getBack();
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    