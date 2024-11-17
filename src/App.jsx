import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainContent from './components/MainContent';
import UserManagementCon from './components/Admin/UserManagementCon.jsx';
import AdminMainContent from './components/Admin/AdminMainContent';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import AdminPenProposal from './components/Admin/AdminPenProposal';
import AdminApprovedPro from './components/Admin/AdminApprovedPro';
import AdminPenAchievements from './components/Admin/AdminPenAchievements';
import AdminEventRequest from './components/Admin/AdminEventRequest';
import AdminApprovedAch from './components/Admin/AdminApprovedAch';
import AdminManage from './components/Admin/AdminManage.jsx';
import AdminCalendar from './components/Admin/AdminCalendar';
import KpiPage from './components/Admin/KpiPage';
import InvolvementPage from './components/Admin/InvolvementPage';

import BrgyPenProposalPage from './components/Barangay/BrgyPenProposalPage';
import BrgyApprovedPro from './components/Barangay/BrgyApprovedPro';
import BrgyEventRequest from './components/Barangay/BrgyEventRequest';
import BrgyManagement from './components/Barangay/BrgyManagement.jsx';
import BrgyCalendar from './components/Barangay/BrgyCalendar';

import CoorPenProposal from './components/Coordinator/CoorPenProposal';
import CoorCalendar from './components/Coordinator/CoorCalendar';
import CoorApprovedPro from './components/Coordinator/CoorApprovedPro';
import CoorPenAchievements from './components/Coordinator/CoorPenAchievements';
import CoorApprovedAch from './components/Coordinator/CoorApprovedAch';
import CoorEventRequest from './components/Coordinator/CoorEventRequest';
import DepartmentManagement from './components/Coordinator/DepartmentManagement.jsx';

import EvalPage from './components/Evaluator/EvalPage';

import ProposalForm from './components/Forms/ProposalForm.jsx';
import DocumentPage from './components/DocumentPage';
import UserAdminPage from './components/MainPages/UserAdminPage';
import UserBarangayPage from './components/MainPages/UserBarangayPage';
import UserCoorPage from './components/MainPages/UserCoorPage';
import UserEvalPage from './components/MainPages/UserEvalPage';
import UnauthorizedPage from './components/MainPages/UnauthorizedPage.jsx'

import ActEvalForm from './components/Forms/ActEvalForm.jsx';
import FundingProposalForm from './components/Forms/FundingProposalForm.jsx';
import CesEvalForm from './components/Forms/CesEvalForm.jsx';
import AARForm from './components/Forms/AARForm.jsx';

import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ManageAgenda from './components/ManageAgenda.jsx';
import ManageAchievements from './components/ManageAchievements.jsx';
import ManageAnnouncement from './components/ManageAnnouncement.jsx';
import ManageDocuments from './components/ManageDocuments.jsx';
import AdminLanding from './components/MainPages/AdminLanding.jsx';
import AdminManagePage from './components/MainPages/AdminManagePage.jsx';
import MyProfilePage from './components/MyProfilePage.jsx';
import EvalSelect from './components/EvalSelect.jsx';
import ManageCalendar from './components/ManageCalendar.jsx';
import ManageCourse from './components/ManageCourse.jsx';
import ManageEvaluators from './components/ManageEvaluators.jsx';
import { UserProvider } from './components/UserContext.jsx';
import ManageResponses from './components/ManageResponse.jsx';
import EvalSummary from './components/EvalSummary.jsx';
import EvalCards from './components/Evaluator/EvalCards.jsx';
import AdminDeptApprovedPro from './components/Admin/AdminDeptApprovedPro.jsx';
import EvalLogIn from './components/EvalLogIn.jsx';
import ManageEvaluationForm from './components/ManageEvaluationForm.jsx';
import AdminEventPage from './components/Admin/AdminEventPage.jsx';
import EvalCreate from './components/Evaluator/EvalCreate.jsx';
import ImpactEvalForm from './components/Forms/ImpactEvalForm.jsx';

import AdminEventDetailsPage from './components/Admin/AdminEventDetailsPage.jsx';
// import EvalFormManagement from './components/EvalFormManagement.jsx';
import EvalTypeManagement from './components/EvalTypeManagement.jsx';
import InvTable from './components/Admin/InvTable.jsx';
import ManageKpi from './components/ManageKpi.jsx';
import ImpactPage from './components/Admin/ImpactPage.jsx';

