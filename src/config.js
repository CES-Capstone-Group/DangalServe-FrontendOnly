const BASE_URL = "https://pamantasances.pythonanywhere.com";
// const BASE_URL = "http://127.0.0.1:8000/";
// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API_ENDPOINTS = {
    // Authentication Endpoints
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

    // Documents Endpoints
    DOCUMENT_LIST: `${BASE_URL}/api/documents/`,
    UPLOAD_DOCUMENT: `${BASE_URL}/api/documents/upload/`,
    DELETE_DOCUMENT: (id) => `${BASE_URL}/api/documents/delete/${id}/`,

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
};
