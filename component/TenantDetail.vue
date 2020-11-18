
        <template>
            <div id="component" >

    <!-- 业主信息 -->
    <vc:create name="viewOwnerInfo"
               callBackListener="sellParkingSpace"
               callBackFunction="notify"
               showCallBackButton="true"
    ></vc:create>

    <!-- 业主 房间信息 -->
    <vc:create name="showOwnerRoom"
    ></vc:create>

    <!-- 业主 车位信息 -->
    <vc:create name="showOwnerParkingSpace"
    ></vc:create>


</div>
        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {}    
            },
            mounted() {
             (_initMethod() {

        })()(_initEvent(){

        })()   
            },
            methods: {
                
            },
        }
    
        </script>
        <style>
            
        </style>
    