Setup:

1. `npm install`
2. Run postgresDB using `dockerfile`. Ports: `development:5431`  `prodcution:5430`



To Run Electron-App in development mode:
(Exports Nextjs App -> Runs Nextjs API Server -> Serves Electronjs App)
```
npx nx run electron-app:serve-with-next:development
```

To Run Electron-App in production mode:
(Exports Nextjs App -> Runs Nextjs API Server -> Serves Electronjs App)
```
npx nx run electron-app:serve-with-next:production
```