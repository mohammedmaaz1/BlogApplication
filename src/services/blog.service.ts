import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { Blog, CreateBlogRequest } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private mockBlogs: Blog[] = [
    {
      id: 1,
      title: 'Getting Started with Angular 17',
      content: `Angular 17 brings exciting new features that make development faster and more efficient. The new application builder provides better performance and smaller bundle sizes. With standalone components becoming the default, we can create more modular applications.

      The new control flow syntax (@if, @for, @switch) makes templates more readable and performant. Server-side rendering has been improved with better hydration support. The new lifecycle hooks and improved change detection make Angular apps more responsive.

      Angular Material has been updated to work seamlessly with the new features. The CLI has been enhanced with better developer experience and faster builds. Angular 17 represents a significant step forward in modern web development.`,
      author: 'John Doe',
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['angular', 'web-development', 'frontend'],
      snippet: 'Angular 17 brings exciting new features that make development faster and more efficient...'
    },
    {
      id: 2,
      title: 'Modern CSS Techniques for 2024',
      content: `CSS has evolved dramatically in recent years. Container queries allow us to create truly responsive components that adapt to their container rather than just the viewport. CSS Grid and Flexbox have become essential tools for modern layouts.

      The new CSS custom properties (variables) enable dynamic theming and better maintainability. Logical properties help create internationalization-friendly designs. The new CSS functions like clamp(), min(), and max() provide more flexible responsive design solutions.

      CSS cascade layers give us better control over specificity and style organization. The new color functions and spaces provide better color management. With these modern techniques, we can create more maintainable and performant stylesheets.`,
      author: 'Jane Smith',
      date: '2024-01-10',
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['css', 'web-design', 'responsive'],
      snippet: 'CSS has evolved dramatically in recent years. Container queries allow us to create truly responsive components...'
    },
    {
      id: 3,
      title: 'TypeScript Best Practices',
      content: `TypeScript has become the standard for large-scale JavaScript applications. Strong typing helps catch errors at compile time and improves code quality. Generic types enable flexible, reusable components while maintaining type safety.

      Union types and intersection types provide powerful ways to model complex data structures. The strict compiler options help enforce best practices and catch potential runtime errors. Utility types like Partial, Required, and Pick make working with existing types more efficient.

      Advanced features like conditional types, mapped types, and template literal types enable sophisticated type manipulations. The integration with modern IDEs provides excellent autocomplete and refactoring capabilities.`,
      author: 'Mike Johnson',
      date: '2024-01-05',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['typescript', 'javascript', 'programming'],
      snippet: 'TypeScript has become the standard for large-scale JavaScript applications. Strong typing helps catch errors...'
    },
    {
      id: 4,
      title: 'Responsive Web Design Fundamentals',
      content: `Responsive web design is essential in today's multi-device world. Mobile-first design ensures optimal performance on all devices. Flexible grids and layouts adapt to different screen sizes seamlessly.

      Media queries allow us to create breakpoints for different device categories. Flexible images and media prevent layout breaking on smaller screens. Touch-friendly navigation and interactions improve mobile user experience.

      Performance optimization is crucial for mobile devices with limited bandwidth. Progressive enhancement ensures basic functionality works on all devices. Testing across multiple devices and browsers is essential for quality assurance.`,
      author: 'Sarah Wilson',
      date: '2024-01-01',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['responsive', 'web-design', 'mobile'],
      snippet: 'Responsive web design is essential in today\'s multi-device world. Mobile-first design ensures optimal performance...'
    },
    {
      id: 5,
      title: 'Angular Material Design System',
      content: `Angular Material provides a comprehensive set of UI components following Material Design principles. The component library includes buttons, forms, navigation, and complex data displays. Theming system allows customization while maintaining consistency.

      Accessibility is built into all components with proper ARIA attributes and keyboard navigation. The CDK (Component Dev Kit) provides lower-level building blocks for custom components. Responsive breakpoints are integrated throughout the system.

      The design tokens system ensures consistent spacing, typography, and colors. Animation and transitions are included to provide smooth user interactions. The library is well-documented with examples and best practices.`,
      author: 'Alex Brown',
      date: '2023-12-28',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['angular-material', 'ui-design', 'components'],
      snippet: 'Angular Material provides a comprehensive set of UI components following Material Design principles...'
    }
  ];

  constructor() {
    // Load blogs from localStorage if available
    const savedBlogs = localStorage.getItem('blogs');
    if (savedBlogs) {
      this.mockBlogs = JSON.parse(savedBlogs);
    }
  }

  getAllBlogs(): Observable<Blog[]> {
    // Simulate API call with delay
    return of(this.mockBlogs).pipe(delay(800));
  }

  getBlogById(id: number): Observable<Blog> {
    const blog = this.mockBlogs.find(b => b.id === id);
    if (blog) {
      return of(blog).pipe(delay(500));
    }
    return throwError(() => new Error('Blog not found'));
  }

  createBlog(blogData: CreateBlogRequest): Observable<Blog> {
    const newBlog: Blog = {
      id: Math.max(...this.mockBlogs.map(b => b.id)) + 1,
      ...blogData,
      date: new Date().toISOString().split('T')[0],
      snippet: blogData.content.substring(0, 150) + '...'
    };

    this.mockBlogs.unshift(newBlog);
    this.saveBlogsToStorage();
    
    return of(newBlog).pipe(delay(500));
  }

  searchBlogs(query: string): Observable<Blog[]> {
    const filteredBlogs = this.mockBlogs.filter(blog => 
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    return of(filteredBlogs).pipe(delay(300));
  }

  private saveBlogsToStorage(): void {
    localStorage.setItem('blogs', JSON.stringify(this.mockBlogs));
  }
}