// Function to generate a deterministic hash from the input string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Function to get a character from a specific character set based on a number
function getCharFromSet(num: number, charSet: string): string {
  return charSet[num % charSet.length];
}

// Function to extract base URL (domain) from a full URL
export function extractBaseUrl(url: string): string {
  try {
    // Handle empty URL
    if (!url) return '';

    // Add protocol if missing to make URL parsing work
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
    const urlObject = new URL(urlWithProtocol);
    
    // Return only the hostname (domain)
    return urlObject.hostname;
  } catch (e) {
    // If URL parsing fails, try basic string manipulation
    return url
      .replace(/^https?:\/\//, '') // Remove protocol
      .split('/')[0] // Get first part of path
      .split('?')[0] // Remove query parameters
      .split('#')[0]; // Remove hash
  }
}

export function generatePassword(masterPhrase: string, url: string): string {
  const combinedInput = `${masterPhrase}:${url}`;
  const hash = hashString(combinedInput);
  
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '*#$!';
  
  // Generate a 16-character password
  let password = '';
  const hashStr = hash.toString();
  
  // Ensure at least one of each character type
  password += getCharFromSet(hash, uppercase);
  password += getCharFromSet(hash + 1, lowercase);
  password += getCharFromSet(hash + 2, numbers);
  password += getCharFromSet(hash + 3, symbols);
  
  // Fill the rest with a mix of characters
  const allChars = lowercase + uppercase + numbers + symbols;
  for (let i = 4; i < 16; i++) {
    const charIndex = hashString(hashStr + i.toString());
    password += getCharFromSet(charIndex, allChars);
  }
  
  // Shuffle the password
  const shuffled = password.split('')
    .map((char, i) => ({ char, sort: hashString(hashStr + char + i.toString()) }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ char }) => char)
    .join('');
  
  return shuffled;
}