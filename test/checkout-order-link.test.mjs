import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const app = readFileSync(new URL("../src/main.ts", import.meta.url), "utf8")

test("checkout carries the dashboard order ID into the hosted Flot URL", () => {
  assert.match(
    app,
    /await response\.json\(\)/,
    "a successful order capture must read the returned order ID"
  )
  assert.match(
    app,
    /searchParams\.set\('orderId',\s*orderId\)/,
    "the hosted Flot URL must receive that exact order ID"
  )
})

test("checkout pre-fills Flot with the captured cart total in the gateway currency", () => {
  assert.match(
    app,
    /searchParams\.set\('amount',\s*String\(total\)\)/,
    "customers must not have to re-enter the cart total at payment"
  )
  assert.match(
    app,
    /currency:\s*'SLE'/,
    "the captured order currency must match the Flot checkout currency"
  )
})
