# Sports Predictions Platform

## Overview

This is a professional sports predictions platform called "Yogesh Sports" built with React and Express.js. The application provides AI-powered sports predictions with real-time data, featuring live scores, game statistics, and comprehensive team/player analytics across multiple sports including cricket, football, basketball, tennis, and soccer. The platform displays all schedules in Nepal timezone (NPT) and includes comprehensive prediction algorithms based on team form, injuries, head-to-head records, and weather conditions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **API Pattern**: RESTful API with structured error handling
- **Session Management**: PostgreSQL sessions with connect-pg-simple

### Project Structure
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript types and database schema
- `migrations/` - Database migration files

## Key Components

### Database Schema (shared/schema.ts)
- **Sports**: Core sports information (name, shortName, color, isActive)
- **Teams**: Team details with sport associations, rankings, and countries
- **Games**: Match information with scores, status, venue, and weather data
- **Predictions**: AI-generated predictions with confidence scores and factors
- **Team Stats**: Performance statistics for teams
- **Player Stats**: Individual player performance data
- **Live Scores**: Real-time game score updates

### API Services
- **Data Service**: Handles periodic live score updates and data synchronization
- **Prediction Service**: Generates AI-powered predictions using team statistics, form, injuries, and other factors
- **Storage Layer**: Abstracted database operations with TypeScript interfaces

### Frontend Components
- **Game Cards**: Interactive game display with predictions and confidence levels
- **Live Scores Ticker**: Real-time score updates across all sports
- **Game Statistics**: Detailed team and player performance analytics
- **Responsive Layout**: Mobile-first design with header/footer navigation

## Data Flow

1. **Real-time Updates**: Live scores update every 30 seconds via polling
2. **Prediction Generation**: AI predictions calculated using multiple factors (team form, head-to-head, injuries, home advantage, weather)
3. **Data Persistence**: All data stored in PostgreSQL with Drizzle ORM
4. **Client Updates**: React Query manages cache invalidation and real-time updates
5. **Nepal Time Zone**: All timestamps displayed in Asia/Kathmandu timezone

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL with Drizzle ORM
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS with PostCSS
- **Date Handling**: date-fns for time formatting
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React icons

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Server-side bundling for production
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Development
- **Server**: `tsx` for TypeScript execution with hot reloading
- **Client**: Vite dev server with HMR
- **Database**: Drizzle migrations via `db:push` command

### Production
- **Build Process**: 
  1. Vite builds React app to `dist/public`
  2. ESBuild bundles server code to `dist/index.js`
- **Deployment**: Single Node.js process serving both API and static files
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Key Features
- **Live Predictions**: Real-time confidence scoring (0-100%)
- **Multi-Sport Support**: Cricket, Football, Basketball, Tennis, Soccer
- **Responsive Design**: Mobile-optimized interface
- **Performance**: Optimized queries and caching strategies
- **Type Safety**: End-to-end TypeScript implementation
- **Nepal Timezone**: All schedules displayed in Asia/Kathmandu timezone
- **Comprehensive Analytics**: Team statistics, player injury data, and weather factors

### Recent Changes (July 17, 2025)
- Successfully built complete sports prediction platform "Yogesh Sports"
- Added comprehensive sample data for all sports (cricket, football, basketball, tennis, soccer)
- Implemented proper game filtering by sport across all sections
- Fixed TypeScript errors and data structure issues
- Added multiple games per sport to ensure proper functionality
- Verified all navigation and prediction features are working correctly

The application follows modern full-stack development practices with clear separation of concerns, comprehensive error handling, and a focus on real-time user experience.