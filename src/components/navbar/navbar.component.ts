import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar class="navbar glass-dark">
      <div class="navbar-container">
        <div class="navbar-brand fade-in-left">
          <a routerLink="/" class="brand-link">
            <div class="brand-icon pulse">
              <mat-icon>article</mat-icon>
            </div>
            <span class="brand-text gradient-text">BlogSphere</span>
          </a>
        </div>
        
        <nav class="navbar-nav desktop-nav fade-in-right">
          <a mat-button routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}" class="nav-button">
            <mat-icon>home</mat-icon>
            <span>Home</span>
          </a>
          <a mat-button routerLink="/create" routerLinkActive="active-link" class="nav-button">
            <mat-icon>create</mat-icon>
            <span>Create</span>
          </a>
          <a mat-button routerLink="/about" routerLinkActive="active-link" class="nav-button">
            <mat-icon>info</mat-icon>
            <span>About</span>
          </a>
        </nav>

        <div class="mobile-nav">
          <button mat-icon-button [matMenuTriggerFor]="menu" class="menu-button">
            <mat-icon>menu</mat-icon>
          </button>
          <mat-menu #menu="matMenu" class="mobile-menu">
            <a mat-menu-item routerLink="/">
              <mat-icon>home</mat-icon>
              <span>Home</span>
            </a>
            <a mat-menu-item routerLink="/create">
              <mat-icon>create</mat-icon>
              <span>Create Blog</span>
            </a>
            <a mat-menu-item routerLink="/about">
              <mat-icon>info</mat-icon>
              <span>About</span>
            </a>
          </mat-menu>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
    }

    .navbar-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
    }

    .brand-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
      font-weight: 600;
      font-size: 1.5rem;
      transition: all 0.3s ease;
    }

    .brand-link:hover {
      transform: scale(1.05);
    }

    .brand-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      border-radius: 50%;
      margin-right: 12px;
      box-shadow: 0 2px 12px rgba(99, 102, 241, 0.2);
    }

    .brand-icon mat-icon {
      color: white;
      font-size: 24px;
    }

    .brand-text {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 1.8rem;
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .navbar-nav {
      display: flex;
      gap: 8px;
    }

    .nav-button {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #64748b;
      transition: all 0.3s ease;
      border-radius: 20px;
      padding: 8px 16px;
      position: relative;
      overflow: hidden;
    }

    .nav-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
      transition: left 0.5s;
    }

    .nav-button:hover::before {
      left: 100%;
    }

    .nav-button:hover {
      color: #6366f1;
      background: rgba(99, 102, 241, 0.08);
      transform: translateY(-1px);
      box-shadow: 0 2px 12px rgba(99, 102, 241, 0.15);
    }

    .active-link {
      background: rgba(99, 102, 241, 0.1) !important;
      color: #6366f1 !important;
      box-shadow: 0 2px 12px rgba(99, 102, 241, 0.15);
    }

    .mobile-nav {
      display: none;
    }

    .menu-button {
      color: #64748b;
      transition: all 0.3s ease;
    }

    .menu-button:hover {
      color: #6366f1;
      background: rgba(99, 102, 241, 0.08);
      transform: scale(1.1);
    }

    .mobile-menu {
      backdrop-filter: blur(12px);
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      margin-top: 8px;
    }

    @media (max-width: 768px) {
      .desktop-nav {
        display: none;
      }
      
      .mobile-nav {
        display: block;
      }

      .navbar-container {
        padding: 0 16px;
      }

      .brand-text {
        font-size: 1.5rem;
      }

      .brand-icon {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
    }
  `]
})
export class NavbarComponent {}