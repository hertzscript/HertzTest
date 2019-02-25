# HertzTest

Comprehensive (soon) integration tests for the [HertzScript](https://github.com/Floofies/HertzScript) compiler!

## Usage

```shell
git clone https://github.com/trgwii/HertzTest.git
cd HertzTest
npm i
npm test
```

## Command-line options

### -o / --output

```shell
npm test -- -o
npm test -- --output
```

Show output from each compilation and run

### [testName]

```shell
npm test -- basic -o
npm test -- -o spawn
npm test -- generators basic
```

Filter tests based on test name (only run selected tests)
