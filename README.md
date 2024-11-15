# Create Root App

An opinionated CLI for bootstrapping a React application with essential tools and structure for modern web development. With `create-root-app`, you can set up a React project with a strong foundation, leveraging best practices and streamlined tooling.

## Features

- **Environment Setup**: Choose between `CRA` (Vite support coming soon) to kickstart your React environment.
- **TypeScript**: For creating type-safe applications, ensuring better tooling, and reducing runtime errors.
- **TailwindCSS**: A utility-first CSS framework that allows rapid UI development with a streamlined approach to styling.
- **Recoil**: For state management, providing a lightweight and flexible solution (planned switch to Zustand in the future).
- **Axios**: For simplifying API requests with a customizable fetch client.
- **React Query**: Enhances data fetching and caching, minimizes redundant requests, and simplifies asynchronous operations in React.
- **React Router**: Handles routing and navigation efficiently, making it easy to build multi-page applications.

Alongside these, `create-root-app` includes a recommended structure for building scalable applications.

## Getting Started

### 1. Install `create-root-app` Globally

```bash
npm install -g create-root-app
```

### 2. Initialize a New Project

Use the following command to create a new React app:

```bash
create-root-app init [app-name]
```

Replace `[app-name]` with your desired project name. After running this command, select a template to start with. 

## Documentation & Resources

For more in-depth guidance on the tools and patterns used in `create-root-app`, refer to the following resources:

- **[React Documentation](https://reactjs.org/docs/getting-started.html)**
- **[TypeScript Documentation](https://www.typescriptlang.org/docs/)**
- **[TailwindCSS Documentation](https://tailwindcss.com/docs)**
- **[Recoil Documentation](https://recoiljs.org/docs/introduction/getting-started)**
- **[Axios Documentation](https://axios-http.com/docs/intro)**
- **[React Query Documentation](https://tanstack.com/query/v4)**
- **[React Router Documentation](https://reactrouter.com/en/main)**

## Future Plans

- **Vite Support**: A Vite-based template option will be added soon for faster builds and optimized development workflows.
- **State Management**: Planned replacement of Recoil with Zustand for a more flexible and powerful state management solution.

## Contributing

We welcome contributions to improve `create-root-app`. If you have suggestions or find issues, feel free to open a pull request or file an issue.
