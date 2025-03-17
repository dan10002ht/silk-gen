# Thuyen Silk - Inventory Management System

A modern web application for inventory management built with React, Node.js, and PostgreSQL.

## Project Structure

```
/
├── frontend/          # React frontend application
├── backend/          # Node.js backend application
└── docker/           # Docker configuration files
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- Redis (v6 or higher)
- npm or yarn

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/thuyen-silk.git
cd thuyen-silk
```

2. Set up the backend:

```bash
cd backend
yarn install
cp .env.example .env
# Edit .env with your configuration
```

3. Set up the frontend:

```bash
cd frontend
yarn install
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development servers:

Backend:

```bash
cd backend
yarn dev
```

Frontend:

```bash
cd frontend
yarn dev
```

### Docker Setup

1. Build and start all services:

```bash
docker-compose up --build
```

2. Access the applications:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
