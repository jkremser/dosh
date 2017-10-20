[![Build Status](https://travis-ci.org/Jiri-Kremser/dosh.svg?branch=master)](https://travis-ci.org/Jiri-Kremser/dosh)
[![Coverage Status](https://coveralls.io/repos/github/Jiri-Kremser/dosh/badge.svg?branch=master)](https://coveralls.io/github/Jiri-Kremser/dosh?branch=master)
[![npm version](https://badge.fury.io/js/%40jkremser%2Fdosh.svg)](https://badge.fury.io/js/%40jkremser%2Fdosh)


Dosh
====
Very simple interactive tool that opens `/bin/bash` in one of the currently running Docker containers. It is a convenient way to run `docker exec -ti <hash> /bin/bash`.

## Installation

```
sudo npm install -g @jkremser/dosh
```

## Usage
```bash
dosh
```

[![asciicast](https://asciinema.org/a/143174.png)](https://asciinema.org/a/143174?autoplay=1)

## Tests

```bash
npm test
```
