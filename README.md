# 🏐 Spike Timer

A web app that measures how well-timed a volleyball spike is.

Upload a clip of a spike, tap three moments — takeoff, ball contact, and landing — and the app tells you whether you hit the ball at the top of your jump, or too early / too late.

## Demo


https://github.com/user-attachments/assets/016b5087-1406-497f-8bcf-1bcbc95a7a7a


## How it works

The app doesn't use pose detection or ML — it uses your eyes and three taps.

1. **Takeoff** — the frame your feet leave the ground
2. **Contact** — the frame your hand meets the ball
3. **Landing** — the frame your feet touch down again

From those three timestamps it computes:

| Metric | Definition |
| --- | --- |
| `airtime` | `landing − takeoff` — total time in the air |
| `idealContact` | `airtime / 2` — the apex of the jump, where contact *should* happen |
| `actualContact` | `contact − takeoff` — where contact actually happened |
| `spikingDifference` | `actualContact − idealContact` — how far off you were, in seconds |
| `accuracy` | `(1 − abs(spikingDifference) / airtime) × 100`, floored at 0% |

The assumption behind the math: a jump is roughly symmetric, so the peak of your jump sits at the halfway point between takeoff and landing. Contact at that halfway point means you hit the ball at your highest reach.

### Reading the result

Anything within **±50 ms** of the apex is scored as **Perfect**. Outside that window, the label describes **your jump**, not your contact — because that's the thing you can actually adjust on the next rep:

| `spikingDifference` | What happened | Label |
| --- | --- | --- |
| Negative | Contact before the apex — the ball got there while you were still rising, so you left the ground too late | **Late** |
| Positive | Contact after the apex — you peaked before the ball arrived and hit it on the way down, so you left the ground too soon | **Early** |

So "Late" means *jump sooner*, and "Early" means *wait longer* on your approach.

## Getting started

Requires Node.js 20+.

```bash
git clone https://github.com/jrosario0225/spike-timer.git
cd spike-timer
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the project |

## Using the app

1. On the home screen, tap **Upload footage** and pick a video of a spike.
2. Play the clip. Use the **−0.2s / −1 frame / +1 frame / +0.2s** buttons to scrub to the exact moment.
3. Hit **TAP** at takeoff, again at ball contact, again at landing. The prompt above the button tells you which one is next.
4. Tap **See Results →**.

If you mistime a tap, **Reset Taps** clears all three and starts the sequence over.

Frame stepping assumes ~30 fps (0.033s per frame). Slow-motion footage gives noticeably more precise results than standard 30 fps video, since a spike's contact window is only a few frames wide.

## Project structure

```
src/
├── App.jsx                    # Screen router: home → playback → results
├── main.jsx                   # React entry point
├── components/
│   ├── HomeScreen.jsx         # Upload / record entry point
│   ├── VideoPlayback.jsx      # Video player, frame stepping, tap capture
│   └── Results.jsx            # Metrics display
├── hooks/
│   ├── useTimestamps.js       # Tracks the takeoff/contact/landing sequence
│   └── useCamera.js           # getUserMedia wrapper (for in-app recording)
└── utils/
    └── calculations.js        # Spike timing math
```

State lives in `App.jsx` as a simple `screen` string — there's no router library. `useTimestamps` owns the three-tap state machine and exposes `nextTap` so the UI knows what to prompt for.

## Tech stack

- **React 19** — UI
- **Vite 7** — dev server and build
- **Vercel Analytics** — usage tracking
- Plain CSS, one stylesheet per component
- No backend: videos are read via `URL.createObjectURL` and never leave the browser

## Status & roadmap

The upload-and-analyze flow is complete. Known gaps:

- **In-app recording** — `useCamera.js` is written and working, but the recording screen itself is still a placeholder. The "Record your spike" card on the home screen is commented out until it's wired up.
- **Frame stepping is hardcoded to 30 fps** — it should read the actual frame rate from the video.
- **No history** — results aren't saved between sessions, so you can't track improvement over time.

## Privacy

Video files are processed entirely in the browser. Nothing is uploaded to a server.
