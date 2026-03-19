use once_cell::sync::Lazy;
use tokio::runtime::Runtime;

static RUNTIME: Lazy<Runtime> = Lazy::new(|| {
    tokio::runtime::Builder::new_multi_thread()
        .enable_all()
        .build()
        .expect("Failed to create Tokio runtime")
});

// ---------------------------------------------------------------------------
// Types (defined here so uniffi can derive on them)
// ---------------------------------------------------------------------------

pub enum SortField {
    Username,
    Email,
    Age,
    FollowerCount,
    CreatedAt,
}

pub enum SortOrder {
    Ascending,
    Descending,
}

pub enum AppEvent {
    Started,
    Progress { percent: f64, description: String },
    DataReceived { payload: String },
    Completed { result: String },
    Error { code: u32, message: String },
}

#[derive(Debug)]
pub enum RustFfiError {
    InvalidInput { message: String },
    Timeout { duration_ms: u64 },
    NotFound { item: String },
    InternalError { message: String },
}

impl std::fmt::Display for RustFfiError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            RustFfiError::InvalidInput { message } => write!(f, "Invalid input: {}", message),
            RustFfiError::Timeout { duration_ms } => write!(f, "Timeout after {} ms", duration_ms),
            RustFfiError::NotFound { item } => write!(f, "Not found: {}", item),
            RustFfiError::InternalError { message } => write!(f, "Internal error: {}", message),
        }
    }
}

impl std::error::Error for RustFfiError {}

pub struct UserProfile {
    pub username: String,
    pub email: String,
    pub display_name: Option<String>,
    pub bio: Option<String>,
    pub age: Option<u32>,
    pub avatar_url: Option<String>,
    pub website: Option<String>,
    pub location: Option<String>,
    pub is_verified: bool,
    pub follower_count: u64,
}

pub struct SearchOptions {
    pub query: String,
    pub page: Option<u32>,
    pub per_page: Option<u32>,
    pub sort_by: Option<SortField>,
    pub sort_order: Option<SortOrder>,
    pub filter_verified: Option<bool>,
    pub min_age: Option<u32>,
    pub max_age: Option<u32>,
    pub location: Option<String>,
    pub include_inactive: Option<bool>,
}

pub struct SearchResult {
    pub users: Vec<UserProfile>,
    pub total_count: u64,
    pub page: u32,
    pub per_page: u32,
    pub has_next_page: bool,
}

pub struct FakeApiResponse {
    pub id: u64,
    pub title: String,
    pub body: String,
    pub tags: Vec<String>,
}

pub struct TimedResult {
    pub result: String,
    pub elapsed_ms: u64,
}

// Nested object: Address inside ContactInfo
pub struct Address {
    pub street: String,
    pub city: String,
    pub state: Option<String>,
    pub zip: String,
    pub country: String,
}

pub struct ContactInfo {
    pub name: String,
    pub email: String,
    pub phone: Option<String>,
    pub address: Option<Address>,
    pub tags: Vec<String>,
    pub metadata: std::collections::HashMap<String, String>,
}

// ---------------------------------------------------------------------------
// Callback interfaces
// ---------------------------------------------------------------------------

pub trait ProgressCallback: Send + Sync {
    fn on_progress(&self, current: u64, total: u64, message: String);
    fn on_complete(&self, result: String);
    fn on_error(&self, error: String);
}

pub trait EventListener: Send + Sync {
    fn on_event(&self, event: AppEvent);
}

// ---------------------------------------------------------------------------
// Counter — wraps the core Counter
// ---------------------------------------------------------------------------

pub struct Counter {
    inner: rust_core::Counter,
}

impl Counter {
    pub fn new(initial: i64) -> Self {
        Counter {
            inner: rust_core::Counter::new(initial),
        }
    }

    pub fn increment(&self) -> i64 {
        self.inner.increment()
    }

    pub fn decrement(&self) -> i64 {
        self.inner.decrement()
    }

    pub fn add(&self, amount: i64) -> i64 {
        self.inner.add(amount)
    }

    pub fn get(&self) -> i64 {
        self.inner.get()
    }

