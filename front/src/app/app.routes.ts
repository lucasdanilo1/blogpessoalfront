import { Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { authGuard } from './guards/auth.guard';
import { MeusPostsComponent } from './components/meus-posts/meus-posts.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'posts', component: PostComponent, canActivate: [authGuard] },
  { path: 'meus-posts', component: MeusPostsComponent, canActivate: [authGuard] }
];
