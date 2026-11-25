import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Fade} from '../components/Cine';
import {ParallaxStars, Nebula, Sub, Tag, SignalRings} from '../components/space';
import {LINES, C} from '../layout';

// 镜 06 40–47s 广播：“万有引力”号向宇宙广播三体坐标
export const Scene06: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 210;
	const drift = interpolate(frame, [0, dur], [0, 60], {extrapolateRight: 'clamp'});
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: C.bg}}>
				<Nebula seed={26} opacity={0.5} />
				<ParallaxStars seed={26} pan={0.4} maxShift={120} />
				{/* 舰体剪影 */}
				<div style={{position: 'absolute', left: 760 + drift, top: 480, width: 400, height: 46, backgroundColor: '#1a2636', borderRadius: 23, transform: 'rotate(-4deg)'}} />
				<div style={{position: 'absolute', left: 760 + drift, top: 470, width: 400, height: 10, backgroundColor: 'rgba(140,213,218,0.35)', borderRadius: 5, transform: 'rotate(-4deg)'}} />
				<div style={{position: 'absolute', left: 1120 + drift, top: 460, width: 90, height: 86, backgroundColor: '#1a2636', clipPath: 'polygon(0 20%, 100% 50%, 0 80%)', transform: 'rotate(-4deg)'}} />
				<SignalRings frame={frame} cx={960 + drift} cy={503} startAt={10} count={5} color={C.signal} />
				<div style={{position: 'absolute', left: 760, top: 580, fontFamily: 'monospace', fontSize: 30, letterSpacing: 6, color: C.signal}}>万有引力号</div>
				<Tag text="广播 · 三体坐标" frame={frame} x={120} y={130} />
				<Sub text={LINES[5]!} frame={frame} inAt={20} outAt={dur} />
			</AbsoluteFill>
		</Fade>
	);
};
