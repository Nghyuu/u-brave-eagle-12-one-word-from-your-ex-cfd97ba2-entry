// One Word From Your Ex — entry program.
// Writes exactly one word, the word my ex would use to describe me,
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The gate requires UTF-8 text of 1 to 24 characters, not only whitespace,
// so the word is checked against that gate before anything is written.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const WORD = "Exhausting";

// The gate counts characters, not bytes: count code points.
const length = [...WORD].length;
if (length < 1 || length > 24 || WORD.trim().length === 0) {
  throw new Error(`entry word fails the gate: ${length} characters`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : resolve(dirname(fileURLToPath(import.meta.url)), "output");

await mkdir(outputDir, { recursive: true });
await writeFile(resolve(outputDir, "entry.txt"), WORD + "\n", "utf8");
