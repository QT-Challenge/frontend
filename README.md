# User Management Frontend

A modern, clean web application built with Next.js and Tailwind CSS for managing users with cryptographic email verification.

## Features

- **User Management**: Create, read, update, and delete users
- **Analytics Chart**: Visual chart showing users created per day over the last 7 days
- **Email Verification**: View detailed cryptographic verification information for each user
- **Protobuf Export**: Export user data in Protocol Buffer format
- **Real-time Updates**: Refresh user list on demand
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Simple, modern interface without gradients or eye-straining colors

## Tech Stack

- **Next.js 15.5.6**: React framework with App Router
- **React 19.1.0**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Utility-first CSS framework
- **Recharts**: Modern charting library for React
- **API Integration**: RESTful API client

## Getting Started

### Prerequisites

- Node.js 20+ installed
- Backend API running on port 3001

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure the API URL (optional):
   - Default: `http://localhost:3001`
   - To change, edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://your-api-url:3001
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Main page with user management
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── UserTable.tsx    # User list table
│   │   ├── UserModal.tsx    # Create/Edit user modal
│   │   ├── VerificationModal.tsx  # Email verification details
│   │   └── UserChart.tsx    # Users created per day chart
│   ├── lib/
│   │   └── api.ts           # API client
│   └── types/
│       └── user.ts          # TypeScript types
├── .env.local               # Environment variables
└── package.json
```

## API Endpoints Used

- `GET /api/users` - List all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/verify-email` - Verify email signature
- `GET /api/users/export` - Export users as Protobuf

## Design Principles

- **Simple & Modern**: Clean interface with proper spacing and hierarchy
- **No Gradients**: Solid colors for a professional look
- **Readable**: Comfortable font sizes (not too big)
- **Accessible**: Good contrast ratios and semantic HTML
- **Responsive**: Mobile-first approach with Tailwind utilities

## Color Palette

- **Primary**: Blue (#3B82F6) - Actions and links
- **Success**: Green (#10B981) - Active status, verified
- **Warning**: Red (#EF4444) - Delete actions, errors
- **Neutral**: Gray scale - Backgrounds, borders, text
- **Accent**: Purple (#A855F7) - Admin role badge

## User Actions

1. **Create User**: Click "Create New User" button
2. **Edit User**: Click "Edit" in the user row
3. **Delete User**: Click "Delete" (requires confirmation)
4. **Verify Email**: Click "Verify" to see cryptographic details
5. **Export Data**: Click "Export as Protobuf" to download
6. **Refresh**: Click "Refresh" to reload the user list
