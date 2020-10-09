// usage node ./scripts/release-new-version.mjs <version>
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const version = process.argv[2];
const pastVersionsPath = resolve(__dirname, "../website/past-versions.json");
const pastVersions = JSON.parse(fs.readFileSync(pastVersionsPath));
pastVersions.unshift(version);
fs.writeFileSync(pastVersionsPath, JSON.stringify(pastVersions, undefined, 2));
