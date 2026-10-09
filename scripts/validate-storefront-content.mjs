import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const roots = ["app", "components", "data", "lib"];
const extensions = new Set([".ts", ".tsx", ".json"]);
const blockedPatterns = [
  { label: "placeholder token", pattern: /\[(?:INSERT|TODO|PLACEHOLDER)[^\]]*\]/i },
  { label: "demo merchant identity", pattern: /\bMini Mart\b/i },
  { label: "misspelled offer code", pattern: /WELOCOM10/i },
  { label: "grocery demo copy", pattern: /Online Grocery|super\s*market/i },
];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(filePath));
    else if (extensions.has(path.extname(entry.name))) files.push(filePath);
  }
  return files;
}

const failures = [];
for (const root of roots) {
  for (const file of await collectFiles(root)) {
    const content = await readFile(file, "utf8");
    for (const blocked of blockedPatterns) {
      if (blocked.pattern.test(content)) failures.push(`${file}: ${blocked.label}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Storefront content validation failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Storefront content validation passed.");
