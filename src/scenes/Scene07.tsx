import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Fade, Flash} from '../components/Cine';
import {ParallaxStars, Sub, Tag} from '../components/space';
import {mulberry32, clamp} from '../utils';
import {LINES, C} from '../layout';

// 镜 07 47–55s 一颗恒星遭击：光粒击穿恒星，喷流吞没行星（52s 冲击）
export const Scene07: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 240;
	const impact = 150; // 52s = 镜内 150 帧
	const after = clamp((frame - impact) / 60);
	const jet = useMemo(() => {
		const rnd = mulberry32(77);
		return Array.from({length: 60}, () => ({
			ang: rnd() * Math.PI * 2,
			dist: 120 + rnd() * 520,
			r: 2 + rnd() * 5,
			ph: rnd(),
		}));
	}, []);
	// 光粒轨迹：从右上斜射入恒星
	const pelletX = interpolate(frame, [0, impact], [1850, 960], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const pelletY = interpolate(frame, [0, impact], [120, 500], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: C.bg}}>
				<ParallaxStars seed={27} pan={0.5} maxShift={80} />
				{/* 恒星 */}
				<div
					style={{
						position: 'absolute',
						left: 960,
						top: 500,
						width: 150 + after * 60,
						height: 150 + after * 60,
						borderRadius: 999,
						backgroundColor: after > 0.05 ? C.strike : '#ffd27a',
						boxShadow: `0 0 ${120 + after * 160}px rgba(255,211,122,${0.9 - after * 0.4})`,
						transform: 'translate(-50%,-50%)',
					}}
				/>
				{/* 光粒 */}
				{frame < impact && (
					<div style={{position: 'absolute', left: pelletX, top: pelletY, width: 10, height: 10, borderRadius: 999, backgroundColor: '#fff', boxShadow: '0 0 30px #fff'}} />
				)}
				{/* 喷流粒子 */}
				{jet.map((j, i) => {
					const t = clamp((frame - impact - j.ph * 20) / 50);
					if (t <= 0) return null;
					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: 960 + Math.cos(j.ang) * j.dist * t,
								top: 500 + Math.sin(j.ang) * j.dist * t * 0.7,
								width: j.r * 2,
								height: j.r * 2,
								borderRadius: 999,
								backgroundColor: '#ffb03a',
								opacity: (1 - t) * 0.9,
							}}
						/>
					);
				})}
				{/* 行星被吞没 */}
				<div
					style={{
						position: 'absolute',
						left: 1380,
						top: 620,
						width: 54,
						height: 54,
						borderRadius: 999,
						backgroundColor: '#4d9de0',
						opacity: 1 - after,
						boxShadow: '0 0 30px rgba(77,157,224,0.6)',
					}}
				/>
				<Flash frame={frame} at={impact} dur={30} peak={0.9} />
				<Tag text="广播纪元 3 年 · 光粒" frame={frame} x={120} y={130} />
				<Sub text={LINES[6]!} frame={frame} inAt={20} outAt={dur} />
			</AbsoluteFill>
		</Fade>
	);
};
