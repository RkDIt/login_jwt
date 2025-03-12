import React from 'react';
import AdminUserTable from '../../components/adminUserTable';
import AdminSidePanel from '../../components/adminSidePan';

const UserManage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Panel */}
      <AdminSidePanel />
      
      {/* Main Content (Users Table) */}
      <div className="flex-grow p-4 overflow-auto">
        <AdminUserTable />
      </div>
    </div>
  );
};

export default UserManage;
