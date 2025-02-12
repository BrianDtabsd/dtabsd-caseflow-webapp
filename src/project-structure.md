# Current Project Structure

src/
├── assets/                    # Static assets and resources
├── components/               # Reusable components
│   ├── auth/                # Authentication components
│   ├── cases/
│   │   └── CaseList/       # Case listing components
│   ├── common/
│   │   ├── DataTable/      # Shared data table components
│   │   └── FormValidation/ # Form validation components
│   ├── core/
│   │   ├── AddressInfo/    # Address input/display components
│   │   ├── ContactInfo/    # Contact information components
│   │   └── DocumentUpload/ # Document upload components
│   ├── correspondence/
│   │   ├── documents/
│   │   │   ├── AIProcessing/
│   │   │   └── DocumentViewer/
│   │   ├── management/
│   │   ├── search/
│   │   └── templates/
│   │       ├── TemplateEditor/
│   │       ├── TemplateGenerator/
│   │       └── TemplateLibrary/
│   ├── dashboard/
│   │   └── widgets/
│   │       └── documents/  # Document-related widgets
│   ├── documents/
│   │   └── DocumentManager/
│   ├── employees/
│   ├── employment/
│   │   ├── JobDemands/
│   │   └── JobInfo/
│   ├── layout/            # Main layout components
│   ├── medical/
│   │   ├── Diagnosis/
│   │   └── TreatmentPlan/
│   ├── profiles/
│   ├── rtw/
│   │   └── GRTWPlan/
│   ├── ui/               # Basic UI components
│   └── workflow/
│       └── TaskScheduler/
│
├── config/               # Configuration files
│   ├── auth/
│   ├── cases/
│   └── common/
│
├── context/             # React Context providers
│   ├── auth/
│   ├── cases/
│   └── common/
│
├── features/            # Feature-specific logic
│   ├── ai/
│   ├── auth/
│   ├── cases/
│   ├── common/
│   ├── documents/
│   └── notifications/
│
├── graphql/             # GraphQL queries and mutations
│   ├── mutations/
│   ├── queries/
│   └── subscriptions/
│
├── hooks/               # Custom React hooks
│   ├── auth/
│   ├── cases/
│   └── common/
│
├── layouts/             # Page layouts
│   ├── auth/
│   ├── cases/
│   └── common/
│
├── locales/             # Internationalization
│
├── models/              # Data models
│
├── pages/               # Page components
│   ├── assistant/
│   │   ├── document-analysis/
│   │   ├── medical-insights/
│   │   └── template-assistance/
│   ├── cases/
│   ├── common/
│   ├── correspondence/
│   │   ├── ai-insights/
│   │   ├── documents/
│   │   ├── search/
│   │   └── templates/
│   ├── dashboard/
│   ├── employees/
│   ├── employers/
│   ├── reports/
│   ├── settings/
│   └── tasks/
│
├── routes/              # Routing configuration
│
├── services/            # API and service layer
│   ├── auth/
│   ├── cases/
│   └── common/
│
├── types/               # TypeScript type definitions
│
└── utils/               # Utility functions
    ├── auth/
    ├── cases/
    └── common/

# Key Files
├── App.tsx             # Main App component
├── main.tsx            # Application entry point
├── routes.tsx          # Main routing configuration
└── vite-env.d.ts      # Vite environment types 