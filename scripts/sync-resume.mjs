import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const RESUME_REPO = path.resolve(ROOT, "..", "resume");

const YAML_SRC = path.join(RESUME_REPO, "resume.yaml");
const JSON_DEST = path.join(ROOT, "src", "data", "resume.json");
const PDF_SRC_DIR = path.join(RESUME_REPO, "dist");
const PDF_DEST = path.join(ROOT, "public_html", "PatrickGatewoodResume.pdf");

async function sync() {
  console.log("🔄 Syncing resume data...");

  if (!fs.existsSync(RESUME_REPO)) {
    console.error(`❌ Resume repository not found at ${RESUME_REPO}`);
    process.exit(1);
  }

  // 1. Sync YAML to JSON
  if (fs.existsSync(YAML_SRC)) {
    const data = yaml.load(fs.readFileSync(YAML_SRC, "utf8"));
    fs.mkdirSync(path.dirname(JSON_DEST), { recursive: true });
    fs.writeFileSync(JSON_DEST, JSON.stringify(data, null, 2), "utf8");
    console.log(`✅ Resume data synced to ${JSON_DEST}`);
  } else {
    console.error(`❌ resume.yaml not found at ${YAML_SRC}`);
  }

  // 2. Sync PDF
  // Look for the most recent PDF in the dist folder or the stable one in root
  let pdfSource = path.join(RESUME_REPO, "PatrickGatewoodResume.pdf");
  
  if (!fs.existsSync(pdfSource)) {
    const files = fs.readdirSync(PDF_SRC_DIR).filter(f => f.endsWith(".pdf"));
    if (files.length > 0) {
      // Sort by name (PatrickGatewoodResume-YYYY.pdf) and get the latest
      files.sort().reverse();
      pdfSource = path.join(PDF_SRC_DIR, files[0]);
    }
  }

  if (fs.existsSync(pdfSource)) {
    fs.mkdirSync(path.dirname(PDF_DEST), { recursive: true });
    fs.copyFileSync(pdfSource, PDF_DEST);
    console.log(`✅ PDF copied to ${PDF_DEST}`);
  } else {
    console.warn(`⚠️ No PDF found in ${RESUME_REPO}. Skipping PDF sync.`);
  }

  console.log("✨ Sync complete!");
}

sync().catch(err => {
  console.error("❌ Sync failed:", err);
  process.exit(1);
});
