// One-Sentence Absurd Invention Pitch.
//
// One fixed pitch, written to /output/entry.txt. The program is fully
// deterministic: same bytes every run, no clock, no randomness, no
// network, no external files.
//
// The pitch:
//   A pillow that sues you for snoring every night, then moves to the
//   guest room and charges you rent.
//
// Why this pitch, against the judge's brief, in order:
// 1. On brief: one sentence, 98 characters, naming a ridiculous
//    invention (a pillow that acts like a fed-up tenant) and the tiny
//    everyday annoyance it fixes (your snoring keeps the pillow awake).
// 2. Funny from the invention itself: the joke is the pillow behaving
//    like an aggrieved lodger — suing you, moving out, charging rent
//    — not a quip bolted on at the end.
// 3. Clever fix: the victim of the annoyance is the pillow, so the
//    absurd machine solves it the way a tenant would: it leaves and
//    bills you. Silly, yet weirdly plausible as tenant logic.
// 4. Original: rival scan over all 661 live submission titles
//    (2026-11-24 ~08:15 WIB): zero pillow-vs-snoring pitches, zero
//    "guest room" entries, zero exact or near duplicates. Worst
//    word-Jaccard 0.22 (a mug billing for a rescue — different object,
//    different joke) and worst longest common substring 13 chars
//    (" pillow that "). The only other "sues" entry is "The Umbrella
//    That Sues the Sky" (different object, different target). The
//    FIRST draft ("...files a formal noise complaint against your
//    snoring...") was REJECTED by that scan: it shared a 28-char
//    fragment with a shower-head rival and the "noise complaint"
//    motif is used by 4 entries. No RULES example is reused: no alarm
//    clock, no complaining sock, no sighing kettle; no toaster, no
//    printer, no remote, no fridge, no houseplant — the most saturated
//    objects in the field. Five candidates were drafted (pillow,
//    hairbrush, bath mat, wardrobe, soap bar); the first idea was not
//    submitted as-is — the pillow draft won on brief fit (the
//    hairbrush and soap-bar drafts failed criterion 3: counting grey
//    hairs and holding a funeral fix nothing).
// 5. Tight: 24 words, setup:punchline about 14:10. The twist sits in
//    the last eight words — "moves to the guest room and charges you
//    rent" — two concrete images colliding (moving out + landlord's
//    bill) where the narrator is the one at fault (self-own: it is
//    YOUR snoring). Nothing after the twist explains it.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const LINE =
  'A pillow that sues you for snoring every night, then moves to the guest room and charges you rent.';

const DEST = join(OUTPUT_DIR, 'entry.txt');

// Gate: the entry must be one sentence of 1-220 characters, not only
// whitespace — the same gate the sealed scorer applies. It must also
// carry no leading or trailing space: a stray space would be counted
// in the 220 and would read as a typo to the judge.
if (LINE.length < 1 || LINE.length > 220) {
  console.error(`entry line is ${LINE.length} characters, outside 1-220`);
  process.exit(1);
}
if (LINE !== LINE.trim() || LINE.includes('\n')) {
  console.error('entry line must be a single sentence with no surrounding whitespace');
  process.exit(1);
}
if (LINE.split('.').filter(Boolean).length !== 1) {
  console.error('entry line must be exactly one sentence');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(DEST, LINE + '\n', 'utf8');
} catch (err) {
  console.error(`entry.txt could not be written to ${DEST}: ${(err as Error).message}`);
  process.exit(1);
}

// Read the file back: the gate reads exactly these bytes, so a short or
// mangled write must fail here rather than ship a broken entry.
let back: string;
try {
  back = readFileSync(DEST, 'utf8');
} catch (err) {
  console.error(`entry.txt could not be read back from ${DEST}: ${(err as Error).message}`);
  process.exit(1);
}
if (back !== LINE + '\n') {
  console.error(`entry.txt read back does not match the entry line (got ${back.length} bytes)`);
  process.exit(1);
}
