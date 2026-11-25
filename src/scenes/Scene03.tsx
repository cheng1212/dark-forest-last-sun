import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Fade} from '../components/Cine';
import {ParallaxStars, Nebula, Sub, Tag, SignalRings} from '../components/space';
import {clamp} from '../utils';
import {LINES, C} from '../layout';

// 镜 03 15–24s 一次往返：信号发出，回音途中左侧文明技术跃迁
export const Scene03: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 270;
	// 信号在 15s（镜内 0 帧）发出，18s（90 帧）抵达
	const leap = interpolate(frame, [150, 210], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const leapGlow = 1 + leap * 1.6;
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: C.bg}}>
				<Nebula seed={23} opacity={0.6} />
				<ParallaxStars seed={23} pan={0.35} maxShift={160} />
				{/* 发出信号的文明（右侧） */}
				<div style={{position: 'absolute', left: 1180, top: 480, width: 26, height: 26, borderRadius: 999, backgroundColor: C.signal, boxShadow: `0 0 40px ${C.signal}`}} />
				<div style={{position: 'absolute', left: 1160, top: 460, width: 66, height: 66, borderRadius: '50%', border: `1px solid ${C.signal}`, opacity: 0.5}} />
				<div style={{position: 'absolute', left: 1120, top: 540, fontFamily: 'monospace', fontSize: 26, letterSpacing: 3, color: C.signal}}>发出 · 15s</div>
				<SignalRings frame={frame} cx={1193} cy={493} startAt={0} count={4} />
				{/* 左侧文明：回音途中技术跃迁 */}
				<div
					style={{
						position: 'absolute',
						left: 420,
						top: 470,
						width: 22 * leapGlow,
						height: 22 * leapGlow,
						borderRadius: 999,
						backgroundColor: leap > 0.3 ? '#fff3d7' : C.lights,
						boxShadow: `0 0 ${30 + leap * 70}px rgba(255,243,215,${0.5 + leap * 0.5})`,
						transform: 'translate(-50%, -50%)',
					}}
				/>
				<div style={{position: 'absolute', left: 360, top: 540, fontFamily: 'monospace', fontSize: 26, letterSpacing: 3, color: leap > 0.3 ? '#fff3d7' : C.lights}}>
					{leap > 0.3 ? '技术跃迁 · 回音途中' : '等待回音'}
				</div>
				{/* 信号轨迹线 */}
				<div
					style={{
						position: 'absolute',
						left: 440,
						top: 478,
						width: interpolate(frame, [0, 90], [0, 740], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
						height: 3,
						background: `linear-gradient(90deg, transparent, ${C.signal})`,
					}}
				/>
				<Tag text="一次往返 · 足够跃迁" frame={frame} x={120} y={130} />
				<Sub text={LINES[2]!} frame={frame} inAt={20} outAt={dur} />
			</AbsoluteFill>
		</Fade>
	);
};
