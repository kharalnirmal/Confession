import { raindrops, rainPose, rainImpacts, ripplePose, splashPose, umbrellaDripPose } from '../lib/rain'

const puddleOutline = 'M143 416C157 408 196 412 218 411C246 407 267 414 292 411C324 407 344 414 369 412C396 409 434 414 447 421C458 430 415 435 386 433C356 439 321 434 299 437C266 440 243 434 219 435C184 438 126 430 143 416Z'
const leftPuddle = 'M64 417C70 414 79 415 86 414C95 413 101 416 109 415C117 414 124 416 126 418C123 421 113 420 107 422C98 423 94 421 86 422C76 422 65 420 64 417Z'
const rightPuddle = 'M454 410C460 407 470 409 478 407C486 406 492 409 500 408C512 407 520 409 527 411C532 414 521 416 511 415C502 418 494 415 486 417C477 418 473 415 465 416C456 416 449 413 454 410Z'

export function RainGarden({ id }: { id: string }) {
  return <g aria-hidden="true">
    <defs>
      <clipPath id={`${id}-water-clip`}>
        <path d={puddleOutline}/><path d={leftPuddle}/><path d={rightPuddle}/>
      </clipPath>
      <linearGradient id={`${id}-reflection`} x2="0" y2="1">
        <stop stopColor="#a88eae" stopOpacity=".24"/><stop offset="1" stopColor="#cbb1c9" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id={`${id}-water-light`} x2="0" y2="1">
        <stop stopColor="#f8f7f6" stopOpacity=".65"/><stop offset="1" stopColor="#becbd4" stopOpacity=".1"/>
      </linearGradient>
    </defs>
    <ellipse cx="300" cy="210" rx="250" ry="205" fill={`url(#${id}-rain-mist)`}/>
    <g fill={`url(#${id}-puddle)`} stroke="#92a5b5" strokeOpacity=".22" strokeWidth=".65">
      <path d={puddleOutline}/>
      <path d={leftPuddle}/>
      <path d={rightPuddle}/>
    </g>
    <g clipPath={`url(#${id}-water-clip)`}>
      <path d="M249 414L236 447H298L282 414Z" fill={`url(#${id}-reflection)`}/>
      <path d="M324 414L315 445H353L346 414Z" fill="#c8927e" opacity=".12"/>
      <path d="M157 419Q215 414 269 420T432 422M179 430Q221 427 251 431M325 432Q358 428 390 431M73 417Q88 415 100 417M109 418L119 417M460 411Q474 408 486 411M498 412Q508 410 519 412" fill="none" stroke={`url(#${id}-water-light)`} strokeWidth="1.2" strokeLinecap="round"/>
      <g fill="none" stroke="#829cac" strokeWidth=".75">
        {rainImpacts.flatMap(([cx, cy], index) => [0, 1].map((ring) => {
          const ripple = ripplePose(index, 0, ring)
          return <ellipse key={`${index}-${ring}`} className="rain-ripple" cx={cx} cy={cy} rx={ripple.radius} ry={ripple.radius * .23} opacity={ripple.opacity}/>
        }))}
      </g>
    </g>
    <g mask={`url(#${id}-rain-shelter)`} stroke="#879dab" strokeLinecap="round">
      {raindrops.map((drop, index) => {
        const pose = rainPose(index, 0)
        return <path className="rain-streak" key={index} transform={`translate(${pose.x} ${pose.y})`} d={`M0 0l${-drop.length * .13} ${drop.length}`} strokeWidth={index % 3 === 0 ? 1.25 : .65} opacity={drop.opacity}/>
      })}
    </g>
    <g fill="none" stroke="#8ea7b8" strokeWidth=".85" strokeLinecap="round">
      {rainImpacts.map(([x, y], index) => {
        const splash = splashPose(index, 0)
        return <g key={index} transform={`translate(${x} ${y})`}>
          <path className="rain-splash" d="M-5-1L-7-4M0-2V-6M5-1L7-4" transform={`translate(0 ${-splash.height}) scale(${splash.spread} 1)`} opacity={splash.opacity}/>
        </g>
      })}
    </g>
    <g stroke="#9eb4c4" strokeWidth="1.1" strokeLinecap="round">
      {Array.from({ length: 6 }, (_, index) => {
        const drip = umbrellaDripPose(index, 0)
        return <path key={index} className="umbrella-drip" d={`M0 0v${drip.length}`} transform={`translate(${drip.x} ${drip.y})`} opacity={drip.opacity}/>
      })}
    </g>
  </g>
}
