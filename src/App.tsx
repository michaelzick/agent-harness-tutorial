import { useCallback } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CourseLayout } from './components/CourseLayout'
import { course, lessonById } from './data/course'
import { useProgress } from './hooks/useProgress'
import { DashboardPage } from './pages/DashboardPage'
import { DiagramGalleryPage } from './pages/DiagramGalleryPage'
import { HarnessDetailPage } from './pages/HarnessDetailPage'
import { HarnessesPage } from './pages/HarnessesPage'
import { LessonPage } from './pages/LessonPage'
import { LessonsPage } from './pages/LessonsPage'
import { SkillsPage } from './pages/SkillsPage'
import { CtoPage } from './pages/CtoPage'
import { WorkflowsPage } from './pages/WorkflowsPage'

function App() {
  return (
    <BrowserRouter>
      <TutorApp />
    </BrowserRouter>
  )
}

function TutorApp() {
  const {
    progress,
    completed,
    markLessonComplete,
    setCurrentLesson,
    resetProgress,
  } = useProgress(course.lessons, course.modules)

  const handleVisit = useCallback(
    (lessonId: string) => {
      const lesson = lessonById.get(lessonId)
      if (lesson) {
        setCurrentLesson(lesson)
      }
    },
    [setCurrentLesson],
  )

  const handleComplete = useCallback(
    (lessonId: string) => {
      const lesson = lessonById.get(lessonId)
      if (lesson) {
        markLessonComplete(lesson)
      }
    },
    [markLessonComplete],
  )

  return (
    <CourseLayout
      course={course}
      progress={progress}
      completed={completed}
      onResetProgress={resetProgress}
    >
      <Routes>
        <Route path="/" element={<DashboardPage course={course} progress={progress} completed={completed} />} />
        <Route path="/lessons" element={<LessonsPage course={course} completed={completed} />} />
        <Route path="/harnesses" element={<HarnessesPage course={course} completed={completed} />} />
        <Route path="/harnesses/:harnessSlug" element={<HarnessDetailPage course={course} completed={completed} />} />
        <Route path="/skills" element={<SkillsPage course={course} completed={completed} />} />
        <Route path="/workflows" element={<WorkflowsPage course={course} completed={completed} />} />
        <Route path="/workflows/:harnessSlug" element={<WorkflowsPage course={course} completed={completed} />} />
        <Route path="/cto" element={<CtoPage course={course} completed={completed} />} />
        <Route path="/diagrams" element={<DiagramGalleryPage />} />
        <Route
          path="/learn/:moduleSlug/:lessonSlug"
          element={
            <LessonPage
              course={course}
              completed={completed}
              onVisit={handleVisit}
              onComplete={handleComplete}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CourseLayout>
  )
}

export default App
