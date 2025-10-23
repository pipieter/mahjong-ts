import { sys } from "typescript";
import { Tile } from "../src/tile";
import { Meld } from "../src/hand";
import { RiichiCall, YakuId } from "../src/yaku/yaku";
import { ScoreConfig } from "../src/score";

import fs from "node:fs";
import libxmljs, { XMLElement } from "libxmljs";
import { XMLDocument } from "libxmljs";

import { gunzipSync } from "fflate";

interface ValidationResult {
  path: string;
  rounds: number;
  correct: number;
}

function openLog(path: string): XMLDocument {
  const contents = fs.readFileSync(path);
  let xml: XMLDocument | undefined = undefined;
  try {
    xml = libxmljs.parseXml(contents);
  } catch {
    // If contents couldn't be parsed, it's likely because the .mjlog file has been compressed
    // using the gzip algorithm.
    const decompressed = gunzipSync(contents);
    const decompressedStr = new TextDecoder().decode(decompressed);
    xml = libxmljs.parseXml(decompressedStr);
  }

  return xml;
}

function decodeTile(data: string): Tile {
  return new Tile(Math.floor(parseInt(data) / 4));
}

function validateAgari(agari: XMLElement): boolean {
  const tiles: Tile[] = [];
  const melds: Meld[] = [];
  const config: ScoreConfig = {
    riichi: RiichiCall.None,
    tsumo: false,
    wallCount: 0,
    dealer: false,
    dora: [],
    uradora: [],
    akadora: 0,
  };

  const yakuStr = (agari.getAttribute("yaku")?.value() || "").split(",").filter((y) => y.length > 0);
  const yakumanStr = (agari.getAttribute("yakuman")?.value() || "").split(",").filter((y) => y.length > 0);
  const yaku = yakuStr.map(parseFloat);
  const yakuman = yakumanStr.map(parseFloat);

  const fromWho = agari.getAttribute("fromWho");
  const who = agari.getAttribute("who")?.value();

  const ten = (agari.getAttribute("ten")?.value() || "").split("").map(parseFloat);
  const hai = (agari.getAttribute("hai")?.value() || "").split("").map(parseFloat);
  const m = (agari.getAttribute("m")?.value() || "").split(",").map(parseFloat);

  const ids = new Set(Object.values(YakuId));
  for (const y of [...yaku, ...yakuman]) {
    if (!ids.has(y)) {
      console.warn(`Unsupported yaku id: ${y}`);
    } else {
      console.log(`Supported yaku id: ${y}`);
    }
  }

  return false;
}

function validate(path: string): ValidationResult {
  const result: ValidationResult = {
    path: path,
    rounds: 0,
    correct: 0,
  };

  const xml = openLog(path);
  const agari = xml.childNodes().filter((child) => child.name().toLowerCase() === "agari");
  for (const a of agari) {
    const validation = validateAgari(a);
    result.rounds++;
    result.correct += validation ? 1 : 0;
  }

  return result;
}

function main(args: string[]) {
  const file1 = "./scripts/log.mjlog";
  const file2 = "./scripts/logs/2021101323gm-0001-0000-5c516455&tw=3.mjlog";
  const result = validate(file2);
}

main(sys.args);
