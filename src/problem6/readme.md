# Score Tracking API Module

## Overview

This module handles user score management with real-time updates to a leaderboard. It includes robust authentication mechanisms to prevent unauthorized score modifications while providing fast access to current rankings.

## Features

- Secure user authentication
- Score update validation
- Real-time leaderboard updates via WebSockets
- Rate limiting to prevent abuse
- Caching for optimized read performance
- Comprehensive logging and monitoring

## Architecture

The module follows a layered architecture:

1. API Routes Layer - Handles HTTP requests and WebSocket connections
2. Authentication Layer - Validates user identity and permissions
3. Business Logic Layer - Processes score updates and manages ranking calculations
4. Data Access Layer - Interacts with the database
5. Events Layer - Manages real-time notifications

## API Endpoints

### Authentication

- `POST /auth/login` - Authenticates a user and returns a JWT token
- `POST /auth/refresh` - Refreshes an existing valid JWT token

### Score Management

- `POST /scores/update` - Updates a user's score (requires authentication)
- `GET /scores/leaderboard` - Retrieves the current top 10 leaderboard

### WebSocket

- `/ws/leaderboard` - Provides real-time leaderboard updates

## Data Models

### User

```
{
  id: string,
  username: string,
  email: string,
  encryptedPassword: string,
  lastLogin: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Score

```
{
  userId: string,
  score: number,
  lastUpdated: timestamp
}
```

### Leaderboard Entry

```
{
  rank: number,
  userId: string,
  username: string,
  score: number
}
```

## Authentication Flow

1. Client authenticates via `/auth/login` and receives a JWT
2. JWT must be included in Authorization header for authenticated endpoints
3. Tokens expire after 1 hour; clients can refresh using `/auth/refresh`
4. Score update requests are verified against the authenticated user

## Score Update Flow

1. Client performs an action that increases score
2. Client sends authenticated request to `/scores/update`
3. Server validates request authenticity
4. Server updates the user's score
5. Server recalculates leaderboard positions if needed
6. WebSocket broadcasts updated leaderboard to all connected clients

## Real-Time Updates

- WebSocket connection established by client with server
- Server pushes leaderboard updates whenever changes occur
- Updates sent in JSON format matching the Leaderboard Entry model
- Clients maintain local state and update UI when new data is received

## Security Considerations

- All endpoints must use HTTPS
- Score update requests must include valid JWT with matching user ID
- Rate limiting prevents brute force attacks (max 100 requests per minute per IP)
- Score updates are validated based on action type and expected score increment
- WebSocket connections require initial authentication

## Performance Considerations

- Leaderboard is cached with 10-second TTL for read-heavy operations
- Database uses indexes on score field for efficient leaderboard generation
- WebSocket updates use efficient binary protocol where supported

## Monitoring and Logging

- All score updates logged with timestamp, user ID, previous score, and new score
- Failed authentication attempts logged with IP address
- Performance metrics tracked for all endpoints
- Automatic alerts for suspicious activity patterns

## Error Handling

- Consistent error response format for all API endpoints
- Appropriate HTTP status codes (400 for client errors, 500 for server errors)
- Detailed error messages for developers in non-production environments
- Generic error messages in production to avoid information leakage

## Dependencies

- Database: PostgreSQL for persistent storage
- Cache: Redis for leaderboard caching
- Authentication: JWT library for token management
- WebSockets: Socket.IO for real-time communication
- Logging: Winston for structured logging

## Getting Started

1. Install dependencies: `npm install`
2. Configure environment variables (see `.env.example`)
3. Start development server: `npm run dev`
4. Run tests: `npm test`

## Environment Variables

- `PORT` - API server port (default: 5000)
- `DATABASE_URL` - MongoDB connection string

## Next Steps and Future Improvements

- Implement multi-region support for global leaderboards
- Add support for multiple leaderboards based on game modes or seasons
- Enhance analytics to detect suspicious score patterns
- Implement GraphQL API alongside REST endpoints
