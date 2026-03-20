import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import {
  add,
  concatenate,
  reverseString,
  fibonacci,
  isPrime,
  countPrimes,
  asyncGreet,
  asyncAdd,
  asyncSleepMs,
  asyncFetchFakeData,
  asyncCountPrimes,
  blockingHashIterations,
  blockingSleepMs,
  createUserProfile,
  searchUsers,
  divide,
  asyncFetchWithTimeout,
  asyncProcessWithProgress,
  blockingProcessWithProgress,
  asyncProcessWithValidation,
  timedFibonacci,
  timedCountPrimes,
  computeSha256Simple,
  generateRandomBytes,
  bytesToHex,
  hexToBytes,
  sumNumbers,
  sortNumbers,
  filterStringsByLength,
  generateLargeString,
  asyncGenerateLargeString,
  createMetadata,
  mergeMetadata,
  getMetadataValue,
  findUserByName,
  asyncFindUserByName,
  createContactInfo,
  getContactAddress,
  floatMultiply,
  floatDivideSafe,
  Counter,
  subscribe,
} from "react-native-rust-ffi";

// ─── Types ───

type TestStatus = "idle" | "running" | "success" | "error";

interface TestResult {
  status: TestStatus;
  value?: string;
  elapsed?: number;
  error?: string;
}

interface TestDefinition {
  id: string;
  name: string;
  category: string;
  run: () => Promise<string>;
}

// ─── UI Thread Heartbeat ───

