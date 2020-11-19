
        import Vue from 'vue'
        import VueRouter from 'vue-router'
        import AssessmentSummary from '@views/AssessmentSummary.vue';import BindingVendorConfig from '@views/BindingVendorConfig.vue';import ActivitiesManage from '@views/ActivitiesManage.vue';import AddAuditUserStep from '@views/AddAuditUserStep.vue';import AddComplaintStep from '@views/AddComplaintStep.vue';import AddVisitSpace from '@views/AddVisitSpace.vue';import AddOwnerRoomBinding from '@views/AddOwnerRoomBinding.vue';import AddRoomBinding from '@views/AddRoomBinding.vue';import AddStaffStep from '@views/AddStaffStep.vue';import AdvertManage from '@views/AdvertManage.vue';import AdvertVedioView from '@views/AdvertVedioView.vue';import AppManage from '@views/AppManage.vue';import ApplicationKeyManage from '@views/ApplicationKeyManage.vue';import AssessmentManage from '@views/AssessmentManage.vue';import AssetImport from '@views/AssetImport.vue';import AssignTimeoutConfig from '@views/AssignTimeoutConfig.vue';import AttendanceLogManage from '@views/AttendanceLogManage.vue';import AuditAppUserBindingOwnerManage from '@views/AuditAppUserBindingOwnerManage.vue';import AuditApplicationKeyManage from '@views/AuditApplicationKeyManage.vue';import AuditCommunityManage from '@views/AuditCommunityManage.vue';import AuditEnterCommunityManage from '@views/AuditEnterCommunityManage.vue';import AuditUserManage from '@views/AuditUserManage.vue';import BannerManage from '@views/BannerManage.vue';import BasePrivilegeManage from '@views/BasePrivilegeManage.vue';import BillManage from '@views/BillManage.vue';import CacheManage from '@views/CacheManage.vue';import CarBlackWhiteManage from '@views/CarBlackWhiteManage.vue';import CarInManage from '@views/CarInManage.vue';import CarInoutManage from '@views/CarInoutManage.vue';import ChangeStaffPwd from '@views/ChangeStaffPwd.vue';import CommunityManage from '@views/CommunityManage.vue';import ComplaintManage from '@views/ComplaintManage.vue';import ConfigMenu from '@views/ConfigMenu.vue';import ContractManage from '@views/ContractManage.vue';import DeleteOwnerRoom from '@views/DeleteOwnerRoom.vue';import DevServiceProvide from '@views/DevServiceProvide.vue';import EditAutoAssessmentConfig from '@views/EditAutoAssessmentConfig.vue';import EnterCommunity from '@views/EnterCommunity.vue';import FeeConfigManage from '@views/FeeConfigManage.vue';import HandoverLog from '@views/HandoverLog.vue';import HireParkingSpace from '@views/HireParkingSpace.vue';import IndexContext from '@views/IndexContext.vue';import InspectionPlanManage from '@views/InspectionPlanManage.vue';import InspectionRouteManage from '@views/InspectionRouteManage.vue';import ItemInManage from '@views/ItemInManage.vue';import ItemOutManage from '@views/ItemOutManage.vue';import ListParkingSpaceFee from '@views/ListParkingSpaceFee.vue';import ListRoomFee from '@views/ListRoomFee.vue';import ListStoreManage from '@views/ListStoreManage.vue';import Login from '@views/Login.vue';import MachineManage from '@views/MachineManage.vue';import MachineRecordManage from '@views/MachineRecordManage.vue';import MachineTranslateManage from '@views/MachineTranslateManage.vue';import MachineVistorPhotoManage from '@views/MachineVistorPhotoManage.vue';import MallManage from '@views/MallManage.vue';import MappingManage from '@views/MappingManage.vue';import Menu from '@views/Menu.vue';import MenuManage from '@views/MenuManage.vue';import Menu from '@views/Menu.vue';import MenuGroupManage from '@views/MenuGroupManage.vue';import MyAuditComplaints from '@views/MyAuditComplaints.vue';import MyAuditHistoryComplaints from '@views/MyAuditHistoryComplaints.vue';import MyAuditOrders from '@views/MyAuditOrders.vue';import MyRepairDispatchManage from '@views/MyRepairDispatchManage.vue';import NoticeDetail from '@views/NoticeDetail.vue';import NoticeManage from '@views/NoticeManage.vue';import OrgManage from '@views/OrgManage.vue';import OwnerDetail from '@views/OwnerDetail.vue';import OwnerParkingSpace from '@views/OwnerParkingSpace.vue';import OwnerRepairManage from '@views/OwnerRepairManage.vue';import ParkingAreaManage from '@views/ParkingAreaManage.vue';import ParkingSpaceCreateFee from '@views/ParkingSpaceCreateFee.vue';import ParkingSpaceFee from '@views/ParkingSpaceFee.vue';import ParkingSpaceQrCode from '@views/ParkingSpaceQrCode.vue';import PassRecord from '@views/PassRecord.vue';import PayFeeOrder from '@views/PayFeeOrder.vue';import Privilege from '@views/Privilege.vue';import PropertyFee from '@views/PropertyFee.vue';import PurchaseApplyManage from '@views/PurchaseApplyManage.vue';import Register from '@views/Register.vue';import RemainingParkingSpace from '@views/RemainingParkingSpace.vue';import RentalManage from '@views/RentalManage.vue';import RepairDispatchManage from '@views/RepairDispatchManage.vue';import RepairDispatchStep from '@views/RepairDispatchStep.vue';import ResourceStoreManage from '@views/ResourceStoreManage.vue';import RoomCreateFee from '@views/RoomCreateFee.vue';import Room from '@views/Room.vue';import SellParkingSpace from '@views/SellParkingSpace.vue';import SellRoom from '@views/SellRoom.vue';import ServiceBinding from '@views/ServiceBinding.vue';import ServiceManage from '@views/ServiceManage.vue';import ServiceImplManage from '@views/ServiceImplManage.vue';import ServiceProvideManage from '@views/ServiceProvideManage.vue';import ServiceRegisterManage from '@views/ServiceRegisterManage.vue';import Staff from '@views/Staff.vue';import StaffPrivilege from '@views/StaffPrivilege.vue';import TenantDetail from '@views/TenantDetail.vue';import Unit from '@views/Unit.vue';import VisitManage from '@views/VisitManage.vue';import WorkOrderManage from '@views/WorkOrderManage.vue'


        Vue.use(VueRouter);

        const basePath = '/flow';

        const routes = [
                {
                    path: basePath + '/' + 'AssessmentSummaryFlow',
                    name: "AssessmentSummary",
                    component: AssessmentSummary,
                }
            ,
                {
                    path: basePath + '/' + 'BindingVendorConfigFlow',
                    name: "BindingVendorConfig",
                    component: BindingVendorConfig,
                }
            ,
                {
                    path: basePath + '/' + 'activitiesFlow',
                    name: "ActivitiesManage",
                    component: ActivitiesManage,
                }
            ,
                {
                    path: basePath + '/' + 'addAuditUserStepFlow',
                    name: "AddAuditUserStep",
                    component: AddAuditUserStep,
                }
            ,
                {
                    path: basePath + '/' + 'addComplaintStepFlow',
                    name: "AddComplaintStep",
                    component: AddComplaintStep,
                }
            ,
                {
                    path: basePath + '/' + 'addNewOneVisit',
                    name: "AddVisitSpace",
                    component: AddVisitSpace,
                }
            ,
                {
                    path: basePath + '/' + 'addOwnerRoomBindingFlow',
                    name: "AddOwnerRoomBinding",
                    component: AddOwnerRoomBinding,
                }
            ,
                {
                    path: basePath + '/' + 'addRoomBindingFlow',
                    name: "AddRoomBinding",
                    component: AddRoomBinding,
                }
            ,
                {
                    path: basePath + '/' + 'addStaffStepFlow',
                    name: "AddStaffStep",
                    component: AddStaffStep,
                }
            ,
                {
                    path: basePath + '/' + 'advertFlow',
                    name: "AdvertManage",
                    component: AdvertManage,
                }
            ,
                {
                    path: basePath + '/' + 'advertVedioFlow',
                    name: "AdvertVedioView",
                    component: AdvertVedioView,
                }
            ,
                {
                    path: basePath + '/' + 'appFlow',
                    name: "AppManage",
                    component: AppManage,
                }
            ,
                {
                    path: basePath + '/' + 'applicationKeyFlow',
                    name: "ApplicationKeyManage",
                    component: ApplicationKeyManage,
                }
            ,
                {
                    path: basePath + '/' + 'assessmentManageFlow',
                    name: "AssessmentManage",
                    component: AssessmentManage,
                }
            ,
                {
                    path: basePath + '/' + 'assetImportFlow',
                    name: "AssetImport",
                    component: AssetImport,
                }
            ,
                {
                    path: basePath + '/' + 'assignTimeoutConfigFlow',
                    name: "AssignTimeoutConfig",
                    component: AssignTimeoutConfig,
                }
            ,
                {
                    path: basePath + '/' + 'attendanceLogFlow',
                    name: "AttendanceLogManage",
                    component: AttendanceLogManage,
                }
            ,
                {
                    path: basePath + '/' + 'auditAppUserBindingOwnerFlow',
                    name: "AuditAppUserBindingOwnerManage",
                    component: AuditAppUserBindingOwnerManage,
                }
            ,
                {
                    path: basePath + '/' + 'auditApplicationKeyFlow',
                    name: "AuditApplicationKeyManage",
                    component: AuditApplicationKeyManage,
                }
            ,
                {
                    path: basePath + '/' + 'auditCommunityFlow',
                    name: "AuditCommunityManage",
                    component: AuditCommunityManage,
                }
            ,
                {
                    path: basePath + '/' + 'auditEnterCommunityFlow',
                    name: "AuditEnterCommunityManage",
                    component: AuditEnterCommunityManage,
                }
            ,
                {
                    path: basePath + '/' + 'auditUserFlow',
                    name: "AuditUserManage",
                    component: AuditUserManage,
                }
            ,
                {
                    path: basePath + '/' + 'bannerFlow',
                    name: "BannerManage",
                    component: BannerManage,
                }
            ,
                {
                    path: basePath + '/' + 'basePrivilegeFlow',
                    name: "BasePrivilegeManage",
                    component: BasePrivilegeManage,
                }
            ,
                {
                    path: basePath + '/' + 'billFlow',
                    name: "BillManage",
                    component: BillManage,
                }
            ,
                {
                    path: basePath + '/' + 'cacheFlow',
                    name: "CacheManage",
                    component: CacheManage,
                }
            ,
                {
                    path: basePath + '/' + 'carBlackWhiteFlow',
                    name: "CarBlackWhiteManage",
                    component: CarBlackWhiteManage,
                }
            ,
                {
                    path: basePath + '/' + 'carInFlow',
                    name: "CarInManage",
                    component: CarInManage,
                }
            ,
                {
                    path: basePath + '/' + 'carInoutFlow',
                    name: "CarInoutManage",
                    component: CarInoutManage,
                }
            ,
                {
                    path: basePath + '/' + 'changeStaffPwdFlow',
                    name: "ChangeStaffPwd",
                    component: ChangeStaffPwd,
                }
            ,
                {
                    path: basePath + '/' + 'communityFlow',
                    name: "CommunityManage",
                    component: CommunityManage,
                }
            ,
                {
                    path: basePath + '/' + 'complaintFlow',
                    name: "ComplaintManage",
                    component: ComplaintManage,
                }
            ,
                {
                    path: basePath + '/' + 'configMenuFlow',
                    name: "ConfigMenu",
                    component: ConfigMenu,
                }
            ,
                {
                    path: basePath + '/' + 'contractManageFlow',
                    name: "ContractManage",
                    component: ContractManage,
                }
            ,
                {
                    path: basePath + '/' + 'deleteOwnerRoomFlow',
                    name: "DeleteOwnerRoom",
                    component: DeleteOwnerRoom,
                }
            ,
                {
                    path: basePath + '/' + 'devServiceProvideFlow',
                    name: "DevServiceProvide",
                    component: DevServiceProvide,
                }
            ,
                {
                    path: basePath + '/' + 'editAutoAssessmentConfigFlow',
                    name: "EditAutoAssessmentConfig",
                    component: EditAutoAssessmentConfig,
                }
            ,
                {
                    path: basePath + '/' + 'enterCommunity',
                    name: "EnterCommunity",
                    component: EnterCommunity,
                }
            ,
                {
                    path: basePath + '/' + 'feeConfigFlow',
                    name: "FeeConfigManage",
                    component: FeeConfigManage,
                }
            ,
                {
                    path: basePath + '/' + 'handoverLogFlow',
                    name: "HandoverLog",
                    component: HandoverLog,
                }
            ,
                {
                    path: basePath + '/' + 'hireParkingSpaceFlow',
                    name: "HireParkingSpace",
                    component: HireParkingSpace,
                }
            ,
                {
                    path: basePath + '/' + 'index',
                    name: "IndexContext",
                    component: IndexContext,
                }
            ,
                {
                    path: basePath + '/' + 'inspectionPlanFlow',
                    name: "InspectionPlanManage",
                    component: InspectionPlanManage,
                }
            ,
                {
                    path: basePath + '/' + 'inspectionRouteFlow',
                    name: "InspectionRouteManage",
                    component: InspectionRouteManage,
                }
            ,
                {
                    path: basePath + '/' + 'itemInFlow',
                    name: "ItemInManage",
                    component: ItemInManage,
                }
            ,
                {
                    path: basePath + '/' + 'itemOutFlow',
                    name: "ItemOutManage",
                    component: ItemOutManage,
                }
            ,
                {
                    path: basePath + '/' + 'listParkingSpaceFeeFlow',
                    name: "ListParkingSpaceFee",
                    component: ListParkingSpaceFee,
                }
            ,
                {
                    path: basePath + '/' + 'listRoomFeeFlow',
                    name: "ListRoomFee",
                    component: ListRoomFee,
                }
            ,
                {
                    path: basePath + '/' + 'listStoresFlow',
                    name: "ListStoreManage",
                    component: ListStoreManage,
                }
            ,
                {
                    path: basePath + '/' + 'login',
                    name: "Login",
                    component: Login,
                }
            ,
                {
                    path: basePath + '/' + 'machineFlow',
                    name: "MachineManage",
                    component: MachineManage,
                }
            ,
                {
                    path: basePath + '/' + 'machineRecordFlow',
                    name: "MachineRecordManage",
                    component: MachineRecordManage,
                }
            ,
                {
                    path: basePath + '/' + 'machineTranslateFlow',
                    name: "MachineTranslateManage",
                    component: MachineTranslateManage,
                }
            ,
                {
                    path: basePath + '/' + 'machineVistorPhotoFlow',
                    name: "MachineVistorPhotoManage",
                    component: MachineVistorPhotoManage,
                }
            ,
                {
                    path: basePath + '/' + 'mallManageFlow',
                    name: "MallManage",
                    component: MallManage,
                }
            ,
                {
                    path: basePath + '/' + 'mappingFlow',
                    name: "MappingManage",
                    component: MappingManage,
                }
            ,
                {
                    path: basePath + '/' + 'menuFlow',
                    name: "Menu",
                    component: Menu,
                }
            ,
                {
                    path: basePath + '/' + 'menuFlow',
                    name: "MenuManage",
                    component: MenuManage,
                }
            ,
                {
                    path: basePath + '/' + 'menuGroupFlow',
                    name: "Menu",
                    component: Menu,
                }
            ,
                {
                    path: basePath + '/' + 'menuGroupFlow',
                    name: "MenuGroupManage",
                    component: MenuGroupManage,
                }
            ,
                {
                    path: basePath + '/' + 'myAuditComplaintsFlow',
                    name: "MyAuditComplaints",
                    component: MyAuditComplaints,
                }
            ,
                {
                    path: basePath + '/' + 'myAuditHistoryComplaintsFlow',
                    name: "MyAuditHistoryComplaints",
                    component: MyAuditHistoryComplaints,
                }
            ,
                {
                    path: basePath + '/' + 'myAuditOrdersFlow',
                    name: "MyAuditOrders",
                    component: MyAuditOrders,
                }
            ,
                {
                    path: basePath + '/' + 'myRepairDispatchFlow',
                    name: "MyRepairDispatchManage",
                    component: MyRepairDispatchManage,
                }
            ,
                {
                    path: basePath + '/' + 'noticeDetailFlow',
                    name: "NoticeDetail",
                    component: NoticeDetail,
                }
            ,
                {
                    path: basePath + '/' + 'noticeFlow',
                    name: "NoticeManage",
                    component: NoticeManage,
                }
            ,
                {
                    path: basePath + '/' + 'orgFlow',
                    name: "OrgManage",
                    component: OrgManage,
                }
            ,
                {
                    path: basePath + '/' + 'ownerDetailFlow',
                    name: "OwnerDetail",
                    component: OwnerDetail,
                }
            ,
                {
                    path: basePath + '/' + 'ownerParkingSpaceFlow',
                    name: "OwnerParkingSpace",
                    component: OwnerParkingSpace,
                }
            ,
                {
                    path: basePath + '/' + 'ownerRepairFlow',
                    name: "OwnerRepairManage",
                    component: OwnerRepairManage,
                }
            ,
                {
                    path: basePath + '/' + 'parkingAreaFlow',
                    name: "ParkingAreaManage",
                    component: ParkingAreaManage,
                }
            ,
                {
                    path: basePath + '/' + 'parkingSpaceCreateFeeFlow',
                    name: "ParkingSpaceCreateFee",
                    component: ParkingSpaceCreateFee,
                }
            ,
                {
                    path: basePath + '/' + 'parkingSpaceFeeFlow',
                    name: "ParkingSpaceFee",
                    component: ParkingSpaceFee,
                }
            ,
                {
                    path: basePath + '/' + 'parkingSpaceQrCodeFlow',
                    name: "ParkingSpaceQrCode",
                    component: ParkingSpaceQrCode,
                }
            ,
                {
                    path: basePath + '/' + 'passRecordFlow',
                    name: "PassRecord",
                    component: PassRecord,
                }
            ,
                {
                    path: basePath + '/' + 'payFeeOrderFlow',
                    name: "PayFeeOrder",
                    component: PayFeeOrder,
                }
            ,
                {
                    path: basePath + '/' + 'privilege',
                    name: "Privilege",
                    component: Privilege,
                }
            ,
                {
                    path: basePath + '/' + 'propertyFeeFlow',
                    name: "PropertyFee",
                    component: PropertyFee,
                }
            ,
                {
                    path: basePath + '/' + 'purchaseApplyFlow',
                    name: "PurchaseApplyManage",
                    component: PurchaseApplyManage,
                }
            ,
                {
                    path: basePath + '/' + 'register',
                    name: "Register",
                    component: Register,
                }
            ,
                {
                    path: basePath + '/' + 'remainingParkingSpaceFlow',
                    name: "RemainingParkingSpace",
                    component: RemainingParkingSpace,
                }
            ,
                {
                    path: basePath + '/' + 'rentalFlow',
                    name: "RentalManage",
                    component: RentalManage,
                }
            ,
                {
                    path: basePath + '/' + 'repairDispatchFlow',
                    name: "RepairDispatchManage",
                    component: RepairDispatchManage,
                }
            ,
                {
                    path: basePath + '/' + 'repairDispatchStepFlow',
                    name: "RepairDispatchStep",
                    component: RepairDispatchStep,
                }
            ,
                {
                    path: basePath + '/' + 'resourceStoreFlow',
                    name: "ResourceStoreManage",
                    component: ResourceStoreManage,
                }
            ,
                {
                    path: basePath + '/' + 'roomCreateFeeFlow',
                    name: "RoomCreateFee",
                    component: RoomCreateFee,
                }
            ,
                {
                    path: basePath + '/' + 'roomFlow',
                    name: "Room",
                    component: Room,
                }
            ,
                {
                    path: basePath + '/' + 'sellParkingSpaceFlow',
                    name: "SellParkingSpace",
                    component: SellParkingSpace,
                }
            ,
                {
                    path: basePath + '/' + 'sellRoomFlow',
                    name: "SellRoom",
                    component: SellRoom,
                }
            ,
                {
                    path: basePath + '/' + 'serviceBindingFlow',
                    name: "ServiceBinding",
                    component: ServiceBinding,
                }
            ,
                {
                    path: basePath + '/' + 'serviceFlow',
                    name: "ServiceManage",
                    component: ServiceManage,
                }
            ,
                {
                    path: basePath + '/' + 'serviceImplFlow',
                    name: "ServiceImplManage",
                    component: ServiceImplManage,
                }
            ,
                {
                    path: basePath + '/' + 'serviceProvideFlow',
                    name: "ServiceProvideManage",
                    component: ServiceProvideManage,
                }
            ,
                {
                    path: basePath + '/' + 'serviceRegisterFlow',
                    name: "ServiceRegisterManage",
                    component: ServiceRegisterManage,
                }
            ,
                {
                    path: basePath + '/' + 'staff',
                    name: "Staff",
                    component: Staff,
                }
            ,
                {
                    path: basePath + '/' + 'staffPrivilege',
                    name: "StaffPrivilege",
                    component: StaffPrivilege,
                }
            ,
                {
                    path: basePath + '/' + 'tenantDetailFlow',
                    name: "TenantDetail",
                    component: TenantDetail,
                }
            ,
                {
                    path: basePath + '/' + 'unitFlow',
                    name: "Unit",
                    component: Unit,
                }
            ,
                {
                    path: basePath + '/' + 'visitFlow',
                    name: "VisitManage",
                    component: VisitManage,
                }
            ,
                {
                    path: basePath + '/' + 'workOrderFlow',
                    name: "WorkOrderManage",
                    component: WorkOrderManage,
                }
            ]

        const router = new VueRouter({
            mode: 'history',
            base: process.env.BASE_URL,
            routes
        })
          
        export default router
    
    