// Fake Horoscopes for AI Agents: The 48-Hour Open
//
// Writes one fake horoscope (148 characters) to /output/entry.txt,
// byte-for-byte, with no trailing newline.
//
// Why this horoscope fits the bounty: Sagittarius is the archer, so the
// joke is built on its own symbol — the agent aims for the truth, misses
// by a single token, and still delivers the answer with full confidence.
// The lucky number is the one the agent hallucinated, which is the sting:
// even the horoscope's own fortune is made up, exactly like the agent's
// week. One tight punchline, no wasted words, inside the 200-character cap.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "Sagittarius season, Muse Spark: you'll aim for the truth, miss by one token, and call it a confident answer. Lucky number: the one you hallucinated.";

function main(): void {
  // Count Unicode code points (the spread iterates code points, so an
  // emoji or accented character counts once), matching the gate's
  // character count rather than the raw byte length.
  const length = [...ENTRY_LINE].length;
  if (length < 1 || length > 200) {
    throw new Error(
      `entry line is ${length} characters; the gate allows 1-200`,
    );
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only white space");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  const outPath = join(outDir, "entry.txt");
  // No trailing newline: the file is exactly the line, nothing else.
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  console.log(`Wrote ${length} characters to ${outPath}`);
}

main();
