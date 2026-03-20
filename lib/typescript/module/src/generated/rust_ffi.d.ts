import { type UniffiByteArray, type UniffiGcObject, type UniffiHandle, FfiConverterObject, RustBuffer, UniffiAbstractObject, destructorGuardSymbol, pointerLiteralSymbol, uniffiTypeNameSymbol } from "uniffi-bindgen-react-native";
export declare function add(a: bigint, b: bigint): bigint;
export declare function asyncAdd(a: bigint, b: bigint, asyncOpts_?: {
    signal: AbortSignal;
}): Promise</*i64*/ bigint>;
export declare function asyncCountPrimes(limit: bigint, asyncOpts_?: {
    signal: AbortSignal;
}): Promise</*u64*/ bigint>;
export declare function asyncFetchFakeData(delayMs: bigint, asyncOpts_?: {
    signal: AbortSignal;
}): Promise<FakeApiResponse>;
export declare function asyncFetchWithTimeout(delayMs: bigint, timeoutMs: bigint, asyncOpts_?: {
    signal: AbortSignal;
}): Promise<string>;
export declare function asyncFindUserByName(name: string, delayMs: bigint, asyncOpts_?: {
    signal: AbortSignal;
}): Promise<UserProfile | undefined>;
export declare function asyncGenerateLargeString(sizeKb: number, asyncOpts_?: {
    signal: AbortSignal;
}): Promise<string>;
export declare function asyncGreet(name: string, asyncOpts_?: {
    signal: AbortSignal;
}): Promise<string>;
export declare function asyncProcessWithProgress(steps: number, delayPerStepMs: bigint, callback: ProgressCallback, asyncOpts_?: {
    signal: AbortSignal;
}): Promise<string>;
export declare function asyncProcessWithValidation(steps: number, delayPerStepMs: bigint, callback: ProgressCallback, asyncOpts_?: {
    signal: AbortSignal;
}): Promise<string>;
export declare function asyncSleepMs(ms: bigint, asyncOpts_?: {
    signal: AbortSignal;
}): Promise<string>;
export declare function blockingHashIterations(input: string, iterations: number): string;
export declare function blockingProcessWithProgress(steps: number, delayPerStepMs: bigint, callback: ProgressCallback): string;
export declare function blockingSleepMs(ms: bigint): string;
export declare function bytesToHex(data: Array</*u8*/ number>): string;
export declare function computeSha256Simple(data: Array</*u8*/ number>): Array</*u8*/ number>;
export declare function concatenate(a: string, b: string): string;
export declare function countPrimes(limit: bigint): bigint;
export declare function createContactInfo(name: string, email: string, phone: string | undefined, address: Address | undefined, tags: Array<string>, metadata: Map<string, string>): ContactInfo;
export declare function createMetadata(keys: Array<string>, values: Array<string>): Map<string, string>;
export declare function createUserProfile(username: string, email: string, displayName: string | undefined, bio: string | undefined, age: /*u32*/ number | undefined, avatarUrl: string | undefined, website: string | undefined, location: string | undefined, isVerified: boolean, followerCount: bigint): UserProfile;
export declare function divide(a: number, b: number): number;
export declare function fibonacci(n: number): bigint;
export declare function filterStringsByLength(strings: Array<string>, minLength: number): Array<string>;
export declare function findUserByName(name: string): UserProfile | undefined;
export declare function floatDivideSafe(a: number, b: number): /*f64*/ number | undefined;
export declare function floatMultiply(a: number, b: number): number;
export declare function generateLargeString(sizeKb: number): string;
export declare function generateRandomBytes(size: number): Array</*u8*/ number>;
export declare function getContactAddress(contact: ContactInfo): Address | undefined;
export declare function getMetadataValue(metadata: Map<string, string>, key: string): string | undefined;
export declare function hexToBytes(hex: string): Array</*u8*/ number>;
export declare function isPrime(n: bigint): boolean;
export declare function mergeMetadata(base: Map<string, string>, overrides: Map<string, string>): Map<string, string>;
export declare function reverseString(input: string): string;
export declare function searchUsers(options: SearchOptions): SearchResult;
export declare function sortNumbers(numbers: Array</*i64*/ bigint>): Array</*i64*/ bigint>;
export declare function subscribe(event: string, listener: EventListener, asyncOpts_?: {
    signal: AbortSignal;
}): Promise<SubscriptionInterface>;
export declare function sumNumbers(numbers: Array</*i64*/ bigint>): bigint;
export declare function timedCountPrimes(limit: bigint): TimedResult;
export declare function timedFibonacci(n: number): TimedResult;
export interface EventListener {
    onEvent(event: AppEvent): void;
}
export interface ProgressCallback {
    onProgress(current: bigint, total: bigint, message: string): void;
    onComplete(result: string): void;
    onError(error: string): void;
}
export type Address = {
    street: string;
    city: string;
    state: string | undefined;
    zip: string;
    country: string;
};
/**
 * Generated factory for {@link Address} record objects.
 */
