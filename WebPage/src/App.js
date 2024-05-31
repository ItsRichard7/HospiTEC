
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoginPage } from './components/LoginPage/LoginPage';
import { AdminPage } from './components/AdminPage/AdminPage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
//import Calendar from './components/LabsPage/LabsPage';
import { PatientPage } from './components/PatientPage/PatientPage';
import { DocPage } from './components/DocPage/DocPage';
import { CamaSol } from './components/CamaSol/CamaSol';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/reg" element={<RegisterPage />} />
{/*           <Route path="/calendar" element={<Calendar />} /> */}
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/doc" element={<DocPage />} />
          <Route path="/Cama" element={<CamaSol />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
