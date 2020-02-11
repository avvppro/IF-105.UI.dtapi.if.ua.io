import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { NewQuestionComponent } from './questions/new-question/new-question.component';
import { StudentsComponent } from './students/students.component';
import { StudentsService } from './students/services/students.service';
import { FacultiesComponent } from './faculties/faculties.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './group/group.component';
import { GroupAddEditDialogComponent } from './group/group-add-edit-dialog/group-add-edit-dialog.component';
import { GroupViewDialogComponent } from './group/group-view-dialog/group-view-dialog.component';
import { AdminUserService } from './admin-user/admin-user.service';
import { CreateUpdateUserComponent } from './admin-user/create-update-user/create-update-user.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { SharedModule } from '../shared/shared.module';
import { SpecialityListComponent } from './speciality/speciality-list/speciality-list.component';
import { DialogFormComponent } from './speciality/dialog-form/dialog-form.component';
import { NavbarComponent } from './sidenav/sidenav.component';
import { CreateEditComponent } from './faculties/create-edit/create-edit.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectsCreateModalComponent } from './subjects/subjects-create-modal/subjects-create-modal.component';
import { MatDialogModule } from '@angular/material';
import { TimeTableComponent } from './time-table/time-table.component';
import { TimeTableAddDialogComponent } from './time-table/time-table-add-dialog/time-table-add-dialog.component';
import { QuestionTypePipe } from './questions/pipes/question-type.pipe';
import { StudentsModalWindowComponent } from './students/students-modal-window/students-modal-window.component';
import { TestListComponent } from './tests/list/test-list.component';
import { TestAddComponent } from './tests/add/test-add.component';
import { FacultiesService } from './faculties/faculties.service';
import { TimeTablePipe } from '../shared/pipes/time-table.pipe';
import { ResultsComponent } from './results/results.component';
import { ResultsService } from './results/results.service';
import { GroupModalService } from './group/group-modal.service';
import { GroupService } from './group/group.service';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ResultRaitingQuestionComponent } from './results/result-raiting-question/result-raiting-question.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransferStudentModalWindowComponent } from './students/transfer-student-modal-window/transfer-student-modal-window.component';
import { ResultDetailComponent } from './results/result-detail/result-detail.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'
      },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'tests/:id/questions/:questionId/:mode', component: NewQuestionComponent,
        data: {
          breadcrumb: 'Запитання'
        }
      },
      {
        path: 'tests/:id/questions', component: QuestionsComponent,
        data: {
          breadcrumb: 'Запитання'
        }
      },
      {
        path: 'tests/:id/questions/new', component: NewQuestionComponent,
        data: {
          breadcrumb: 'Створення запитання'
        }
      },
      {
        path: 'Students/:id', component: StudentsComponent,
        data: {
          breadcrumb: 'Студенти'
        }
      },
      {
        path: 'admin-user', component: AdminUserComponent,
        data: {
          breadcrumb: 'Адміни'
        }
      },
      {
        path: 'faculties', component: FacultiesComponent,
        data: {
          breadcrumb: 'Факультети'
        }
      },
      {
        path: 'group', component: GroupComponent,
        data: {
          breadcrumb: 'Групи'
        }
      },
      {
        path: 'subjects', component: SubjectsComponent,
        data: {
          breadcrumb: 'Предмети'
        }
      },
      {
        path: 'speciality',
        component: SpecialityListComponent,
        data: {
          breadcrumb: 'Спеціальності'
        }
      },
      {
        path: 'timeTable', component: TimeTableComponent,
        data: {
          breadcrumb: 'Розклад'
        }
      },
      {
        path: 'tests', component: TestListComponent,
        data: {
          breadcrumb: 'Тести'
        }
      },
      {
        path: 'results', component: ResultsComponent,
        data: {
          breadcrumb: 'Результати'
        }
      },
    ]
  }
];
@NgModule({
  declarations: [
    AdminComponent,
    StudentsComponent,
    StudentsModalWindowComponent,
    FacultiesComponent,
    GroupComponent,
    GroupAddEditDialogComponent,
    GroupViewDialogComponent,
    TestListComponent,
    TestAddComponent,
    QuestionsComponent,
    NewQuestionComponent,
    AdminUserComponent,
    CreateUpdateUserComponent,
    SpecialityListComponent,
    DialogFormComponent,
    NavbarComponent,
    CreateEditComponent,
    SubjectsComponent,
    SubjectsCreateModalComponent,
    TimeTableComponent,
    TimeTablePipe,
    TimeTableAddDialogComponent,
    QuestionTypePipe,
    DashboardComponent,
    ResultsComponent,
    ResultRaitingQuestionComponent,
    TransferStudentModalWindowComponent,
    ResultDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ChartsModule
  ],
  providers: [
    AdminUserService,
    StudentsService,
    FacultiesService,
    ResultsService,
    GroupModalService,
    GroupService
  ],
  exports: [
    TimeTablePipe,
  ],
  entryComponents: [
    NavbarComponent,
    CreateUpdateUserComponent,
    DialogFormComponent,
    GroupAddEditDialogComponent,
    CreateEditComponent,
    GroupViewDialogComponent,
    SubjectsCreateModalComponent,
    TestAddComponent,
    TimeTableAddDialogComponent,
    StudentsModalWindowComponent,
    ResultRaitingQuestionComponent,
    TransferStudentModalWindowComponent,
    StudentsModalWindowComponent,
    ResultDetailComponent,
  ]
})
export class AdminModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