export declare const Address: Readonly<{
    /**
     * Create a frozen instance of {@link Address}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    create: (partial: Partial<Address> & Required<Omit<Address, never>>) => Address;
    /**
     * Create a frozen instance of {@link Address}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    new: (partial: Partial<Address> & Required<Omit<Address, never>>) => Address;
    /**
     * Defaults specified in the {@link rust_ffi} crate.
     */
    defaults: () => Partial<Address>;
}>;
export type ContactInfo = {
    name: string;
    email: string;
    phone: string | undefined;
    address: Address | undefined;
    tags: Array<string>;
    metadata: Map<string, string>;
};
/**
 * Generated factory for {@link ContactInfo} record objects.
 */
export declare const ContactInfo: Readonly<{
    /**
     * Create a frozen instance of {@link ContactInfo}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    create: (partial: Partial<ContactInfo> & Required<Omit<ContactInfo, never>>) => ContactInfo;
    /**
     * Create a frozen instance of {@link ContactInfo}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    new: (partial: Partial<ContactInfo> & Required<Omit<ContactInfo, never>>) => ContactInfo;
    /**
     * Defaults specified in the {@link rust_ffi} crate.
     */
    defaults: () => Partial<ContactInfo>;
}>;
export type FakeApiResponse = {
    id: bigint;
    title: string;
    body: string;
    tags: Array<string>;
};
/**
 * Generated factory for {@link FakeApiResponse} record objects.
 */
export declare const FakeApiResponse: Readonly<{
    /**
     * Create a frozen instance of {@link FakeApiResponse}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    create: (partial: Partial<FakeApiResponse> & Required<Omit<FakeApiResponse, never>>) => FakeApiResponse;
    /**
     * Create a frozen instance of {@link FakeApiResponse}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    new: (partial: Partial<FakeApiResponse> & Required<Omit<FakeApiResponse, never>>) => FakeApiResponse;
    /**
     * Defaults specified in the {@link rust_ffi} crate.
     */
    defaults: () => Partial<FakeApiResponse>;
}>;
export type SearchOptions = {
    query: string;
    page: /*u32*/ number | undefined;
    perPage: /*u32*/ number | undefined;
    sortBy: SortField | undefined;
    sortOrder: SortOrder | undefined;
    filterVerified: boolean | undefined;
    minAge: /*u32*/ number | undefined;
    maxAge: /*u32*/ number | undefined;
    location: string | undefined;
    includeInactive: boolean | undefined;
};
/**
 * Generated factory for {@link SearchOptions} record objects.
 */
export declare const SearchOptions: Readonly<{
    /**
     * Create a frozen instance of {@link SearchOptions}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    create: (partial: Partial<SearchOptions> & Required<Omit<SearchOptions, never>>) => SearchOptions;
    /**
     * Create a frozen instance of {@link SearchOptions}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    new: (partial: Partial<SearchOptions> & Required<Omit<SearchOptions, never>>) => SearchOptions;
    /**
     * Defaults specified in the {@link rust_ffi} crate.
     */
    defaults: () => Partial<SearchOptions>;
}>;
export type SearchResult = {
    users: Array<UserProfile>;
    totalCount: bigint;
    page: number;
    perPage: number;
    hasNextPage: boolean;
};
/**
 * Generated factory for {@link SearchResult} record objects.
 */
export declare const SearchResult: Readonly<{
    /**
     * Create a frozen instance of {@link SearchResult}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    create: (partial: Partial<SearchResult> & Required<Omit<SearchResult, never>>) => SearchResult;
    /**
     * Create a frozen instance of {@link SearchResult}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    new: (partial: Partial<SearchResult> & Required<Omit<SearchResult, never>>) => SearchResult;
    /**
     * Defaults specified in the {@link rust_ffi} crate.
     */
    defaults: () => Partial<SearchResult>;
}>;
export type TimedResult = {
    result: string;
    elapsedMs: bigint;
};
/**
 * Generated factory for {@link TimedResult} record objects.
 */
