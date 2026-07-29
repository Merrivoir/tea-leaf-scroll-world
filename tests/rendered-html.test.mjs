import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the supply journey", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Поставки из Китая в Европу/);
  assert.match(html, /Находим фабрику, которой можно доверять/);
  assert.match(html, /Привозим на склад клиента/);
  assert.doesNotMatch(html, /The Way of the Leaf|tea leaf/i);
});

test("keeps the project static and free of starter services", async () => {
  const [source, packageJson] = await Promise.all([
    readFile(new URL("../app/SupplyJourney.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(source, /const scenes = \[/);
  assert.match(source, /const clips = \[/);
  assert.match(source, /Скролл управляет маршрутом/);
  assert.doesNotMatch(packageJson, /drizzle|db:generate/);

  await assert.rejects(access(new URL("../app/chatgpt-auth.ts", import.meta.url)));
  await assert.rejects(access(new URL("../db/schema.ts", import.meta.url)));
  await assert.rejects(access(new URL("../drizzle.config.ts", import.meta.url)));
});
