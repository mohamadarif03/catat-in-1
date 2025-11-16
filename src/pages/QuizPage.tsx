// src/pages/QuizPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Stack,
  useTheme,
  Button,
  IconButton,
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import type { QuizQuestion, QuizResult } from '../types/quiz.types';

const dummyQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars',
  },
  {
    id: 'q2',
    question: 'What is the chemical symbol for water?',
    options: ['O2', 'H2O', 'CO2', 'N2'],
    correctAnswer: 'H2O',
  },
  // ... (dan seterusnya)
  {
    id: 'q10',
    question: 'What is the study of plants called?',
    options: ['Zoology', 'Geology', 'Botany', 'Biology'],
    correctAnswer: 'Botany',
  },
];


function QuizPage(): React.JSX.Element {
  const navigate = useNavigate();
  const theme = useTheme();
  const { topicId } = useParams<{ topicId: string }>(); 

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(
    new Array(dummyQuizQuestions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false); // Mode untuk review jawaban
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const totalQuestions = dummyQuizQuestions.length;
  const currentQuestion = dummyQuizQuestions[currentQuestionIndex];

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isReviewMode) {
      setSelectedAnswer(event.target.value);
    }
  };

  const handleNextQuestion = () => {
    if (isReviewMode) {
      // Navigasi review
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Selesai review, kembali ke hasil
        setShowResults(true);
      }
      return;
    }
    
    // Simpan jawaban user
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(updatedUserAnswers);

    // Lanjutkan ke pertanyaan berikutnya
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null); // Reset pilihan untuk pertanyaan berikutnya
    } else {
      // Ini adalah pertanyaan terakhir, hitung hasil dan tampilkan
      handleSubmitQuiz(updatedUserAnswers);
    }
  };

  const handleSubmitQuiz = (finalAnswers: (string | null)[]) => {
    let correctCount = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (finalAnswers[i] === dummyQuizQuestions[i].correctAnswer) {
        correctCount++;
      }
    }

    const result: QuizResult = {
      totalQuestions: totalQuestions,
      correctAnswers: correctCount,
      incorrectAnswers: totalQuestions - correctCount,
      score: Math.round((correctCount / totalQuestions) * 10),
      streakIncreased: true,
      dayStreak: 6,
    };
    setQuizResult(result);
    setShowResults(true);
    setIsReviewMode(false); // Keluar dari mode review jika ada
  };

  const handleReviewAnswers = () => {
    setShowResults(false); // Sembunyikan hasil
    setIsReviewMode(true); // Masuk mode review
    setCurrentQuestionIndex(0); // Mulai dari pertanyaan pertama
  };

  // --- Logika Helper Tampilan (Sama seperti sebelumnya, tapi cek 'isReviewMode') ---
  const getOptionColor = (option: string, question: QuizQuestion) => {
    if (isReviewMode) {
      const userAnswer = userAnswers[currentQuestionIndex];
      if (option === question.correctAnswer) return theme.palette.success.main;
      if (option === userAnswer && option !== question.correctAnswer) return theme.palette.error.main;
    }
    return undefined;
  };
  
  const getOptionBgColor = (option: string, question: QuizQuestion) => {
    if (isReviewMode) {
      const userAnswer = userAnswers[currentQuestionIndex];
      if (option === question.correctAnswer) return theme.palette.success.light + '22';
      if (option === userAnswer && option !== question.correctAnswer) return theme.palette.error.light + '22';
    } else if (option === selectedAnswer) {
      return theme.palette.primary.light + '22';
    }
    return undefined;
  };
  
  const getOptionBorderColor = (option: string, question: QuizQuestion) => {
    if (isReviewMode) {
      const userAnswer = userAnswers[currentQuestionIndex];
      if (option === question.correctAnswer) return theme.palette.success.main;
      if (option === userAnswer && option !== question.correctAnswer) return theme.palette.error.main;
    } else if (option === selectedAnswer) {
      return theme.palette.primary.main;
    }
    return 'divider';
  };
  // --- Akhir Helper ---

  
  return (
    <Box>
      {/* Tombol Kembali (Navigasi) */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya (ProjectPage)
        sx={{ mb: 2, textTransform: 'none' }}
      >
        Back to Project
      </Button>

      {/* Konten Kuis atau Hasil */}
      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: '16px', border: '1px solid', borderColor: 'divider' }}>
        {!showResults ? (
          // --- Tampilan KUIS Aktif (atau Mode Review) ---
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary" fontWeight="bold">
                {isReviewMode ? 'Reviewing' : 'Question'} {currentQuestionIndex + 1} of {totalQuestions}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocalFireDepartmentIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                <Typography variant="body2" color="text.secondary">5</Typography>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={((currentQuestionIndex + 1) / totalQuestions) * 100}
              sx={{ height: 8, borderRadius: 4, mb: 3 }}
            />

            <Paper variant="outlined" sx={{ p: 3, borderRadius: '12px', borderColor: 'divider', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {currentQuestion?.question}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isReviewMode ? 'You answered:' : 'Select one of the options below.'}
              </Typography>
            </Paper>

            <RadioGroup
              aria-label="quiz-options"
              name="quiz-options-group"
              value={isReviewMode ? userAnswers[currentQuestionIndex] : selectedAnswer} // Tampilkan jawaban user jika review
              onChange={handleAnswerChange}
            >
              <Stack spacing={1.5}>
                {currentQuestion?.options.map((option, index) => (
                  <Paper
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 1,
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: getOptionBorderColor(option, currentQuestion),
                      bgcolor: getOptionBgColor(option, currentQuestion),
                      cursor: isReviewMode ? 'default' : 'pointer',
                      '&:hover': !isReviewMode && { borderColor: theme.palette.primary.main, bgcolor: theme.palette.primary.light + '11' },
                    }}
                    onClick={() => !isReviewMode && setSelectedAnswer(option)}
                  >
                    <FormControlLabel
                      value={option}
                      control={
                        <Radio
                          sx={{ color: getOptionColor(option, currentQuestion) }}
                          disabled={isReviewMode}
                        />
                      }
                      label={
                        <Typography
                          color={getOptionColor(option, currentQuestion)}
                          fontWeight={option === currentQuestion.correctAnswer && isReviewMode ? 'bold' : 'normal'}
                        >
                          {option}
                        </Typography>
                      }
                      sx={{ width: '100%', m: 0, pr: 1 }}
                    />
                  </Paper>
                ))}
              </Stack>
            </RadioGroup>
            
            {/* Tombol Aksi Halaman */}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handleNextQuestion}
                disabled={!isReviewMode && selectedAnswer === null}
              >
                {isReviewMode ? (currentQuestionIndex < totalQuestions - 1 ? 'Next' : 'Finish Review') : (currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Submit Quiz')}
              </Button>
            </Box>
          </Box>
        ) : (
          // --- Tampilan HASIL KUIS ---
          <Box sx={{ p: 3, textAlign: 'center' }}>
            {quizResult && (
              <Box>
                <LocalFireDepartmentIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  Great Job!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  You've increased your streak!
                </Typography>

                <Stack direction="row" justifyContent="center" alignItems="baseline" spacing={4} sx={{ mb: 4 }}>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" color="primary.main">
                      {quizResult.correctAnswers}/{quizResult.totalQuestions}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your Score
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">{quizResult.correctAnswers}</Typography>
                    <Typography variant="body2" color="text.secondary">Correct</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">{quizResult.incorrectAnswers}</Typography>
                    <Typography variant="body2" color="text.secondary">Incorrect</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">{quizResult.dayStreak}</Typography>
                    <Typography variant="body2" color="text.secondary">Day Streak</Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button
                    variant="text"
                    onClick={() => navigate('/')} // Arahkan ke dashboard
                    sx={{ textTransform: 'none', color: 'text.secondary' }}
                  >
                    Back to Dashboard
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleReviewAnswers} // Memulai mode review
                    sx={{ textTransform: 'none', color:'white' }}
                  >
                    Review Answers
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default QuizPage;