/** SHA-256 via Web Crypto. Returns null where the API is unavailable (e.g. insecure context). */
export async function sha256(text: string): Promise<string | null> {
  try {
    if (!crypto?.subtle) return null;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
  } catch { return null; }
}

/** Hash chain: h(n) = sha256(h(n-1) + item(n)). */
export async function hashChain(items: string[]): Promise<(string | null)[]> {
  const out: (string | null)[] = [];
  let prev = '';
  for (const item of items) {
    const h = await sha256(prev + item);
    out.push(h);
    prev = h ?? '';
  }
  return out;
}
