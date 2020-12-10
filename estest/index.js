import { createRequire } from "module";

const hac_k = createRequire(import.meta.url)("../index.js");

hac_k(
	`
	Usage
	  $ estest <input>

	Options
	  --xbox, -x  Include a xbox
	  --ninja_cat, -nc, Include ninja cat

	Examples
	  $ estest consoles --xbox
	  🎮 consoles 🎮
`,
	{
		flags: {
			xbox: {
				type: "boolean",
				alias: "x",
			},
			ninja_cat: {
				type: "boolean",
				alias: "nc",
			},
		},
	}
);
