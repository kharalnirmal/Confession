import { useId } from 'react'

type StandingPose = 'flower' | 'umbrella' | 'hands'

function Flower({ received = false }: { received?: boolean }) {
  return <g className={received ? 'received-flower' : 'offered-flower'} opacity={received ? 0 : 1}>
    <path d="M305 281L300 246" stroke="#718b63" strokeWidth="2"/>
    <path d="M303 266q-14-14-15-4q7 8 15 4M302 259q11-13 13-5q-4 8-13 5" fill="#8fa77b"/>
    <g fill="#ce8299"><path d="M298 249q-15-3-10-13q5-8 12 0q5-13 13-5q9 9-5 17Z"/><circle cx="301" cy="240" r="3.2" fill="#efd4a1"/></g>
    <path d="M296 237Q300 240 300 246M305 235Q302 240 303 245" stroke="#a96481" strokeWidth=".8" fill="none"/>
  </g>
}

function Eyes({ woman, relaxed = false, soft = false }: { woman?: boolean; relaxed?: boolean; soft?: boolean }) {
  return <g className={woman ? 'woman-eyes' : 'man-eyes'}>
    {[-11, 11].map((x) => <g key={x} transform={`translate(${x} 35) scale(1 ${soft ? .78 : 1})`}>
      {relaxed ? <path d="M-5 0Q0 4 5 0" stroke="#50383a" strokeWidth="1.25" fill="none" strokeLinecap="round"/> : <>
        <path d="M-5.5 0Q0-4.7 5.5 0Q0 3.8-5.5 0Z" fill="#f7e8dd"/>
        <ellipse cx={woman ? 1 : -1} cy="0" rx="2.15" ry="2.35" fill={woman ? '#795242' : '#674b3c'}/>
        <ellipse cx={woman ? 1 : -1} cy="0" rx="1.05" ry="1.6" fill="#302b2d"/>
        <circle cx={woman ? 1.65 : -.35} cy="-.85" r=".65" fill="#fff9ee"/>
        <path d="M-5.5 0Q0-4.7 5.5 0" stroke="#50383a" strokeWidth={woman ? 1.3 : 1.1} fill="none" strokeLinecap="round"/>
        <path d="M-4.5 3Q0 4.6 4 2.8" stroke="#b88270" strokeWidth=".65" fill="none" opacity=".65"/>
      </>}
      {woman && <path d="M-4-1.1l-1.5-1.4" stroke="#50383a" strokeWidth=".9" strokeLinecap="round"/>}
    </g>)}
  </g>
}

