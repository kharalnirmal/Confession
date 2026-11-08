import { BotanicalLeaf } from './BotanicalLeaf'

function Blossom({ x, y, scale = 1, index }: { x: number; y: number; scale?: number; index: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <g className={`sprig-blossom sprig-blossom-${index}`}>
      <g transform="translate(0 -9)">
      <path d="M-7 3L0 9L7 3" fill="#839376" stroke="#839376" strokeWidth="1" />
      <g fill={index % 2 ? '#e6c6cb' : '#d8b0c0'} stroke="#b98e9e" strokeWidth=".6">
        {[0, 72, 144, 216, 288].map((angle) => <g key={angle} transform={`rotate(${angle})`}>
          <path d="M0 2C-22-5-27-28-11-33C4-39 15-18 0 2Z" />
          <path d="M-2-5Q-12-15-10-26" fill="none" stroke="#fff3ed" strokeOpacity=".45" />
        </g>)}
      </g>
      <circle r="6" fill="#c5a264" />
      <g fill="#f9edd1"><circle cx="-2" cy="-2" r="1.3" /><circle cx="3" cy="0" r="1" /><circle cx="0" cy="3" r="1" /></g>
      </g>
    </g>
  </g>
}

function FlowerSprig({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 260 400" fill="none" aria-hidden="true">
    <g className="frame-stem" color="#7f926f" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 410C67 373 78 342 81 310" />
      <g transform="translate(81 310)">
        <g className="frame-crown">
          <path d="M0 0Q1-10 2-20Q4-42 10-63Q14-87 21-110Q27-130 35-145Q49-179 64-200" />
          <BotanicalLeaf x={2} y={-20} angle={-39} scale={1.05} />
          <BotanicalLeaf x={10} y={-63} angle={64} scale={1.1} />
          <BotanicalLeaf x={21} y={-110} angle={-30} scale={.95} />
          <BotanicalLeaf x={35} y={-145} angle={-18} scale={.7} />
          <g className="frame-branch frame-branch-one">
            <path d="M0 0Q45-24 77-67Q100-91 109-118" />
            <BotanicalLeaf x={77} y={-67} angle={-12} scale={.9} />
            <Blossom x={109} y={-118} scale={.8} index={1} />
          </g>
          <g transform="translate(10 -63)">
            <g className="frame-branch frame-branch-two">
              <path d="M0 0C-37-30-48-65-41-97" />
              <Blossom x={-41} y={-97} scale={.7} index={2} />
            </g>
          </g>
          <g transform="translate(35 -145)">
            <g className="frame-branch frame-branch-three">
              <path d="M0 0Q36-20 60-53Q79-78 83-103" />
              <BotanicalLeaf x={60} y={-53} angle={77} scale={.85} />
              <Blossom x={83} y={-103} scale={.65} index={3} />
            </g>
          </g>
          <Blossom x={64} y={-200} index={0} />
        </g>
      </g>
    </g>
  </svg>
}

export function FloralFrame() {
  return <div className="floral-frame" aria-hidden="true"><FlowerSprig className="flower-sprig flower-left" /><FlowerSprig className="flower-sprig flower-right" /><span className="loose-petal petal-one" /><span className="loose-petal petal-two" /><span className="loose-petal petal-three" /></div>
}
