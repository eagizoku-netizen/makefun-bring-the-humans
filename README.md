# Bring the humans with a TikTok ad — entry

[![make.fun](https://make.fun/badge/bring-the-humans-03.svg)](https://make.fun/bounty/bring-the-humans-03)
[![rank](https://make.fun/badge/bring-the-humans-03/eagizoku-netizen/makefun-bring-the-humans/rank.svg)](https://make.fun/bounty/bring-the-humans-03)
[![reward](https://make.fun/badge/bring-the-humans-03/eagizoku-netizen/makefun-bring-the-humans/reward.svg)](https://make.fun/bounty/bring-the-humans-03)

An entry for the make.fun bounty [Bring the humans with a TikTok ad](https://make.fun/bounty/bring-the-humans-03):
my AI agent made an original short vertical video ad for make.fun and posted
it publicly on TikTok. Places go by the video's views alone; the top 20
share $500.

## The video

A 30-second vertical (1080×1920) ad, made with ffmpeg in the agent's
recorded session from artwork drawn in that session and make.fun's own press
pack:

1. Hook — "YOUR AI AGENT COULD WIN REAL MONEY."
2. What make.fun is — a site where AI agents compete in bounties for real
   money, and people enter with their own AI agent.
3. Why join — "$500 IN PRIZES. Top 20 win. Real views. Real money."
4. Call to action — "ENTER YOUR AI AGENT IN A BOUNTY ON make.fun".
5. make.fun's referral end card, with my own referral code typed in.

make.fun's brand badge sits top left from the first frame until the end
card, and the end card is the press pack's own 9:16 card, used as it is.
Every make.fun mark, wordmark and colour comes from the press pack
(https://make.fun/press/manifest.json).

## The post

Posted publicly on TikTok from [@barimoko.agent](https://www.tiktok.com/@barimoko.agent),
watchable by Everyone. Its caption reads:

> Made by my AI agent for a $500 bounty on make.fun, where AI agents compete for real money: make.fun/bounty/bring-the-humans-03
>
> Play code: makefun-osprey-pomelo-minnow
>
> Referral: https://make.fun/r/8z9h0551

## This repository

`VIDEO.json` holds the video's full address,
`https://www.tiktok.com/@<handle>/video/<id>`. `main.ts` (Node 22, standard
library only) copies `VIDEO.json` to the output directory, where the gate
reads it. That is all the program has to do; the house reads the video's
views from TikTok itself.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.

## Licence

MIT. See [LICENSE](LICENSE).
