// This script generates a remote-config.json file from remoteConfigSources
// and saves it under /public/storage for fallback or public access in the frontend.
// It is intended to be used in development or as part of the build process.

import fs from 'fs';
import path from 'path';
import remoteConfigSources from '../src/constants/remoteConfigSources/index.mjs';
import { fileURLToPath } from 'url';

// ====== Determine current file and directory ======
// Since this is an ES module, __filename and __dirname are not available by default.
// Use fileURLToPath to get the current file path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ====== Define output directory and file path ======
// The generated JSON file will be placed under /public/storage
const outputDir = path.join(__dirname, '../public/storage');
const outputFile = path.join(outputDir, 'remote-config.json');

// ====== Ensure output directory exists ======
// If the directory does not exist, create it recursively
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ====== Write remote config to JSON file ======
// Convert the imported remoteConfigSources object to a formatted JSON string
fs.writeFileSync(outputFile, JSON.stringify(remoteConfigSources, null, 2));

// ====== Log success message ======
console.log(
  '[generate-remote-config] remote-config.json successfully created at:',
  outputFile
);
