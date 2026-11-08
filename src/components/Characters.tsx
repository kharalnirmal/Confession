type StandingPose = 'flower' | 'umbrella' | 'hands'

function WomanHead({ x, y, lean = 0 }: { x: number; y: number; lean?: number }) {
  return <g className="woman-head" transform={`translate(${x} ${y}) rotate(${lean} 0 30)`}>
    <g className="woman-expression">
    <path d="M-24 19C-33-14 25-26 30 12C33 35 26 65 31 93L17 91C12 74 15 56 18 45L-17 43C-16 65-15 77-19 92L-31 88C-24 67-30 42-24 19" fill="#392a32"/>
    <path d="M-19 22C-18 3 19 0 22 24L20 43C16 58 3 64-9 54C-18 46-21 36-19 22" fill="#e5b298"/>
    <path d="M-18 34C-27 22-24 1-8-5C9-13 30-2 29 16L23 34L17 17C3 22-7 13-10 9C-10 24-17 25-18 34" fill="#49333a"/>
    <path d="M-20 6Q-9-7 10-3M-24 37Q-30 65-24 87M24 36Q20 65 26 88" fill="none" stroke="#775058" strokeWidth="1.3" opacity=".5"/>
    <path d="M-15 31q5-4 11-1M6 29q6-3 11 1" stroke="#67464a" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
    <g className="woman-eyes"><path d="M-16 36q5-5 11-1M7 35q5-5 11-1" stroke="#422f38" strokeWidth="1.6" fill="none" strokeLinecap="round"/><ellipse cx="-10" cy="36" rx="2.2" ry="3.1" fill="#422f38"/><ellipse cx="12" cy="35" rx="2.2" ry="3.1" fill="#422f38"/><g fill="#fff7ec"><circle cx="-9.4" cy="35" r=".8"/><circle cx="12.6" cy="34" r=".8"/></g><path d="m-15 34-2-2m34 1 2-2" stroke="#422f38" strokeWidth="1.2" strokeLinecap="round"/></g>
    <path d="m2 36-2 9 4 1" stroke="#bd826f" strokeWidth="1.1" fill="none" strokeLinecap="round"/><path d="M-3 51q7 4 13-2q-5 1-7 0Z" fill="#ac6468"/>
    <ellipse cx="-13" cy="45" rx="5" ry="2.5" fill="#d58c89" opacity=".55"/><ellipse cx="16" cy="43" rx="4" ry="2" fill="#d58c89" opacity=".45"/>
    <circle cx="-20" cy="42" r="2.3" fill="#ddbb7e"/><circle cx="22" cy="40" r="2.3" fill="#ddbb7e"/>
    <path d="M-6-6q7-5 15 1" stroke="#d2aa84" strokeWidth="2.8" fill="none"/>
    </g>
  </g>
}

function ManHead({ x, y, lean = 0 }: { x: number; y: number; lean?: number }) {
  return <g className="man-head" transform={`translate(${x} ${y}) rotate(${lean} 0 30)`}>
    <g className="man-expression">
    <ellipse cx="-22" cy="34" rx="6" ry="9" fill="#cf9679"/><ellipse cx="22" cy="33" rx="6" ry="9" fill="#cf9679"/>
    <path d="M-25 32q5-5 5 5M25 31q-5-4-5 5" stroke="#ae715e" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M-23 20C-25-1 24-5 25 20L22 44C15 59 0 65-15 49Z" fill="#cf9679"/>
    <path d="M-23 30C-35 15-28-3-15-4C-12-15 4-12 9-8C28-11 35 5 27 25L20 32L17 10C2 19-7 14-14 9L-18 30Z" fill="#342b30"/>
    <path d="M-23 7Q-8-9 10-5M-15 4Q0-4 16-1" stroke="#665058" strokeWidth="1.4" fill="none"/>
    <path d="M-18 31q6-4 12-1M5 29q6-4 12-1" stroke="#513840" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <g className="man-eyes"><path d="M-18 36q5-3 10-1M6 34q5-3 10-1" stroke="#3d2d34" strokeWidth="1.3" fill="none" strokeLinecap="round"/><ellipse cx="-13" cy="37" rx="2" ry="2.6" fill="#3d2d34"/><ellipse cx="11" cy="35" rx="2" ry="2.6" fill="#3d2d34"/><g fill="#fff7ec"><circle cx="-12.5" cy="36" r=".7"/><circle cx="11.5" cy="34" r=".7"/></g></g>
    <ellipse cx="-18" cy="44" rx="4.5" ry="2" fill="#c17c76" opacity=".4"/><ellipse cx="18" cy="42" rx="4" ry="2" fill="#c17c76" opacity=".4"/>
    <path d="m0 36-2 9 4 1" stroke="#a96e5b" strokeWidth="1.2" fill="none"/><path d="M-7 51q7 4 14-1" stroke="#8d5654" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M-15 48q4 12 15 12q11-2 17-13" stroke="#795452" strokeWidth="1.4" opacity=".35" fill="none"/>
    </g>
  </g>
}