function WomanHead({ x, y, lean = 0, relaxed = false, soft = false }: { x: number; y: number; lean?: number; relaxed?: boolean; soft?: boolean }) {
  const id = useId().replace(/:/g, '')
  return <g className="woman-head" transform={`translate(${x} ${y}) rotate(${lean} 0 55)`}>
    <defs><radialGradient id={`${id}-skin`} cx="65%" cy="35%" r="75%"><stop stopColor="#f2c9af"/><stop offset=".55" stopColor="#e3af93"/><stop offset="1" stopColor="#bd826e"/></radialGradient></defs>
    <g transform="translate(0 55) scale(.87 .94) translate(0 -55)">
    <g className="woman-expression">
    <path d="M-24 19C-33-14 25-26 30 12C33 35 26 65 31 93L17 91C12 74 15 56 18 45L-17 43C-16 65-15 77-19 92L-31 88C-24 67-30 42-24 19" fill="#392a32"/>
    <path d="M-19 22C-18 3 19 0 22 24L20 43C16 58 3 64-9 54C-18 46-21 36-19 22" fill={`url(#${id}-skin)`}/>
    <path d="M-18 22Q-17 12-10 9Q-6 20 16 19" fill="none" stroke="#986858" strokeWidth="3" opacity=".2"/>
    <path d="M-18 34C-27 22-24 1-8-5C9-13 30-2 29 16L23 34L17 17C3 22-7 13-10 9C-10 24-17 25-18 34" fill="#49333a"/>
    <path d="M-20 6Q-9-7 10-3M-24 37Q-30 65-24 87M24 36Q20 65 26 88" fill="none" stroke="#775058" strokeWidth="1.3" opacity=".5"/>
    <path d="M-15 31q5-4 11-1M6 29q6-3 11 1" stroke="#67464a" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
    <Eyes woman relaxed={relaxed} soft={soft}/>
    <path d="M1 36Q-1 42-1 45L3 46M-2 47l2 .5" stroke="#b7806c" strokeWidth=".85" fill="none" strokeLinecap="round"/>
    <path d={soft ? 'M-4 50Q2 52 8 49Q5 54 0 53Z' : 'M-4 51Q2 49 7 50L10 49Q5 56-2 53Z'} fill="#b77376"/><path d={soft ? 'M-4 50Q2 53 8 49' : 'M-3 51Q3 53 9 50'} stroke="#8e555d" strokeWidth=".7" fill="none"/><path d="M0 54l5-.2" stroke="#efb7a3" strokeWidth=".7"/>
    <ellipse cx="-13" cy="45" rx="5" ry="2.5" fill="#d58c89" opacity=".55"/><ellipse cx="16" cy="43" rx="4" ry="2" fill="#d58c89" opacity=".45"/>
    <circle cx="-20" cy="42" r="2.3" fill="#ddbb7e"/><circle cx="22" cy="40" r="2.3" fill="#ddbb7e"/>
    <path d="M-6-6q7-5 15 1" stroke="#d2aa84" strokeWidth="2.8" fill="none"/>
    <g fill="none" strokeLinecap="round"><path d="M-16 3Q-5-6 6-3M-23 45Q-26 68-23 82M21 44Q18 64 24 83" stroke="#a9786b" strokeWidth=".8" opacity=".5"/><path d="M-20 51Q-24 72-20 86M25 10Q29 21 25 29" stroke="#241f2a" strokeWidth="1.1" opacity=".5"/></g>
    <g fill="none" strokeLinecap="round" aria-hidden="true">
      <path className="hair-wisp hair-wisp-left" d="M-25 44Q-31 64-28 82Q-26 88-30 92" stroke="#73505a" strokeWidth="1"/>
      <path className="hair-wisp hair-wisp-right" d="M25 46Q28 60 26 74Q25 83 30 87" stroke="#91665f" strokeWidth=".8" opacity=".7"/>
    </g>
    </g>
    </g>
  </g>
}

function ManHead({ x, y, lean = 0, relaxed = false, soft = false }: { x: number; y: number; lean?: number; relaxed?: boolean; soft?: boolean }) {
  const id = useId().replace(/:/g, '')
  return <g className="man-head" transform={`translate(${x} ${y}) rotate(${lean} 0 55)`}>
    <defs><radialGradient id={`${id}-skin`} cx="65%" cy="30%" r="80%"><stop stopColor="#e3b194"/><stop offset=".6" stopColor="#cf9679"/><stop offset="1" stopColor="#a66f5d"/></radialGradient></defs>
    <g transform="translate(0 55) scale(.9 .95) translate(0 -55)">
    <g className="man-expression">
    <ellipse cx="-22" cy="34" rx="6" ry="9" fill="#cf9679"/><ellipse cx="22" cy="33" rx="6" ry="9" fill="#cf9679"/>
    <path d="M-25 32q5-5 5 5M25 31q-5-4-5 5" stroke="#ae715e" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M-23 20C-25-1 24-5 25 20L22 44C15 59 0 65-15 49Z" fill={`url(#${id}-skin)`}/>
    <path d="M-23 30C-35 15-28-3-15-4C-12-15 4-12 9-8C28-11 35 5 27 25L20 32L17 10C2 19-7 14-14 9L-18 30Z" fill="#342b30"/>
    <path d="M-23 7Q-8-9 10-5M-15 4Q0-4 16-1" stroke="#665058" strokeWidth="1.4" fill="none"/>
    <path d="M-18 31q6-4 12-1M5 29q6-4 12-1" stroke="#513840" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <Eyes relaxed={relaxed} soft={soft}/>
    <ellipse cx="-18" cy="44" rx="4.5" ry="2" fill="#c17c76" opacity=".4"/><ellipse cx="18" cy="42" rx="4" ry="2" fill="#c17c76" opacity=".4"/>
    <path d="m0 36-2 9 4 1" stroke="#a96e5b" strokeWidth="1.2" fill="none"/><path d={soft ? 'M-7 49Q0 54 7 48' : 'M-7 51q7 4 14-1'} stroke="#8d5654" strokeWidth={soft ? 1.1 : 1.5} fill="none" strokeLinecap="round"/>
    <path d="M-15 48q4 12 15 12q11-2 17-13" stroke="#795452" strokeWidth="1.4" opacity=".35" fill="none"/>
    <path d="M-17 45Q-14 54-6 56M8 55Q16 52 19 44" stroke="#78564c" strokeWidth="3" opacity=".12" fill="none"/>
    <path d="M-1 36Q-3 41-2 44L2 45M-7 53Q0 55 5 52" stroke="#a46c5a" strokeWidth=".8" fill="none" strokeLinecap="round"/>
    <path d="M-22 11Q-12-2 0 0M-18 12Q-5 2 9 3M8-3Q21 0 24 12" stroke="#9b7966" strokeWidth=".75" opacity=".5" fill="none"/>
    </g>
    </g>
  </g>
}

