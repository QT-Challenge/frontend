# User Management Frontend

A modern web application built with Next.js and Tailwind CSS for managing users with cryptographic email verification.

## 🚀 Live Demo

**Frontend:** [http://54.83.124.107/](http://54.83.124.107/)
**Backend API:** [http://34.236.150.134:3001/](http://34.236.150.134:3001/)

## Features

- **User Management** - Create, read, update, and delete users
- **Toast Notifications** - Real-time feedback for all user actions
- **Analytics Dashboard** - Visual chart showing user creation trends
- **Email Verification** - View cryptographic verification details
- **Protobuf Export** - Download user data in Protocol Buffer format
- **Pagination** - Efficient navigation through large datasets
- **Responsive Design** - Works seamlessly on all devices

## Tech Stack

- **Framework:** Next.js 15.5.6
- **UI Library:** React 19.1.0
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Charts:** Recharts 3.3.0
- **Notifications:** React Hot Toast 2.6.0
- **Icons:** Lucide React

## Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local
```

Edit `.env.local` and set your backend API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with toast provider
│   │   ├── page.tsx             # Main dashboard
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── UserTable.tsx        # User list table
│   │   ├── UserModal.tsx        # Create/Edit modal
│   │   ├── UserChart.tsx        # Analytics chart
│   │   ├── VerificationModal.tsx # Email verification details
│   │   ├── DeleteConfirmModal.tsx # Delete confirmation
│   │   └── Pagination.tsx       # Pagination controls
│   ├── lib/
│   │   ├── api.ts               # API client
│   │   └── toast.ts             # Toast utilities
│   └── types/
│       └── user.ts              # TypeScript interfaces
```

## API Integration

The frontend communicates with the backend API using the following endpoints:

- `GET /api/users?page=1&limit=10` - Paginated user list
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/verify-email` - Email verification
- `GET /api/users/export` - Export to Protobuf

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001` |

## Features in Detail

### User Management
- Create users with email, role (admin/user), and status (active/inactive)
- Edit existing user information
- Delete users with confirmation dialog
- Real-time validation and error handling

### Dashboard
- User statistics cards (Total, Active, Admins, Inactive)
- 7-day user creation trend chart
- Paginated user table
- Search and filter capabilities

### Email Verification
- Cryptographic verification status
- SHA-384 hash display
- RSA-2048 digital signature
- Audit trail for email modifications

### Notifications
- Success notifications for create/update/delete operations
- Error messages with detailed feedback
- Loading states for async operations
- Auto-dismissing toast messages

## Color Scheme

- **Primary Blue:** Actions and links
- **Success Green:** Verified status, successful operations
- **Error Red:** Delete actions, validation errors
- **Purple:** Admin role badges
- **Neutral Grays:** Backgrounds, borders, text

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
