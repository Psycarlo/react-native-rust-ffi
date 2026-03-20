## Getting Started

### Requirements

- [rust toolchain](https://rust-lang.org/tools/install/)
- [node](https://nodejs.org/en)
- [pnpm](https://pnpm.io/installation)
- [just](https://github.com/casey/just) (optional)

### Setup environment

Follow [this expo guide](https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated&mode=development-build).

### Setup

1. Install dependencies

```bash
pnpm install --ignore-scripts
```

2. Generate bindings

```bash
just generate
# or
bash generate.sh
```

Note: To generate bindings for iOS, you need to be on macOS.

### Run

1. Go to example app

```bash
cd expo-example
```

2. Run

```bash
pnpm run ios --device
pnpm run android --device
```