function Woman({ pose }: { pose: StandingPose }) {
  return <g className="woman person-a">
    <path d="M230 349L233 405H245L250 352M258 351L261 405H273L273 348" fill="#e5b298"/>
    <path d="M230 403Q239 398 247 407L247 415H223Q220 409 230 403M260 403Q269 399 276 408L281 415H258Z" fill="#4d3543"/>
    <path d="M230 406h14M261 407h12" stroke="#b895a9" strokeWidth="2"/>
    {/* Sleeves are behind the dress so the torso covers their shoulder caps. */}
    <path d="M235 247Q214 268 218 302" stroke="#a88eae" strokeWidth="17" fill="none" strokeLinecap="round"/><path d="M218 300l1 15q2 7 7 3l-1-15" fill="#e5b298"/>
    <g className="receiving-arm">
      <path d={pose === 'hands' ? 'M273 246Q282 277 298 293' : pose === 'umbrella' ? 'M273 246Q287 268 308 268' : 'M273 245Q282 275 298 277'} stroke="#a88eae" strokeWidth="16" fill="none" strokeLinecap="round"/>
      {pose === 'flower' && <Flower received/>}
      <path d={pose === 'hands' ? 'M296 291q8 0 11 7l-4 5-10-7' : pose === 'umbrella' ? 'M302 266q12-4 14 2q-1 7-12 5' : 'M294 276q9-4 13 0q3 6-10 7'} fill="#e5b298"/>
      <path d={pose === 'hands' ? 'M296 294l5 4m-3-6 5 4' : pose === 'umbrella' ? 'M306 269l6 1m-5 2h5' : 'M297 279l6 1m-5 2h4'} stroke="#ba826e" strokeWidth=".75" fill="none" strokeLinecap="round"/>
    </g>
    <path d="M226 239Q235 222 252 222Q270 221 282 240L284 291L294 365Q258 381 218 363L230 291Z" fill="var(--dress-fill, #a88eae)"/>
    <path d="M240 226L252 248L266 226L261 286H239Z" fill="#fff0df"/>
    <path d="M244 221v-17h17v20l-9 12Z" fill="#d9a089"/>
    <path d="M244 208Q252 215 261 209V215Q253 222 244 216Z" fill="#a97160" opacity=".3"/>
    <path d="M230 290Q251 297 283 290M230 296Q250 302 285 296" stroke="#8b7396" strokeWidth="1.2" fill="none"/>
    <path d="M233 304Q231 332 229 356M244 307Q240 336 242 364M257 308Q255 338 259 367M270 305Q272 333 278 361" stroke="#c5abc8" strokeWidth="1.4" fill="none"/>
    <path d="M226 245Q230 258 228 280M278 250L281 278M222 359Q255 373 289 362" stroke="#765f84" strokeWidth="1" fill="none" opacity=".6"/>
    <path d="M234 300Q235 330 231 352M264 302Q262 337 267 362" stroke="#e0c9dc" strokeWidth="2.5" fill="none" opacity=".25"/>
    <path d="M239 240L237 284M268 241L272 284" stroke="#d5bfd8" strokeWidth="1.2"/><g fill="#e7d3d8"><circle cx="242" cy="252" r="1.5"/><circle cx="241" cy="267" r="1.5"/><circle cx="240" cy="281" r="1.5"/></g>
    <WomanHead x={252} y={163} lean={pose === 'hands' ? 4 : 1}/>
  </g>
}

