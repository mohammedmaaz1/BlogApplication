import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="about-container">
      <div class="header">
        <h1>About BlogApp</h1>
        <p class="subtitle">A modern Angular blog application showcasing best practices</p>
      </div>

      <div class="content">
        <mat-card class="about-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>info</mat-icon>
              About This Application
            </mat-card-title>
          </mat-card-header>
          
          <mat-card-content>
            <p>
              This is a modern blog application built with Angular 17+, demonstrating core Angular concepts 
              and best practices for front-end development. The application showcases practical skills 
              relevant to internship-level developers.
            </p>
            
            <h3>Key Features</h3>
            <ul>
              <li>Responsive design with Angular Material</li>
              <li>Dynamic routing with Angular Router</li>
              <li>Component-based architecture</li>
              <li>Service-based data management</li>
              <li>Form validation and handling</li>
              <li>Search and filtering functionality</li>
              <li>Loading states and error handling</li>
              <li>Local storage integration</li>
            </ul>

            <h3>Technologies Used</h3>
            <div class="tech-stack">
              <span class="tech-item">Angular 17+</span>
              <span class="tech-item">TypeScript</span>
              <span class="tech-item">Angular Material</span>
              <span class="tech-item">RxJS</span>
              <span class="tech-item">CSS3</span>
              <span class="tech-item">HTML5</span>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="features-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>build</mat-icon>
              Application Features
            </mat-card-title>
          </mat-card-header>
          
          <mat-card-content>
            <div class="features-grid">
              <div class="feature-item">
                <mat-icon>list</mat-icon>
                <h4>Blog Listing</h4>
                <p>Browse all blog posts with search and filter capabilities</p>
              </div>
              
              <div class="feature-item">
                <mat-icon>article</mat-icon>
                <h4>Blog Details</h4>
                <p>Read full blog posts with rich content display</p>
              </div>
              
              <div class="feature-item">
                <mat-icon>create</mat-icon>
                <h4>Create Blog</h4>
                <p>Write and publish new blog posts with validation</p>
              </div>
              
              <div class="feature-item">
                <mat-icon>search</mat-icon>
                <h4>Search</h4>
                <p>Find blogs by title or tags with real-time filtering</p>
              </div>
              
              <div class="feature-item">
                <mat-icon>responsive</mat-icon>
                <h4>Responsive</h4>
                <p>Optimized for mobile, tablet, and desktop devices</p>
              </div>
              
              <div class="feature-item">
                <mat-icon>error</mat-icon>
                <h4>Error Handling</h4>
                <p>Graceful error handling with user-friendly messages</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <div class="cta-section">
          <h2>Ready to start blogging?</h2>
          <div class="cta-buttons">
            <button mat-raised-button color="primary" routerLink="/create">
              <mat-icon>add</mat-icon>
              Create Your First Blog
            </button>
            <button mat-button routerLink="/">
              <mat-icon>home</mat-icon>
              Browse Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 24px;
    }

    .header {
      text-align: center;
      margin-bottom: 32px;
    }

    .header h1 {
      font-size: 2.5rem;
      font-weight: 300;
      color: #333;
      margin: 0 0 8px 0;
    }

    .subtitle {
      font-size: 1.1rem;
      color: #666;
      margin: 0;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .about-card,
    .features-card {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    mat-card-header {
      margin-bottom: 16px;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.5rem;
    }

    .about-card p {
      line-height: 1.6;
      color: #555;
      margin-bottom: 16px;
    }

    .about-card h3 {
      color: #333;
      margin: 24px 0 16px 0;
    }

    .about-card ul {
      line-height: 1.8;
      color: #555;
      margin-bottom: 24px;
    }

    .about-card ul li {
      margin-bottom: 8px;
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }

    .tech-item {
      background: #e3f2fd;
      color: #1976d2;
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }

    .feature-item {
      text-align: center;
      padding: 16px;
    }

    .feature-item mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #3f51b5;
      margin-bottom: 16px;
    }

    .feature-item h4 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .feature-item p {
      color: #666;
      margin: 0;
      line-height: 1.5;
    }

    .cta-section {
      text-align: center;
      padding: 32px;
      background: linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%);
      color: white;
      border-radius: 8px;
      margin-top: 16px;
    }

    .cta-section h2 {
      margin: 0 0 24px 0;
      font-weight: 300;
    }

    .cta-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
    }

    .cta-buttons button {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    @media (max-width: 768px) {
      .about-container {
        padding: 16px;
      }

      .header h1 {
        font-size: 2rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }

      .cta-buttons button {
        width: 100%;
        max-width: 200px;
      }

      .tech-stack {
        justify-content: center;
      }
    }
  `]
})
export class AboutComponent {}