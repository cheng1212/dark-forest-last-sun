import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Fade} from '../components/Cine';
import {ParallaxStars, Sub, Tag} from '../components/space';
import {mulberry32} from '../utils';
import {LINES, C} from '../layout';

// 镜 05 33–40s 验证与威慑：观测年份跳变，目标星亮度异常后消失
export const Scene05: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 210;
	// 年份 148 → 154 跳变
	const year = Math.round(interpolate(frame, [20, 170], [148, 154], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
	// 目标星：先异常增亮，150 帧后熄灭
	const bright = interpolate(frame, [30, 90, 150, 185], [0.4, 1.6, 1.6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const stars = useMemo(() => {
		const rnd = mulberry32(55);
		return Array.from({length: 90}, () => ({x: 150 + rnd() * 1620, y: 150 + rnd() * 700, r: 1 + rnd() * 2}));
	}, []);
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: C.bg}}>
				<ParallaxStars seed={25} pan={0.5} maxShift={100} />
				{stars.map((s, i) => (
					<div key={i} style={{position: 'absolute', left: s.x, top: s.y, width: s.r * 2, height: s.r * 2, borderRadius: 999, backgroundColor: '#fff', opacity: 0.7}} />
				))}
				{/* 目标星 */}
				<div
					style={{
						position: 'absolute',
						left: 930,
						top: 430,
						width: 26 * bright,
						height: 26 * bright,
						borderRadius: 999,
						backgroundColor: bright > 1.2 ? '#fff3d7' : '#cfe4ff',
						boxShadow: `0 0 ${40 * bright}px rgba(255,243,215,0.8)`,
						transform: 'translate(-50%,-50%)',
						opacity: bright > 0 ? 1 : 0,
					}}
				/>
				<div style={{position: 'absolute', left: 960, top: 400, width: 300, height: 2, backgroundColor: 'rgba(255,93,80,0.7)', transform: 'rotate(-18deg)', transformOrigin: '0 0'}} />
				<div style={{position: 'absolute', left: 1010, top: 330, fontFamily: 'monospace', fontSize: 30, letterSpacing: 4, color: '#ff8a7a'}}>187J3X1</div>
				<div style={{position: 'absolute', left: 120, top: 620, fontFamily: 'monospace', fontSize: 64, letterSpacing: 8, color: C.ink}}>
					危机纪元 {year} 年
				</div>
				<div style={{position: 'absolute', left: 120, top: 710, fontFamily: 'monospace', fontSize: 30, letterSpacing: 4, color: C.dim}}>
					{year >= 154 ? '目标亮度异常 · 随后消失' : '持续观测 · 等待回音'}
				</div>
				<Tag text="验证 · 同一发现，第二次使用" frame={frame} x={120} y={130} />
				<Sub text={LINES[4]!} frame={frame} inAt={20} outAt={dur} />
			</AbsoluteFill>
		</Fade>
	);
};