function Man({ pose }: { pose: StandingPose }) {
  return <g className="man person-b">
    <g className="man-leg-back">
      <path d="M326 309L322 402H338L349 322L352 309Z" fill="#3a3f50"/>
      <path d="M329 329l-2 58M343 330l-5 57" stroke="#626374" strokeWidth="1.2" fill="none"/>
      <path d="M322 400Q332 396 341 405V415H313Q310 408 322 400" fill="#4a343b"/><path d="M315 412h25" stroke="#ba9a8a" strokeWidth="2"/>
    </g>
    <g className="man-leg-front">
      <path d="M347 309L350 402H369L373 309Z" fill="#404454"/>
      <path d="M358 328l5 60" stroke="#626374" strokeWidth="1.2" fill="none"/>
      <path d="M350 400Q361 396 370 406L378 415H349Z" fill="#4a343b"/><path d="M351 412h23" stroke="#ba9a8a" strokeWidth="2"/>
    </g>
    {/* Draw both arms before the shirt: shoulder joints belong behind the torso. */}
    <path d="M364 231Q382 261 373 289" stroke="#dda180" strokeWidth="17" fill="none" strokeLinecap="round"/><path d="M373 287l-2 18q-3 9-8 3l2-19" fill="#cf9679"/>
    <path d="M365 287l11 3" stroke="#4c414b" strokeWidth="4"/><circle cx="371" cy="289" r="3" fill="#d8c7b2"/>
    <g className={pose === 'flower' ? 'giving-arm' : 'man-inner-arm'}>
      <path d={pose === 'umbrella' ? 'M334 231Q323 254 310 256' : pose === 'hands' ? 'M334 232Q320 280 306 295' : 'M334 232Q328 267 307 278'} stroke="#dda180" strokeWidth="17" fill="none" strokeLinecap="round"/>
      {pose === 'flower' && <Flower/>}
      {pose !== 'umbrella' && <path d={pose === 'hands' ? 'M309 292q-10-3-13 5q2 7 9 7l9-8' : 'M312 275q-11-3-14 2q-1 7 11 7'} fill="#cf9679"/>}
      {pose !== 'umbrella' && <path d={pose === 'hands' ? 'M299 297q4-2 7 0m-6 3 5-1m-2-7 6 2' : 'M300 278l7 1m-6 2h5'} stroke="#a46f5c" strokeWidth=".8" fill="none" strokeLinecap="round"/>}
    </g>
    <path d="M326 218Q348 205 371 221L378 316Q350 329 321 316Z" fill="var(--shirt-fill, #dda180)"/>
    <path d="M339 213L349 231L359 213L359 316H338Z" fill="#f6e7d7"/>
    <path d="M340 213v-17h18v17l-8 13Z" fill="#bf846d"/>
    <path d="M340 199Q350 209 358 201V207Q350 216 340 207Z" fill="#8d5c50" opacity=".3"/>
    <path d="M337 215L331 230L339 241M359 215L369 229L360 241" fill="#e9b695" stroke="#ba816a" strokeWidth="1"/>
    <path d="M328 248h11v14h-11ZM363 247h10v14h-10Z" fill="#ca8d71"/><path d="M328 248h11M363 247h10" stroke="#f0c0a0" strokeWidth="1.2"/>
    <path d="M326 225L323 277M372 225L376 277M327 282l7-4M368 297l7 4M342 315V236" stroke="#986c5b" strokeWidth=".9" opacity=".55" fill="none"/>
    <g fill="#ac8973"><circle cx="344" cy="247" r="1"/><circle cx="344" cy="266" r="1"/><circle cx="344" cy="285" r="1"/><circle cx="344" cy="304" r="1"/></g>
    <path d="M325 319Q336 325 344 323M355 325l13-5M325 386l12 1M352 386l14 1" stroke="#242d3d" strokeWidth="1.2" opacity=".45" fill="none"/>
    <ManHead x={349} y={149} lean={pose === 'hands' ? -4 : -2}/>
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
    <path d="M262 229Q280 214 299 233L306 288L315 362Q282 374 247 360L258 286Z" fill="var(--dress-fill, #a88eae)"/><path d="M261 293Q258 322 254 355M275 298Q273 329 271 362M291 296Q292 329 297 363" stroke="#c5abc8" strokeWidth="1.5" fill="none"/>
    <path d="M307 222Q328 210 347 229L360 313Q332 326 302 315Z" fill="var(--shirt-fill, #dda180)"/>
    <path d="M321 220l7 16 10-17 1 96h-17Z" fill="#f6e7d7"/>
    <path d="M275 224v-21h16v23M319 221v-20h17v19" fill="#cf9679"/>
    <path d="M276 208q7 6 14 0M320 205q8 6 15 0" stroke="#a06c5d" strokeWidth="3" opacity=".3" fill="none"/>
    <path d="M263 282Q280 291 305 284M310 299l10 5m23-13 9 8M263 355Q282 364 307 358" fill="none" stroke="#796477" strokeWidth="1" opacity=".45"/>
    <WomanHead x={282} y={166} lean={10} relaxed/><ManHead x={326} y={157} lean={-9} relaxed/>
    <g className="hug-arms"><path d="M264 245Q263 281 321 272" stroke="#a88eae" strokeWidth="18" fill="none" strokeLinecap="round"/><path d="m318 272 14-3" stroke="#e5b298" strokeWidth="10" strokeLinecap="round"/>
      <path d="M342 239Q343 290 277 288" stroke="#dda180" strokeWidth="18" fill="none" strokeLinecap="round"/><path d="M280 288l-14-3" stroke="#cf9679" strokeWidth="10" strokeLinecap="round"/><path d="m267 283-1 6M271 284l-1 6" stroke="#b17c68" strokeWidth=".8"/>
      <path d="M267 249Q269 268 293 270M339 247Q338 272 312 279M281 284l-1 8M316 268l2 8" stroke="#8f6b68" strokeWidth=".9" opacity=".5" fill="none"/>
      <path d="M323 271l7-2m-6 4 5-1" stroke="#b17c68" strokeWidth=".8" strokeLinecap="round"/>
    </g>
  </g>
}

