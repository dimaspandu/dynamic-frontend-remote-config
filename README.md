# Dynamic Frontend Remote Config

This project is a **Next.js 15** application designed to demonstrate **dynamic frontend remote configuration**.  
Instead of hardcoding configuration values, the app fetches a JSON config file from an object storage (e.g. Google Cloud Storage, AWS S3, etc.) at runtime.  

## Features
- Built with **Next.js 15 + React 19**  
- Remote configuration served via **object storage** or **CDN**  
- Development mode generates local `remote-config.json` for testing  
- Supports **JWT-based authentication helpers** (`jwt-decode`, `jwt-encode`)  
- Docker-ready for production deployments  

## Development

Generate a local remote config file and start the dev server:

```bash
npm run dev
```

This will run `scripts/generate-remote-config.mjs` and place the result inside `/public`.  
Then you can open [http://localhost:3000](http://localhost:3000).  

## Production Build

Production build does **not** generate a remote config automatically.  
The file must be uploaded manually to object storage, and the app will read from the URL provided in the environment variables.

```bash
npm run build
npm start
```

Or with Docker:

```bash
docker build -t dynamic-frontend-remote-config .
docker run -p 3000:3000   -e NEXT_PUBLIC_REMOTE_CONFIG_URL="https://storage.googleapis.com/assets/shinra/remote-config.json"   -e NEXT_PUBLIC_REMOTE_CONFIG_KEY="99pL2U76wgj82nhwrDdWNEGQyTDcRy5j"   dynamic-frontend-remote-config
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_REMOTE_CONFIG_URL` | URL to the remote config JSON | `https://storage.googleapis.com/assets/shinra/remote-config.json` |
| `NEXT_PUBLIC_REMOTE_CONFIG_KEY` | API key or shared secret for validation | `99pL2U76wgj82nhwrDdWNEGQyTDcRy5j` |

## Project Structure

```
.
├── app/                  # Next.js App Router
├── public/               # Static assets (local dev config generated here)
├── scripts/              # Utility scripts (e.g. generate-remote-config.mjs)
├── Dockerfile
├── package.json
└── README.md
```

## License

This project is licensed under the [MIT License](./LICENSE).
