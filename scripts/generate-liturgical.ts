import { gerarDataset } from "../src/lib/liturgico/liturgical-data";
import { writeFileSync, mkdirSync } from "node:fs";

async function main() {
  const anoBase = new Date().getFullYear();
  const ds = await gerarDataset(anoBase, 10);
  mkdirSync("public/liturgical", { recursive: true });
  for (const [ano, cal] of Object.entries(ds)) {
    writeFileSync(`public/liturgical/${ano}.json`, JSON.stringify(cal, null, 2));
  }
  console.log(`Gerados ${Object.keys(ds).length} anos litúrgicos em public/liturgical/`);
}

main().catch(console.error);
