import { BrowserRouter, Routes, Route} from "react-router-dom";
//UserDashboard
import Login from "./userpage/Login";
import Register from "./userpage/Register";
import UserDashboard from "./userpage/UserDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import Profile from "./userpage/profile/Profile";
import {auth} from "./firebase"
import SearchJobs from "./userpage/profile/SearchJobs";
//EmployerDashboard
import EmployerLogin from "./employer/EmployerLogin";
import EmployerRegister from "./employer/EmployerRegister";
import EmployerDashboard from "./employer/EmployerDashboard";
import EmployerProfile from "./employer/EmployerProfile";
import EmployerNavbar from "./employer/EmployerNavbar";
import PostJobs from "./employer/PostJobs";
import JobList from "./employer/JobList";
import EmployerApplications from "./employer/EmployerApplications";
import EmployerInterviews from "./employer/EmployerInterviews";
//AdminPage
import AdminDashboard from "./Admin/AdminDashboard";
import JobPortal from "./auth/jobPortal";
import LoginSelection from "./auth/LoginSelection";
import AdminLogin from "./Admin/AdminLogin";
function App() {
  return (
   <>
    
    {/* UserDashboard */}
      <Routes>
        <Route path="/" element={<JobPortal />} />
        <Route path="/select-login" element={<LoginSelection />} /> 
        <Route path="/" element={<Login />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/" element={<LoginSelection />} />

<Route path="/admin-login" element={<AdminLogin />} />
<Route path="/employer-login" element={<EmployerLogin />} />
<Route path="/employer-register" element={<EmployerRegister />} />


  <Route path="/profile" element={<Profile/>}/>
        <Route path="/search" element={<SearchJobs />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      
      {/* EmployerDashBoard */}
      

        <Route
          path="/employer-dashboard/*"
          element={
            <ProtectedRoute>
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/profile"
          element={
            <ProtectedRoute>
              <EmployerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/post-job"
          element={
            <ProtectedRoute>
              <PostJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/jobs"
          element={
            <ProtectedRoute>
              <JobList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/applications"
          element={
            <ProtectedRoute>
              <EmployerApplications />
            </ProtectedRoute>
          }
        />
        {/* AdminPage */}
       
       <Route
  path="/admin/*"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

</Routes>
      
   </>
  );
}

export default App;
