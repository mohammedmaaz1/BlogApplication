import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Blog } from '../../interfaces/blog.interface';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ],
  template: `
    <mat-card class="blog-card fade-in-up" [routerLink]="['/blog', blog.id]">
      <div class="card-image-container" *ngIf="blog.image">
        <img [src]="blog.image" [alt]="blog.title" class="card-image" />
        <div class="image-overlay">
          <mat-icon class="read-icon">visibility</mat-icon>
        </div>
      </div>
      
      <div class="card-content">
        <mat-card-header class="custom-header">
          <mat-card-title class="blog-title">{{ blog.title }}</mat-card-title>
          <mat-card-subtitle class="blog-meta">
            <div class="author-info">
              <mat-icon class="meta-icon">person</mat-icon>
              <span class="author">{{ blog.author }}</span>
            </div>
            <div class="date-info">
              <mat-icon class="meta-icon">schedule</mat-icon>
              <span class="date">{{ blog.date | date:'MMM d, y' }}</span>
            </div>
          </mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content class="blog-content">
          <p class="snippet">{{ blog.snippet }}</p>
          
          <div class="tags" *ngIf="blog.tags.length">
            <mat-chip-set class="tag-set">
              <mat-chip *ngFor="let tag of blog.tags.slice(0, 3)" class="tag-chip">
                {{ tag }}
              </mat-chip>
              <span *ngIf="blog.tags.length > 3" class="more-tags">
                +{{ blog.tags.length - 3 }} more
              </span>
            </mat-chip-set>
          </div>
        </mat-card-content>
        
        <mat-card-actions class="card-actions">
          <button mat-raised-button color="primary" class="read-button">
            <mat-icon>auto_stories</mat-icon>
            <span>Read Article</span>
          </button>
          <div class="reading-time">
            <mat-icon>access_time</mat-icon>
            <span>{{ getReadingTime() }} min read</span>
          </div>
        </mat-card-actions>
      </div>
    </mat-card>
  `,
  styles: [`
    .blog-card {
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .blog-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #6366f1, #8b5cf6);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    .blog-card:hover::before {
      transform: scaleX(1);
    }

    .blog-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.08);
    }

    .card-image-container {
      position: relative;
      width: 100%;
      height: 220px;
      overflow: hidden;
    }

    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .blog-card:hover .card-image {
      transform: scale(1.1);
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(99, 102, 241, 0.85), rgba(139, 92, 246, 0.85));
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .blog-card:hover .image-overlay {
      opacity: 1;
    }

    .read-icon {
      color: white;
      font-size: 48px;
      width: 48px;
      height: 48px;
      animation: pulse 2s infinite;
    }

    .card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0;
    }

    .custom-header {
      padding: 20px 20px 16px;
    }

    .blog-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 1.3;
      margin-bottom: 12px;
      color: #1e293b;
      transition: color 0.3s ease;
    }

    .blog-card:hover .blog-title {
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .blog-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
    }

    .author-info,
    .date-info {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .meta-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #94a3b8;
    }

    .author {
      font-weight: 500;
      color: #475569;
    }

    .blog-content {
      padding: 0 20px;
      flex-grow: 1;
    }

    .snippet {
      color: #64748b;
      line-height: 1.6;
      margin: 0 0 16px 0;
      font-size: 0.95rem;
    }

    .tags {
      margin-top: auto;
      padding-bottom: 16px;
    }

    .tag-set {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }

    .tag-chip {
      font-size: 0.75rem;
      height: 28px;
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      color: white;
      border-radius: 14px;
      transition: all 0.3s ease;
    }

    .tag-chip:hover {
      transform: scale(1.1);
      box-shadow: 0 2px 12px rgba(99, 102, 241, 0.3);
    }

    .more-tags {
      font-size: 0.75rem;
      color: #94a3b8;
      font-weight: 500;
    }

    .card-actions {
      padding: 16px 20px 20px;
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
    }

    .read-button {
      display: flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      color: white;
      border: none;
      transition: all 0.3s ease;
    }

    .read-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
    }

    .reading-time {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #94a3b8;
      font-size: 0.8rem;
    }

    .reading-time mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    @media (max-width: 768px) {
      .card-image-container {
        height: 180px;
      }
      
      .blog-title {
        font-size: 1.2rem;
      }
      
      .blog-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .card-actions {
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
      }

      .read-button {
        width: 100%;
        justify-content: center;
      }

      .reading-time {
        justify-content: center;
      }
    }
  `]
})
export class BlogCardComponent {
  @Input() blog!: Blog;

  getReadingTime(): number {
    const wordsPerMinute = 200;
    const wordCount = this.blog.content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
}