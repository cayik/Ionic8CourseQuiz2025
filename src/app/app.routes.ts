import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'question-list',
    loadComponent: () => import('./pages/question-list/question-list.page').then( m => m.QuestionListPage)
  },
  {
    path: 'question/:id', //:id ist ein parameter, der in der url übergeben wird (z.B. question/1) 
    loadComponent: () => import('./pages/question/question.page').then( m => m.QuestionPage)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz/quiz.page').then( m => m.QuizPage)
  },
];
