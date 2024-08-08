import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import useCrewRegisterStore from '@/stores/crew/useCrewRegisterStore';
import './App.scss';

function App() {
  const location = useLocation();
  const crewRegisterReset = useCrewRegisterStore(
    (state) => state.crewRegisterReset,
  );

  useEffect(() => {
    // 현재 경로가 모임 등록이 아닌 경우 데이터 초기화
    if (!location.pathname.startsWith('/crew/register')) {
      crewRegisterReset();
    }
  }, [location, crewRegisterReset]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
