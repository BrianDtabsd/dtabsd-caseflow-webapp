src/
├── components/
│   ├── layout/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   └── Footer/
│   │
│   ├── profiles/
│   │   ├── subject/
│   │   │   ├── SubjectProfile/
│   │   │   └── SubjectEmployment/
│   │   │
│   │   ├── employer/
│   │   │   ├── profile/
│   │   │   │   ├── EmployerBasicInfo/
│   │   │   │   ├── LocationsManager/
│   │   │   │   └── DepartmentsManager/
│   │   │   │
│   │   │   ├── contacts/
│   │   │   │   ├── HRContacts/
│   │   │   │   ├── PayrollContacts/
│   │   │   │   └── ConsultantContacts/
│   │   │   │
│   │   │   └── employees/
│   │   │       ├── EmployeeDirectory/
│   │   │       ├── BulkUploader/
│   │   │       └── EmployeeValidator/
│   │   │
│   │   ├── caseManager/
│   │   │   ├── CaseManagerProfile/
│   │   │   ├── CaseLoadDashboard/
│   │   │   └── AuthorizationLevel/
│   │   │
│   │   └── rehabManager/
│   │       ├── RehabManagerProfile/
│   │       ├── CaseLoadDashboard/
│   │       └── AuthorizationLevel/
│   │
│   ├── caseFile/
│   │   ├── identification/
│   │   │   ├── CaseNumberGenerator/
│   │   │   └── CaseIdentifiers/
│   │   │
│   │   ├── overview/
│   │   │   ├── CaseHeader/
│   │   │   ├── CaseStatus/
│   │   │   └── CaseTimeline/
│   │   │
│   │   ├── tracking/
│   │   │   ├── CaseList/
│   │   │   ├── CaseSearch/
│   │   │   └── CaseFilter/
│   │   │
│   │   ├── medical/
│   │   │   ├── MedicalHistory/
│   │   │   └── Restrictions/
│   │   │
│   │   └── rehabilitation/
│   │       ├── authorization/
│   │       │   ├── RehabAccess/
│   │       │   ├── AssignmentManager/
│   │       │   └── AccessControl/
│   │       │
│   │       ├── services/
│   │       │   ├── ServiceProvider/
│   │       │   ├── ServicePlan/
│   │       │   └── ServiceStatus/
│   │       │
│   │       ├── approvals/
│   │       │   ├── CostApproval/
│   │       │   ├── ServiceApproval/
│   │       │   └── EstimateTracking/
│   │       │
│   │       ├── tracking/
│   │       │   ├── CostTracking/
│   │       │   ├── ProgressTracking/
│   │       │   └── OutcomeTracking/
│   │       │
│   │       └── planning/
│   │           ├── RehabPlan/
│   │           ├── ServiceSchedule/
│   │           └── GoalSetting/
│   │
│   ├── jobInfo/
│   │   ├── manager/
│   │   │   ├── JobInfoUploader/
│   │   │   ├── JobInfoList/
│   │   │   └── JobInfoEditor/
│   │   │
│   │   ├── selection/
│   │   │   ├── EmployeeJobPicker/
│   │   │   └── JobValidation/
│   │   │
│   │   └── details/
│   │       ├── JobDemands/
│   │       ├── JobSchedule/
│   │       └── JobLocation/
│   │
│   ├── benefits/
│   │   ├── calculation/
│   │   │   ├── CascadeCalculator/
│   │   │   ├── TopUpCalculator/
│   │   │   └── PartialEarnings/
│   │   │
│   │   ├── policy/
│   │   │   ├── PolicyIdentifiers/
│   │   │   ├── PolicyRules/
│   │   │   └── PolicyDivisions/
│   │   │
│   │   └── settings/
│   │       ├── BenefitSettings/
│   │       ├── PolicyConfiguration/
│   │       └── BenefitRules/
│   │
│   ├── payments/
│   │   ├── schedule/
│   │   │   ├── PaymentCalendar/
│   │   │   ├── PaymentTracking/
│   │   │   └── PaymentHistory/
│   │   │
│   │   └── processing/
│   │       ├── PaymentApproval/
│   │       ├── PaymentGeneration/
│   │       └── PaymentReports/
│   │
│   ├── followUps/
│   │   ├── FollowUpList/
│   │   ├── FollowUpCreate/
│   │   ├── FollowUpTransfer/
│   │   └── FollowUpCalendar/
│   │
│   ├── correspondence/
│   │   ├── templates/
│   │   │   ├── TemplateLibrary/
│   │   │   ├── TemplateEditor/
│   │   │   ├── TemplateGenerator/
│   │   │   └── AITemplateAssistant/
│   │   │
│   │   ├── documents/
│   │   │   ├── DocumentViewer/
│   │   │   ├── DocumentActions/
│   │   │   ├── AIProcessing/
│   │   │   │   ├── MedicalSummary/
│   │   │   │   ├── DocumentClassification/
│   │   │   │   ├── KeyInfoExtraction/
│   │   │   │   └── RecommendationEngine/
│   │   │   └── DocumentAssignment/
│   │   │
│   │   ├── search/
│   │   │   ├── CaseFileSearch/
│   │   │   ├── EmployeeSearch/
│   │   │   ├── DocumentSearch/
│   │   │   ├── AIAssistedSearch/
│   │   │   └── SearchFilters/
│   │   │
│   │   └── management/
│   │       ├── AutoPopulation/
│   │       ├── FileAttachment/
│   │       ├── DocumentTracking/
│   │       └── AIOrganizer/
│   │
│   ├── rtw/
│   │   ├── GRTWPlan/
│   │   ├── JobAnalysis/
│   │   └── WorkCapacity/
│   │
│   └── common/
│       ├── DataTable/
│       ├── DataTableFilters/
│       ├── DataTableActions/
│       ├── LoadingSpinner/
│       ├── ErrorBoundary/
│       └── Notifications/
│
├── pages/
│   ├── dashboard/
│   ├── cases/
│   ├── employees/
│   ├── employers/
│   ├── tasks/
│   ├── correspondence/
│   │   ├── templates/
│   │   ├── documents/
│   │   ├── search/
│   │   └── ai-insights/
│   ├── reports/
│   ├── settings/
│   └── assistant/
│       ├── document-analysis/
│       ├── template-assistance/
│       └── medical-insights/ 