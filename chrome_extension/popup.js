document.addEventListener('DOMContentLoaded', () => {
  const masterPhraseInput = document.getElementById('masterPhrase');
  const urlInput = document.getElementById('url');
  const lengthSlider = document.getElementById('passwordLength');
  const lengthValue = document.getElementById('lengthValue');
  const generatedPasswordInput = document.getElementById('generatedPassword');
  const generateButton = document.getElementById('generateButton');
  const copyButton = document.getElementById('copyButton');

  // Update length value display when slider changes
  lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
  });

  // Try to get current tab URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].url) {
      urlInput.value = tabs[0].url;
      
      // If master phrase is filled, auto-generate
      const masterPhrase = masterPhraseInput.value.trim();
      if (masterPhrase) {
        const passwordLength = parseInt(lengthSlider.value, 10);
        const password = generatePassword(masterPhrase, tabs[0].url, passwordLength);
        generatedPasswordInput.value = password;
      }
    }
  });

  // Auto-generate password when inputs change
  [masterPhraseInput, urlInput, lengthSlider].forEach(element => {
    element.addEventListener('input', () => {
      const masterPhrase = masterPhraseInput.value.trim();
      const url = urlInput.value.trim();
      if (masterPhrase && url) {
        const passwordLength = parseInt(lengthSlider.value, 10);
        const password = generatePassword(masterPhrase, url, passwordLength);
        generatedPasswordInput.value = password;
      }
    });
  });

  // Generate password based on master phrase and URL
  generateButton.addEventListener('click', () => {
    const masterPhrase = masterPhraseInput.value.trim();
    const url = urlInput.value.trim();
    const passwordLength = parseInt(lengthSlider.value, 10);

    if (!masterPhrase || !url) {
      alert('Please enter both a master phrase and a URL');
      return;
    }

    const password = generatePassword(masterPhrase, url, passwordLength);
    generatedPasswordInput.value = password;
  });

  // Copy generated password to clipboard
  copyButton.addEventListener('click', () => {
    if (!generatedPasswordInput.value) {
      alert('No password generated yet');
      return;
    }

    generatedPasswordInput.select();
    document.execCommand('copy');
    
    // Show copy feedback
    const originalText = copyButton.textContent;
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
      copyButton.textContent = originalText;
    }, 1500);
  });
});

// Extract domain from URL
function extractDomain(url) {
  try {
    // Handle URLs with or without protocol
    if (!url.includes('://')) {
      url = 'https://' + url;
    }
    
    const parsedUrl = new URL(url);
    // Get hostname (e.g., www.example.com) and remove 'www.' if present
    let domain = parsedUrl.hostname.replace(/^www\./, '');
    return domain;
  } catch (e) {
    // If URL parsing fails, return the original input
    return url;
  }
}

// Generate a deterministic password from master phrase and domain
function generatePassword(masterPhrase, url, length) {
  const domain = extractDomain(url);
  const seed = masterPhrase + '@' + domain;
  
  // Generate a simple hash from the seed
  let hash = '';
  for (let i = 0; i < seed.length; i++) {
    const charCode = seed.charCodeAt(i);
    hash += ((charCode * 31 + i) % 128).toString().padStart(3, '0');
  }
  
  // Define character sets
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '*#$!';
  const allChars = lowercase + uppercase + numbers + symbols;
  
  // Ensure all character types are included
  let password = '';
  password += lowercase.charAt(Math.abs(parseInt(hash.substring(0, 3)) % lowercase.length));
  password += uppercase.charAt(Math.abs(parseInt(hash.substring(3, 6)) % uppercase.length));
  password += numbers.charAt(Math.abs(parseInt(hash.substring(6, 9)) % numbers.length));
  password += symbols.charAt(Math.abs(parseInt(hash.substring(9, 12)) % symbols.length));
  
  // Fill the rest of the password
  while (password.length < length) {
    const pos = password.length;
    const hashPos = (pos * 3) % Math.max(hash.length - 3, 1);
    const charIndex = Math.abs(parseInt(hash.substring(hashPos, hashPos + 3)) % allChars.length);
    password += allChars.charAt(charIndex);
  }
  
  // Shuffle the password (using a deterministic shuffle)
  return shuffleString(password, hash);
}

// Deterministic shuffle based on the hash
function shuffleString(str, hash) {
  const arr = str.split('');
  
  for (let i = arr.length - 1; i > 0; i--) {
    // Use the hash to determine the swap index
    const hashPos = (i * 3) % Math.max(hash.length - 3, 1);
    const swapValue = parseInt(hash.substring(hashPos, hashPos + 3));
    const j = Math.abs(swapValue % (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
  
  return arr.join('');
} 