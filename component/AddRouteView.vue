
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>服务绑定</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">

                <div class="form-group row">
         <label class="col-sm-2 col-form-label">订单类型</label>
         <div class="col-sm-10">
<select class="custom-select" v-model="addRouteViewInfo.orderTypeCd">
         <option selected  disabled value="">必填，请选择订单类型</option>
         <option  value="Q">查询</option>
<option  value="D">业务受理</option>
  </select>         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">调用次数</label>
         <div class="col-sm-10">
           <input v-model="addRouteViewInfo.invokeLimitTimes"                   type="text" placeholder="必填，请填写调用次数" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">调用方式</label>
         <div class="col-sm-10">
<select class="custom-select" v-model="addRouteViewInfo.invokeModel">
         <option selected  disabled value="">必填，请选择调用方式</option>
         <option  value="S">同步方式</option>
<option  value="A">异步方式</option>
  </select>         </div>
</div>

            </div>
        </div>
    </div>
</div>

        </template>
        <script>
            
        export default {
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"addRouteViewInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){

            this.$vc.on('addRouteViewInfo', 'onIndex', function(_index){
                this.addRouteViewInfo.index = _index;
            });
        })()   
            },
            methods: {
                addRouteValidate(){
                return this.$vc.validate.validate({
                    addRouteViewInfo:this.addRouteViewInfo
                },{
                    'addRouteViewInfo.orderTypeCd':[
{
                            limit:"required",
                            param:"",
                            errInfo:"订单类型不能为空"
                        },
 {
                            limit:"maxin",
                            param:"1,4",
                            errInfo:"订单类型错误"
                        },
                    ],
'addRouteViewInfo.invokeLimitTimes':[
{
                            limit:"required",
                            param:"",
                            errInfo:"调用次数不能为空"
                        },
 {
                            limit:"num",
                            param:"",
                            errInfo:"调用次数错误"
                        },
                    ],
'addRouteViewInfo.invokeModel':[
{
                            limit:"required",
                            param:"",
                            errInfo:"调用方式不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"50",
                            errInfo:"消息队列不能超过50"
                        },
                    ],

                });
            },saveAddRouteInfo:function(){
                if(this.addRouteValidate()){
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction, this.addRouteViewInfo);
                    return ;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    