function Woman({ pose }: { pose: StandingPose }) {
  return <g className="woman person-a">
    <path d="M230 349L233 405H245L250 352M258 351L261 405H273L273 348" fill="#e5b298"/>
    <path d="M230 403Q239 398 247 407L247 415H223Q220 409 230 403M260 403Q269 399 276 408L281 415H258Z" fill="#4d3543"/>
    <path d="M230 406h14M261 407h12" stroke="#b895a9" strokeWidth="2"/>
    <path d="M226 239Q235 222 252 222Q270 221 282 240L284 291L294 365Q258 381 218 363L230 291Z" fill="var(--dress-fill, #a88eae)"/>
    <path d="M240 226L252 248L266 226L261 286H239Z" fill="#fff0df"/>
    <path d="M244 221v-17h17v20l-9 12Z" fill="#d9a089"/>
    <path d="M229 247Q214 268 218 302" stroke="#a88eae" strokeWidth="17" fill="none" strokeLinecap="round"/><path d="M218 300l1 15q2 7 7 3l-1-15" fill="#e5b298"/>
    <path d="M230 290Q251 297 283 290M230 296Q250 302 285 296" stroke="#8b7396" strokeWidth="1.2" fill="none"/>
    <path d="M233 304L229 356M244 307L242 364M257 308L259 367M270 305L278 361" stroke="#c5abc8" strokeWidth="1.6" fill="none"/>
    <path d="M239 240L237 284M268 241L272 284" stroke="#d5bfd8" strokeWidth="1.2"/><g fill="#e7d3d8"><circle cx="242" cy="252" r="1.5"/><circle cx="241" cy="267" r="1.5"/><circle cx="240" cy="281" r="1.5"/></g>
    <WomanHead x={252} y={163} lean={-4}/>
    <g className="receiving-arm">
      <path d={pose === 'hands' ? 'M278 246Q282 277 298 293' : pose === 'umbrella' ? 'M279 246Q287 268 308 268' : 'M278 245Q282 275 298 277'} stroke="#a88eae" strokeWidth="16" fill="none" strokeLinecap="round"/>
      <path d={pose === 'hands' ? 'M296 291q8 0 11 7l-4 5-10-7' : pose === 'umbrella' ? 'M302 266q12-4 14 2q-1 7-12 5' : 'M294 276q9-4 13 0q3 6-10 7'} fill="#e5b298"/>
    </g>
  </g>
}

