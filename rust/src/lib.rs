use std::sync::Mutex;
use std::time::Instant;

// ---------------------------------------------------------------------------
// Sync — fast
// ---------------------------------------------------------------------------

pub fn add(a: i64, b: i64) -> i64 {
    a + b
}

pub fn concatenate(a: &str, b: &str) -> String {
    format!("{}{}", a, b)
}

pub fn reverse_string(input: &str) -> String {
    input.chars().rev().collect()
}

// ---------------------------------------------------------------------------
// Sync — slow (CPU-bound)
// ---------------------------------------------------------------------------

pub fn fibonacci(n: u32) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => {
            let mut a: u64 = 0;
            let mut b: u64 = 1;
            for _ in 2..=n {
                let tmp = a + b;
                a = b;
                b = tmp;
            }
            b
        }
    }
}

pub fn is_prime(n: u64) -> bool {
    if n < 2 {
        return false;
    }
    if n == 2 || n == 3 {
        return true;
    }
    if n % 2 == 0 || n % 3 == 0 {
        return false;
    }
    let mut i = 5;
    while i * i <= n {
        if n % i == 0 || n % (i + 2) == 0 {
            return false;
        }
        i += 6;
    }
    true
}

pub fn count_primes(limit: u64) -> u64 {
    let mut count = 0u64;
    for n in 2..=limit {
        if is_prime(n) {
            count += 1;
        }
    }
    count
}

// ---------------------------------------------------------------------------
// Blocking
// ---------------------------------------------------------------------------

pub fn blocking_hash_iterations(input: &str, iterations: u32) -> String {
    let mut result = input.to_string();
    for _ in 0..iterations {
        result = result
            .chars()
            .rev()
            .enumerate()
            .map(|(i, c)| {
                let shifted = (c as u32).wrapping_add(i as u32 + 1);
                char::from_u32(shifted).unwrap_or(c)
            })
            .collect();
    }
    result
}

// ---------------------------------------------------------------------------
// Counter (stateful)
// ---------------------------------------------------------------------------

pub struct Counter {
    inner: Mutex<i64>,
}

impl Counter {
    pub fn new(initial: i64) -> Self {
        Counter {
            inner: Mutex::new(initial),
        }
    }

    pub fn increment(&self) -> i64 {
        let mut val = self.inner.lock().unwrap();
        *val += 1;
        *val
    }

    pub fn decrement(&self) -> i64 {
        let mut val = self.inner.lock().unwrap();
        *val -= 1;
        *val
    }

    pub fn add(&self, amount: i64) -> i64 {
        let mut val = self.inner.lock().unwrap();
        *val += amount;
        *val
    }

    pub fn get(&self) -> i64 {
        *self.inner.lock().unwrap()
    }

    pub fn reset(&self) -> i64 {
        let mut val = self.inner.lock().unwrap();
        let old = *val;
        *val = 0;
        old
    }
}

// ---------------------------------------------------------------------------
// Bytes / binary data
// ---------------------------------------------------------------------------

pub fn compute_sha256_simple(data: &[u8]) -> Vec<u8> {
    // Simple non-crypto hash for testing — NOT real sha256
    let mut hash = [0u8; 32];
    for (i, byte) in data.iter().enumerate() {
        hash[i % 32] ^= byte;
        hash[(i + 1) % 32] = hash[(i + 1) % 32].wrapping_add(*byte);
    }
    hash.to_vec()
}

pub fn generate_random_bytes(size: u32) -> Vec<u8> {
    let mut bytes = Vec::with_capacity(size as usize);
    let mut state: u64 = 12345678;
    for _ in 0..size {
        // Simple LCG PRNG
        state = state.wrapping_mul(6364136223846793005).wrapping_add(1);
        bytes.push((state >> 33) as u8);
    }
    bytes
}

// ---------------------------------------------------------------------------
// Vec as input / large payloads
// ---------------------------------------------------------------------------

pub fn sum_numbers(numbers: &[i64]) -> i64 {
    numbers.iter().sum()
}

pub fn sort_numbers(numbers: &[i64]) -> Vec<i64> {
    let mut sorted = numbers.to_vec();
    sorted.sort();
    sorted
}

pub fn generate_large_string(size_kb: u32) -> String {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let total_chars = (size_kb as usize) * 1024;
    (0..total_chars)
        .map(|i| chars.as_bytes()[i % chars.len()] as char)
        .collect()
}

// ---------------------------------------------------------------------------
// Float precision
// ---------------------------------------------------------------------------

pub fn float_multiply(a: f64, b: f64) -> f64 {
    a * b
}

pub fn float_divide_safe(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 {
        None
    } else {
        Some(a / b)
    }
}

// ---------------------------------------------------------------------------
// Benchmark helpers
// ---------------------------------------------------------------------------

pub fn timed_fibonacci(n: u32) -> (String, u64) {
    let start = Instant::now();
    let fib = fibonacci(n);
    let elapsed = start.elapsed().as_millis() as u64;
    (fib.to_string(), elapsed)
}

pub fn timed_count_primes(limit: u64) -> (String, u64) {
    let start = Instant::now();
    let count = count_primes(limit);
    let elapsed = start.elapsed().as_millis() as u64;
    (count.to_string(), elapsed)
}
