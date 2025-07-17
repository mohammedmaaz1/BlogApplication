import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loading-container fade-in">
      <div class="spinner-wrapper">
        <div class="custom-spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
      </div>
      <p class="loading-text">Loading amazing content...</p>
      <div class="loading-dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 40px;
      gap: 24px;
      min-height: 300px;
    }

    .spinner-wrapper {
      position: relative;
    }

    .custom-spinner {
      position: relative;
      width: 80px;
      height: 80px;
    }

    .spinner-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-radius: 50%;
      animation: spin 2s linear infinite;
    }

    .spinner-ring:nth-child(1) {
      border-top-color: #6366f1;
      animation-delay: 0s;
    }

    .spinner-ring:nth-child(2) {
      border-right-color: #8b5cf6;
      animation-delay: 0.3s;
      width: 70%;
      height: 70%;
      top: 15%;
      left: 15%;
    }

    .spinner-ring:nth-child(3) {
      border-bottom-color: #6366f1;
      animation-delay: 0.6s;
      width: 40%;
      height: 40%;
      top: 30%;
      left: 30%;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-text {
      color: #1e293b;
      font-size: 1.1rem;
      font-weight: 500;
      margin: 0;
      text-align: center;
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .loading-dots {
      display: flex;
      gap: 8px;
    }

    .dot {
      width: 8px;
      height: 8px;
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      border-radius: 50%;
      animation: bounce 1.4s ease-in-out infinite both;
    }

    .dot:nth-child(1) { animation-delay: -0.32s; }
    .dot:nth-child(2) { animation-delay: -0.16s; }
    .dot:nth-child(3) { animation-delay: 0s; }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      40% {
        transform: scale(1.2);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .loading-container {
        padding: 40px 20px;
      }

      .custom-spinner {
        width: 60px;
        height: 60px;
      }

      .loading-text {
        font-size: 1rem;
      }
    }
  `]
})
export class LoadingSpinnerComponent {}