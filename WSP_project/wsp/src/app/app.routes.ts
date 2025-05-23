import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news-folder/news/news.component';
import { JournalComponent } from './journal/journal.component';
import { ProfileComponent } from './profile/profile.component';
import { TranscriptComponent } from './transcript/transcript.component';
import { FilesComponent } from './files/files.component';
import { NewsDetailsComponent } from './news-folder/news-details/news-details.component';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { UserCreatorComponent } from './user-creator/user-creator.component';
import { StudentListComponent } from './student-list/student-list.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, 
  {path: 'login', component: LoginComponent}, 
  {path: 'home', redirectTo: 'home/news', pathMatch: 'full'},
  { 
    path: 'home', 
    component: HomeComponent, 
    children: [
      {path: 'profile/:id', component: ProfileComponent},
      {path: 'users/profile/:id', component: ProfileComponent},
      {path: 'news', component: NewsComponent},
      {path: 'news/:id', component: NewsDetailsComponent},
      {path: 'journal', component: JournalComponent},
      {path: 'transcript', component: TranscriptComponent},
      {path: 'files', component: FilesComponent},
      {path: 'users', component: AdminUsersListComponent},
      {path: 'users/create', component: UserCreatorComponent},
      {path: 'student-list', component: StudentListComponent},
    ]
  },
];
    