const App = () => {
  return (
    <div>
      <UserProvider>
        <Routes>
          {/* Public Routes */}
          <Route index element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/unauthorized' element={<UnauthorizedPage />} />

          {/* Admin Routes - Only accessible to Admin */}
          <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
            <Route path='/landing' element={<AdminLanding />} />
            <Route path='/manage' element={<AdminManagePage />} >
              <Route index element={<AdminManage />} />
              <Route path='accmngmnt' element={<UserManagementCon />} />
              <Route path='manage-agenda' element={<ManageAgenda />} />
              <Route path='manage-ach' element={<ManageAchievements />} />
              <Route path='manage-ann' element={<ManageAnnouncement />} />
              <Route path='manage-docs' element={<ManageDocuments />} />
              <Route path='brgy-management' element={<BrgyManagement />} />
              <Route path='dept-management' element={<DepartmentManagement />} />
              <Route path='course-management' element={<ManageCourse />} />
              <Route path='calendar' element={<ManageCalendar />} />
              <Route path='evaluators' element={<ManageEvaluators />} />
              <Route path='responses' element={<ManageResponses />} />
              <Route path='eval-management' element={<EvalPage />} />
              <Route path='eval-sum' element={<EvalSummary />} />
              <Route path='eval-cards' element={<EvalCards />} />
              {/* <Route path='manage-questions' element={<ManageQuestions />} /> */}
              {/* <Route path="evaluation-form-management" element={<EvalFormManagement />} /> */}
              <Route path='manage-eval-form' element={<ManageEvaluationForm />} />
              <Route path="eval-type-management" element={<EvalTypeManagement />} />
              <Route path='eval-create' element={<EvalCreate />} />
              <Route path='kpi-manage' element={<ManageKpi />} />
            </Route>
            <Route path='/admin' element={<UserAdminPage />}>
              <Route path='proposal-form' element={<ProposalForm />} />
              <Route index element={<AdminMainContent />} />
              <Route path='accmngmnt' element={<UserManagementCon />} />
              <Route path='dashboard' element={<AdminMainContent />} />
              <Route path='pending-proposal' element={<AdminPenProposal />} />
              <Route path='approved-proposal' element={<AdminApprovedPro />} />
              <Route path='/admin/approved-proposal/:departmentId' element={<AdminDeptApprovedPro />} />
              <Route path='/admin/event-page' element={<AdminEventPage />} />
              <Route path="/admin/event-detail" element={<AdminEventDetailsPage />} />
              <Route path='pending-achievements' element={<AdminPenAchievements />} />
              <Route path='approved-achievements' element={<AdminApprovedAch />} />
              <Route path='resched' element={<AdminEventRequest />} />
              <Route path='docs' element={<DocumentPage />} />
              <Route path='calendar' element={<AdminCalendar />} />
              <Route path='involvement' element={<InvolvementPage />} />
              <Route path='eval-page' element={<EvalPage />} />
              <Route path='kpi' element={<KpiPage />} />
              <Route path='eval-cards' element={<EvalCards />} />
              <Route path='profile' element={<MyProfilePage />} />
              <Route path="inv-table/:chartType" element={<InvTable />} />
              <Route path='responses' element={<ManageResponses />} />
              <Route path='impact' element={<ImpactPage />} />
            </Route>
          </Route>

          {/* Barangay Routes - Only accessible to Barangay Officials */}
          <Route element={<PrivateRoute allowedRoles={['Brgy. Official']} />}>
            <Route path='/barangay' element={<UserBarangayPage />}>
              <Route index element={<MainContent />} />
              <Route path='dashboard' element={<MainContent />} />
              <Route path='pending-proposal' element={<BrgyPenProposalPage />} />
              <Route path='approved-proposal' element={<BrgyApprovedPro />} />
              <Route path='resched' element={<BrgyEventRequest />} />
              <Route path='calendar' element={<BrgyCalendar />} />
              <Route path='profile' element={<MyProfilePage />} />
            </Route>
          </Route>

          {/* Coordinator Routes - Only accessible to Proponents */}
          <Route element={<PrivateRoute allowedRoles={['Proponent']} />}>
            <Route path='/coor' element={<UserCoorPage />}>
              <Route index element={<MainContent />} />
              <Route path='dashboard' element={<MainContent />} />
              <Route path='pending-proposal' element={<CoorPenProposal />} />
              <Route path='approved-proposal' element={<CoorApprovedPro />} />
              <Route path='pending-achievements' element={<CoorPenAchievements />} />
              <Route path='approved-achievements' element={<CoorApprovedAch />} />
              <Route path='resched' element={<CoorEventRequest />} />
              <Route path='docs' element={<DocumentPage />} />
              <Route path='calendar' element={<CoorCalendar />} />
              <Route path='kpi' element={<KpiPage />} />
              <Route path='proposal-form' element={<ProposalForm />} />
              <Route path='proposal-form/:proposalId/resubmit' element={<ProposalForm />} /> {/* Resubmission */}
              <Route path='profile' element={<MyProfilePage />} />
            </Route>
          </Route>

          {/* Evaluator Routes - Only accessible to Evaluators */}
          {/* <Route element={<PrivateRoute allowedRoles={['Evaluator']} />}> */}
          <Route path='/eval' element={<UserEvalPage />}>
            <Route index element={<MainContent />} />
            <Route path='dashboard' element={<MainContent />} />
            <Route path='eval-page' element={<EvalPage />} />
            <Route path='eval-cards' element={<EvalCards />} />
          </Route>
          {/* </Route> */}

          {/* Other Routes */}
          <Route path='/eval-select' element={<EvalSelect />} />         
          <Route path='/actEvalForm' element={<ActEvalForm />} />
          <Route path='/funding' element={<FundingProposalForm />} />
          <Route path='/cesEvalForm' element={<CesEvalForm />} />
          <Route path='aarForm' element={<AARForm />} />
          <Route path='impact-eval' element={<ImpactEvalForm />} />
          <Route path='eval-login' element={<EvalLogIn/>} />

        </Routes>

      </UserProvider>


    </div>
  );
};

export default App;