    pub fn reset(&self) -> i64 {
        self.inner.reset()
    }
}

// ---------------------------------------------------------------------------
// Sync — fast
// ---------------------------------------------------------------------------

fn add(a: i64, b: i64) -> i64 {
    rust_core::add(a, b)
}

fn concatenate(a: String, b: String) -> String {
    rust_core::concatenate(&a, &b)
}

fn reverse_string(input: String) -> String {
    rust_core::reverse_string(&input)
}

// ---------------------------------------------------------------------------
// Sync — slow
// ---------------------------------------------------------------------------

fn fibonacci(n: u32) -> u64 {
    rust_core::fibonacci(n)
}

fn is_prime(n: u64) -> bool {
    rust_core::is_prime(n)
}

fn count_primes(limit: u64) -> u64 {
    rust_core::count_primes(limit)
}

// ---------------------------------------------------------------------------
// Async — fast
// ---------------------------------------------------------------------------

async fn async_greet(name: String) -> String {
    format!("Hello, {}!", name)
}

async fn async_add(a: i64, b: i64) -> i64 {
    a + b
}

// ---------------------------------------------------------------------------
// Async — slow
// ---------------------------------------------------------------------------

async fn async_sleep_ms(ms: u64) -> String {
    RUNTIME
        .spawn(async move {
            tokio::time::sleep(std::time::Duration::from_millis(ms)).await;
            format!("Slept for {} ms", ms)
        })
        .await
        .unwrap()
}

async fn async_fetch_fake_data(delay_ms: u64) -> FakeApiResponse {
    RUNTIME
        .spawn(async move {
            tokio::time::sleep(std::time::Duration::from_millis(delay_ms)).await;
            FakeApiResponse {
                id: 42,
                title: "Fake response".to_string(),
                body: "This is simulated data after async delay".to_string(),
                tags: vec!["rust".to_string(), "ffi".to_string(), "async".to_string()],
            }
        })
        .await
        .unwrap()
}

async fn async_count_primes(limit: u64) -> u64 {
    RUNTIME
        .spawn(async move {
            tokio::task::spawn_blocking(move || rust_core::count_primes(limit))
                .await
                .unwrap_or(0)
        })
        .await
        .unwrap()
}

// ---------------------------------------------------------------------------
// Blocking
// ---------------------------------------------------------------------------

fn blocking_hash_iterations(input: String, iterations: u32) -> String {
    rust_core::blocking_hash_iterations(&input, iterations)
}

fn blocking_sleep_ms(ms: u64) -> String {
    std::thread::sleep(std::time::Duration::from_millis(ms));
    format!("Blocked for {} ms", ms)
}

// ---------------------------------------------------------------------------
// Many params
// ---------------------------------------------------------------------------

fn create_user_profile(
    username: String,
    email: String,
    display_name: Option<String>,
    bio: Option<String>,
    age: Option<u32>,
    avatar_url: Option<String>,
    website: Option<String>,
    location: Option<String>,
    is_verified: bool,
    follower_count: u64,
) -> UserProfile {
    UserProfile {
        username,
        email,
        display_name,
        bio,
        age,
        avatar_url,
        website,
        location,
        is_verified,
        follower_count,
    }
}

fn search_users(options: SearchOptions) -> SearchResult {
    let page = options.page.unwrap_or(1);
    let per_page = options.per_page.unwrap_or(10);

    let users: Vec<UserProfile> = (0..per_page)
        .map(|i| UserProfile {
            username: format!("user_{}_{}", options.query, i),
            email: format!("user{}@example.com", i),
            display_name: Some(format!("User {}", i)),
            bio: None,
            age: Some(20 + i),
            avatar_url: None,
            website: None,
            location: options.location.clone(),
            is_verified: options.filter_verified.unwrap_or(false),
            follower_count: (i as u64) * 100,
        })
        .collect();

    SearchResult {
        total_count: 100,
        page,
        per_page,
        has_next_page: page * per_page < 100,
        users,
    }
}

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------

