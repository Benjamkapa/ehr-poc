import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

const Roles = {
  ADMIN: 'admin',
  IT: 'it',
  NURSE: 'nurse',
  RECEPTIONIST: 'receptionist',
  FINANCE: 'finance',
  PHARMACY: 'pharmacy',
  TRIAGE_NURSE: 'triage nurse',
  PATIENT: 'patient',
  DOCTOR: 'doctor',
};

const allTabs = [
  { name: 'Medical Record', icon: '🩺', roles: [Roles.ADMIN, Roles.IT, Roles.NURSE, Roles.RECEPTIONIST] },
  { name: 'Billing', icon: '💰', roles: [Roles.ADMIN, Roles.FINANCE, Roles.RECEPTIONIST] },
  { name: 'Pharmacy', icon: '💊', roles: [Roles.ADMIN, Roles.PHARMACY] },
  { name: 'Triage', icon: '🩹', roles: [Roles.ADMIN, Roles.TRIAGE_NURSE, Roles.NURSE] },
  { name: 'Referrals', icon: '📄', roles: [Roles.ADMIN, Roles.RECEPTIONIST, Roles.NURSE] },
  { name: 'Appointments', icon: '📅', roles: [Roles.ADMIN, Roles.RECEPTIONIST, Roles.PATIENT] },
  { name: 'Treatment Plan', icon: '📝', roles: [Roles.ADMIN, Roles.DOCTOR, Roles.NURSE] },
  { name: 'Trends & Analytics', icon: '📊', roles: [Roles.ADMIN, Roles.IT] },
  { name: 'ICD Reference', icon: '📚', roles: [Roles.ADMIN, Roles.DOCTOR, Roles.NURSE] },
  { name: 'Prescriptions', icon: '🧾', roles: [Roles.ADMIN, Roles.DOCTOR, Roles.PHARMACY] },
  { name: 'Patient Data', icon: '👤', roles: [Roles.PATIENT] },
];

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const tabs = user ? allTabs.filter(tab => tab.roles.includes(user.role)) : [];

  return (
    <div style={{ padding: '20px' }}>
      <h1 className='font-bold uppercase text-xl text-center'>Dashboard</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => navigate(tab.path)}
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              userSelect: 'none',
              boxShadow: '2px 2px 6px rgba(0,0,0,0.3)',
              transition: 'transform 0.6s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ fontSize: '40px' }}>{tab.icon}</div>
            <div style={{ marginTop: '10px', fontStyle: 'thin' }}>{tab.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