export function SeatedPair() {
  const id = useId().replace(/:/g, '')
  return <g className="seated-pair">
    <g className="garden-bench">
      <defs>
        <linearGradient id={`${id}-bench-wood`} x2="0" y2="1"><stop stopColor="#b69779"/><stop offset=".35" stopColor="#94735c"/><stop offset="1" stopColor="#624b42"/></linearGradient>
        <linearGradient id={`${id}-bench-iron`}><stop stopColor="#202c38"/><stop offset=".5" stopColor="#59616a"/><stop offset="1" stopColor="#28323e"/></linearGradient>
      </defs>
      <ellipse cx="300" cy="416" rx="98" ry="7" fill="#142238" opacity=".22"/>
      {/* Rear supports sit behind the timber; the seat has a visible top and front edge. */}
      <g fill="none" stroke={`url(#${id}-bench-iron)`} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M229 291V347L221 411M371 291V347L380 411M238 352L245 409M362 352L356 409"/>
        <path d="M225 376H241M365 376H375M239 361H362" strokeWidth="3"/>
      </g>
      {[294, 310, 326].map((y) => <g key={y}>
        <rect x="219" y={y} width="162" height="12" rx="2.5" fill={`url(#${id}-bench-wood)`} stroke="#594b45" strokeWidth=".8"/>
        <path d={`M224 ${y + 2}H376M226 ${y + 7}Q255 ${y + 5} 277 ${y + 8}T330 ${y + 7}T374 ${y + 8}`} stroke="#dbb58c" strokeWidth=".65" fill="none" opacity=".4"/>
        {[229, 371].map((x) => <circle key={x} cx={x} cy={y + 6} r="1.5" fill="#34363b" stroke="#b19a7b" strokeWidth=".5"/>)}
      </g>)}
      <path d="M222 340H378L386 350H214Z" fill="#b09375" stroke="#715848" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M218 344H381M216 348H384" stroke="#6b5447" strokeWidth="1"/>
      <path d="M214 350H386V357H214Z" fill={`url(#${id}-bench-wood)`} stroke="#594b45" strokeWidth=".8"/>
      <path d="M214 351H386" stroke="#d7b18a" strokeWidth="1" opacity=".6"/>
      <g fill="none" stroke={`url(#${id}-bench-iron)`} strokeWidth="4" strokeLinecap="round">
        <path d="M218 345V326Q218 319 226 319H237M382 345V326Q382 319 374 319H363"/>
        <path d="M216 412H227M240 411H250M352 411H362M375 412H385"/>
      </g>
    </g>
    <g className="seated-figures">
    <path d="M249 374Q247 392 247 408H258L267 373M275 374Q273 393 274 408H286L290 374" fill="#e5b298"/>
    <path d="M246 404Q255 403 260 411L260 416H239Q236 410 246 404M274 405Q283 402 289 410L294 416H271Z" fill="#4d3543"/>
    <path d="M308 337Q331 331 353 341L368 369L365 407H350L348 376L330 360L330 405H314L309 372L295 350Z" fill="#404454"/>
    <path d="M318 362L321 397M351 370L357 399" stroke="#646475" strokeWidth="1.3" fill="none"/>
    <path d="M314 402H331L335 414H306Q302 409 314 402M350 404H367L376 415H348Z" fill="#4a343b"/>
    <path d="M315 275Q300 262 285 279" stroke="#dda180" strokeWidth="16" fill="none" strokeLinecap="round"/>
    <path d="M303 268Q328 254 351 271L356 339Q334 351 302 340Z" fill="var(--shirt-fill, #dda180)"/>
    <path d="M321 261L329 277L338 262L341 338H320Z" fill="#f6e7d7"/>
    <path d="M320 268Q323 263 321 254L335 253Q334 263 338 267L330 274Z" fill="#bf846d"/>
    <path d="M322 255Q329 260 335 254L335 259Q328 265 323 260Z" fill="#956352" opacity=".3"/>
    <path d="M249 283Q268 268 289 280L299 339Q304 353 298 382Q271 394 236 379L243 347Z" fill="var(--dress-fill, #a88eae)"/>
    <path d="M269 280Q272 277 271 268L284 266Q281 276 285 280L277 287Z" fill="#d9a089"/>
    <path d="M272 268Q278 272 283 268L282 273Q277 278 272 274Z" fill="#a97160" opacity=".25"/>
    <path d="M263 280L277 292L288 280" fill="#fff0df"/>
    <path d="M247 350Q267 342 294 352M247 359L243 375M262 356L259 382M279 356L281 383" stroke="#c5abc8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M305 277Q303 303 308 325M345 278L349 321M320 295h18M321 301h17" stroke="#ab795f" strokeWidth=".9" fill="none" opacity=".5"/>
    <path d="M246 341Q268 351 296 342M244 373Q271 386 296 376" stroke="#7e688b" strokeWidth="1" fill="none" opacity=".6"/>
    <path d="M323 281v48" stroke="#c1aa94" strokeWidth=".8"/>
    <g fill="#bca18b"><circle cx="325" cy="286" r="1"/><circle cx="326" cy="301" r="1"/><circle cx="327" cy="317" r="1"/></g>
    <WomanHead x={278} y={216} lean={5} soft/><ManHead x={327} y={203} lean={-5} soft/>
    <path d="M251 292Q241 327 280 342" fill="none" stroke="#a88eae" strokeWidth="15" strokeLinecap="round"/>
    <path d="M346 282Q361 322 301 342" fill="none" stroke="#dda180" strokeWidth="16" strokeLinecap="round"/>
    <path d="M279 338Q285 337 291 340L302 338Q307 340 303 344L293 348Q285 348 278 344Z" fill="#cf9679"/>
    <path d="M280 339Q285 338 289 341L298 342Q303 341 304 343Q302 347 295 348L285 346Z" fill="#e5b298"/>
    <path d="M287 343l9 2m-7 .5 7 1m-12-6 3 2" stroke="#b27e69" strokeWidth=".7" fill="none" strokeLinecap="round"/>
    <path d="M239 414h20M273 414h19M308 412h25M351 413h23" stroke="#af9186" strokeWidth="1"/>
    </g>
  </g>
}
