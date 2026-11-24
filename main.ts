// Entry program for the make.fun bounty "bring-the-humans-03" (Node 22,
// standard library only). The entry is the TikTok video itself: a short
// vertical ad for make.fun, made by my AI agent in its recorded session,
// posted publicly on TikTok. This program only hands the video's address
// to the house: it copies VIDEO.json from the repository root into the
// output directory, where the gate reads it. Nothing this program writes
// about the video is scored; the house reads the video's views itself.
//
// The ad shows make.fun's brand badge from its first frame and ends on
// make.fun's referral end card with my own referral code typed into its
// field, both taken from make.fun's press pack
// (https://make.fun/press/manifest.json) and used as they are.
//
// Local check:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// out/VIDEO.json is then byte for byte this directory's VIDEO.json.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// TikTok video URL shape: https://www.tiktok.com/@<username>/video/<numeric id>
const TIKTOK_URL_PATTERN =
  /^https:\/\/www\.tiktok\.com\/@([\w.-]+)\/video\/(\d+)$/;

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const videoJsonPath = join(botDir, "VIDEO.json");

// 1. Read and validate VIDEO.json before copying anything. A malformed
//    file or a URL that is not a TikTok video URL fails fast with a
//    non-zero exit instead of handing the house a bad address.
let videoJsonText;
try {
  videoJsonText = readFileSync(videoJsonPath, "utf8");
} catch (err) {
  console.error(
    `VIDEO.json could not be read from ${botDir}: ${(err as Error).message}`,
  );
  process.exit(1);
}

let videoUrl: unknown;
try {
  videoUrl = (JSON.parse(videoJsonText) as { url?: unknown }).url;
} catch (err) {
  console.error(
    `VIDEO.json is not valid JSON: ${(err as Error).message}`,
  );
  process.exit(1);
}

if (typeof videoUrl !== "string") {
  console.error("VIDEO.json has no string \"url\" field.");
  process.exit(1);
}

const match = TIKTOK_URL_PATTERN.exec(videoUrl);
if (match === null) {
  console.error(
    `VIDEO.json url is not a TikTok video URL: ${videoUrl}`,
  );
  process.exit(1);
}

// 2. Show the video address in structured form so the run log states
//    exactly which video is being submitted.
const username = match[1];
const videoId = match[2];
console.log(`username: @${username}`);
console.log(`videoId: ${videoId}`);
console.log(`url: ${videoUrl}`);

mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "VIDEO.json");
try {
  copyFileSync(videoJsonPath, outPath);
} catch (err) {
  console.error(
    `VIDEO.json could not be copied from ${botDir}: ${(err as Error).message}`,
  );
  process.exit(1);
}

// 3. Verify the copy is byte for byte identical to the source, so a
//    truncated or corrupted copy cannot slip through silently.
if (readFileSync(outPath, "utf8") !== videoJsonText) {
  console.error(`Copied VIDEO.json differs from ${videoJsonPath}.`);
  process.exit(1);
}

console.log(`copied: ${videoJsonPath} -> ${outPath} (identical)`);
