import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Fade} from '../components/Cine';
import {ParallaxStars, Sub, Tag} from '../components/space';
import {mulberry32} from '../utils';
import {LINES, C} from '../layout';

// 镜 09 62–70s 行星背面的家：太空城在巨行星阴影里，68s 硬切俯视星图
export const Scene09: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 240;
	const cut = frame >= 180; // 68s
	const lights = useMemo(() => {
		const rnd = mulberry32(99);
		return Array.from({length: 70}, () => ({x: 180 + rnd() * 700, y: 500 + rnd() * 300, r: 2 + rnd() * 3, ph: rnd() * 6}));
	}, []);
	if (cut) {
		return (
			<Fade duration={dur}>
				<AbsoluteFill style={{backgroundColor: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{position: 'relative', width: 900, height: 700, border: '1px solid rgba(140,213,218,0.4)'}}>
						<div style={{position: 'absolute', left: 100, top: 100, width: 700, height: 500, borderRadius: '50%', border: '1px dashed rgba(140,213,218,0.3)'}} />
						<div style={{position: 'absolute', left: 420, top: 320, width: 60, height: 60, borderRadius: 999, backgroundColor: '#d8a06a', boxShadow: '0 0 40px rgba(216,160,106,0.7)'}} />
						<div style={{position: 'absolute', left: 480, top: 380, width: 120, height: 60, backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid rgba(231,168,105,0.6)'}} />
						<div style={{position: 'absolute', left: 500, top: 400, fontFamily: 'monospace', fontSize: 24, letterSpacing: 3, color: C.lights}}>掩体 · 行星背面</div>
						<div style={{position: 'absolute', left: 620, top: 180, width: 14, height: 14, borderRadius: 999, backgroundColor: C.signal, boxShadow: `0 0 20px ${C.signal}`}} />
						<div style={{position: 'absolute', left: 640, top: 160, fontFamily: 'monospace', fontSize: 24, color: C.signal}}>太阳方向</div>
					</div>
					<Tag text="俯视星图 · 掩体逻辑" frame={frame} x={120} y={130} />
					<Sub text={LINES[8]!} frame={frame} inAt={185} outAt={dur} />
				</AbsoluteFill>
			</Fade>
		);
	}
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: C.bg}}>
				<ParallaxStars seed={29} pan={0.45} maxShift={100} />
				{/* 巨行星 */}
				<div style={{position: 'absolute', right: -260, top: -120, width: 1100, height: 1100, borderRadius: '50%', background: 'radial-gradient(circle at 32% 38%, #c98f5a 0%, #8a5a30 45%, #2a1a0c 100%)', boxShadow: '0 0 120px rgba(216,160,106,0.25)'}} />
				<div style={{position: 'absolute', right: 620, top: 220, width: 500, height: 40, border: '2px solid rgba(227,207,160,0.35)', borderRadius: '50%', transform: 'rotate(-14deg)'}} />
				{/* 阴影中的太空城 */}
				<div style={{position: 'absolute', left: 120, top: 480, width: 760, height: 340, backgroundColor: 'rgba(2,4,10,0.72)', border: '1px solid rgba(231,168,105,0.25)'}} />
				{lights.map((l, i) => (
					<div key={i} style={{position: 'absolute', left: l.x, top: l.y, width: l.r * 2, height: l.r * 2, borderRadius: 999, backgroundColor: C.lights, opacity: 0.4 + 0.5 * (0.5 + 0.5 * Math.sin(frame * 0.04 + l.ph))}} />
				))}
				<Tag text="掩体纪元 · 巨行星阴影" frame={frame} x={120} y={130} />
				<Sub text={LINES[8]!} frame={frame} inAt={20} outAt={180} />
			</AbsoluteFill>
		</Fade>
	);
};
