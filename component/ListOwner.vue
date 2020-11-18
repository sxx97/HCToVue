
        <template>
            <div id="component" xmlns:vc="http://www.w3.org/1999/html">
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="btn-group mr-5 m-3" role="group">
                <button type="button"
                        style="width:150px;"
                        :class="['btn', 'btn-lg', 'btn-secondary', {'btn-primary': personalOrCompany == 0}]"
                        @click="changePersonalOrCompanyTab(0)">
                    个人业主
                </button>
                <button type="button"
                        style="width:150px;"
                        :class="['btn', 'btn-lg', 'btn-secondary', {'btn-primary': personalOrCompany == 1}]"
                        @click="changePersonalOrCompanyTab(1)">
                    企业业主
                </button>
            </div>
        </div>
    </div>

    <!-- 个人业主 -->
    <div v-if="personalOrCompany == 0">
        <PersonalOwner name="personalOwner"></PersonalOwner>
    </div>
    <!-- 企业业主 -->
    <div v-else>
        <CompanyOwner name="companyOwner"></CompanyOwner>
    </div>


    <vc:create
            name="addOwner"
            notifyLoadDataComponentName="listOwner"
            componentTitle="业主"
    ></vc:create>
    <vc:create
            name="editOwner"
            notifyLoadDataComponentName="listOwner"
            componentTitle="业主"
    ></vc:create>
    <vc:create name="deleteOwner"
               notifyLoadDataComponentName="listOwner"
    ></vc:create>

    <vc:create
            name="searchRoom"
            emitChooseRoom="listOwner"
            emitLoadData="listOwner"
            roomFlag="1"
            showSearchCondition="false"
    ></vc:create>

    <vc:create name="searchParkingSpace"
               emitChooseParkingSpace="listOwner"
               emitLoadData="listOwner"
               parkingSpaceFlag="SH"
               showSearchCondition="false"
    ></vc:create>
</div>
        </template>
        <script>
            import PersonalOwner from './PersonalOwner.vue';import CompanyOwner from './CompanyOwner.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"personalOrCompany":"0"}    
            },
            mounted() {
             (function () {

        })()(function () {
            this.$vc.on('pagination', 'page_event', function (_currentPage) {
                if (PERSONAL_TAB  == this.personalOrCompany) {
                    this._listOwnerData(_currentPage, DEFAULT_ROWS);
                } else {
                    this.companyListOwner(_currentPage, DEFAULT_ROWS)
                }
            });
        })()   
            },
            methods: {
                changePersonalOrCompanyTab(val) {
                this.personalOrCompany = val;
                if (val == COMPANY_TAB) {
                    this.$vc.emit('listCompanyOwner', 'listCompanyOwnerData', {});
                } else {
                    this.$vc.emit('listOwner', 'listOwnerData', {});
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    