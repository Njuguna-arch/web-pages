import React, { useState, useEffect } from 'react';
import { User, BookOpen, Video, Award, Upload, Users, Settings, LogOut, Menu, X, Play, CheckCircle, XCircle, Loader } from 'lucide-react';

const SchoolManagementSystem = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [videos, setVideos] = useState([]);
  const [disciplineComments, setDisciplineComments] = useState([]);
  
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState('student');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      
      const studentsData = await window.storage.get('students', true);
      if (studentsData) {
        setStudents(JSON.parse(studentsData.value));
      } else {
        const defaultStudents = [
          { id: 1, name: 'Alice Johnson', class: 'Grade 5', email: 'alice@school.com', password: 'student123' },
          { id: 2, name: 'Bob Smith', class: 'Grade 6', email: 'bob@school.com', password: 'student123' },
          { id: 3, name: 'Carol Williams', class: 'Grade 5', email: 'carol@school.com', password: 'student123' }
        ];
        setStudents(defaultStudents);
        await window.storage.set('students', JSON.stringify(defaultStudents), true);
      }

      const teachersData = await window.storage.get('teachers', true);
      if (teachersData) {
        setTeachers(JSON.parse(teachersData.value));
      } else {
        const defaultTeachers = [
          { id: 1, name: 'Mr. Anderson', subject: 'Mathematics', email: 'anderson@school.com', password: 'teacher123' },
          { id: 2, name: 'Ms. Davis', subject: 'Science', email: 'davis@school.com', password: 'teacher123' }
        ];
        setTeachers(defaultTeachers);
        await window.storage.set('teachers', JSON.stringify(defaultTeachers), true);
      }

      const resultsData = await window.storage.get('examResults', true);
      if (resultsData) {
        setExamResults(JSON.parse(resultsData.value));
      } else {
        const defaultResults = [
          { id: 1, studentId: 1, subject: 'Mathematics', score: 85, maxScore: 100, date: '2026-01-10' },
          { id: 2, studentId: 1, subject: 'Science', score: 92, maxScore: 100, date: '2026-01-12' },
          { id: 3, studentId: 2, subject: 'Mathematics', score: 78, maxScore: 100, date: '2026-01-10' }
        ];
        setExamResults(defaultResults);
        await window.storage.set('examResults', JSON.stringify(defaultResults), true);
      }

      const questionsData = await window.storage.get('questions', true);
      if (questionsData) {
        setQuestions(JSON.parse(questionsData.value));
      } else {
        const defaultQuestions = [
          {
            id: 1,
            subject: 'Mathematics',
            question: 'What is 7 times 8?',
            options: ['54', '56', '63', '64'],
            correct: 1,
            class: 'Grade 5'
          },
          {
            id: 2,
            subject: 'Science',
            question: 'What is the largest planet in our solar system?',
            options: ['Mars', 'Jupiter', 'Saturn', 'Earth'],
            correct: 1,
            class: 'Grade 5'
          }
        ];
        setQuestions(defaultQuestions);
        await window.storage.set('questions', JSON.stringify(defaultQuestions), true);
      }

      const videosData = await window.storage.get('videos', true);
      if (videosData) {
        setVideos(JSON.parse(videosData.value));
      } else {
        const defaultVideos = [
          { id: 1, title: 'Introduction to Multiplication', subject: 'Mathematics', class: 'Grade 5', thumbnail: '🎯', duration: '12:30' },
          { id: 2, title: 'The Solar System', subject: 'Science', class: 'Grade 5', thumbnail: '🪐', duration: '15:45' },
          { id: 3, title: 'Reading Comprehension Tips', subject: 'English', class: 'Grade 6', thumbnail: '📚', duration: '10:20' }
        ];
        setVideos(defaultVideos);
        await window.storage.set('videos', JSON.stringify(defaultVideos), true);
      }

      const commentsData = await window.storage.get('disciplineComments', true);
      if (commentsData) {
        setDisciplineComments(JSON.parse(commentsData.value));
      } else {
        const defaultComments = [
          { id: 1, studentId: 1, teacherId: 1, comment: 'Excellent behavior and participation', date: '2026-01-15' },
          { id: 2, studentId: 2, teacherId: 2, comment: 'Needs to be more attentive in class', date: '2026-01-14' }
        ];
        setDisciplineComments(defaultComments);
        await window.storage.set('disciplineComments', JSON.stringify(defaultComments), true);
      }

    } catch (error) {
      console.error('Error loading data:', error);
      const defaultStudents = [
        { id: 1, name: 'Alice Johnson', class: 'Grade 5', email: 'alice@school.com', password: 'student123' }
      ];
      const defaultTeachers = [
        { id: 1, name: 'Mr. Anderson', subject: 'Mathematics', email: 'anderson@school.com', password: 'teacher123' }
      ];
      setStudents(defaultStudents);
      setTeachers(defaultTeachers);
      setExamResults([]);
      setQuestions([]);
      setVideos([]);
      setDisciplineComments([]);
    } finally {
      setLoading(false);
    }
  };

  const saveStudents = async (data) => {
    setStudents(data);
    try {
      await window.storage.set('students', JSON.stringify(data), true);
    } catch (error) {
      console.error('Error saving students:', error);
    }
  };

  const saveTeachers = async (data) => {
    setTeachers(data);
    try {
      await window.storage.set('teachers', JSON.stringify(data), true);
    } catch (error) {
      console.error('Error saving teachers:', error);
    }
  };

  const saveExamResults = async (data) => {
    setExamResults(data);
    try {
      await window.storage.set('examResults', JSON.stringify(data), true);
    } catch (error) {
      console.error('Error saving exam results:', error);
    }
  };

  const saveQuestions = async (data) => {
    setQuestions(data);
    try {
      await window.storage.set('questions', JSON.stringify(data), true);
    } catch (error) {
      console.error('Error saving questions:', error);
    }
  };

  const saveDisciplineComments = async (data) => {
    setDisciplineComments(data);
    try {
      await window.storage.set('disciplineComments', JSON.stringify(data), true);
    } catch (error) {
      console.error('Error saving discipline comments:', error);
    }
  };

  const handleLogin = () => {
    let user = null;
    if (loginRole === 'student') {
      user = students.find(s => s.email === loginEmail && s.password === loginPassword);
      if (user) setCurrentUser({ ...user, role: 'student' });
    } else if (loginRole === 'teacher') {
      user = teachers.find(t => t.email === loginEmail && t.password === loginPassword);
      if (user) setCurrentUser({ ...user, role: 'teacher' });
    } else if (loginRole === 'admin') {
      if (loginEmail === 'admin@school.com' && loginPassword === 'admin123') {
        setCurrentUser({ id: 0, name: 'Administrator', role: 'admin', email: loginEmail });
      } else {
        user = null;
      }
    }
    
    if (!user && !(loginRole === 'admin' && loginEmail === 'admin@school.com' && loginPassword === 'admin123')) {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
    setLoginEmail('');
    setLoginPassword('');
  };

  const getStudentResults = () => {
    if (!currentUser) return [];
    return examResults.filter(r => r.studentId === currentUser.id);
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex });
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
  };

  const getQuizScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correct++;
    });
    return { correct, total: questions.length };
  };

  const addExamResult = async (studentId, subject, score, maxScore) => {
    const newResult = {
      id: Date.now(),
      studentId: parseInt(studentId),
      subject,
      score: parseInt(score),
      maxScore: parseInt(maxScore),
      date: new Date().toISOString().split('T')[0]
    };
    await saveExamResults([...examResults, newResult]);
  };

  const addQuestion = async (subject, question, options, correct, className) => {
    const newQuestion = {
      id: Date.now(),
      subject,
      question,
      options,
      correct: parseInt(correct),
      class: className
    };
    await saveQuestions([...questions, newQuestion]);
  };

  const addDisciplineComment = async (studentId, comment) => {
    const newComment = {
      id: Date.now(),
      studentId: parseInt(studentId),
      teacherId: currentUser.id,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    await saveDisciplineComments([...disciplineComments, newComment]);
  };

  const addTeacher = async (name, subject, email, password) => {
    const newTeacher = {
      id: Date.now(),
      name,
      subject,
      email,
      password
    };
    await saveTeachers([...teachers, newTeacher]);
  };

  const deleteTeacher = async (id) => {
    await saveTeachers(teachers.filter(t => t.id !== id));
  };

  const addStudent = async (name, className, email, password) => {
    const newStudent = {
      id: Date.now(),
      name,
      class: className,
      email,
      password
    };
    await saveStudents([...students, newStudent]);
  };

  const deleteStudent = async (id) => {
    await saveStudents(students.filter(s => s.id !== id));
    await saveExamResults(examResults.filter(r => r.studentId !== id));
    await saveDisciplineComments(disciplineComments.filter(c => c.studentId !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-indigo-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600 font-medium">Loading School Portal...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">School Portal</h1>
            <p className="text-gray-600 mt-2">Sign in to continue</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Login As</label>
              <select
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Sign In
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
            <p className="font-semibold text-gray-700 mb-2">Demo Credentials:</p>
            <p className="text-gray-600">Student: alice@school.com / student123</p>
            <p className="text-gray-600">Teacher: anderson@school.com / teacher123</p>
            <p className="text-gray-600">Admin: admin@school.com / admin123</p>
          </div>
          
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-800">
            <strong>Production Mode:</strong> Data persists across sessions
          </div>
        </div>
      </div>
    );
  }

  const navItems = currentUser.role === 'student' 
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: User },
        { id: 'results', label: 'Exam Results', icon: Award },
        { id: 'quiz', label: 'Practice Quiz', icon: BookOpen },
        { id: 'videos', label: 'Learning Videos', icon: Video },
        { id: 'discipline', label: 'Discipline Comments', icon: Users }
      ]
    : currentUser.role === 'teacher'
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: User },
        { id: 'upload', label: 'Upload Results', icon: Upload },
        { id: 'questions', label: 'Add Questions', icon: BookOpen },
        { id: 'discipline', label: 'Discipline', icon: Users }
      ]
    : [
        { id: 'dashboard', label: 'Dashboard', icon: Settings },
        { id: 'teachers', label: 'Manage Teachers', icon: Users },
        { id: 'students', label: 'Manage Students', icon: User }
      ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">School Portal</h1>
                <p className="text-sm text-gray-600">{currentUser.name} - {currentUser.role}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <button
                onClick={handleLogout}
                className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-6">
          <div className={`lg:col-span-1 ${mobileMenuOpen ? 'block' : 'hidden'} lg:block mb-6 lg:mb-0`}>
            <nav className="bg-white rounded-xl shadow-sm p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              <button
                onClick={handleLogout}
                className="lg:hidden w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {currentUser.role === 'student' && activeTab === 'dashboard' && (
                <StudentDashboard 
                  currentUser={currentUser}
                  getStudentResults={getStudentResults}
                  videos={videos}
                />
              )}

              {currentUser.role === 'student' && activeTab === 'results' && (
                <StudentResults getStudentResults={getStudentResults} />
              )}

              {currentUser.role === 'student' && activeTab === 'quiz' && (
                <StudentQuiz
                  currentUser={currentUser}
                  questions={questions}
                  quizAnswers={quizAnswers}
                  quizSubmitted={quizSubmitted}
                  handleQuizAnswer={handleQuizAnswer}
                  submitQuiz={submitQuiz}
                  getQuizScore={getQuizScore}
                  setQuizSubmitted={setQuizSubmitted}
                  setQuizAnswers={setQuizAnswers}
                />
              )}

              {currentUser.role === 'student' && activeTab === 'discipline' && (
                <StudentDiscipline
                  currentUser={currentUser}
                  disciplineComments={disciplineComments}
                  teachers={teachers}
                />
              )}

              {currentUser.role === 'student' && activeTab === 'videos' && (
                <StudentVideos
                  currentUser={currentUser}
                  videos={videos}
                  selectedVideo={selectedVideo}
                  setSelectedVideo={setSelectedVideo}
                />
              )}

              {currentUser.role === 'teacher' && activeTab === 'dashboard' && (
                <TeacherDashboard
                  students={students}
                  examResults={examResults}
                  questions={questions}
                />
              )}

              {currentUser.role === 'teacher' && activeTab === 'upload' && (
                <TeacherUpload students={students} addExamResult={addExamResult} />
              )}

              {currentUser.role === 'teacher' && activeTab === 'questions' && (
                <TeacherQuestions addQuestion={addQuestion} />
              )}

              {currentUser.role === 'teacher' && activeTab === 'discipline' && (
                <TeacherDiscipline
                  students={students}
                  teachers={teachers}
                  disciplineComments={disciplineComments}
                  addDisciplineComment={addDisciplineComment}
                />
              )}

              {currentUser.role === 'admin' && activeTab === 'dashboard' && (
                <AdminDashboard
                  students={students}
                  teachers={teachers}
                  examResults={examResults}
                />
              )}

              {currentUser.role === 'admin' && activeTab === 'teachers' && (
                <AdminTeachers
                  teachers={teachers}
                  addTeacher={addTeacher}
                  deleteTeacher={deleteTeacher}
                />
              )}

              {currentUser.role === 'admin' && activeTab === 'students' && (
                <AdminStudents
                  students={students}
                  addStudent={addStudent}
                  deleteStudent={deleteStudent}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentDashboard = ({ currentUser, getStudentResults, videos }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome, {currentUser.name}!</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <Award size={32} className="mb-2" />
        <p className="text-sm opacity-90">Total Exams</p>
        <p className="text-3xl font-bold">{getStudentResults().length}</p>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
        <BookOpen size={32} className="mb-2" />
        <p className="text-sm opacity-90">Average Score</p>
        <p className="text-3xl font-bold">
          {getStudentResults().length > 0
            ? Math.round(getStudentResults().reduce((acc, r) => acc + (r.score / r.maxScore * 100), 0) / getStudentResults().length)
            : 0}%
        </p>
      </div>
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
        <Video size={32} className="mb-2" />
        <p className="text-sm opacity-90">Videos Available</p>
        <p className="text-3xl font-bold">{videos.filter(v => v.class === currentUser.class).length}</p>
      </div>
    </div>
    
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
      {getStudentResults().slice(-3).reverse().map(result => (
        <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-800">{result.subject}</p>
            <p className="text-sm text-gray-600">{result.date}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-indigo-600">{result.score}/{result.maxScore}</p>
            <p className="text-sm text-gray-600">{Math.round(result.score / result.maxScore * 100)}%</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StudentResults = ({ getStudentResults }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Exam Results</h2>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {getStudentResults().map(result => (
            <tr key={result.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-800">{result.subject}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{result.score}/{result.maxScore}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  (result.score / result.maxScore * 100) >= 80
                    ? 'bg-green-100 text-green-800'
                    : (result.score / result.maxScore * 100) >= 60
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {Math.round(result.score / result.maxScore * 100)}%
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{result.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StudentQuiz = ({ currentUser, questions, quizAnswers, quizSubmitted, handleQuizAnswer, submitQuiz, getQuizScore, setQuizSubmitted, setQuizAnswers }) => {
  const studentQuestions = questions.filter(q => q.class === currentUser.class);
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Practice Quiz</h2>
      {!quizSubmitted ? (
        <div className="space-y-6">
          {studentQuestions.map((q, idx) => (
            <div key={q.id} className="p-6 bg-gray-50 rounded-xl">
              <p className="font-semibold text-gray-800 mb-4">
                Question {idx + 1}: {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleQuizAnswer(q.id, optIdx)}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition ${
                      quizAnswers[q.id] === optIdx
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={submitQuiz}
            disabled={Object.keys(quizAnswers).length !== studentQuestions.length}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6 mb-6 text-center">
            <p className="text-3xl font-bold text-indigo-600 mb-2">
              Score: {getQuizScore().correct}/{getQuizScore().total}
            </p>
            <p className="text-gray-600">
              {Math.round(getQuizScore().correct / getQuizScore().total * 100)}% Correct
            </p>
          </div>
          
          <div className="space-y-4">
            {studentQuestions.map((q, idx) => (
              <div key={q.id} className="p-6 bg-gray-50 rounded-xl">
                <p className="font-semibold text-gray-800 mb-4">
                  Question {idx + 1}: {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, optIdx) => (
                    <div
                      key={optIdx}
                      className={`px-4 py-3 rounded-lg border-2 flex items-center justify-between ${
                        optIdx === q.correct
                          ? 'border-green-500 bg-green-50'
                          : quizAnswers[q.id] === optIdx
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <span>{option}</span>
                      {optIdx === q.correct && <CheckCircle className="text-green-600" size={20} />}
                      {quizAnswers[q.id] === optIdx && optIdx !== q.correct && <XCircle className="text-red-600" size={20} />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => {
              setQuizSubmitted(false);
              setQuizAnswers({});
            }}
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

const StudentDiscipline = ({ currentUser, disciplineComments, teachers }) => {
  const studentComments = disciplineComments.filter(c => c.studentId === currentUser.id);
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Discipline Comments</h2>
      
      {studentComments.length === 0 ? (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No discipline comments yet</p>
          <p className="text-sm text-gray-500 mt-2">Your teachers have not added any comments about your behavior</p>
        </div>
      ) : (
        <div className="space-y-4">
          {studentComments.slice().reverse().map(comment => {
            const teacher = teachers.find(t => t.id === comment.teacherId);
            return (
              <div key={comment.id} className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-indigo-600">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-800">{teacher?.name || 'Unknown Teacher'}</p>
                    <p className="text-sm text-gray-600">{teacher?.subject || 'N/A'} Teacher</p>
                  </div>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const StudentVideos = ({ currentUser, videos, selectedVideo, setSelectedVideo }) => {
  const studentVideos = videos.filter(v => v.class === currentUser.class);
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Videos</h2>
      
      {selectedVideo ? (
        <div>
          <button
            onClick={() => setSelectedVideo(null)}
            className="mb-4 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to Videos
          </button>
          
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-12 mb-6 text-center text-white">
            <Play size={64} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
            <p className="text-indigo-100">{selectedVideo.subject} • {selectedVideo.duration}</p>
            <p className="mt-4 text-sm opacity-90">Video player would load here in a real application</p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">About this video</h4>
            <p className="text-gray-600">
              This interactive video helps students understand {selectedVideo.subject.toLowerCase()} concepts
              through engaging animations and clear explanations. Perfect for {selectedVideo.class} students.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentVideos.map(video => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 hover:shadow-lg transition group"
            >
              <div className="text-6xl mb-4 text-center">{video.thumbnail}</div>
              <h3 className="font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                {video.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{video.subject}</span>
                <span>{video.duration}</span>
              </div>
              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center space-x-2">
                <Play size={16} />
                <span>Watch Now</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TeacherDashboard = ({ students, examResults, questions }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Teacher Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <Users size={32} className="mb-2" />
        <p className="text-sm opacity-90">Total Students</p>
        <p className="text-3xl font-bold">{students.length}</p>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
        <Upload size={32} className="mb-2" />
        <p className="text-sm opacity-90">Results Uploaded</p>
        <p className="text-3xl font-bold">{examResults.length}</p>
      </div>
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
        <BookOpen size={32} className="mb-2" />
        <p className="text-sm opacity-90">Questions Created</p>
        <p className="text-3xl font-bold">{questions.length}</p>
      </div>
    </div>
    
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Uploads</h3>
    <div className="space-y-3">
      {examResults.slice(-5).reverse().map(result => {
        const student = students.find(s => s.id === result.studentId);
        return (
          <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">{student?.name || 'Unknown Student'}</p>
              <p className="text-sm text-gray-600">{result.subject} • {result.date}</p>
            </div>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
              {result.score}/{result.maxScore}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

const TeacherUpload = ({ students, addExamResult }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Exam Results</h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        addExamResult(
          formData.get('studentId'),
          formData.get('subject'),
          formData.get('score'),
          formData.get('maxScore')
        );
        e.target.reset();
        alert('Result uploaded successfully!');
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
        <select name="studentId" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
          <option value="">Select Student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>{student.name} - {student.class}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
        <input
          name="subject"
          type="text"
          required
          placeholder="e.g., Mathematics"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
          <input
            name="score"
            type="number"
            required
            min="0"
            placeholder="85"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Score</label>
          <input
            name="maxScore"
            type="number"
            required
            min="1"
            placeholder="100"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      
      <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
        Upload Result
      </button>
    </form>
  </div>
);

const TeacherQuestions = ({ addQuestion }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Quiz Question</h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        addQuestion(
          formData.get('subject'),
          formData.get('question'),
          [
            formData.get('option1'),
            formData.get('option2'),
            formData.get('option3'),
            formData.get('option4')
          ],
          formData.get('correct'),
          formData.get('class')
        );
        e.target.reset();
        alert('Question added successfully!');
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <input
            name="subject"
            type="text"
            required
            placeholder="e.g., Science"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
          <select name="class" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option value="">Select Class</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
        <textarea
          name="question"
          required
          rows="3"
          placeholder="Enter your question here"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="option1" type="text" required placeholder="Option 1" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        <input name="option2" type="text" required placeholder="Option 2" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        <input name="option3" type="text" required placeholder="Option 3" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        <input name="option4" type="text" required placeholder="Option 4" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
        <select name="correct" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
          <option value="0">Option 1</option>
          <option value="1">Option 2</option>
          <option value="2">Option 3</option>
          <option value="3">Option 4</option>
        </select>
      </div>
      
      <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
        Add Question
      </button>
    </form>
  </div>
);

const TeacherDiscipline = ({ students, teachers, disciplineComments, addDisciplineComment }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Discipline Comments</h2>
    
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        addDisciplineComment(formData.get('studentId'), formData.get('comment'));
        e.target.reset();
        alert('Comment added successfully!');
      }}
      className="mb-8 p-6 bg-gray-50 rounded-xl space-y-4"
    >
      <h3 className="font-semibold text-gray-800">Add New Comment</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
        <select name="studentId" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
          <option value="">Select Student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>{student.name} - {student.class}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
        <textarea
          name="comment"
          required
          rows="3"
          placeholder="Enter discipline comment or feedback"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
        Add Comment
      </button>
    </form>
    
    <h3 className="font-semibold text-gray-800 mb-4">Recent Comments</h3>
    <div className="space-y-3">
      {disciplineComments.slice().reverse().map(comment => {
        const student = students.find(s => s.id === comment.studentId);
        const teacher = teachers.find(t => t.id === comment.teacherId);
        return (
          <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-gray-800">{student?.name || 'Unknown Student'}</p>
                <p className="text-sm text-gray-600">{teacher?.name || 'Unknown Teacher'} • {comment.date}</p>
              </div>
            </div>
            <p className="text-gray-700">{comment.comment}</p>
          </div>
        );
      })}
    </div>
  </div>
);

const AdminDashboard = ({ students, teachers, examResults }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <Users size={32} className="mb-2" />
        <p className="text-sm opacity-90">Total Students</p>
        <p className="text-3xl font-bold">{students.length}</p>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
        <User size={32} className="mb-2" />
        <p className="text-sm opacity-90">Total Teachers</p>
        <p className="text-3xl font-bold">{teachers.length}</p>
      </div>
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
        <Award size={32} className="mb-2" />
        <p className="text-sm opacity-90">Total Exams</p>
        <p className="text-3xl font-bold">{examResults.length}</p>
      </div>
    </div>
  </div>
);

const AdminTeachers = ({ teachers, addTeacher, deleteTeacher }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Teachers</h2>
    
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        addTeacher(
          formData.get('name'),
          formData.get('subject'),
          formData.get('email'),
          formData.get('password')
        );
        e.target.reset();
        alert('Teacher added successfully!');
      }}
      className="mb-8 p-6 bg-gray-50 rounded-xl space-y-4"
    >
      <h3 className="font-semibold text-gray-800">Add New Teacher</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" type="text" required placeholder="Full Name" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        <input name="subject" type="text" required placeholder="Subject" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        <input name="email" type="email" required placeholder="Email" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        <input name="password" type="password" required placeholder="Password" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
        Add Teacher
      </button>
    </form>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {teachers.map(teacher => (
            <tr key={teacher.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-800">{teacher.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{teacher.subject}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{teacher.email}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    if (window.confirm('Delete this teacher?')) {
                      deleteTeacher(teacher.id);
                    }
                  }}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminStudents = ({ students, addStudent, deleteStudent }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Students</h2>
    
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        addStudent(
          formData.get('name'),
          formData.get('class'),
          formData.get('email'),
          formData.get('password')
        );
        e.target.reset();
        alert('Student added successfully!');
      }}
      className="mb-8 p-6 bg-gray-50 rounded-xl space-y-4"
    >
      <h3 className="font-semibold text-gray-800">Add New Student</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" type="text" required placeholder="Full Name" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        <select name="class" required className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
          <option value="">Select Class</option>
          <option value="Grade 5">Grade 5</option>
          <option value="Grade 6">Grade 6</option>
          <option value="Grade 7">Grade 7</option>
        </select>
        <input name="email" type="email" required placeholder="Email" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        <input name="password" type="password" required placeholder="Password" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
        Add Student
      </button>
    </form>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map(student => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.class}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    if (window.confirm('Delete this student and all their data?')) {
                      deleteStudent(student.id);
                    }
                  }}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SchoolManagementSystem;