import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../interfaces/blog.interface';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    LoadingSpinnerComponent
  ],
  template: `
    <div class="blog-details-container">
      <div class="back-button-container">
        <button mat-button (click)="goBack()" class="back-button">
          <mat-icon>arrow_back</mat-icon>
          Back to Blogs
        </button>
      </div>

      <app-loading-spinner *ngIf="loading"></app-loading-spinner>

      <div *ngIf="error" class="error-message">
        <mat-card class="error-card">
          <mat-card-content>
            <div class="error-content">
              <mat-icon color="warn">error</mat-icon>
              <div>
                <h3>Blog Not Found</h3>
                <p>{{ error }}</p>
                <button mat-button color="primary" routerLink="/">
                  Go to Home
                </button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <article *ngIf="blog && !loading && !error" class="blog-article">
        <div class="blog-header">
          <div class="blog-image" *ngIf="blog.image">
            <img [src]="blog.image" [alt]="blog.title" />
          </div>
          
          <div class="blog-meta">
            <h1>{{ blog.title }}</h1>
            <div class="meta-info">
              <span class="author">
                <mat-icon>person</mat-icon>
                {{ blog.author }}
              </span>
              <span class="date">
                <mat-icon>calendar_today</mat-icon>
                {{ blog.date | date:'fullDate' }}
              </span>
            </div>
            
            <div class="tags" *ngIf="blog.tags.length">
              <mat-chip-set>
                <mat-chip *ngFor="let tag of blog.tags">{{ tag }}</mat-chip>
              </mat-chip-set>
            </div>
          </div>
        </div>

        <div class="blog-content">
          <div class="content-text">
            <p *ngFor="let paragraph of contentParagraphs">{{ paragraph }}</p>
          </div>
        </div>
        
        <div class="blog-actions">
          <button mat-raised-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            Back to Blogs
          </button>
          <button mat-button routerLink="/create">
            <mat-icon>add</mat-icon>
            Write a Blog
          </button>
        </div>
      </article>
    </div>
  `,
  styles: [`
    .blog-details-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
    }

    .back-button-container {
      margin-bottom: 24px;
    }

    .back-button {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .error-card {
      max-width: 600px;
      margin: 0 auto;
    }

    .error-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
    }

    .error-content mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }

    .error-content div {
      flex: 1;
    }

    .error-content h3 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .error-content p {
      margin: 0 0 16px 0;
      color: #666;
    }

    .blog-article {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .blog-header {
      position: relative;
    }

    .blog-image {
      width: 100%;
      height: 300px;
      overflow: hidden;
    }

    .blog-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .blog-meta {
      padding: 32px;
    }

    .blog-meta h1 {
      font-size: 2.5rem;
      font-weight: 400;
      color: #333;
      margin: 0 0 16px 0;
      line-height: 1.2;
    }

    .meta-info {
      display: flex;
      gap: 24px;
      margin-bottom: 24px;
    }

    .meta-info span {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      font-size: 0.9rem;
    }

    .meta-info mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .author {
      font-weight: 500;
    }

    .tags {
      margin-top: 16px;
    }

    .tags mat-chip-set {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .blog-content {
      padding: 0 32px 32px;
    }

    .content-text {
      line-height: 1.8;
      font-size: 1.1rem;
      color: #444;
    }

    .content-text p {
      margin: 0 0 24px 0;
      text-align: justify;
    }

    .blog-actions {
      display: flex;
      gap: 16px;
      padding: 24px 32px;
      border-top: 1px solid #eee;
      background: #f9f9f9;
    }

    .blog-actions button {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    @media (max-width: 768px) {
      .blog-details-container {
        padding: 16px;
      }

      .blog-image {
        height: 200px;
      }

      .blog-meta {
        padding: 24px 16px;
      }

      .blog-meta h1 {
        font-size: 2rem;
      }

      .meta-info {
        flex-direction: column;
        gap: 12px;
      }

      .blog-content {
        padding: 0 16px 24px;
      }

      .content-text {
        font-size: 1rem;
      }

      .blog-actions {
        flex-direction: column;
        padding: 16px;
      }

      .error-content {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class BlogDetailsComponent implements OnInit {
  blog: Blog | null = null;
  loading = false;
  error = '';
  contentParagraphs: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadBlog(id);
      }
    });
  }

  loadBlog(id: number) {
    this.loading = true;
    this.error = '';
    
    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        this.blog = blog;
        this.contentParagraphs = blog.content.split('\n\n').filter(p => p.trim());
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Blog not found or failed to load.';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}