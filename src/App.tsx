import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';
import { VsRecaptchaPage } from './pages/landing/VsRecaptchaPage';
import { DocsPage } from './pages/docs/DocsPage';
import { ProductPage } from './pages/products/ProductPage';
import { KYCVerificationPage } from './pages/products/KYCVerificationPage';
import { StreamGuardianPage } from './pages/products/StreamGuardianPage';
import { ForensicSuitePage } from './pages/products/ForensicSuitePage';
import { ContentModerationPage } from './pages/products/ContentModerationPage';
import { ConsoleLoginPage } from './pages/console/ConsoleLoginPage';
import { ConsoleRegisterPage } from './pages/console/ConsoleRegisterPage';
import { ConsoleDashboardPage } from './pages/console/ConsoleDashboardPage';
import { LegalPage } from './pages/legal/LegalPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vs-recaptcha" element={<VsRecaptchaPage />} />
        <Route path="/docs" element={<DocsPage />} />
        
        {/* Product Module Pages (Technical) */}
        <Route path="/product/:productId" element={<ProductPage />} />
        
        {/* Enterprise Solution Pages */}
        <Route path="/products/kyc-verification" element={<KYCVerificationPage />} />
        <Route path="/products/stream-guardian" element={<StreamGuardianPage />} />
        <Route path="/products/forensic-suite" element={<ForensicSuitePage />} />
        <Route path="/products/content-moderation" element={<ContentModerationPage />} />
        
        {/* Console Pages */}
        <Route path="/console" element={<ConsoleDashboardPage />} />
        <Route path="/console/login" element={<ConsoleLoginPage />} />
        <Route path="/console/register" element={<ConsoleRegisterPage />} />
        
        {/* Alias /dashboard to /console for compatibility */}
        <Route path="/dashboard" element={<Navigate to="/console" replace />} />
        
        {/* Legal */}
        <Route path="/legal" element={<LegalPage />} />
        
        {/* Fallback to Landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
