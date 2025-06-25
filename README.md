# Cogito Log

A simple, secure blog management application built with Next.js 15, Supabase, and TypeScript. Cogito Log allows users to create, read, update, and delete their personal blog posts with a clean, modern interface.

## 🚀 Features

- **User Authentication**: Secure sign-up and sign-in functionality
- **Blog Management**: Create, edit, and delete blog posts
- **Pagination**: Browse blogs with pagination (5 posts per page)
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Real-time Updates**: Automatic page revalidation after CRUD operations
- **Form Validation**: Client and server-side validation using Zod schemas
- **Toast Notifications**: User feedback for actions using Sonner

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Notifications**: Sonner
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+
- npm or yarn or bun
- Supabase account and project

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd cogito-log
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**

   Create the following table in your Supabase database:

   ```sql
   create table public.blogs (
     blog_id bigint primary key generated always as identity,
     title text not null,
     content text not null,
     user_uuid uuid references auth.users(id) on delete cascade,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Enable Row Level Security
   alter table public.blogs enable row level security;

   -- Create policies
   create policy "Users can view their own blogs" on public.blogs
     for select using (auth.uid() = user_uuid);

   create policy "Users can insert their own blogs" on public.blogs
     for insert with check (auth.uid() = user_uuid);

   create policy "Users can update their own blogs" on public.blogs
     for update using (auth.uid() = user_uuid);

   create policy "Users can delete their own blogs" on public.blogs
     for delete using (auth.uid() = user_uuid);
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
cogito-log/
├── actions/                 # Server actions
│   ├── auth.ts             # Authentication actions
│   ├── blogs.ts            # Blog CRUD actions
│   └── index.ts            # Action exports
├── app/                    # App Router pages
│   ├── home/               # Home page and blog routes
│   │   ├── [id]/
│   │   │   └── edit/       # Edit blog page
│   │   ├── create/         # Create blog page (unused)
│   │   └── page.tsx        # Home page with blog list
│   ├── signin/             # Sign-in page
│   ├── signup/             # Sign-up page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # React components
│   ├── atoms/              # Small reusable components
│   ├── organisms/          # Complex components
│   └── ui/                 # UI component library
├── schemas/                # Zod validation schemas
├── utils/                  # Utility functions
│   └── supabase/           # Supabase client configurations
└── lib/                    # Shared utilities
```

## 🔄 Application Flow

### Authentication Flow

1. **Landing Page** (`/`) → Directs to sign-in
2. **Sign Up** (`/signup`) → User creates account → Email verification (if enabled)
3. **Sign In** (`/signin`) → User authenticates → Redirects to `/home`
4. **Sign Out** → Clears session → Redirects to `/signin`

### Blog Management Flow

1. **Home Page** (`/home`) → Shows paginated blog list + create form
2. **Create Blog** → Form submission → Server action → Database insert → Page revalidation
3. **Edit Blog** (`/home/[id]/edit`) → Pre-filled form → Update action → Database update
4. **Delete Blog** → Confirmation → Delete action → Database removal → Page revalidation

### Pagination Flow

1. User navigates to `/home?page=2`
2. Server fetches blogs for page 2 (offset: 5, limit: 5)
3. Server fetches total blog count for pagination UI
4. Client renders pagination controls based on current page and total pages

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Server-side Validation**: All inputs validated on the server
- **Authentication Required**: All blog operations require authentication
- **CSRF Protection**: Built-in Next.js CSRF protection
- **SQL Injection Prevention**: Supabase's query builder prevents SQL injection

## ⚠️ Current Limitations

### Functional Limitations

1. **No Rich Text Editor**: Only plain text content editing
2. **No Image Upload**: Cannot attach images to blog posts
3. **No Categories/Tags**: No organization system for blogs
4. **No Search**: Cannot search through blog posts
5. **No Draft System**: Posts are immediately published
6. **No Comments**: No commenting system
7. **Single User Focus**: No multi-user features or blog sharing
8. **No SEO Optimization**: Missing meta tags, structured data
9. **No Blog Analytics**: No view counts or engagement metrics
10. **Limited Text Formatting**: No markdown or HTML support

### Technical Limitations

1. **No Error Boundaries**: Unhandled errors could crash the app
2. **No Loading States**: Some actions lack loading indicators
3. **Limited Accessibility**: Not fully WCAG compliant
4. **No Offline Support**: Requires internet connection
5. **No Rate Limiting**: No protection against spam or abuse
6. **Simple Pagination**: No advanced pagination (jump to page, etc.)
7. **No Caching Strategy**: Limited optimization for repeat visits
8. **No Email Verification Flow**: Users can sign up without email verification
9. **No Password Reset**: No forgot password functionality
10. **No Session Management**: Basic session handling

### Scalability Limitations

1. **No CDN Integration**: Static assets served from single origin
2. **No Database Optimization**: No indexes beyond primary keys
3. **No Monitoring**: No error tracking or performance monitoring
4. **No Backup Strategy**: Relies on Supabase's backup system
5. **No Environment Configuration**: Limited environment-specific settings

## 🚀 Potential Improvements

### Short-term Enhancements

- Add loading spinners and skeletons
- Implement proper error boundaries
- Add email verification flow
- Improve accessibility (ARIA labels, keyboard navigation)
- Add confirmation dialogs for destructive actions

### Medium-term Features

- Rich text editor (TinyMCE, Quill, or Tiptap)
- Image upload and management
- Blog categories and tags
- Search functionality
- Draft system
- SEO optimization

### Long-term Features

- Multi-user support
- Blog sharing and permissions
- Comment system
- Analytics dashboard
- Mobile app
- API endpoints for third-party integrations

## 🧪 Testing

Currently, the application lacks automated tests. Consider adding:

- Unit tests for server actions
- Integration tests for API routes
- E2E tests for critical user flows
- Component testing for UI elements

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for educational/personal use. Modify the license as needed for your use case.

## 🆘 Support

For issues and questions:

1. Check existing GitHub issues
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---

Built with ❤️ using Next.js and Supabase
