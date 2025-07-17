import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { BlogService } from '../../services/blog.service';
import { CreateBlogRequest } from '../../interfaces/blog.interface';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  template: `
    <div class="create-blog-container">
      <div class="header">
        <h1>Create New Blog Post</h1>
        <p class="subtitle">Share your thoughts and insights with the community</p>
      </div>

      <mat-card class="create-form-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>edit</mat-icon>
            Write Your Blog
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="blogForm" (ngSubmit)="onSubmit()" class="blog-form">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Blog Title</mat-label>
              <input matInput 
                     formControlName="title" 
                     placeholder="Enter an engaging title">
              <mat-error *ngIf="blogForm.get('title')?.hasError('required')">
                Title is required
              </mat-error>
              <mat-error *ngIf="blogForm.get('title')?.hasError('minlength')">
                Title must be at least 5 characters
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Author Name</mat-label>
              <input matInput 
                     formControlName="author" 
                     placeholder="Your name">
              <mat-error *ngIf="blogForm.get('author')?.hasError('required')">
                Author name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Image URL (Optional)</mat-label>
              <input matInput 
                     formControlName="image" 
                     placeholder="https://example.com/image.jpg">
              <mat-hint>Add a cover image for your blog post</mat-hint>
              <mat-error *ngIf="blogForm.get('image')?.hasError('pattern')">
                Please enter a valid URL
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Tags</mat-label>
              <input matInput 
                     formControlName="tagsInput" 
                     placeholder="Enter tags separated by commas (e.g., javascript, web, tutorial)"
                     (keyup.enter)="addTagsFromInput()">
              <mat-hint>Press Enter or use the button to add tags</mat-hint>
            </mat-form-field>

            <div class="tags-section" *ngIf="tags.length > 0">
              <mat-chip-set>
                <mat-chip *ngFor="let tag of tags; let i = index" 
                          (removed)="removeTag(i)">
                  {{ tag }}
                  <button matChipRemove>
                    <mat-icon>cancel</mat-icon>
                  </button>
                </mat-chip>
              </mat-chip-set>
            </div>

            <button type="button" 
                    mat-button 
                    (click)="addTagsFromInput()" 
                    class="add-tags-btn">
              <mat-icon>add</mat-icon>
              Add Tags
            </button>

            <mat-form-field appearance="outline" class="form-field content-field">
              <mat-label>Blog Content</mat-label>
              <textarea matInput 
                        formControlName="content" 
                        rows="12" 
                        placeholder="Write your blog content here...&#10;&#10;You can use multiple paragraphs by pressing Enter twice."></textarea>
              <mat-error *ngIf="blogForm.get('content')?.hasError('required')">
                Content is required
              </mat-error>
              <mat-error *ngIf="blogForm.get('content')?.hasError('minlength')">
                Content must be at least 50 characters
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button type="button" 
                      mat-button 
                      color="warn" 
                      (click)="onCancel()">
                <mat-icon>cancel</mat-icon>
                Cancel
              </button>
              
              <button type="submit" 
                      mat-raised-button 
                      color="primary" 
                      [disabled]="blogForm.invalid || isSubmitting">
                <mat-icon>{{ isSubmitting ? 'hourglass_empty' : 'publish' }}</mat-icon>
                {{ isSubmitting ? 'Publishing...' : 'Publish Blog' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .create-blog-container {
      max-width: 800px;
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

    .create-form-card {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    mat-card-header {
      margin-bottom: 24px;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.5rem;
    }

    .blog-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-field {
      width: 100%;
    }

    .content-field textarea {
      min-height: 200px;
      resize: vertical;
    }

    .tags-section {
      margin: 8px 0;
    }

    .tags-section mat-chip-set {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .add-tags-btn {
      align-self: flex-start;
      margin-bottom: 8px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #eee;
    }

    .form-actions button {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 140px;
    }

    @media (max-width: 768px) {
      .create-blog-container {
        padding: 16px;
      }

      .header h1 {
        font-size: 2rem;
      }

      .form-actions {
        flex-direction: column;
      }

      .form-actions button {
        width: 100%;
      }

      .content-field textarea {
        min-height: 150px;
      }
    }
  `]
})
export class CreateBlogComponent {
  blogForm: FormGroup;
  tags: string[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      author: ['', [Validators.required]],
      image: ['', [Validators.pattern(/^https?:\/\/.+/)]],
      content: ['', [Validators.required, Validators.minLength(50)]],
      tagsInput: ['']
    });
  }

  addTagsFromInput() {
    const tagsInput = this.blogForm.get('tagsInput')?.value;
    if (tagsInput) {
      const newTags = tagsInput.split(',')
        .map((tag: string) => tag.trim().toLowerCase())
        .filter((tag: string) => tag && !this.tags.includes(tag));
      
      this.tags = [...this.tags, ...newTags];
      this.blogForm.patchValue({ tagsInput: '' });
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  onSubmit() {
    if (this.blogForm.valid) {
      this.isSubmitting = true;
      
      const formValue = this.blogForm.value;
      const blogData: CreateBlogRequest = {
        title: formValue.title,
        author: formValue.author,
        content: formValue.content,
        image: formValue.image || undefined,
        tags: this.tags
      };

      this.blogService.createBlog(blogData).subscribe({
        next: (blog) => {
          this.snackBar.open('Blog published successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.router.navigate(['/blog', blog.id]);
        },
        error: (error) => {
          this.snackBar.open('Failed to publish blog. Please try again.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}