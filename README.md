# Extension Quick Start Template

This template is designed to provide a fast start for developers looking to create browser extensions. It is based on our previous extensions, highlighting best practices for rapid development.

## Getting Started

1. **Create new repo using this template via Github/ or download latest commit zip**

2. **Clone newly created repo**

3. **Create Your Extension**
   You can either create a new extension within this template or move necessary files from another donor project.

4. **Adjust template**
   Delete unnecessary code and uncomment the necessary one.

## Main Commands

- `npm i`: Install all the dependencies required for the project.
- `npm run dev`: Start the development server.
- `npm run build`: Build the `dist` folder which will be used as the final project.
- `npm run preview`: Preview the built version of the project.

## Project Structure

- `/_locales`: Contains translations.
- `/node_modules`: Contains all the npm packages required for the project.
- `/src`: This directory should contain all the source files for the extension (icons, styles, scripts, etc. **Exceptions: index.html, manifest.json, /\_locales**).
- `index`: The entry point for the extension.
- `manifest`: The declaration file for the extension.
- `package-lock`: Locks the versions of the dependencies.
- `package`: Declares the project's dependencies.
- `Readme`: The wiki for the project.
- `vite.config.js`: Configuration file for Vite.

## Tools Used

- [Vite](https://vitejs.dev/guide/#index-html-and-project-root): Utilized for compiling the project.
- [Extension plugin for Vite](https://crxjs.dev/vite-plugin/getting-started/vanilla-js/create-project): A Vite plugin designed for compiling extensions.

## Tips

- For rapid development, consider using [Bootstrap](https://getbootstrap.com/) or a similar framework to quickly style your extension.

## Useful links

https://developer.chrome.com/docs/extensions/reference/manifest#side-panel
