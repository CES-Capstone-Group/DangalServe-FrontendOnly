const BASE_URL = "https://pamantasances.pythonanywhere.com";
// const BASE_URL = "http://127.0.0.1:8000";
const MEDIA_BASE_URL = `${BASE_URL}`;

export const API_ENDPOINTS = {
    // Authentication Endpoints
    BASE: `${BASE_URL}`,
    MEDIA_BASE_URL: `${MEDIA_BASE_URL}`,

    TOKEN: `${BASE_URL}/api/token/`,
    TOKEN_REFRESH: `${BASE_URL}/api/token/refresh/`,
    REFRESH_TOKEN: `${BASE_URL}/refresh-token/`,

    // Proposal Endpoints
    PROPOSAL_LIST_CREATE: `${BASE_URL}/api/proposals/`,
    PROPOSAL_DETAIL: (id) => `${BASE_URL}/api/proposals/${id}/`,
    PROPOSAL_RESUBMISSION: (proposalId) => `${BASE_URL}/api/proposals/${proposalId}/resubmit/`,
    PROPOSAL_VERSIONS_LIST: (proposalId) => `${BASE_URL}/api/proposals/${proposalId}/versions/`,
    PROPOSAL_VERSION_DETAIL: (proposalId, versionNumber) => `${BASE_URL}/api/proposals/${proposalId}/versions/${versionNumber}/`,
    BARANGAY_APPROVED_PROPOSALS: `${BASE_URL}/api/barangay-approved-proposals/`,
    BARANGAY_APPROVAL: (proposalId) => `${BASE_URL}/api/proposals/${proposalId}/approve/`,
    DOWNLOAD_PROPOSAL_DOC: (proposalId) => `${BASE_URL}/api/proposals/${proposalId}/download/`,

    // Barangay Endpoints
    BARANGAY_LIST: `${BASE_URL}/api/barangays/`,
    BARANGAY_CREATE: `${BASE_URL}/api/barangays/create/`,
    BARANGAY_UPDATE_DELETE: (id) => `${BASE_URL}/api/barangays/${id}/`,

    // Department Endpoints
    DEPARTMENT_LIST: `${BASE_URL}/api/departments/`,
    DEPARTMENT_CREATE: `${BASE_URL}/api/departments/create/`,
    DEPARTMENT_DETAIL: (deptId) => `${BASE_URL}/api/departments/${deptId}/`,
    COURSES_BY_DEPARTMENT: (deptId) => `${BASE_URL}/api/departments/${deptId}/courses/`,

    // Course Endpoints
    COURSE_LIST: `${BASE_URL}/api/courses/`,
    COURSE_CREATE: `${BASE_URL}/api/courses/create/`,
    COURSE_DETAIL: (courseId) => `${BASE_URL}/api/courses/${courseId}/`,

    // User Management Endpoints
    GET_USERS: `${BASE_URL}/api/users/`,
    CREATE_USER: `${BASE_URL}/api/users/create_user/`,
    USER_INFO_ACTION: (userId) => `${BASE_URL}/api/users/user_info_action/${userId}/`,
    UPDATE_USER_PROFILE: (userId) => `${BASE_URL}/api/users/${userId}/update-profile/`,
    CHANGE_USER_PASSWORD: (userId) => `${BASE_URL}/api/users/${userId}/change-password/`,

    // Research Agenda Endpoints
    RESEARCH_AGENDA_LIST: `${BASE_URL}/api/research-agendas/`,
    RESEARCH_AGENDA_CREATE: `${BASE_URL}/api/research-agendas/create/`,
    RESEARCH_AGENDA_DETAIL: (id) => `${BASE_URL}/api/research-agendas/${id}/`,

    // Achievements Endpoints
    ACHIEVEMENT_LIST: `${BASE_URL}/api/achievements/`,
    ACHIEVEMENT_CREATE: `${BASE_URL}/api/achievements/create/`,
    ACHIEVEMENT_DETAIL: (id) => `${BASE_URL}/api/achievements/${id}/`,

    // Announcements Endpoints
    ANNOUNCEMENT_LIST: `${BASE_URL}/api/announcements/`,
    ANNOUNCEMENT_CREATE: `${BASE_URL}/api/announcements/create/`,
    ANNOUNCEMENT_DETAIL: (id) => `${BASE_URL}/api/announcements/${id}/`,

    // Activity Schedule Endpoints
    ACTIVITY_SCHEDULE_LIST: `${BASE_URL}/api/activity-schedules/`,
    ACTIVITY_SCHEDULE_DETAIL: (id) => `${BASE_URL}/api/activity-schedules/${id}/`,
    ACTIVITY_SCHEDULE_CREATE: `${BASE_URL}/api/activity-schedules/create/`,
    ACTIVITY_SCHEDULE_BY_PROPOSAL: (proposal_id) => `${BASE_URL}/api/activity-schedules/${proposal_id}/proposals`,
    AAR_BY_PROPOSAL: (activity_schedule_id) => `${BASE_URL}/api/activity/${activity_schedule_id}/`,
    AAR_DETAILS_VIEW: (activity_schedule_id) => `${BASE_URL}/api/activity/${activity_schedule_id}/aar-details/`,
    // Documents Endpoints
    DOCUMENT_LIST: `${BASE_URL}/api/documents/`,
    UPLOAD_DOCUMENT: `${BASE_URL}/api/documents/upload/`,
    DELETE_DOCUMENT: (id) => `${BASE_URL}/api/documents/delete/${id}/`,
    UPDATE_DOCUMENT: (id) => `${BASE_URL}/api/documents/update/${id}/`,

    // Signatory Name Suggestions
    SIGNATORY_NAMES: `${BASE_URL}/api/signatory-names/`,

    // Impact Evaluation Endpoints
    IMPACT_EVAL_LIST_CREATE: `${BASE_URL}/impact/`,
    IMPACT_EVAL_DETAIL: (id) => `${BASE_URL}/impact/${id}/`,
    IMPACT_EVAL_SUMMARY: `${BASE_URL}/impact/summary/`,

    // Evaluation Type Endpoints
    EVALUATION_TYPE_LIST: `${BASE_URL}/evaluation/evaluation-types/`,
    EVALUATION_TYPE_CREATE: `${BASE_URL}/evaluation/evaluation-types/create/`,
    EVAL_TYPE_DETAIL: (id) => `${BASE_URL}/evaluation/evaluation-types/${id}/`,
    EVALUATION_TYPE_WITH_SECTIONS: (evaluationTypeId) => `${BASE_URL}/evaluation/evaluation-types/${evaluationTypeId}/details/`,
    GET_FIXED_EVALUATION_DETAIL: (id) => `${BASE_URL}/evaluation/evaluation-types/${id}/fixed-detail/`, // GET - Fetch fixed sections and questions for a specific evaluation type

    // Section Endpoints
    SECTION_LIST: `${BASE_URL}/evaluation/sections/`,
    SECTION_CREATE: `${BASE_URL}/evaluation/sections/create/`,
    SECTION_DETAIL: (id) => `${BASE_URL}/evaluation/sections/${id}/`,

    // Question Endpoints
    QUESTION_LIST: `${BASE_URL}/evaluation/questions/`,
    QUESTION_CREATE: `${BASE_URL}/evaluation/questions/create/`,
    QUESTION_DETAIL: (id) => `${BASE_URL}/evaluation/questions/${id}/`,

    // Rating Option Endpoints
    RATING_OPTION_LIST: `${BASE_URL}/evaluation/rating-options/`,
    RATING_OPTION_CREATE: `${BASE_URL}/evaluation/rating-options/create/`,
    RATING_OPTION_DETAIL: (id) => `${BASE_URL}/evaluation/rating-options/${id}/`,
    RATING_OPTION_BY_SECTION: (sectionId) => `${BASE_URL}/evaluation/rating-options/section/${sectionId}/`,

    // Multiple Choice Option Endpoints
    MULTIPLE_CHOICE_OPTION_LIST: `${BASE_URL}/evaluation/multiple-choice-options/`,
    MULTIPLE_CHOICE_OPTION_CREATE: `${BASE_URL}/evaluation/multiple-choice-options/create/`,
    MULTIPLE_CHOICE_OPTION_DETAIL: (id) => `${BASE_URL}/evaluation/multiple-choice-options/${id}/`,

    EVALUATION_FORM_LIST: `${BASE_URL}/evaluation/evaluation-forms/`,  // GET
    EVALUATION_FORM_LIST_ALL: `${BASE_URL}/evaluation/view-all/evaluation-forms/`, // GET - List all evaluation forms
    EVALUATION_FORM_LIST_ACTIVE: `${BASE_URL}/evaluation/view-active/evaluation-forms/`, // GET - List all evaluation forms
    EVALUATION_FORM_SPECIFIC: (form_id) => `${BASE_URL}/evaluation/display-specific-eval-form/${form_id}/`,

    EVALUATION_FORM_CREATE: `${BASE_URL}/evaluation/evaluation-forms/create/`,  // POST
    EVALUATION_FORM_DETAIL: (id) => `${BASE_URL}/evaluation/evaluation-forms/${id}/`,  // GET, PUT, DELETE

    FORM_SECTION_LIST: `${BASE_URL}/evaluation/form-sections/`,  // GET
    FORM_SECTION_CREATE: `${BASE_URL}/evaluation/form-sections/create/`,  // POST
    FORM_SECTION_DETAIL: (id) => `${BASE_URL}/evaluation/form-sections/${id}/`,  // GET, PUT, DELETE

    FORM_QUESTION_LIST: `${BASE_URL}/evaluation/form-questions/`,  // GET
    FORM_QUESTION_CREATE: `${BASE_URL}/evaluation/form-questions/create/`,  // POST
    FORM_QUESTION_DETAIL: (id) => `${BASE_URL}/evaluation/form-questions/${id}/`,  // GET, PUT, DELETE

    // Responses
    RESPONSE_LIST: `${BASE_URL}/evaluation/responses/`, // GET
    RESPONSE_CREATE: `${BASE_URL}/evaluation/responses/create/`, // POST
    RESPONSE_DETAIL: (id) => `${BASE_URL}/evaluation/responses/${id}/`, // GET, PUT, DELETE

    // Answers
    ANSWER_LIST: `${BASE_URL}/evaluation/answers/`, // GET
    ANSWER_CREATE: `${BASE_URL}/evaluation/answers/create/`, // POST
    ANSWER_DETAIL: (id) => `${BASE_URL}/evaluation/answers/${id}/`, // GET, PUT, DELETE

    KPI_TABLE: `${BASE_URL}/kpi/`,
    KPI_TABLE_KPIS: `${BASE_URL}/kpi/kpis/`,
    PASSWORD_VERIFY: `${BASE_URL}/kpi/password-verify/`,

    // Form Details Endpoint
    EVAL_SUMMARY_DETAILS: (formId) => `${BASE_URL}/evaluation/eval-summary/header/${formId}/`, // GET - Fetch form details (sections and questions)

    // Responses and Answers Endpoint
    RESPONSES_AND_ANSWERS: (formId) => `${BASE_URL}/evaluation/responses/${formId}/answers/`, // GET - Fetch responses and answers

    GET_AVAILABLE_FORMS: `${BASE_URL}/evaluation/forms/available/`, // Endpoint for available forms

    REPORTS: `${BASE_URL}/api/reports/`,
    REPORT_DETAIL: (reportDataId) => `${BASE_URL}/api/reports/${reportDataId}/`,

    AFTER_ACTIVITY_EVALUATION_RESPONSES: `${BASE_URL}/evaluation/get-after-activity-evaluation-responses/`, // GET: Fetch all "After Activity Evaluation" responses
};


