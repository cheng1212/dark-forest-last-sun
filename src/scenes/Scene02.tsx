import React, {useMemo} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Fade} from '../components/Cine';
import {ParallaxStars, Sub, Tag} from '../components/space';
import {mulberry32, clamp} from '../utils';
import {LINES, C} from '../layout';

// 镜 02 7–15s 有限的物质：河谷聚居地灯光分区明灭，物质带耗减
export const Scene02: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 240;
	const zoom = interpolate(frame, [0, dur], [1, 1.07], {extrapolateRight: 'clamp'});
	const lights = useMemo(() => {
		const rnd = mulberry32(42);
		// 只落在河谷聚居带（生图中的河湾居民区），不在山体/天空上飘
		return Array.from({length: 70}, () => ({
			x: 500 + rnd() * 1200,
			y: 550 + rnd() * 350,
			r: 1.5 + rnd() * 2.5,
			ph: rnd() * Math.PI * 2,
			sp: 0.02 + rnd() * 0.05,
		}));
	}, []);
	const band = interpolate(frame, [0, dur], [1, 0.42], {extrapolateRight: 'clamp'});
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: C.bg, transform: `scale(${zoom})`, transformOrigin: '50% 62%'}}>
				{/* ChatGPT 生图背景：河谷聚居地灯火，放大 15% 留推镜裁剪余量 */}
				<Img
					src={staticFile('img/shot02-valley-lights.png')}
					style={{position: 'absolute', left: '-7.5%', top: '-7.5%', width: '115%', height: '115%', objectFit: 'cover'}}
				/>
				<ParallaxStars seed={22} pan={0.2} maxShift={120} />
				{/* 分区灯光：各有相位，缓慢明灭 */}
				{lights.map((l, i) => (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: l.x,
							top: l.y,
							width: l.r * 2,
							height: l.r * 2,
							borderRadius: 999,
							backgroundColor: C.lights,
							opacity: 0.25 + 0.4 * (0.5 + 0.5 * Math.sin(frame * l.sp + l.ph)),
							boxShadow: `0 0 ${l.r * 4}px rgba(231,168,105,0.7)`,
						}}
					/>
				))}
				{/* 物质带：不断耗减 */}
				<div style={{position: 'absolute', left: 240, top: 170, width: 620, height: 14, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 7}}>
					<div style={{width: `${band * 100}%`, height: '100%', backgroundColor: C.lights, borderRadius: 7}} />
				</div>
				<Tag text="物质总量 · 不变" frame={frame} x={240} y={130} />
				<Tag text="文明 · 一直在长大" frame={frame} x={240} y={205} color={C.lights} />
				<Sub text={LINES[1]!} frame={frame} inAt={20} outAt={dur} />
			</AbsoluteFill>
		</Fade>
	);
};
