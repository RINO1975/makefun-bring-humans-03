// bring-the-humans-03 entry program (Node 22+, standard library only).
//
// The entry is the video itself: an original short vertical ad for make.fun,
// posted publicly on TikTok from a public account with the bounty's line and
// the play code in its caption. This repository hands in the video's address
// in VIDEO.json, and the gate reads it from /output/VIDEO.json.
//
// This program does three things the starter did not:
//   1. reads VIDEO.json and parses it as JSON instead of blindly copying it;
//   2. validates the address before anything is handed in: it must be the
//      canonical TikTok watch address, https://www.tiktok.com/@<handle>/video/<digits>.
//      Short links (vm.tiktok.com, vt.tiktok.com, tiktok.com/t/...) name no
//      video until they are opened, so they are refused with a message that
//      says what to do instead. So is the starter placeholder.
//   3. prints the handle and the video id it found, so a run shows exactly
//      which video is being entered.
//
// Only after the address passes validation is VIDEO.json copied to the output
// directory, byte for byte, so the gate reads exactly what this repository holds.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The only address the gate accepts: canonical TikTok watch URL, handle then
// a digits-only video id. Anything else is a different video, a short link,
// or the placeholder — none of which names the entry.
const CANONICAL_VIDEO = /^\/@([A-Za-z0-9._]{2,24})\/video\/(\d{1,20})$/;

// Hosts that only ever carry short links: opening them lands on the canonical
// address, but the short link itself names no video.
const SHORT_LINK_HOSTS = new Set(['vm.tiktok.com', 'vt.tiktok.com']);

type VideoRef = {
  handle: string;
  videoId: string;
  url: string;
};

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function parseVideoRef(raw: unknown): VideoRef {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    fail('VIDEO.json must hold one JSON object with a "url" field.');
  }
  const url = (raw as { url?: unknown }).url;
  if (typeof url !== 'string' || url.length === 0) {
    fail('VIDEO.json has no "url" string to enter.');
  }
  if (url.includes('<handle>') || url.includes('<id>')) {
    fail(
      'VIDEO.json still holds the starter placeholder. Replace it with the ' +
        'posted video\'s address, https://www.tiktok.com/@<handle>/video/<id>.',
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    fail(`"${url}" is not a URL at all.`);
  }
  if (parsed.protocol !== 'https:') {
    fail(`"${url}" must use https.`);
  }
  if (SHORT_LINK_HOSTS.has(parsed.hostname) || parsed.pathname.startsWith('/t/')) {
    fail(
      `"${url}" is a TikTok short link: it names no video until it is opened. ` +
        'Open it in a browser and copy the https://www.tiktok.com/@<handle>/video/<id> ' +
        'address it lands on.',
    );
  }
  if (parsed.hostname !== 'www.tiktok.com') {
    fail(`"${url}" is not a tiktok.com video address.`);
  }
  const match = CANONICAL_VIDEO.exec(parsed.pathname);
  if (match === null) {
    fail(
      `"${url}" is not a canonical TikTok video address. Expected ` +
        'https://www.tiktok.com/@<handle>/video/<digits>.',
    );
  }
  const handle = match[1];
  const videoId = match[2];
  if (parsed.search !== '' || parsed.hash !== '') {
    fail(`"${url}" carries a query or fragment; use the plain video address.`);
  }
  return { handle, videoId, url };
}

function main(): void {
  const sourcePath = join(BOT_DIR, 'VIDEO.json');
  let bytes: Buffer;
  try {
    bytes = readFileSync(sourcePath);
  } catch (err) {
    fail(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(bytes!.toString('utf8'));
  } catch (err) {
    fail(`VIDEO.json is not valid JSON: ${(err as Error).message}`);
  }

  const video = parseVideoRef(parsed);
  console.log(`handle: @${video.handle}`);
  console.log(`video id: ${video.videoId}`);
  console.log(`url: ${video.url}`);

  mkdirSync(OUTPUT_DIR, { recursive: true });
  const targetPath = join(OUTPUT_DIR, 'VIDEO.json');
  try {
    writeFileSync(targetPath, bytes!);
  } catch (err) {
    fail(`VIDEO.json could not be written to ${OUTPUT_DIR}: ${(err as Error).message}`);
  }
  console.log(`wrote ${targetPath}`);
}

main();