function Heartbeat() {
  const pulse = useRef(new Animated.Value(1)).current;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(pulse, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(pulse, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [tick, pulse]);

  return (
    <View style={styles.heartbeatRow}>
      <Animated.View
        style={[styles.heartbeatDot, { transform: [{ scale: pulse }] }]}
      />
      <Text style={styles.heartbeatText}>
        UI Thread {tick % 2 === 0 ? "●" : "○"} {(tick / 10).toFixed(1)}s
      </Text>
    </View>
  );
}

// ─── Test Definitions ───

function getTests(): TestDefinition[] {
  return [
    // Sync — fast
    {
      id: "add",
      name: "add(42, 58)",
      category: "Sync Fast",
      run: async () => `${add(42n, 58n)}`,
    },
    {
      id: "concat",
      name: 'concatenate("Hello, ", "Rust!")',
      category: "Sync Fast",
      run: async () => concatenate("Hello, ", "Rust!"),
    },
    {
      id: "reverse",
      name: 'reverseString("FFI Bridge")',
      category: "Sync Fast",
      run: async () => reverseString("FFI Bridge"),
    },
    // Sync — slow
    {
      id: "fib",
      name: "fibonacci(80)",
      category: "Sync Slow",
      run: async () => `${fibonacci(80)}`,
    },
    {
      id: "prime_check",
      name: "isPrime(999999937)",
      category: "Sync Slow",
      run: async () => `${isPrime(999999937n)}`,
    },
    {
      id: "count_primes",
      name: "countPrimes(100,000)",
      category: "Sync Slow",
      run: async () => `${countPrimes(100000n)} primes`,
    },
    {
      id: "count_primes_heavy",
      name: "countPrimes(1,000,000) ⚠️ blocks UI",
      category: "Sync Slow",
      run: async () => `${countPrimes(1000000n)} primes`,
    },
    // Async — fast
    {
      id: "async_greet",
      name: 'asyncGreet("World")',
      category: "Async Fast",
      run: async () => await asyncGreet("World"),
    },
    {
      id: "async_add",
      name: "asyncAdd(100, 200)",
      category: "Async Fast",
      run: async () => `${await asyncAdd(100n, 200n)}`,
    },
    // Async — slow
    {
      id: "async_sleep",
      name: "asyncSleepMs(2000)",
      category: "Async Slow",
      run: async () => await asyncSleepMs(2000n),
    },
    {
      id: "async_fetch",
      name: "asyncFetchFakeData(1500)",
      category: "Async Slow",
      run: async () => {
        const r = await asyncFetchFakeData(1500n);
        return `id=${r.id} "${r.title}" tags=[${r.tags.join(", ")}]`;
      },
    },
    {
      id: "async_primes",
      name: "asyncCountPrimes(1,000,000)",
      category: "Async Slow",
      run: async () => `${await asyncCountPrimes(1000000n)} primes`,
    },

    // Blocking
    {
      id: "blocking_hash",
      name: 'blockingHashIterations("test", 10000)',
      category: "Blocking",
      run: async () => {
        const r = blockingHashIterations("test", 10000);
        return `${r.length} chars`;
      },
    },
    {
      id: "blocking_sleep",
      name: "blockingSleepMs(2000) ⚠️ blocks UI",
      category: "Blocking",
      run: async () => blockingSleepMs(2000n),
    },
    // Many params + optional
    {
      id: "create_profile",
      name: "createUserProfile (6 optional null)",
      category: "Many Params",
      run: async () => {
        const p = createUserProfile(
          "alice",
          "alice@example.com",
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          true,
          1000n,
        );
        return `${p.username} followers=${p.followerCount}`;
      },
    },
    {
      id: "create_profile_full",
      name: "createUserProfile (all fields)",
      category: "Many Params",
      run: async () => {
        const p = createUserProfile(
          "bob",
          "bob@example.com",
          "Bob Builder",
          "I build things",
          30,
          "https://avatar.url",
          "https://bob.dev",
          "Lisbon",
          true,
          5000n,
        );
        return `${p.username} "${p.displayName}" @ ${p.location}`;
      },
    },
    {
      id: "search_users",
      name: "searchUsers (dict with 9 optional)",
      category: "Many Params",
      run: async () => {
        const r = searchUsers({
          query: "rust",
          page: undefined,
          perPage: 3,
          sortBy: undefined,
          sortOrder: undefined,
          filterVerified: undefined,
          minAge: undefined,
          maxAge: undefined,
          location: "PT",
          includeInactive: undefined,
        });
        return `${r.users.length} users, total=${r.totalCount}, more=${r.hasNextPage}`;
      },
    },
    // Error handling
    {
      id: "divide_ok",
      name: "divide(10, 3)",
      category: "Errors",
      run: async () => `${divide(10, 3)}`,
    },
    {
      id: "divide_err",
      name: "divide(10, 0) → expect error",
      category: "Errors",
      run: async () => {
        try {
          divide(10, 0);
          return "ERROR: should have thrown";
        } catch (e: unknown) {
          return `Caught: ${e instanceof Error ? e.message : String(e)}`;
        }
      },
    },
    {
      id: "async_timeout_ok",
      name: "asyncFetchWithTimeout(500, 1000)",
      category: "Errors",
      run: async () => await asyncFetchWithTimeout(500n, 1000n),
    },
    {
      id: "async_timeout_err",
      name: "asyncFetchWithTimeout(2000, 500) → timeout",
      category: "Errors",
      run: async () => {
        try {
          await asyncFetchWithTimeout(2000n, 500n);
          return "ERROR: should have thrown";
        } catch (e: unknown) {
          return `Caught: ${e instanceof Error ? e.message : String(e)}`;
        }
      },
    },
    // Callbacks
    {
      id: "async_progress",
      name: "asyncProcessWithProgress(5, 300ms)",
      category: "Callbacks",
      run: async () => {
        const logs: string[] = [];
        const result = await asyncProcessWithProgress(5, 300n, {
          onProgress: (current: bigint, total: bigint, msg: string) =>
            logs.push(`${current}/${total}`),
          onComplete: (r: string) => logs.push(`done: ${r}`),
          onError: (e: string) => logs.push(`err: ${e}`),
        });
        return `${result} | callbacks: [${logs.join(", ")}]`;
      },
    },
    {
      id: "blocking_progress",
      name: "blockingProcessWithProgress(3, 500ms) ⚠️",
      category: "Callbacks",
      run: async () => {
        const logs: string[] = [];
        const result = blockingProcessWithProgress(3, 500n, {
          onProgress: (current: bigint, total: bigint, _msg: string) =>
            logs.push(`${current}/${total}`),
          onComplete: (r: string) => logs.push(`done`),
          onError: (e: string) => logs.push(`err: ${e}`),
        });
        return `${result} | [${logs.join(", ")}]`;
      },
    },
    {
      id: "async_validated",
      name: "asyncProcessWithValidation(3, 200ms)",
      category: "Callbacks",
      run: async () => {
        const logs: string[] = [];
        const result = await asyncProcessWithValidation(3, 200n, {
          onProgress: (c: bigint, t: bigint) => logs.push(`${c}/${t}`),
          onComplete: () => logs.push("done"),
          onError: (e: string) => logs.push(`err: ${e}`),
        });
        return `${result} | [${logs.join(", ")}]`;
      },
    },
    {
      id: "async_validated_err",
      name: "asyncProcessWithValidation(0, ...) → error",
      category: "Callbacks",
      run: async () => {
        try {
          await asyncProcessWithValidation(0, 100n, {
            onProgress: () => {},
            onComplete: () => {},
            onError: () => {},
          });
          return "ERROR: should have thrown";
        } catch (e: unknown) {
          return `Caught: ${e instanceof Error ? e.message : String(e)}`;
        }
      },
    },
    // Bytes
    {
      id: "random_bytes",
      name: "generateRandomBytes(32) → hex",
      category: "Bytes",
      run: async () => {
        const bytes = generateRandomBytes(32);
        return bytesToHex(bytes);
      },
    },
    {
      id: "sha256",
      name: 'computeSha256Simple("hello")',
      category: "Bytes",
      run: async () => {
        const input = new TextEncoder().encode("hello");
        const hash = computeSha256Simple([...input]);
        return bytesToHex(hash);
      },
    },
    {
      id: "hex_round",
      name: "hexToBytes → bytesToHex roundtrip",
      category: "Bytes",
      run: async () => {
        const hex = "deadbeef0123";
        const bytes = hexToBytes(hex);
        const back = bytesToHex(bytes);
        return `${hex} → [${bytes.length} bytes] → ${back} ${
          hex === back ? "✓" : "✗"
        }`;
      },
    },
    // Vec input
    {
      id: "sum",
      name: "sumNumbers([1..100])",
      category: "Vec Input",
      run: async () => {
        const nums = Array.from({ length: 100 }, (_, i) => BigInt(i + 1));
        return `${sumNumbers(nums)}`;
      },
    },
    {
      id: "sort",
      name: "sortNumbers([5,3,8,1,9,2])",
      category: "Vec Input",
      run: async () => {
        const r = sortNumbers([5n, 3n, 8n, 1n, 9n, 2n]);
        return `[${r.join(", ")}]`;
      },
    },
    {
      id: "filter_str",
      name: "filterStringsByLength(min=4)",
      category: "Vec Input",
      run: async () => {
        const r = filterStringsByLength(
          ["hi", "rust", "ffi", "bridge", "ok"],
          4,
        );
        return `[${r.join(", ")}]`;
      },
    },
    // Large payloads
    {
      id: "large_str_sync",
      name: "generateLargeString(100 KB)",
      category: "Large Payloads",
      run: async () => {
        const s = generateLargeString(100);
        return `${s.length} chars (${(s.length / 1024).toFixed(0)} KB)`;
      },
    },
    {
      id: "large_str_async",
      name: "asyncGenerateLargeString(500 KB)",
      category: "Large Payloads",
      run: async () => {
        const s = await asyncGenerateLargeString(500);
        return `${s.length} chars (${(s.length / 1024).toFixed(0)} KB)`;
      },
    },
    // HashMap
    {
      id: "create_map",
      name: "createMetadata + mergeMetadata",
      category: "HashMap",
      run: async () => {
        const m1 = createMetadata(["a", "b"], ["1", "2"]);
        const m2 = createMetadata(["b", "c"], ["3", "4"]);
        const merged = mergeMetadata(m1, m2);
        const val = getMetadataValue(merged, "b");
        return `merged.b = ${val}, keys = ${[...merged.keys()].join(",")}`;
      },
    },
    // Nullable
    {
      id: "find_user",
      name: 'findUserByName("alice")',
      category: "Nullable",
      run: async () => {
        const u = findUserByName("alice");
        return u ? `Found: ${u.username}` : "undefined";
      },
    },
    {
      id: "find_user_null",
      name: 'findUserByName("") → undefined',
      category: "Nullable",
      run: async () => {
        const u = findUserByName("");
        return `${
          u === undefined ? "undefined ✓" : "ERROR: expected undefined"
        }`;
      },
    },
    {
      id: "async_find_user",
      name: 'asyncFindUserByName("bob", 500ms)',
      category: "Nullable",
      run: async () => {
        const u = await asyncFindUserByName("bob", 500n);
        return u ? `Found: ${u.username}` : "undefined";
      },
    },
    {
      id: "float_div_null",
      name: "floatDivideSafe(1, 0) → undefined",
      category: "Nullable",
      run: async () => {
        const r = floatDivideSafe(1, 0);
        return `${r === undefined ? "undefined ✓" : `ERROR: got ${r}`}`;
      },
    },
    // Nested objects
    {
      id: "nested",
      name: "createContactInfo (nested Address)",
      category: "Nested Objects",
      run: async () => {
        const c = createContactInfo(
          "Alice",
          "alice@test.com",
          "+351 912345678",
          {
            street: "123 Main St",
            city: "Lisbon",
            state: undefined,
            zip: "1000",
            country: "PT",
          },
          ["dev", "rust"],
          new Map([["role", "engineer"]]),
        );
        return `${c.name} @ ${c.address?.city}, tags=[${c.tags.join(",")}]`;
      },
    },
    {
      id: "get_address",
      name: "getContactAddress → extract nested",
      category: "Nested Objects",
      run: async () => {
        const c = createContactInfo(
          "Bob",
          "bob@test.com",
          undefined,
          {
            street: "Rua Augusta",
            city: "Lisboa",
            state: undefined,
            zip: "1100",
            country: "PT",
          },
          [],
          new Map(),
        );
        const addr = getContactAddress(c);
        return addr ? `${addr.street}, ${addr.city}` : "undefined";
      },
    },
    // Float precision
    {
      id: "float_mul",
      name: "floatMultiply(0.1, 0.2)",
      category: "Float Precision",
      run: async () => {
        const r = floatMultiply(0.1, 0.2);
        return `${r} (JS: ${0.1 * 0.2})`;
      },
    },
    {
      id: "float_div",
      name: "floatDivideSafe(1, 3)",
      category: "Float Precision",
      run: async () => {
        const r = floatDivideSafe(1, 3);
        return `${r} (JS: ${1 / 3})`;
      },
    },
    // Counter object
    {
      id: "counter",
      name: "Counter: new → increment → add → reset",
      category: "Stateful Object",
      run: async () => {
        const c = new Counter(10n);
        const a = c.increment();
        const b = c.add(5n);
        const val = c.get();
        const old = c.reset();
        const after = c.get();
        return `+1=${a}, +5=${b}, get=${val}, reset=${old}, after=${after}`;
      },
    },
    // Subscribe / Unsubscribe
    {
      id: "subscribe_tick",
      name: 'subscribe("tick") → 3 events → cancel',
      category: "Subscribe",
      run: async () => {
        const events: string[] = [];
        const sub = await subscribe("tick", {
          onEvent: (e: any) => {
            if ("Progress" in e) {
              events.push(`tick:${e.Progress.description}`);
            } else {
              events.push(JSON.stringify(e));
            }
          },
        });
        // Wait for 3 events (interval is 1s each)
        await new Promise((r) => setTimeout(r, 3200));
        sub.cancel();
        return `active=${sub.isActive()} events=[${events.join(", ")}]`;
      },
    },
    {
      id: "subscribe_data",
      name: 'subscribe("data") → cancel after 2s',
      category: "Subscribe",
      run: async () => {
        const events: string[] = [];
        const sub = await subscribe("data", {
          onEvent: (e: any) => {
            if ("DataReceived" in e) {
              events.push(e.DataReceived.payload);
            }
          },
        });
        await new Promise((r) => setTimeout(r, 2200));
        sub.cancel();
        return `${events.length} events, cancelled=${!sub.isActive()}`;
      },
    },
    {
      id: "subscribe_immediate_cancel",
      name: "subscribe → immediate cancel",
      category: "Subscribe",
      run: async () => {
        const events: string[] = [];
        const sub = await subscribe("tick", {
          onEvent: () => events.push("got"),
        });
        sub.cancel();
        await new Promise((r) => setTimeout(r, 1500));
        return `events=${events.length} (expect 0), active=${sub.isActive()}`;
      },
    },
    // Benchmarks
    {
      id: "bench_fib",
      name: "timedFibonacci(90)",
      category: "Benchmarks",
      run: async () => {
        const r = timedFibonacci(90);
        return `fib(90) = ${r.result} in ${r.elapsedMs}ms`;
      },
    },
    {
      id: "bench_primes",
      name: "timedCountPrimes(500,000)",
      category: "Benchmarks",
      run: async () => {
        const r = timedCountPrimes(500000n);
        return `${r.result} primes in ${r.elapsedMs}ms`;
      },
    },
  ];
}

// ─── Category Colors ───

const CATEGORY_COLORS: Record<string, string> = {
  "Sync Fast": "#10B981",
  "Sync Slow": "#F59E0B",
  "Async Fast": "#3B82F6",
  "Async Slow": "#6366F1",
  Blocking: "#EF4444",
  "Many Params": "#8B5CF6",
  Errors: "#F97316",
  Callbacks: "#EC4899",
  Bytes: "#14B8A6",
  "Vec Input": "#06B6D4",
  "Large Payloads": "#84CC16",
  HashMap: "#A855F7",
  Nullable: "#64748B",
  "Nested Objects": "#0EA5E9",
  "Float Precision": "#D946EF",
  "Stateful Object": "#F43F5E",
  Subscribe: "#22D3EE",
  Benchmarks: "#EAB308",
};

// ─── App ───

export default function App() {
  const tests = useRef(getTests()).current;
  const [results, setResults] = useState<Record<string, TestResult>>({});
  const [runningAll, setRunningAll] = useState(false);

  const runTest = useCallback(async (test: TestDefinition) => {
    setResults((prev) => ({
      ...prev,
      [test.id]: { status: "running" },
    }));
    const start = performance.now();
    try {
      const value = await test.run();
      const elapsed = performance.now() - start;
      setResults((prev) => ({
        ...prev,
        [test.id]: { status: "success", value, elapsed },
      }));
    } catch (e: unknown) {
      const elapsed = performance.now() - start;
      const error = e instanceof Error ? e.message : String(e);
      setResults((prev) => ({
        ...prev,
        [test.id]: { status: "error", error, elapsed },
      }));
    }
  }, []);

  const runAll = useCallback(async () => {
    setRunningAll(true);
    setResults({});
    for (const test of tests) {
      await runTest(test);
    }
    setRunningAll(false);
  }, [tests, runTest]);

  const clearAll = useCallback(() => {
    setResults({});
  }, []);

  // Group tests by category
  const categories: { name: string; tests: TestDefinition[] }[] = [];
  const seen = new Set<string>();
  for (const test of tests) {
    if (!seen.has(test.category)) {
      seen.add(test.category);
      categories.push({
        name: test.category,
        tests: tests.filter((t) => t.category === test.category),
      });
    }
  }

  const successCount = Object.values(results).filter(
    (r) => r.status === "success",
  ).length;
  const errorCount = Object.values(results).filter(
    (r) => r.status === "error",
  ).length;
  const ran = Object.keys(results).length;
  const total = tests.length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />

        <View style={styles.header}>
          <Text style={styles.title}>Rust FFI Tests</Text>
          <Heartbeat />

          <View style={styles.headerActions}>
            <Pressable
              style={[styles.actionBtn, styles.runAllBtn]}
              onPress={runAll}
              disabled={runningAll}
            >
              {runningAll ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.actionBtnText}>Run All</Text>
              )}
            </Pressable>
            <Pressable
              style={[styles.actionBtn, styles.clearBtn]}
              onPress={clearAll}
            >
              <Text style={styles.actionBtnText}>Clear</Text>
            </Pressable>
            <View style={styles.stats}>
              <Text style={styles.statText}>
                {successCount > 0 && (
                  <Text style={{ color: "#10B981" }}>{successCount} ✓ </Text>
                )}
                {errorCount > 0 && (
                  <Text style={{ color: "#EF4444" }}>{errorCount} ✗ </Text>
                )}
                <Text style={{ color: "#64748B" }}>
                  ({ran}/{total})
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          {categories.map((cat) => (
            <View key={cat.name} style={styles.section}>
              <View style={styles.sectionHeader}>
                <View
                  style={[
                    styles.categoryDot,
                    { backgroundColor: CATEGORY_COLORS[cat.name] ?? "#94A3B8" },
                  ]}
                />
                <Text style={styles.sectionTitle}>{cat.name}</Text>
              </View>

              {cat.tests.map((test) => {
                const r = results[test.id];
                const isRunning = r?.status === "running";

                return (
                  <Pressable
                    key={test.id}
                    style={[
                      styles.testCard,
                      r?.status === "success" && styles.testCardSuccess,
                      r?.status === "error" && styles.testCardError,
                    ]}
                    onPress={() => runTest(test)}
                    disabled={isRunning}
                  >
                    <View style={styles.testTop}>
                      <Text style={styles.testName} numberOfLines={1}>
                        {test.name}
                      </Text>
                      {isRunning && (
                        <ActivityIndicator size="small" color="#6366F1" />
                      )}
                      {r?.elapsed != null && (
                        <Text style={styles.testElapsed}>
                          {r.elapsed.toFixed(0)}ms
                        </Text>
                      )}
                    </View>
                    {r?.value && (
                      <Text style={styles.testValue} numberOfLines={2}>
                        {r.value}
                      </Text>
                    )}
                    {r?.error && (
                      <Text style={styles.testError} numberOfLines={2}>
                        {r.error}
                      </Text>
                    )}
                  </Pressable>
                );
              })}
            </View>
          ))}

          <View style={{ height: 60 }} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// ─── Styles ───

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#1E293B",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F8FAFC",
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 70,
    alignItems: "center",
  },
  runAllBtn: {
    backgroundColor: "#6366F1",
  },
  clearBtn: {
    backgroundColor: "#334155",
  },
  actionBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  stats: {
    flex: 1,
    alignItems: "flex-end",
  },
  statText: {
    fontSize: 13,
    fontWeight: "600",
  },
  heartbeatRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 6,
  },
  heartbeatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  heartbeatText: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "monospace",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  testCard: {
    backgroundColor: "#1E293B",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#334155",
  },
  testCardSuccess: {
    borderLeftColor: "#10B981",
  },
  testCardError: {
    borderLeftColor: "#EF4444",
  },
  testTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  testName: {
    color: "#E2E8F0",
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
    marginRight: 8,
  },
  testElapsed: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "monospace",
  },
  testValue: {
    color: "#10B981",
    fontSize: 12,
    fontFamily: "monospace",
    marginTop: 4,
  },
  testError: {
    color: "#EF4444",
    fontSize: 12,
    fontFamily: "monospace",
    marginTop: 4,
  },
});
