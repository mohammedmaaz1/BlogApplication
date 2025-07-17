import { Routes } from '@angular/router';
import { BlogListComponent } from '../components/blog-list/blog-list.component';
import { BlogDetailsComponent } from '../components/blog-details/blog-details.component';
import { CreateBlogComponent } from '../components/create-blog/create-blog.component';
import { AboutComponent } from '../components/about/about.component';

export const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'blog/:id', component: BlogDetailsComponent },
  { path: 'create', component: CreateBlogComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];