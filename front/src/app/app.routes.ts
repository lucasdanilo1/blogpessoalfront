import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { authGuard } from './guards/auth.guard';
import { MeusPostsComponent } from './pages/meus-posts/meus-posts.component';
import { TodosPostsComponent } from './pages/todos-posts/todos-posts.component';
import { PostComponent } from './pages/post/post.component';
import { MeuPerfilComponent } from './pages/meu-perfil/meu-perfil.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'meus-posts', component: MeusPostsComponent, canActivate: [authGuard] },
  { path: 'todos-posts', component: TodosPostsComponent, canActivate: [authGuard] },
  { path: 'post/:id', component: PostComponent, canActivate: [authGuard] },
  { path: 'meu-perfil', component: MeuPerfilComponent, canActivate: [authGuard] }
];
