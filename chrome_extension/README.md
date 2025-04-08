# DumbPass - Simple Password Generator

A Chrome extension for generating secure, deterministic passwords based on a master phrase and URL.

## Features

- Generate passwords based on a master phrase and URL
- Passwords are deterministic - same inputs always produce the same password
- Passwords contain a mix of lowercase letters, uppercase letters, numbers, and symbols
- Adjustable password length (8-20 characters)
- Copy passwords to clipboard with one click
- No data storage - everything is generated on the fly

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the directory containing this extension
5. The DumbPass icon should appear in your browser toolbar

## Usage

1. Click the DumbPass icon in your browser toolbar
2. Enter your master phrase (this should be something secure that you'll remember)
3. Enter the URL for which you need a password (or let it automatically use the current tab's URL)
4. Adjust the password length using the slider
5. Click "Generate Password"
6. Click "Copy" to copy the password to your clipboard

## How It Works

DumbPass generates passwords deterministically, which means:
- The same master phrase + URL will always generate the same password
- No need to store passwords anywhere - just remember your master phrase
- Different websites get different passwords

## Security Notes

- Your master phrase is never stored or transmitted
- All password generation happens locally in your browser
- Always use a strong, unique master phrase that you don't use elsewhere 