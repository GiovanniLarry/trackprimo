# Package Tracking Application

## Overview

This is a full-stack package tracking application built with React frontend and Express backend. The application allows customers to track their packages by entering a package ID, and provides an admin dashboard for managing package data. The system features a FedEx-inspired design with real-time package status tracking, WhatsApp integration for customer support, and comprehensive package management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with dedicated pages for home, contact, admin login, and admin dashboard
- **State Management**: TanStack Query (React Query) for server state management and API data fetching
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Framework**: Express.js server with TypeScript
- **API Design**: RESTful API endpoints for package management and admin authentication
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Request Handling**: JSON middleware for parsing requests with comprehensive error handling
- **Development Setup**: Vite integration for hot module replacement and development server

### Database Schema
- **Users Table**: ID, username, password fields for admin authentication
- **Packages Table**: Comprehensive package tracking with fields for ID, status, sender/recipient information, addresses, weight, shipping dates, description, and notes
- **Drizzle ORM**: Type-safe database operations with Zod schema validation
- **PostgreSQL**: Configured for production with Neon Database serverless integration

### Authentication & Authorization
- **Admin Authentication**: Hardcoded credentials (kitio123/kitio000) with session-based storage
- **Session Management**: Browser sessionStorage for maintaining admin login state
- **Route Protection**: Client-side authentication checks for admin dashboard access
- **Public Access**: Package lookup available without authentication

### API Endpoints
- **POST /api/admin/login**: Admin authentication with credential validation
- **GET /api/packages**: Retrieve all packages (admin only)
- **GET /api/packages/:id**: Public package lookup by ID
- **Package Management**: CRUD operations for package creation, updates, and deletion

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL database for production deployment
- **Drizzle ORM**: Type-safe database queries with automatic migration support
- **Drizzle Kit**: Database migration and schema management tools

### UI & Design System
- **Shadcn/ui**: Pre-built accessible React components
- **Radix UI**: Headless UI component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe CSS class management

### Form & Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### Development & Build Tools
- **Vite**: Fast build tool with Hot Module Replacement
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment optimizations and error overlay

### Third-Party Integrations
- **WhatsApp Business**: Direct messaging integration for customer support
- **Google Fonts**: Custom typography with Inter, DM Sans, and other font families
- **Date-fns**: Date manipulation and formatting utilities