fn divide(a: f64, b: f64) -> Result<f64, RustFfiError> {
    if b == 0.0 {
        Err(RustFfiError::InvalidInput {
            message: "Division by zero".to_string(),
        })
    } else {
        Ok(a / b)
    }
}

async fn async_fetch_with_timeout(
    delay_ms: u64,
    timeout_ms: u64,
) -> Result<String, RustFfiError> {
    if delay_ms > timeout_ms {
        return Err(RustFfiError::Timeout {
            duration_ms: timeout_ms,
        });
    }
    RUNTIME
        .spawn(async move {
            tokio::time::sleep(std::time::Duration::from_millis(delay_ms)).await;
            format!("Fetched data after {} ms", delay_ms)
        })
        .await
        .map_err(|e| RustFfiError::InternalError {
            message: e.to_string(),
        })
}

// ---------------------------------------------------------------------------
// Callbacks
// ---------------------------------------------------------------------------

async fn async_process_with_progress(
    steps: u32,
    delay_per_step_ms: u64,
    callback: Box<dyn ProgressCallback>,
) -> String {
    RUNTIME
        .spawn(async move {
            for i in 0..steps {
                tokio::time::sleep(std::time::Duration::from_millis(delay_per_step_ms)).await;
                callback.on_progress(
                    (i + 1) as u64,
                    steps as u64,
                    format!("Processing step {}/{}", i + 1, steps),
                );
            }
            let result = format!("Completed {} steps", steps);
            callback.on_complete(result.clone());
            result
        })
        .await
        .unwrap()
}

fn blocking_process_with_progress(
    steps: u32,
    delay_per_step_ms: u64,
    callback: Box<dyn ProgressCallback>,
) -> String {
    for i in 0..steps {
        std::thread::sleep(std::time::Duration::from_millis(delay_per_step_ms));
        callback.on_progress(
            (i + 1) as u64,
            steps as u64,
            format!("Processing step {}/{}", i + 1, steps),
        );
    }
    let result = format!("Completed {} steps", steps);
    callback.on_complete(result.clone());
    result
}

// ---------------------------------------------------------------------------
// Benchmark helpers
// ---------------------------------------------------------------------------

fn timed_fibonacci(n: u32) -> TimedResult {
    let (result, elapsed_ms) = rust_core::timed_fibonacci(n);
    TimedResult { result, elapsed_ms }
}

fn timed_count_primes(limit: u64) -> TimedResult {
    let (result, elapsed_ms) = rust_core::timed_count_primes(limit);
    TimedResult { result, elapsed_ms }
}

// ---------------------------------------------------------------------------
// Bytes / binary data
// ---------------------------------------------------------------------------

fn compute_sha256_simple(data: Vec<u8>) -> Vec<u8> {
    rust_core::compute_sha256_simple(&data)
}

fn generate_random_bytes(size: u32) -> Vec<u8> {
    rust_core::generate_random_bytes(size)
}

fn bytes_to_hex(data: Vec<u8>) -> String {
    data.iter().map(|b| format!("{:02x}", b)).collect()
}

fn hex_to_bytes(hex: String) -> Result<Vec<u8>, RustFfiError> {
    if hex.len() % 2 != 0 {
        return Err(RustFfiError::InvalidInput {
            message: "Hex string must have even length".to_string(),
        });
    }
    (0..hex.len())
        .step_by(2)
        .map(|i| {
            u8::from_str_radix(&hex[i..i + 2], 16).map_err(|_| RustFfiError::InvalidInput {
                message: format!("Invalid hex at position {}", i),
            })
        })
        .collect()
}

// ---------------------------------------------------------------------------
// Vec as input
// ---------------------------------------------------------------------------

fn sum_numbers(numbers: Vec<i64>) -> i64 {
    rust_core::sum_numbers(&numbers)
}

fn sort_numbers(numbers: Vec<i64>) -> Vec<i64> {
    rust_core::sort_numbers(&numbers)
}

fn filter_strings_by_length(strings: Vec<String>, min_length: u32) -> Vec<String> {
    strings
        .into_iter()
        .filter(|s| s.len() >= min_length as usize)
        .collect()
}

