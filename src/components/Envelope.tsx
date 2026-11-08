export function Envelope() {
  return (
    <svg className="envelope-art" viewBox="0 0 560 300" role="img" aria-labelledby="envelope-title">
      <title id="envelope-title">An ivory envelope tied with a gold thread and a little heart seal, with a flowering sprig tucked inside.</title>
      <defs>
        <linearGradient id="paper" x2="0.8" y2="1"><stop stopColor="#fffcf7" /><stop offset="1" stopColor="#f1e4d5" /></linearGradient>
        <linearGradient id="flap" x2="0" y2="1"><stop stopColor="#fffaf2" /><stop offset="1" stopColor="#f2e4d5" /></linearGradient>
        <radialGradient id="wax"><stop stopColor="#ca9c72" /><stop offset="1" stopColor="#ac7955" /></radialGradient>
        <filter id="envelope-shadow" x="-30%" y="-40%" width="160%" height="190%"><feDropShadow dx="0" dy="16" stdDeviation="13" floodColor="#705442" floodOpacity=".12" /></filter>
      </defs>
      <g fill="none" stroke="#a9aa8c" strokeWidth="2" strokeLinecap="round">
        <path d="M365 135Q380 67 433 22M386 87Q401 54 395 31M407 51L447 42" />
        <path d="M381 105Q359 83 369 64Q389 79 381 105M398 72Q416 72 429 57Q406 52 398 72M412 42Q408 18 420 12Q434 28 412 42" fill="#b3b69a" stroke="none" />
      </g>
      <g fill="#e7bdc3"><ellipse cx="435" cy="21" rx="10" ry="6" transform="rotate(-30 435 21)" /><ellipse cx="443" cy="28" rx="7" ry="10" transform="rotate(35 443 28)" /><ellipse cx="430" cy="32" rx="7" ry="9" transform="rotate(-40 430 32)" /><circle cx="436" cy="28" r="4" fill="#d0aa71" /></g>
      <g transform="rotate(-7 280 160)" filter="url(#envelope-shadow)">
        <rect x="104" y="72" width="352" height="193" rx="5" fill="url(#paper)" stroke="#dfceba" />
        <path d="M105 262L251 143Q280 126 309 143L455 262" fill="#f8eee1" stroke="#dfceba" />
        <path d="M105 76L264 183Q280 193 296 183L455 76" fill="url(#flap)" stroke="#dfceba" />
        <path d="M102 181C187 171 226 186 280 178S384 163 456 177" fill="none" stroke="#c4a36b" strokeWidth="1.3" />
        <path d="M280 73Q270 120 280 178T280 265" fill="none" stroke="#c4a36b" strokeWidth="1.3" />
        <path d="M280 178C250 163 244 143 258 145S281 165 280 178C300 150 318 154 310 167S288 179 280 178" fill="none" stroke="#c4a36b" strokeWidth="1.4" />
        <circle cx="280" cy="181" r="24" fill="url(#wax)" /><circle cx="280" cy="181" r="19" fill="none" stroke="#e1b98d" strokeOpacity=".7" />
        <path d="M280 190L270 181C261 171 275 165 280 175C286 165 299 172 290 181Z" fill="none" stroke="#f6ddbb" strokeWidth="1.5" />
      </g>
      <g fill="#b89862"><path d="M92 87l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" /><path d="M466 211l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" /><circle cx="133" cy="37" r="2" /><circle cx="467" cy="112" r="2" /></g>
    </svg>
  )
}
