[![Build Status](https://travis-ci.org/Jiri-Kremser/dosh.svg?branch=master)](https://travis-ci.org/Jiri-Kremser/dosh)
[![Coverage Status](https://coveralls.io/repos/github/Jiri-Kremser/dosh/badge.svg?branch=master)](https://coveralls.io/github/Jiri-Kremser/dosh?branch=master)
[![npm version](https://badge.fury.io/js/%40jkremser%2Fdosh.svg)](https://badge.fury.io/js/%40jkremser%2Fdosh)


Dosh
====
Very simple interactive tool that opens `/bin/bash` in one of the currently running Docker containers. It is a convenient way to run `docker exec -ti <hash> /bin/bash`.

This tool assumes that `docker` can be run whithout sudo.

## Installation

```
sudo npm install -g @jkremser/dosh
```

## Usage
```bash
dosh
```
<a href="https://asciinema.org/a/143174?autoplay=1&rows=35"><img src="https://asciinema.org/a/143174.png" width="600" ></a>

## Tests

```bash
npm test
```