// ---------------------------------------------------------------------------
// Large payloads
// ---------------------------------------------------------------------------

fn generate_large_string(size_kb: u32) -> String {
    rust_core::generate_large_string(size_kb)
}

async fn async_generate_large_string(size_kb: u32) -> String {
    RUNTIME
        .spawn(async move {
            tokio::task::spawn_blocking(move || rust_core::generate_large_string(size_kb))
                .await
                .unwrap_or_default()
        })
        .await
        .unwrap()
}

// ---------------------------------------------------------------------------
// HashMap / key-value
// ---------------------------------------------------------------------------

fn create_metadata(
    keys: Vec<String>,
    values: Vec<String>,
) -> std::collections::HashMap<String, String> {
    keys.into_iter().zip(values.into_iter()).collect()
}

fn merge_metadata(
    base: std::collections::HashMap<String, String>,
    overrides: std::collections::HashMap<String, String>,
) -> std::collections::HashMap<String, String> {
    let mut result = base;
    result.extend(overrides);
    result
}

fn get_metadata_value(
    metadata: std::collections::HashMap<String, String>,
    key: String,
) -> Option<String> {
    metadata.get(&key).cloned()
}

// ---------------------------------------------------------------------------
// Nullable returns
// ---------------------------------------------------------------------------

fn find_user_by_name(name: String) -> Option<UserProfile> {
    if name.is_empty() {
        None
    } else {
        Some(UserProfile {
            username: name.clone(),
            email: format!("{}@example.com", name.to_lowercase()),
            display_name: Some(name),
            bio: None,
            age: None,
            avatar_url: None,
            website: None,
            location: None,
            is_verified: false,
            follower_count: 0,
        })
    }
}

async fn async_find_user_by_name(name: String, delay_ms: u64) -> Option<UserProfile> {
    RUNTIME
        .spawn(async move {
            tokio::time::sleep(std::time::Duration::from_millis(delay_ms)).await;
            find_user_by_name(name)
        })
        .await
        .unwrap()
}

// ---------------------------------------------------------------------------
// Nested objects
// ---------------------------------------------------------------------------

fn create_contact_info(
    name: String,
    email: String,
    phone: Option<String>,
    address: Option<Address>,
    tags: Vec<String>,
    metadata: std::collections::HashMap<String, String>,
) -> ContactInfo {
    ContactInfo {
        name,
        email,
        phone,
        address,
        tags,
        metadata,
    }
}

fn get_contact_address(contact: ContactInfo) -> Option<Address> {
    contact.address
}

// ---------------------------------------------------------------------------
// Float precision
// ---------------------------------------------------------------------------

fn float_multiply(a: f64, b: f64) -> f64 {
    rust_core::float_multiply(a, b)
}

fn float_divide_safe(a: f64, b: f64) -> Option<f64> {
    rust_core::float_divide_safe(a, b)
}

// ---------------------------------------------------------------------------
// Async + throws + callback combo
// ---------------------------------------------------------------------------

async fn async_process_with_validation(
    steps: u32,
    delay_per_step_ms: u64,
    callback: Box<dyn ProgressCallback>,
) -> Result<String, RustFfiError> {
    if steps == 0 {
        callback.on_error("Steps must be > 0".to_string());
        return Err(RustFfiError::InvalidInput {
            message: "Steps must be greater than zero".to_string(),
        });
    }
    if steps > 100 {
        callback.on_error("Too many steps".to_string());
        return Err(RustFfiError::InvalidInput {
            message: "Steps must be <= 100".to_string(),
        });
    }
    RUNTIME
        .spawn(async move {
            for i in 0..steps {
                tokio::time::sleep(std::time::Duration::from_millis(delay_per_step_ms)).await;
                callback.on_progress(
                    (i + 1) as u64,
                    steps as u64,
                    format!("Validated step {}/{}", i + 1, steps),
                );
            }
            let result = format!("Validated and completed {} steps", steps);
            callback.on_complete(result.clone());
            result
        })
        .await
        .map_err(|e| RustFfiError::InternalError {
            message: e.to_string(),
        })
}

uniffi::include_scaffolding!("rustffi");
