import { createHashRouter, RouterProvider } from 'react-router';
import { HydrationGate } from './components/layout/HydrationGate';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { PracticePage } from './pages/PracticePage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';
import { QuizPage } from './pages/QuizPage';
import { LessonPage } from './pages/LessonPage';
import { TimedTestPage } from './pages/TimedTestPage';
import { FullTestPage } from './pages/FullTestPage';
import { MissionsPage } from './pages/MissionsPage';
import { ChallengePage } from './pages/ChallengePage';
import { PBMTrainerPage } from './pages/PBMTrainerPage';
import { DiagnosticPage } from './pages/DiagnosticPage';
import { StudyPlanPage } from './pages/StudyPlanPage';

const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'practice', element: <PracticePage /> },
      { path: 'practice/:sectionId', element: <QuizPage /> },
      { path: 'practice/:sectionId/lesson', element: <LessonPage /> },
      { path: 'timed-test', element: <TimedTestPage /> },
      { path: 'timed-test/:sectionId', element: <QuizPage /> },
      { path: 'full-test', element: <FullTestPage /> },
      { path: 'missions', element: <MissionsPage /> },
      { path: 'challenge', element: <ChallengePage /> },
      { path: 'pbm-trainer', element: <PBMTrainerPage /> },
      { path: 'diagnostic', element: <DiagnosticPage /> },
      { path: 'study-plan', element: <StudyPlanPage /> },
      { path: 'progress', element: <ProgressPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);

export default function App() {
  return (
    <HydrationGate>
      <RouterProvider router={router} />
    </HydrationGate>
  );
}
