
        <template>
            <div class="is-select">
    <input type="text" placeholder="请输入" @input="changeKeyword" />
    <!--<select>
        <option value=""></option>
    </select>-->
</div>
        </template>
        <script>
            
        export default {
            props: {"remoteMethod":"object","callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"selectKeyword":"","optionList":""}    
            },
            mounted() {
             (function(){

        })()(function(){

        })()   
            },
            methods: {
                changeKeyword(params) {
                console.log(params, "输入的内容");
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    