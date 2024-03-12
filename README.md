# Glide - React Admin Panel Starter Template

Glide is a React-based admin panel starter template designed to jump-start the development of your dashboard or admin panel. Built with flexibility and ease of use in mind, it integrates essential features and a scalable architecture.

## Features

- Modular architecture with a focus on readability and maintainability
- Pre-configured with authentication (login, registration, user management)
- Mock API integration for easy development and testing
- Scalable state management using Redux Toolkit
- Customizable UI components and utilities for rapid development

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following tools installed on your system:
- Node.js (version 12 or later)
- npm (usually comes with Node.js)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/iamtalwinder/glide.git
```

2. Navigate to the project directory:
```bash
cd glide
```

3. Install dependencies:
```bash
npm install
```

### Running the Project

To start the development server, run:
```bash
npm start
```
This will launch the project in your default browser at `http://localhost:3000`.

## Project Structure

Here's a brief overview of the key directories within the project:

- `src/@mocks`: Contains mock APIs and data to simulate backend services.
- `src/app`: The core of the application, including authentication, components, services, and utilities.
  - `auth`: Authentication logic and components.
  - `components`: Reusable UI components.
  - `services`: Service layer for handling API calls.
  - `store`: State management setup using Redux Toolkit.
- `src/pages`: Components representing individual pages or routes.
- `src/styles`: Global CSS files and styling resources.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

