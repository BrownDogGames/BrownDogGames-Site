# BrownDogGames website — regression test checklist

This checklist covers the existing layout and interactive features. It is **not** a claim that browser testing has already passed.

## Desktop
- [ ] Open the homepage at 1280px and 1920px; verify hero, featured Steam cards and sections remain in the same order.
- [ ] Open and close the Steam game detail dialog; verify artwork and link.
- [ ] Search and clear Steam title filters.
- [ ] Switch Games, Tools, Downloads, Quizzes, Rewards and Links tabs.
- [ ] Follow direct links such as `#games`, `#game-snake` and `#steam`.
- [ ] Check browser console for JavaScript errors.

## Mobile (320px, 375px, 430px, 768px)
- [ ] Menu opens and closes with its button, Escape, outside click and link selection.
- [ ] Menu resets when viewport changes to desktop width.
- [ ] No horizontal page scrolling or clipped buttons/cards.
- [ ] Snake touch controls work; no accidental page scrolling while playing.
- [ ] Memory board, tic-tac-toe, game dialogs, scores and Steam cards fit the viewport.
- [ ] Text and controls remain readable at 200% zoom.

## Games
- [ ] Tic-tac-toe: easy/medium/hard, win/loss/draw, restart.
- [ ] Guess the Number: validation and difficulty settings.
- [ ] Rock Paper Scissors: results and scores.
- [ ] Memory: match cards, finish and replay.
- [ ] Simon Says: playback, user input, restart and navigation away.
- [ ] Reaction Test: premature click and valid reaction time.
- [ ] Typing Test: WPM and restart.
- [ ] Snake: rapid turns, pause/resume, touch, collision and game over.
- [ ] Higher or Lower: streaks and reset.
- [ ] Game favourites, recent games and search filters.
- [ ] Score reset immediately updates game-directory records.

## Persistence and accessibility
- [ ] Scores, achievements and favourites persist after refresh.
- [ ] Site does not crash with malformed saved JSON or storage blocked.
- [ ] Daily check-in cannot be claimed twice on the same day when storage works.
- [ ] All controls are reachable by keyboard; focus indicator is visible.
- [ ] Reduced-motion setting suppresses decorative animations.
- [ ] No unexpected screen-reader announcements.

## Release
- [ ] Review the GitHub PR diff.
- [ ] Verify GitHub Pages preview or local static-server build.
- [ ] Merge only after testing and approval.