function Man({ pose }: { pose: StandingPose }) {
  return <g className="man person-b">
    <path d="M326 309L322 402H338L349 322L350 402H369L373 309Z" fill="#404454"/>
    <path d="M349 327l-5 65M329 329l-2 58M358 328l5 60" stroke="#626374" strokeWidth="1.2" fill="none"/>
    <path d="M322 400Q332 396 341 405V415H313Q310 408 322 400M350 400Q361 396 370 406L378 415H349Z" fill="#4a343b"/><path d="M315 412h25M351 412h23" stroke="#ba9a8a" strokeWidth="2"/>
    <path d="M326 218Q348 205 371 221L378 316Q350 329 321 316Z" fill="var(--shirt-fill, #dda180)"/>
    <path d="M339 213L349 231L359 213L359 316H338Z" fill="#f6e7d7"/>
    <path d="M340 213v-17h18v17l-8 13Z" fill="#bf846d"/>
    <path d="M337 215L331 230L339 241M359 215L369 229L360 241" fill="#e9b695" stroke="#ba816a" strokeWidth="1"/>
    <path d="M328 248h11v14h-11ZM363 247h10v14h-10Z" fill="#ca8d71"/><path d="M328 248h11M363 247h10" stroke="#f0c0a0" strokeWidth="1.2"/>
    <path d="M368 231Q382 261 373 289" stroke="#dda180" strokeWidth="17" fill="none" strokeLinecap="round"/><path d="M373 287l-2 18q-3 9-8 3l2-19" fill="#cf9679"/>
    <path d="M365 287l11 3" stroke="#4c414b" strokeWidth="4"/><circle cx="371" cy="289" r="3" fill="#d8c7b2"/>
    <ManHead x={349} y={149} lean={4}/>
    <g className={pose === 'flower' ? 'giving-arm' : 'man-inner-arm'}>
    <path d={pose === 'umbrella' ? 'M327 231Q323 254 310 256' : pose === 'hands' ? 'M326 232Q320 280 306 295' : 'M326 232Q328 267 307 278'} stroke="#dda180" strokeWidth="17" fill="none" strokeLinecap="round"/>
    {pose === 'flower' && <g className="offered-flower"><path d="M305 281L300 246" stroke="#718b63" strokeWidth="2"/><path d="M303 266q-14-14-15-4q7 8 15 4M302 259q11-13 13-5q-4 8-13 5" fill="#8fa77b"/><g fill="#ce8299"><path d="M298 249q-15-3-10-13q5-8 12 0q5-13 13-5q9 9-5 17Z"/><circle cx="301" cy="240" r="3.2" fill="#efd4a1"/></g></g>}
    {pose !== 'umbrella' && <path d={pose === 'hands' ? 'M309 292q-10-3-13 5q2 7 9 7l9-8' : 'M312 275q-11-3-14 2q-1 7 11 7'} fill="#cf9679"/>}
    </g>
    <path d="M323 308Q348 316 376 307" stroke="#bd826a" strokeWidth="1.2" fill="none"/>
  </g>
}

export function StandingPair({ chapter }: { chapter: number }) {
  const pose: StandingPose = chapter === 0 ? 'flower' : chapter === 1 ? 'umbrella' : 'hands'
  return <g className={chapter === 1 ? 'couple-standing umbrella-couple' : 'couple-standing'}>
    <Woman pose={pose}/>
    <g className="umbrella-holder">
      <Man pose={pose}/>
      {pose === 'umbrella' && <>
        <g className="umbrella"><path d="M310 101V298q0 17-12 13q-6-2-5-9" stroke="#6a535f" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <g transform="translate(0 -28)">
          <path d="M182 151Q196 57 310 59Q422 59 440 151Q414 133 390 151Q370 133 350 151Q330 133 310 151Q287 133 266 151Q244 133 224 151Q202 133 182 151Z" fill="#9d83a8"/>
          <path d="M310 60Q265 86 266 151M310 60Q354 86 350 151M310 60Q218 82 224 151M310 60Q403 84 390 151M310 49v11" stroke="#d0b4d3" strokeWidth="1.6" fill="none"/>
          <path d="M191 131Q310 66 430 132" stroke="#ad92b7" strokeWidth="2" fill="none"/>
          </g>
        </g>
        <g className="umbrella-grip"><path d="M304 250q5-4 12 0l1 10q-6 6-13 1Z" fill="#cf9679"/><path d="M307 252h8M307 255h8M308 258h7" stroke="#ab735f" strokeWidth=".9" strokeLinecap="round"/></g>
      </>}
    </g>
  </g>
}

