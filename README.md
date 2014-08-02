# betterreads

> A faster, cleaner, more beautiful app for goodreads users.

## Team

  - __Development Team Members__: [Austen Talbot](github.com/austentalbot), [Adam Price](github.com/aesprice)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Famo.us
- Cordova / PhoneGap

## Development

### Installing Dependencies

In order to run this app, you'll need the Famo.us engine and framework. These are in git submodules.
YOU CANNOT PULL DOWN THESE SUBMODULES UNLESS YOU HAVE ACCESS TO THE FAMOUS INTERNAL GROUP.

To install the submodules from the root directory:
```sh
git submodule update --init --recursive
```
Then you can open ```www/index.html``` in your browser.

You may be able to run the app if you manually install the Famo.us engine from the publicly-released Famo.us starter kit ([download here](http://code.famo.us/famous-starter-kit/famous-starter-kit.zip?source=top)).
As Famo.us is brand-new technology and very much in flux, we cannot guarantee the compatibility of the public release with this project.

To run this as a mobile app, you'll need Cordova and the PhoneGap CLI.
To run from the root directory:

```sh
npm install -g cordova
npm install -g phonegap
phonegap run ios
```

This will start the app in the iOS Simulator (requires a Mac, XCode, and the iOS Simulator app).
You can try to run this app on other devices, but it's designed to primarily run on iOS.

### Tasks

See the projects backlog in asana [here](https://app.asana.com/0/15184101732174/15243864919419)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
