import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';

import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Patients from '../pages/Patients/Patients';
import Contact from '../pages/Contact/Contact';
import NotFound from '../pages/NotFound/NotFound';
import Template from '../pages/Template/Template';
import Organization from '../pages/Organization/Organization';
import OrganizationNew from '@/pages/Organization/OrganizationNew';
import OrganizationDetail from '@/pages/Organization/OrganizationDetail';
import OrganizationEdit from '@/pages/Organization/OrganizationEdit';
import ContractNew from '@/pages/Organization/ContractNew';
import UsageStats from '@/pages/UsageStats/UsageStats';
import MonthlyUsage from '@/pages/UsageStats/MonthlyUsage';
// import DailyUsage from '@/pages/UsageStats/DailyUsage';
import DailyDetailUsage from '@/pages/UsageStats/DailyDetailUsage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* layout이 없는 페이지 */}
      <Route path="/login" element={<Login />} />
      <Route path="/template" element={<Template />} />

      {/* layout이 있는 페이지 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />

        <Route path="/organization" element={<Organization />} />
        <Route path="/organization/new" element={<OrganizationNew />} />
        <Route path="/organization/:id" element={<OrganizationDetail />} />
        <Route path="/organization/:id/edit" element={<OrganizationEdit />} />
        <Route
          path="/organization/:id/contract/new"
          element={<ContractNew />}
        />

        <Route path="/usagestats" element={<UsageStats />} />
        <Route path="/usagestats/monthly" element={<MonthlyUsage />} />
        {/* <Route path="/usagestats/monthly/:month" element={<DailyUsage />} /> */}
        <Route path="/usagestats/monthly/:day" element={<DailyDetailUsage />} />

        <Route path="patients" element={<Patients />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
