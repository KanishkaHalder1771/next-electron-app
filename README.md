### Demo Video:

[![Video](https://img.youtube.com/vi/imVerQJUUmg/0.jpg)](https://youtu.be/imVerQJUUmg)

### Setup:

1. `npm install`
2. Run postgresDB using `dockerfile`. Ports: `development:5431`  `prodcution:5430`

---

### Run Commands:

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


----

### Approach:

- Created a nx workspace (nx version latest)
- Created Next.js app (next version 14.1.1)
	- Connected to a PostGres database
		- postgres is built from a dockerfile which creates the necessary tables
	- Created Add page that adds a Item (string data) to the postgres `items` table
	- Create List page that lists items from the `items` table
	- Created a Home page linked to two pages List and Add and also links to a Static Page

- Electron.js:
	- Using nx-electron created a electronjs app with the nextjs app `next-app` as frontend
		```
		// apps\electron-app\src\app\app.ts
		
		private static async loadMainWindow() {
			App.mainWindow.loadURL(
				format({
					pathname: join(__dirname, "..", rendererAppName,
						".next/index.html"),
					protocol: 'file:',
					slashes: true,
				})
			);
		}
		```
		    
	- Ran into issues serving the electron app:
		- `electron-app`  was rendering an empty BrowserWindow
		- checked [nx-electron/executor/pacakge/executor.ts](https://github.com/bennymeg/nx-electron/blob/master/packages/nx-electron/src/executors/package/executor.ts) , added logs to check file directories. nx-electron checks for build files under directory `./dist/app/<frontend_project>/`
		- but my project was being built under `./app/next-app/.next`, hence fixed configuration in `next-app/project.json` to include:
		  ```
				"options": {
					"outputPath": "dist/apps/next-app",
					"debug": false
					}
			```
		- But this did not solve the issue as the output generated  was SSR (server-side rendering) output and nx-electron is configured to build from Static Site Generation (SSG) Build
		- Tried to generate the SSG build by adding `output: "export"` to `nextConfig` object in `next-app/next.config.js`  [doc](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports) (`next export` command has been discontinued in Next 14.0)
		- Generated SSG build and checked the build output. The SSG build output had some issue with paths. Eg:
			- Any `<Link>`  tag with `href="{some_path}"` eg. `href="/list"`
				  had to be changed to `./list` 
			- Also some more changes were required related to paths that can be automated with a script
		- tried serving the electron app, however template code generated from `nx-electron` had some issues with nextjs. `.\apps\electron-app\src\app\app.ts` and `.\apps\electron-app\src\app\constants.ts` generated had some changes:
			- `constants.ts`: changed `rendererAppPort` to `3000` (initially set to `4200`)
			- `app.ts`: updated `loadMainWindow()` function with the proper path to the SSG build `index.html` file 
		- with these changes electron app is being rendered, however methods for db calls are not working in this build
		- This issue was there because the `.html` files had absolute paths to `.js` files which were not able to correctly point to the `.js` files.
		- Resolved this by adding  `assetPrefix: "./",`  line in next.config.js file. This changed the paths to all linked `.js` and `.css` files to relative paths.
		- the Electron app runs all the opearations of the  nextjs frontend app (apis not included)

Electron.js + Next.js Integration:
- To for Electron app to show/modify data we need the Nextjs Api Server running
- The current Electron App makes two calls a `GET` and one `POST` call to the nextjs api
- Created a Nx task pipeline to handle the entire process from building the nextjs app to serve/package the Electron app and parallely run the Nextjs Api Server
-  The command `nx run electron-app:serve-with-next:<configuration>` does the following:
	- exports the Nextjs App (static build)
	- serves Electronjs App
	- builds the Nextjs App (server side rendering build)
	- runs the Nextjs Api Server (from the the SSR build)
- Issue while creating this: 
	- For exporting we need to add `output: 'export'` parameter in next.config.js
	- But for generating SSR build we need the next.config.js without the `output: 'export'` parameter
- Resolved by:
	- To create this conditional logic made use of environment variables. Created a `.export.env` file with contains the `NEXT_PUBLIC_EXPORT` variable which when set to true builds the SSG build and if false generates the SSR build
	- This environment file is passed as parameter in the `next-app:export` command so that it generates the SSG build, and running `next-app:build` would simply generate the SSR build
- Finally similar to the  `nx run electron-app:serve-with-next:<configuration>` command created `electron-app:package-with-next` and `electron-app:make-with-next`  to package and make the electron app + run the nextjs server.
- Used parallel runs of these commands wherever possible

Prod/Dev Environment Configuration:
- Created two configurations `development` and `production` configurations for all commands
- Once the configuration is passed Nx automatically picks up the corresponding .env file according to the logic `.[configuration].env `  
- the .env files contain 2 environment variables as of now:
	- `DATABASE_URL=postgresql://<username>:<password>@<hostname>:<port>/<databaseName>`
	- `NX_NEXT_PUBLIC_API_BASE_URL=http://localhost:<port>/api/`
- Eg. environment files are included in the repo as it doesn't contain any secrets as of yet
- {Suggestion} Might want to separately create a configuration file and environment file to separate out secrets from config variables
