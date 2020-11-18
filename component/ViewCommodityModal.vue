
        <template>
            <div id="viewCommodityModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-5">
                        <div id="demo" class="carousel slide" data-ride="carousel">
                            <!-- 指示符 -->
                            <ul class="carousel-indicators">
                                <li data-target="#demo"
                                    v-for="(item, n) in splitPhotosString(commodityInfo.photos)"
                                    :key="n"
                                    :data-slide-to="n" class="active"></li>
                            </ul>

                            <!-- 轮播图片 -->
                            <div class="carousel-inner">
                                <div :class="['carousel-item', {'active': n == 0}]"
                                     v-for="(item, n) in splitPhotosString(commodityInfo.photos)"
                                     :key="n">
                                    <img :src="item"
                                         style="min-width:300px;max-height:400px;">
                                </div>
                            </div>
                            <!-- 左右切换按钮 -->
                            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </a>
                            <a class="carousel-control-next" href="#demo" data-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </a>
                        </div>
                    </div>
                    <div class="col-sm-7">
                        <div>
                            <span style="color:#ff5a5a;font-size:18px;">￥{{commodityInfo.currentPrice/100}}</span>
                            <span v-if="commodityInfo.originalPrice != ''"
                                style="margin-left:10px;color:#999;text-decoration: line-through;">原价:￥{{commodityInfo.originalPrice/100}}</span>
                        </div>
                        <div style="fonts-zie: 18px;margin: 10px 0;">
                            {{commodityInfo.title}}
                        </div>
                        <div v-html="commodityInfo.intro"
                            style="height: 300px;padding:8px;border-radius:8px; overflow-y: auto;border: 1px solid #eee;"></div>
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
                return {"commodityInfo":"[object Object]"}    
            },
            mounted() {
             (_initMethod() {

        })()(_initEvent() {
            this.$vc.on('viewCommodityModal', 'view', this.listenerModal)
        })()   
            },
            methods: {
                splitPhotosString(photosStr) {
                console.log(photosStr, '图片的集合字符串分割');
                if (typeof photosStr == 'string') {
                    return  photosStr.split(',');
                }
                return photosStr;
            },listenerModal(commodity) {
                this.commodityInfo = commodity;
                $('#viewCommodityModal').modal('show');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    