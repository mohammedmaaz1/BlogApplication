import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../interfaces/blog.interface';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    BlogCardComponent,
    LoadingSpinnerComponent
  ],
  template: `
    <!-- Animated background particles -->
    <div class="particles">
      <div class="particle" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
    </div>

    <div class="blog-list-container">
      <div class="hero-section fade-in">
        <div class="hero-content">
          <h1 class="hero-title gradient-text">
            <mat-icon class="hero-icon float">article</mat-icon>
            Discover Amazing Stories
          </h1>
          <p class="hero-subtitle">
            <span class="subtitle-text">Explore insights, tutorials, and thoughts from our vibrant community of writers</span>
          </p>
          <div class="hero-stats">
            <div class="stat-item fade-in-left">
              <span class="stat-number">{{ allBlogs.length }}</span>
              <span class="stat-label">Articles</span>
            </div>
            <div class="stat-item fade-in-up">
              <span class="stat-number">{{ getUniqueAuthors() }}</span>
              <span class="stat-label">Authors</span>
            </div>
            <div class="stat-item fade-in-right">
              <span class="stat-number">{{ getAllTags().length }}</span>
              <span class="stat-label">Topics</span>
            </div>
          </div>
        </div>
      </div>

      <div class="search-section glass">
        <div class="search-header">
          <h2>Find Your Next Read</h2>
          <p>Search through our collection of articles</p>
        </div>
        
        <div class="search-container">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search articles...</mat-label>
            <input matInput
                   [(ngModel)]="searchQuery"
                   (input)="onSearchChange()"
                   placeholder="Search by title, author, or tags">
            <mat-icon matSuffix class="search-icon">search</mat-icon>
          </mat-form-field>
          
          <button mat-raised-button 
                  color="warn" 
                  class="clear-button"
                  *ngIf="searchQuery"
                  (click)="clearSearch()">
            <mat-icon>clear</mat-icon>
            Clear
          </button>
        </div>

        <div class="popular-tags" *ngIf="!searchQuery">
          <h3>Popular Topics</h3>
          <mat-chip-set class="tags-container">
            <mat-chip *ngFor="let tag of getPopularTags()" 
                      (click)="searchByTag(tag)"
                      class="topic-chip interactive">
              {{ tag }}
            </mat-chip>
          </mat-chip-set>
        </div>
      </div>

      <div class="content-section">
        <app-loading-spinner *ngIf="loading"></app-loading-spinner>
        
        <div *ngIf="error" class="error-message fade-in">
          <mat-card class="error-card glass">
            <mat-card-content>
              <div class="error-content">
                <mat-icon color="warn" class="error-icon pulse">error_outline</mat-icon>
                <div class="error-text">
                  <h3>Oops! Something went wrong</h3>
                  <p>{{ error }}</p>
                  <button mat-raised-button color="primary" (click)="loadBlogs()" class="retry-button">
                    <mat-icon>refresh</mat-icon>
                    Try Again
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <div *ngIf="!loading && !error" class="blogs-section">
          <div class="section-header" *ngIf="blogs.length > 0">
            <h2>
              <span *ngIf="!searchQuery">Latest Articles</span>
              <span *ngIf="searchQuery">Search Results ({{ blogs.length }})</span>
            </h2>
            <div class="view-options">
              <button mat-icon-button 
                      [class.active]="viewMode === 'grid'"
                      (click)="viewMode = 'grid'"
                      matTooltip="Grid View">
                <mat-icon>grid_view</mat-icon>
              </button>
              <button mat-icon-button 
                      [class.active]="viewMode === 'list'"
                      (click)="viewMode = 'list'"
                      matTooltip="List View">
                <mat-icon>view_list</mat-icon>
              </button>
            </div>
          </div>

          <div *ngIf="blogs.length === 0" class="no-results fade-in">
            <mat-card class="no-results-card glass">
              <mat-card-content>
                <div class="no-results-content">
                  <mat-icon class="no-results-icon float">search_off</mat-icon>
                  <div class="no-results-text">
                    <h3>No articles found</h3>
                    <p *ngIf="searchQuery">
                      No articles match your search for "<strong>{{ searchQuery }}</strong>".
                      Try different keywords or browse all articles.
                    </p>
                    <p *ngIf="!searchQuery">No articles available at the moment.</p>
                    <button mat-raised-button color="primary" (click)="clearSearch()" *ngIf="searchQuery">
                      <mat-icon>clear</mat-icon>
                      Clear Search
                    </button>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
          
          <div class="blogs-grid" 
               [class.list-view]="viewMode === 'list'"
               *ngIf="blogs.length > 0">
            <app-blog-card 
              *ngFor="let blog of blogs; trackBy: trackByBlogId; let i = index"
              [blog]="blog"
              [style.animation-delay]="(i * 0.1) + 's'">
            </app-blog-card>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .blog-list-container {
      min-height: 100vh;
      position: relative;
    }

    .particles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }

    .hero-section {
      padding: 80px 24px 60px;
      text-align: center;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .hero-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      background: linear-gradient(45deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 1.3rem;
      margin-bottom: 40px;
      line-height: 1.6;
      font-weight: 500;
    }

    .subtitle-text {
      color: white;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .hero-stats {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-top: 40px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(8px);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
      box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
    }

    .stat-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
      background: rgba(255, 255, 255, 0.85);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 8px;
    }

    .search-section {
      max-width: 1200px;
      margin: -30px auto 40px;
      padding: 40px;
      border-radius: 20px;
      position: relative;
      z-index: 10;
    }

    .search-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .search-header h2 {
      font-size: 2rem;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .search-header p {
      color: #64748b;
      font-size: 1.1rem;
    }

    .search-container {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;
      align-items: flex-end;
      justify-content: center;
    }

    .search-field {
      flex: 1;
      max-width: 500px;
    }

    .search-icon {
      color: #6366f1;
    }

    .clear-button {
      height: 56px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 28px;
    }

    .popular-tags {
      text-align: center;
    }

    .popular-tags h3 {
      color: #1e293b;
      margin-bottom: 16px;
      font-size: 1.2rem;
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
    }

    .topic-chip {
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      color: white;
      font-weight: 500;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .topic-chip:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
    }

    .content-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px 40px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding: 0 8px;
    }

    .section-header h2 {
      font-size: 2rem;
      color: #1e293b;
      margin: 0;
    }

    .view-options {
      display: flex;
      gap: 8px;
    }

    .view-options button {
      transition: all 0.3s ease;
    }

    .view-options button.active {
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      color: white;
    }

    .blogs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 32px;
      animation: fadeIn 0.6s ease-out;
    }

    .blogs-grid.list-view {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .error-card,
    .no-results-card {
      max-width: 600px;
      margin: 40px auto;
    }

    .error-content,
    .no-results-content {
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 32px;
    }

    .error-icon,
    .no-results-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ef4444;
    }

    .no-results-icon {
      color: #94a3b8;
    }

    .error-text,
    .no-results-text {
      flex: 1;
    }

    .error-text h3,
    .no-results-text h3 {
      margin: 0 0 12px 0;
      color: #1e293b;
      font-size: 1.5rem;
    }

    .error-text p,
    .no-results-text p {
      margin: 0 0 20px 0;
      color: #64748b;
      line-height: 1.6;
    }

    .retry-button {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
        flex-direction: column;
        gap: 12px;
      }

      .hero-icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
      }

      .hero-stats {
        flex-direction: column;
        gap: 20px;
        align-items: center;
      }

      .stat-item {
        width: 200px;
      }

      .search-section {
        margin: -20px 16px 24px;
        padding: 24px;
      }

      .search-container {
        flex-direction: column;
        align-items: stretch;
      }

      .search-field {
        max-width: none;
      }

      .blogs-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .section-header {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }

      .error-content,
      .no-results-content {
        flex-direction: column;
        text-align: center;
        padding: 24px;
      }

      .content-section {
        padding: 0 16px 24px;
      }
    }
  `]
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  loading = false;
  error = '';
  searchQuery = '';
  allBlogs: Blog[] = [];
  viewMode: 'grid' | 'list' = 'grid';

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.loading = true;
    this.error = '';
    
    this.blogService.getAllBlogs().subscribe({
      next: (blogs) => {
        this.blogs = blogs;
        this.allBlogs = blogs;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load articles. Please check your connection and try again.';
        this.loading = false;
      }
    });
  }

  onSearchChange() {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.blogService.searchBlogs(this.searchQuery).subscribe({
        next: (blogs) => {
          this.blogs = blogs;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Search failed. Please try again.';
          this.loading = false;
        }
      });
    } else {
      this.blogs = this.allBlogs;
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.blogs = this.allBlogs;
  }

  searchByTag(tag: string) {
    this.searchQuery = tag;
    this.onSearchChange();
  }

  getUniqueAuthors(): number {
    const authors = new Set(this.allBlogs.map(blog => blog.author));
    return authors.size;
  }

  getAllTags(): string[] {
    const allTags = this.allBlogs.flatMap(blog => blog.tags);
    return [...new Set(allTags)];
  }

  getPopularTags(): string[] {
    const tagCount = new Map<string, number>();
    this.allBlogs.forEach(blog => {
      blog.tags.forEach(tag => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      });
    });
    
    return Array.from(tagCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([tag]) => tag);
  }

  trackByBlogId(index: number, blog: Blog): number {
    return blog.id;
  }
}