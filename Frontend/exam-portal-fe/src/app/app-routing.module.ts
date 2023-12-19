import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './services/guard/admin.guard';
import { userGuard } from './services/guard/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { QuizInstructionComponent } from './pages/user/quiz-instruction/quiz-instruction.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { AttemptComponent } from './pages/admin/attempt/attempt.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent
      },
      {
        path: 'add-category',
        component: AddCategoryComponent
      },
      {
        path: 'update-category/:cid',
        component: UpdateCategoryComponent
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent
      },
      {
        path: 'update-quiz/:qid',
        component: UpdateQuizComponent
      },
      {
        path: 'view-questions/:qid/:title',
        component: ViewQuizQuestionsComponent
      },
      {
        path: 'add-question/:qid/:title',
        component: AddQuestionComponent
      },
      {
        path: 'update-question/:quesId/:title',
        component: UpdateQuestionComponent
      },
      {
        path: 'all-attempts',
        component: AttemptComponent
      }
    ],
    canActivate: [adminGuard]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    children: [
      {
        path: '',
        component: UserHomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'all-quizzes/:cid',
        component: LoadQuizComponent
      },
      {
        path: 'quiz/instructions/:qid',
        component: QuizInstructionComponent
      }
    ],
    canActivate: [userGuard]
  },
  {
    path: 'user-dashboard/quiz/start/:qid',
    component: StartQuizComponent,
    pathMatch: 'full',
    canActivate: [userGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