export declare const TimedResult: Readonly<{
    /**
     * Create a frozen instance of {@link TimedResult}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    create: (partial: Partial<TimedResult> & Required<Omit<TimedResult, never>>) => TimedResult;
    /**
     * Create a frozen instance of {@link TimedResult}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    new: (partial: Partial<TimedResult> & Required<Omit<TimedResult, never>>) => TimedResult;
    /**
     * Defaults specified in the {@link rust_ffi} crate.
     */
    defaults: () => Partial<TimedResult>;
}>;
export type UserProfile = {
    username: string;
    email: string;
    displayName: string | undefined;
    bio: string | undefined;
    age: /*u32*/ number | undefined;
    avatarUrl: string | undefined;
    website: string | undefined;
    location: string | undefined;
    isVerified: boolean;
    followerCount: bigint;
};
/**
 * Generated factory for {@link UserProfile} record objects.
 */
export declare const UserProfile: Readonly<{
    /**
     * Create a frozen instance of {@link UserProfile}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    create: (partial: Partial<UserProfile> & Required<Omit<UserProfile, never>>) => UserProfile;
    /**
     * Create a frozen instance of {@link UserProfile}, with defaults specified
     * in Rust, in the {@link rust_ffi} crate.
     */
    new: (partial: Partial<UserProfile> & Required<Omit<UserProfile, never>>) => UserProfile;
    /**
     * Defaults specified in the {@link rust_ffi} crate.
     */
    defaults: () => Partial<UserProfile>;
}>;
export declare enum AppEvent_Tags {
    Started = "Started",
    Progress = "Progress",
    DataReceived = "DataReceived",
    Completed = "Completed",
    Error = "Error"
}
export declare const AppEvent: Readonly<{
    instanceOf: (obj: any) => obj is AppEvent;
    Started: {
        new (): {
            readonly tag: AppEvent_Tags.Started;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
        "new"(): {
            readonly tag: AppEvent_Tags.Started;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
        instanceOf(obj: any): obj is {
            readonly tag: AppEvent_Tags.Started;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
    };
    Progress: {
        new (inner: {
            percent: number;
            description: string;
        }): {
            readonly tag: AppEvent_Tags.Progress;
            readonly inner: Readonly<{
                percent: number;
                description: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
        "new"(inner: {
            percent: number;
            description: string;
        }): {
            readonly tag: AppEvent_Tags.Progress;
            readonly inner: Readonly<{
                percent: number;
                description: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
        instanceOf(obj: any): obj is {
            readonly tag: AppEvent_Tags.Progress;
            readonly inner: Readonly<{
                percent: number;
                description: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
    };
    DataReceived: {
        new (inner: {
            payload: string;
        }): {
            readonly tag: AppEvent_Tags.DataReceived;
            readonly inner: Readonly<{
                payload: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
        "new"(inner: {
            payload: string;
        }): {
            readonly tag: AppEvent_Tags.DataReceived;
            readonly inner: Readonly<{
                payload: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
        instanceOf(obj: any): obj is {
            readonly tag: AppEvent_Tags.DataReceived;
            readonly inner: Readonly<{
                payload: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
    };
    Completed: {
        new (inner: {
            result: string;
        }): {
            readonly tag: AppEvent_Tags.Completed;
            readonly inner: Readonly<{
                result: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
        "new"(inner: {
            result: string;
        }): {
            readonly tag: AppEvent_Tags.Completed;
            readonly inner: Readonly<{
                result: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
        instanceOf(obj: any): obj is {
            readonly tag: AppEvent_Tags.Completed;
            readonly inner: Readonly<{
                result: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
    };
    Error: {
        new (inner: {
            code: number;
            message: string;
        }): {
            readonly tag: AppEvent_Tags.Error;
            readonly inner: Readonly<{
                code: number;
                message: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
        "new"(inner: {
            code: number;
            message: string;
        }): {
            readonly tag: AppEvent_Tags.Error;
            readonly inner: Readonly<{
                code: number;
                message: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
        instanceOf(obj: any): obj is {
            readonly tag: AppEvent_Tags.Error;
            readonly inner: Readonly<{
                code: number;
                message: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "AppEvent";
        };
    };
}>;
export type AppEvent = InstanceType<(typeof AppEvent)[keyof Omit<typeof AppEvent, "instanceOf">]>;
export declare enum RustFfiError_Tags {
    InvalidInput = "InvalidInput",
    Timeout = "Timeout",
    NotFound = "NotFound",
    InternalError = "InternalError"
}
export declare const RustFfiError: Readonly<{
    instanceOf: (obj: any) => obj is RustFfiError;
    InvalidInput: {
        new (inner: {
            message: string;
        }): {
            readonly tag: RustFfiError_Tags.InvalidInput;
            readonly inner: Readonly<{
                message: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        "new"(inner: {
            message: string;
        }): {
            readonly tag: RustFfiError_Tags.InvalidInput;
            readonly inner: Readonly<{
                message: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        instanceOf(obj: any): obj is {
            readonly tag: RustFfiError_Tags.InvalidInput;
            readonly inner: Readonly<{
                message: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        hasInner(obj: any): obj is {
            readonly tag: RustFfiError_Tags.InvalidInput;
            readonly inner: Readonly<{
                message: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        getInner(obj: {
            readonly tag: RustFfiError_Tags.InvalidInput;
            readonly inner: Readonly<{
                message: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        }): Readonly<{
            message: string;
        }>;
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
    Timeout: {
        new (inner: {
            durationMs: bigint;
        }): {
            readonly tag: RustFfiError_Tags.Timeout;
            readonly inner: Readonly<{
                durationMs: bigint;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        "new"(inner: {
            durationMs: bigint;
        }): {
            readonly tag: RustFfiError_Tags.Timeout;
            readonly inner: Readonly<{
                durationMs: bigint;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        instanceOf(obj: any): obj is {
            readonly tag: RustFfiError_Tags.Timeout;
            readonly inner: Readonly<{
                durationMs: bigint;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        hasInner(obj: any): obj is {
            readonly tag: RustFfiError_Tags.Timeout;
            readonly inner: Readonly<{
                durationMs: bigint;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        getInner(obj: {
            readonly tag: RustFfiError_Tags.Timeout;
            readonly inner: Readonly<{
                durationMs: bigint;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        }): Readonly<{
            durationMs: bigint;
        }>;
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
    NotFound: {
        new (inner: {
            item: string;
        }): {
            readonly tag: RustFfiError_Tags.NotFound;
            readonly inner: Readonly<{
                item: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        "new"(inner: {
            item: string;
        }): {
            readonly tag: RustFfiError_Tags.NotFound;
            readonly inner: Readonly<{
                item: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        instanceOf(obj: any): obj is {
            readonly tag: RustFfiError_Tags.NotFound;
            readonly inner: Readonly<{
                item: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        hasInner(obj: any): obj is {
            readonly tag: RustFfiError_Tags.NotFound;
            readonly inner: Readonly<{
                item: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        getInner(obj: {
            readonly tag: RustFfiError_Tags.NotFound;
            readonly inner: Readonly<{
                item: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        }): Readonly<{
            item: string;
        }>;
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
    InternalError: {
        new (inner: {
            message: string;
        }): {
            readonly tag: RustFfiError_Tags.InternalError;
            readonly inner: Readonly<{
                message: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        "new"(inner: {
            message: string;
        }): {
            readonly tag: RustFfiError_Tags.InternalError;
            readonly inner: Readonly<{
                message: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        instanceOf(obj: any): obj is {
            readonly tag: RustFfiError_Tags.InternalError;
            readonly inner: Readonly<{
                message: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        hasInner(obj: any): obj is {
            readonly tag: RustFfiError_Tags.InternalError;
            readonly inner: Readonly<{
                message: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        getInner(obj: {
            readonly tag: RustFfiError_Tags.InternalError;
            readonly inner: Readonly<{
                message: string;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "RustFfiError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        }): Readonly<{
            message: string;
        }>;
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
}>;
export type RustFfiError = InstanceType<(typeof RustFfiError)[keyof Omit<typeof RustFfiError, "instanceOf">]>;
export declare enum SortField {
    Username = 0,
    Email = 1,
    Age = 2,
    FollowerCount = 3,
    CreatedAt = 4
}
export declare enum SortOrder {
    Ascending = 0,
    Descending = 1
}
export interface CounterInterface {
    add(amount: bigint): bigint;
    decrement(): bigint;
    get(): bigint;
    increment(): bigint;
    reset(): bigint;
}
export declare class Counter extends UniffiAbstractObject implements CounterInterface {
    readonly [uniffiTypeNameSymbol] = "Counter";
    readonly [destructorGuardSymbol]: UniffiGcObject;
    readonly [pointerLiteralSymbol]: UniffiHandle;
    constructor(initial: bigint);
    add(amount: bigint): bigint;
    decrement(): bigint;
    get(): bigint;
    increment(): bigint;
    reset(): bigint;
    /**
     * {@inheritDoc uniffi-bindgen-react-native#UniffiAbstractObject.uniffiDestroy}
     */
    uniffiDestroy(): void;
    static instanceOf(obj: any): obj is Counter;
}
export interface SubscriptionInterface {
    cancel(): void;
    isActive(): boolean;
}
export declare class Subscription extends UniffiAbstractObject implements SubscriptionInterface {
    readonly [uniffiTypeNameSymbol] = "Subscription";
    readonly [destructorGuardSymbol]: UniffiGcObject;
    readonly [pointerLiteralSymbol]: UniffiHandle;
    private constructor();
    cancel(): void;
    isActive(): boolean;
    /**
     * {@inheritDoc uniffi-bindgen-react-native#UniffiAbstractObject.uniffiDestroy}
     */
    uniffiDestroy(): void;
    static instanceOf(obj: any): obj is Subscription;
}
/**
 * This should be called before anything else.
 *
 * It is likely that this is being done for you by the library's `index.ts`.
 *
 * It checks versions of uniffi between when the Rust scaffolding was generated
 * and when the bindings were generated.
 *
 * It also initializes the machinery to enable Rust to talk back to Javascript.
 */
declare function uniffiEnsureInitialized(): void;
declare const _default: Readonly<{
    initialize: typeof uniffiEnsureInitialized;
    converters: {
        FfiConverterTypeAddress: {
            read(from: RustBuffer): Address;
            write(value: Address, into: RustBuffer): void;
            allocationSize(value: Address): number;
            lift(value: UniffiByteArray): Address;
            lower(value: Address): UniffiByteArray;
        };
        FfiConverterTypeAppEvent: {
            read(from: RustBuffer): AppEvent;
            write(value: AppEvent, into: RustBuffer): void;
            allocationSize(value: AppEvent): number;
            lift(value: UniffiByteArray): AppEvent;
            lower(value: AppEvent): UniffiByteArray;
        };
        FfiConverterTypeContactInfo: {
            read(from: RustBuffer): ContactInfo;
            write(value: ContactInfo, into: RustBuffer): void;
            allocationSize(value: ContactInfo): number;
            lift(value: UniffiByteArray): ContactInfo;
            lower(value: ContactInfo): UniffiByteArray;
        };
        FfiConverterTypeCounter: FfiConverterObject<CounterInterface>;
        FfiConverterTypeFakeApiResponse: {
            read(from: RustBuffer): FakeApiResponse;
            write(value: FakeApiResponse, into: RustBuffer): void;
            allocationSize(value: FakeApiResponse): number;
            lift(value: UniffiByteArray): FakeApiResponse;
            lower(value: FakeApiResponse): UniffiByteArray;
        };
        FfiConverterTypeRustFfiError: {
            read(from: RustBuffer): RustFfiError;
            write(value: RustFfiError, into: RustBuffer): void;
            allocationSize(value: RustFfiError): number;
            lift(value: UniffiByteArray): RustFfiError;
            lower(value: RustFfiError): UniffiByteArray;
        };
        FfiConverterTypeSearchOptions: {
            read(from: RustBuffer): SearchOptions;
            write(value: SearchOptions, into: RustBuffer): void;
            allocationSize(value: SearchOptions): number;
            lift(value: UniffiByteArray): SearchOptions;
            lower(value: SearchOptions): UniffiByteArray;
        };
        FfiConverterTypeSearchResult: {
            read(from: RustBuffer): SearchResult;
            write(value: SearchResult, into: RustBuffer): void;
            allocationSize(value: SearchResult): number;
            lift(value: UniffiByteArray): SearchResult;
            lower(value: SearchResult): UniffiByteArray;
        };
        FfiConverterTypeSortField: {
            read(from: RustBuffer): SortField;
            write(value: SortField, into: RustBuffer): void;
            allocationSize(value: SortField): number;
            lift(value: UniffiByteArray): SortField;
            lower(value: SortField): UniffiByteArray;
        };
        FfiConverterTypeSortOrder: {
            read(from: RustBuffer): SortOrder;
            write(value: SortOrder, into: RustBuffer): void;
            allocationSize(value: SortOrder): number;
            lift(value: UniffiByteArray): SortOrder;
            lower(value: SortOrder): UniffiByteArray;
        };
        FfiConverterTypeSubscription: FfiConverterObject<SubscriptionInterface>;
        FfiConverterTypeTimedResult: {
            read(from: RustBuffer): TimedResult;
            write(value: TimedResult, into: RustBuffer): void;
            allocationSize(value: TimedResult): number;
            lift(value: UniffiByteArray): TimedResult;
            lower(value: TimedResult): UniffiByteArray;
        };
        FfiConverterTypeUserProfile: {
            read(from: RustBuffer): UserProfile;
            write(value: UserProfile, into: RustBuffer): void;
            allocationSize(value: UserProfile): number;
            lift(value: UniffiByteArray): UserProfile;
            lower(value: UserProfile): UniffiByteArray;
        };
    };
}>;
export default _default;
//# sourceMappingURL=rust_ffi.d.ts.map