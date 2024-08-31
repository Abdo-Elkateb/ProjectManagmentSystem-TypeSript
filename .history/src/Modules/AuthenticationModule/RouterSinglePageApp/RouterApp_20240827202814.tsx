import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import AuthLayout from '../../SharedModule/components/AuthLayout/AuthLayout'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import ForgetPass from '../components/ForgetPass/ForgetPass'
import VerifyAccount from '../components/VerifyAccount/VerifyAccount'
import ProtectedRoute from '../../SharedModule/components/ProtectedRoute/ProtectedRoute'
import MasterLayout from '../../SharedModule/components/MasterLayout/MasterLayout'
import Dashboard from '../../DashboardModule/components/Dashboard/Dashboard'
import ProjectsList from '../../ProjectsModule/components/ProjectsList/ProjectsList'
import ProjectsData from '../../ProjectsModule/components/ProjectsData/ProjectsData'
import TasksList from '../../TasksModule/components/TasksList/TasksList'
import TasksData from '../../TasksModule/components/TasksData/TasksData'
import UsersList from '../../UsersModule/components/UsersList/UsersList'
import TaskBoard from '../../TasksModule/components/TaskBoard/TaskBoard'
import ResetPass from '../components/ResetPass/ResetPass'
import ChangePasswordFromDashborad from '../../DashboardModule/'

export default function RouterApp() {
  const location = useLocation()
  return (

  <>
    <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AuthLayout />}>
              <Route
                path=""
                element={<Login />}
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgetpass" element={<ForgetPass />} />
              <Route path="resetpass" element={<ResetPass />} />
              <Route path="verify" element={<VerifyAccount />} />
            </Route>
            <Route path="DashBoard" element={<ProtectedRoute>
          <MasterLayout />
         </ProtectedRoute>}>
              <Route
                path=""
                element={<Dashboard />}
              />
              <Route path="projects" element={<ProjectsList />} />
              <Route path="projectsdata" element={<ProjectsData />} />
              <Route path="projectsdata/:id" element={<ProjectsData />} />
              <Route path="tasks" element={<TasksList />} />
              <Route path="tasksdata" element={<TasksData />} />
              <Route path="tasksedit/:id" element={<TasksData />} />
              <Route path="users" element={<UsersList />} />
              <Route path="taskboard" element={<TaskBoard />} />
              <Route path="changePassword" element={< />} />
            </Route>
          </Routes>
  </>
    
  )
}
