# React-shop-cloudfront

This is frontend starter project for nodejs-aws mentoring program. It uses the following technologies:

- [Vite](https://vitejs.dev/) as a project bundler
- [React](https://beta.reactjs.org/) as a frontend framework
- [React-router-dom](https://reactrouterdotcom.fly.dev/) as a routing library
- [MUI](https://mui.com/) as a UI framework
- [React-query](https://react-query-v3.tanstack.com/) as a data fetching library
- [Formik](https://formik.org/) as a form library
- [Yup](https://github.com/jquense/yup) as a validation schema
- [Vitest](https://vitest.dev/) as a test runner
- [MSW](https://mswjs.io/) as an API mocking library
- [Eslint](https://eslint.org/) as a code linting tool
- [Prettier](https://prettier.io/) as a code formatting tool
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool

## Available Scripts

### `start`

Starts the project in dev mode with mocked API on local environment.

### `build`

Builds the project for production in `dist` folder.

### `preview`

Starts the project in production mode on local environment.

### `test`, `test:ui`, `test:coverage`

Runs tests in console, in browser or with coverage.

### `lint`, `prettier`

Runs linting and formatting for all files in `src` folder.

## 🔗 **Application Links**
- **CloudFront URL**: [d38s95h75m6sx4.cloudfront.net](d38s95h75m6sx4.cloudfront.net)
- **S3 Bucket URL**: [http://myshop-app-bucket.s3-website-us-east-1.amazonaws.com/](http://myshop-app-bucket.s3-website-us-east-1.amazonaws.com/) _(Expected 403 Access Denied)_

## 📌 **How to Deploy the App Automatically**
To build and deploy the application using AWS CDK, run the following commands:

```sh
cd cdk
npx cdk deploy
```
### ✅  **How to Run deploy or destroy from the Root Directory?**
## If you don’t want to enter the cdk directory every time, you can run the commands directly from the project root by adding --app:
```sh
npx cdk deploy --app cdk
```
```sh
npx cdk destroy --app cdk
```
-💡 However, it's recommended to navigate into the cdk directory and work from there.

