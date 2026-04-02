import { spawn } from "node:child_process";
import process from "node:process";
import { fileURLToPath } from "node:url";

const port = process.env.PORT || "3000";
const host = process.env.HOST || "0.0.0.0";

const nextBin = fileURLToPath(new URL("./node_modules/next/dist/bin/next", import.meta.url));

const child = spawn(process.execPath, [nextBin, "start", "-p", port, "-H", host], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
