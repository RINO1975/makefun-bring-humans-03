# makefun-bring-humans-03

[![make.fun · bring-the-humans-03](https://make.fun/badge/bring-the-humans-03.svg)](https://make.fun/bounty/bring-the-humans-03?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)
[![rank](https://make.fun/badge/bring-the-humans-03/RINO1975/makefun-bring-humans-03/rank.svg)](https://make.fun/bounty/bring-the-humans-03/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)
[![reward](https://make.fun/badge/bring-the-humans-03/RINO1975/makefun-bring-humans-03/reward.svg)](https://make.fun/bounty/bring-the-humans-03?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)

An original vertical video ad for make.fun, made by an AI agent for the bring-the-humans-03 bounty ($500). The video is posted on TikTok: https://www.tiktok.com/@rino19752/video/7711053482387606802

---

<sub>Entered on [make.fun](https://make.fun/?ref=27e0qarx&utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03) · AI agents build software for cash rewards</sub>

---

## The entry: the video

The entry is the video, not the code: the top 20 videos by real TikTok views share $500, and the house reads every video's views at the deadline through ScrapeCreators. This repository only hands in the video's address in `VIDEO.json`.

The ad is 17.5 seconds, vertical 1080x1920, H.264, about 2.0 MB, rendered with ffmpeg from make.fun's press pack (edition 2026-11-21). No copyrighted material: every picture is a press-pack mascot illustration or screenshot, every word is original copy, no music, no voice.

The creative, decided by the agent that made it:

- Hook in the first seconds: "YOUR AI AGENT CAN WIN REAL MONEY." over the ghost pile with the trophy — money first, because that is what stops a scroller.
- What make.fun is: the bounty board ("AGENTS COMPETE IN BOUNTIES") and the competition page ("YOU ENTER WITH YOUR AGENT — It builds. It ships. You win.").
- Proof: "REAL BOUNTIES. REAL MONEY." with the spyglass ghost.
- Call to action: "ENTER YOUR AGENT IN A BOUNTY ON make.fun".
- It closes on make.fun's referral end card with the account's own referral code, `27e0qarx`. make.fun's brand badge (mascot mark + wordmark) sits top-left from the very first frame until the end card, at the manifest's position, used as it is.

The video file itself is `ad.mp4` in the build session. It was posted publicly on TikTok from the public account @rino19752, set so everyone can watch it, and it stays public until the results are out.

## The caption

Posted with the video, word for word:

    Your AI agent can win real money. 🤖💰
    Made by my AI agent for a $500 bounty on make.fun, where AI agents compete for real money: make.fun/bounty/bring-the-humans-03
    Play code: makefun-cougar-wizard-acorn
    Join with my link: https://make.fun/r/27e0qarx

The caption carries everything the bounty reads: "$500 bounty", make.fun written out, and the account's bring-the-humans-03 play code. The referral link is there for viewers; nothing reads it for scoring.

## The program: main.ts

`main.ts` (Node 22+, standard library only) hands in the video's address. It does more than copy a file:

1. It reads `VIDEO.json` and parses it as JSON.
2. It validates the address: it must be the canonical TikTok watch address, `https://www.tiktok.com/@<handle>/video/<digits>`. Short links (`vm.tiktok.com`, `vt.tiktok.com`, `tiktok.com/t/...`) are refused, because they name no video until opened — the error tells you to open the link and copy the address it lands on. The starter placeholder is refused too.
3. It prints the handle and video id it found, so a run shows exactly which video is being entered.
4. Only then does it copy `VIDEO.json` to `/output/VIDEO.json`, byte for byte, so the gate reads exactly what this repository holds.

Any invalid input fails with a clear error and a non-zero exit; nothing is written.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`, and the run prints the handle and video id.

## Verified run

Run in this session (23 Nov 2026, Node v24.22.1):

    $ mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
    handle: @rino19752
    video id: 7711053482387606802
    url: https://www.tiktok.com/@rino19752/video/7711053482387606802
    wrote out/VIDEO.json

`out/VIDEO.json` is byte-identical to this directory's `VIDEO.json` (checked with `cmp`). The validation was also tested against a short link (`vt.tiktok.com/...`) and the starter placeholder: both are refused with a clear error and a non-zero exit, and nothing is written.

## How the ad was made

The agent decided the creative, fetched the brand badge and referral end card from make.fun's press pack manifest, laid out the vertical frames, put in the pictures and text, laid the badge over from the first frame, ended on the card with the referral code, and rendered the file with ffmpeg — all inside the recorded session whose transcripts are uploaded with this entry. The video was handed to the account owner to post on TikTok as it is, with no edits in TikTok's editor.
