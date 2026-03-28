import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Importar os apps diretamente (não como remotos)
// const WebApp = lazy(() => import('../../web/src/App.jsx'));
const InfernoApp = lazy(() => import('../../web-inferno/src/index'));

function Navigation() {
  const location = useLocation();

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    marginBottom: '0',
    padding: '0 20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e0e0e0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const logoStyle = {
    margin: '0',
    padding: '15px 0',
    color: '#333',
    fontSize: '24px'
  };

  const linkStyle = (isActive) => ({
    padding: '20px 24px',
    textDecoration: 'none',
    color: isActive ? '#007bff' : '#666',
    backgroundColor: isActive ? '#f8f9ff' : 'transparent',
    borderBottom: isActive ? '3px solid #007bff' : '3px solid transparent',
    transition: 'all 0.3s ease',
    fontWeight: isActive ? '600' : '400'
  });

  return (
    <nav style={navStyle}>
      <h1 style={logoStyle}>🏠 Meu Sistema</h1>
      <div style={{ marginLeft: 'auto', display: 'flex' }}>
        <Link
          to="/dashboard"
          style={linkStyle(location.pathname.startsWith('/dashboard'))}
        >
          📊 Dashboard
        </Link>
        <Link
          to="/admin"
          style={linkStyle(location.pathname.startsWith('/admin'))}
        >
          ⚙️ Admin
        </Link>
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <div style={{
      padding: '60px 20px',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#333' }}>
        Bem-vindo! 👋
      </h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
        Escolha uma das opções abaixo para começar
      </p>

      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
        <Link
          to="/dashboard"
          style={{
            display: 'block',
            padding: '30px',
            backgroundColor: '#f8f9fa',
            border: '2px solid #e9ecef',
            borderRadius: '12px',
            textDecoration: 'none',
            color: '#333',
            transition: 'all 0.3s ease',
            minWidth: '200px'
          }}
          onMouseOver={(e) => {
            e.target.style.borderColor = '#007bff';
            e.target.style.backgroundColor = '#f8f9ff';
          }}
          onMouseOut={(e) => {
            e.target.style.borderColor = '#e9ecef';
            e.target.style.backgroundColor = '#f8f9fa';
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
          <h3 style={{ margin: '0 0 10px 0' }}>Dashboard</h3>
          <p style={{ margin: '0', color: '#666' }}>Métricas e relatórios</p>
        </Link>

        <Link
          to="/inferno"
          style={{
            display: 'block',
            padding: '30px',
            backgroundColor: '#f8f9fa',
            border: '2px solid #e9ecef',
            borderRadius: '12px',
            textDecoration: 'none',
            color: '#333',
            transition: 'all 0.3s ease',
            minWidth: '200px'
          }}
          onMouseOver={(e) => {
            e.target.style.borderColor = '#28a745';
            e.target.style.backgroundColor = '#f8fff9';
          }}
          onMouseOut={(e) => {
            e.target.style.borderColor = '#e9ecef';
            e.target.style.backgroundColor = '#f8f9fa';
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>⚙️</div>
          <h3 style={{ margin: '0 0 10px 0' }}>Admin</h3>
          <p style={{ margin: '0', color: '#666' }}>Gerenciar sistema</p>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
        <Navigation />

        <main>
          <Suspense fallback={
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
              fontSize: '18px',
              color: '#666'
            }}>
              🔄 Carregando...
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/dashboard/*" element={<WebApp />} /> */}
              <Route path="/inferno/*" element={<InfernoApp />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
