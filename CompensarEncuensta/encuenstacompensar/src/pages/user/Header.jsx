import React from 'react';
import './Header.css';

export default function Header({ activeNav = 'Home' }) {
  const navItems = ['Home', 'About', 'Quiz', 'Contact us'];

  return (
    <header className="header-container">

      {/* Logo */}
      <div className="header-logo">
        <img
          src="https://cms.amerins.com/uploads/compensar_8d5a969eb2.png"
          alt="Logo Compensar"
          className="logo-header-img"
        />
      </div>

      {/* Right side */}
      <div className="header-nav-section">

        {/* Nav links */}
        <nav className="header-nav">
          {navItems.map((item) => (
            <span
              key={item}
              className={`nav-item${activeNav === item ? ' active' : ''}`}
            >
              {item}
            </span>
          ))}
        </nav>

        <div className="header-divider" />

        {/* Notification bell */}
        <div className="header-notification" title="Notificaciones">
          🔔
          <span className="notif-dot" />
        </div>

        {/* Profile chip */}
        <div className="header-profile">
          <img
            src="https://i.pravatar.cc/150?img=11"
            alt="Perfil de usuario"
            className="profile-avatar"
          />
          <span className="profile-name">Mi perfil</span>
        </div>

      </div>
    </header>
  );
}