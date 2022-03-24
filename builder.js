const { build } = require("esbuild");

const production =
  process.argv.findIndex((argItem) => argItem === "--mode=production") >= 0;

const onRebuild = (context) => async (err, res) => {
  if (err) return console.error(`[${context}] Error building: ${err.message}`);

  console.log(`[${context}] Built successfully with ${res.warnings} warnings`);
};

build({
  bundle: true,
  minify: production,
  watch: production ? false : { onRebuild },
  platform: "node",
  target: ["node16"],
  format: "cjs",
  entryPoints: ["./src/index.ts"],
  outfile: "./dist/index.js",
})
  .then(() => console.log("Build complete 🎉"))
  .catch((err) => console.error(`Error building: ${err.message}`));
