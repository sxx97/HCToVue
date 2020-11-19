
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
        <vc:create name="personalOwner"></vc:create>
    </div>
    <!-- 企业业主 -->
    <div v-else>
        <vc:create name="companyOwner"></vc:create>
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
            
            import PersonalOwner from '@/component/PersonalOwner.vue';import CompanyOwner from '@/component/CompanyOwner.vue';import AddOwner from '@/component/AddOwner.vue';import EditOwner from '@/component/EditOwner.vue';import DeleteOwner from '@/component/DeleteOwner.vue';import SearchRoom from '@/component/SearchRoom.vue';import SearchParkingSpace from '@/component/SearchParkingSpace.vue';



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
                    PersonalOwner,CompanyOwner,AddOwner,EditOwner,DeleteOwner,SearchRoom,SearchParkingSpace
                },
                data () {
                    return {"personalOrCompany":0}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
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
    