export function EmbracingPair() {
  return <g className="embrace">
    <path d="M259 345l-1 59h13l8-57M284 345l4 59h13l-1-60" fill="#e5b298"/>
    <path d="M257 402h17v12h-24q-3-6 7-12M287 402h15l6 12h-23" fill="#4d3543"/>
    <path d="M306 306l-2 96h17l10-81 7 81h18l-4-96Z" fill="#404454"/><path d="M304 400h20v14h-28M338 401h19l9 13h-28" fill="#4a343b"/>
    <path d="M262 229Q280 214 299 233L306 288L315 362Q282 374 247 360L258 286Z" fill="#a88eae"/><path d="M261 293L254 355M275 298L271 362M291 296L297 363" stroke="#c5abc8" strokeWidth="1.5"/>
    <path d="M307 222Q328 210 347 229L360 313Q332 326 302 315Z" fill="#dda180"/>
    <path d="M321 220l7 16 10-17 1 96h-17Z" fill="#f6e7d7"/>
    <path d="M275 224v-21h16v23M319 221v-20h17v19" fill="#cf9679"/>
    <WomanHead x={282} y={166} lean={17}/><ManHead x={326} y={157} lean={-15}/>
    <g className="hug-arms"><path d="M264 245Q263 281 321 272" stroke="#a88eae" strokeWidth="18" fill="none" strokeLinecap="round"/><path d="m318 272 14-3" stroke="#e5b298" strokeWidth="10" strokeLinecap="round"/>
      <path d="M342 239Q343 290 277 288" stroke="#dda180" strokeWidth="18" fill="none" strokeLinecap="round"/><path d="M280 288l-14-3" stroke="#cf9679" strokeWidth="10" strokeLinecap="round"/><path d="m267 283-1 6M271 284l-1 6" stroke="#b17c68" strokeWidth=".8"/></g>
  </g>
}

export function SeatedPair() {
  return <g className="seated-pair">
    <g className="garden-bench">
      <path d="M228 304H369M228 320H369" stroke="#8b756c" strokeWidth="10" strokeLinecap="round"/>
      <path d="M233 302V409M364 302V409" stroke="#544f50" strokeWidth="6" strokeLinecap="round"/>
      <path d="M220 348H378" stroke="#9c8474" strokeWidth="10" strokeLinecap="round"/>
    </g>
    <path d="M249 374L247 408H258L267 373M275 374L274 408H286L290 374" fill="#e5b298"/>
    <path d="M246 404Q255 403 260 411L260 416H239Q236 410 246 404M274 405Q283 402 289 410L294 416H271Z" fill="#4d3543"/>
    <path d="M308 337Q331 331 353 341L368 369L365 407H350L348 376L330 360L330 405H314L309 372L295 350Z" fill="#404454"/>
    <path d="M318 362L321 397M351 370L357 399" stroke="#646475" strokeWidth="1.3" fill="none"/>
    <path d="M314 402H331L335 414H306Q302 409 314 402M350 404H367L376 415H348Z" fill="#4a343b"/>
    <path d="M315 275Q300 262 285 279" stroke="#dda180" strokeWidth="16" fill="none" strokeLinecap="round"/>
    <path d="M303 268Q328 254 351 271L356 339Q334 351 302 340Z" fill="var(--shirt-fill, #dda180)"/>
    <path d="M321 261L329 277L338 262L341 338H320Z" fill="#f6e7d7"/>
    <path d="M322 263V243H338V263L330 273Z" fill="#bf846d"/>
    <path d="M249 283Q268 268 289 280L299 339Q304 353 298 382Q271 394 236 379L243 347Z" fill="var(--dress-fill, #a88eae)"/>
    <path d="M267 277V258H281V277L274 285Z" fill="#d9a089"/>
    <path d="M260 278L273 293L284 278" fill="#fff0df"/>
    <path d="M247 350Q267 342 294 352M247 359L243 375M262 356L259 382M279 356L281 383" stroke="#c5abc8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <WomanHead x={274} y={210} lean={8}/><ManHead x={330} y={196} lean={-4}/>
    <path d="M251 292Q241 327 280 342" fill="none" stroke="#a88eae" strokeWidth="15" strokeLinecap="round"/>
    <path d="M346 282Q361 322 301 342" fill="none" stroke="#dda180" strokeWidth="16" strokeLinecap="round"/>
    <path d="M280 341Q290 347 302 341" fill="none" stroke="#e5b298" strokeWidth="9" strokeLinecap="round"/>
    <path d="M289 341l2 4M293 341l2 4" stroke="#bc8575" strokeWidth=".8" strokeLinecap="round"/>
  </g>
}
