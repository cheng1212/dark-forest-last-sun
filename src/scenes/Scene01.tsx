import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Fade, TitleCard} from '../components/Cine';
import {ParallaxStars, Sub} from '../components/space';
import {LINES, C} from '../layout';

// 镜 01 0–7s 墓前：摄影机向右横移（与镜 15 同速同向）
export const Scene01: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 210;
	const pan = interpolate(frame, [0, dur], [0, 1], {extrapolateRight: 'clamp'});
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: C.bg}}>
				{/* ChatGPT 生图背景：墓前星空，放大 20% 留横移裁剪余量，随摄影机同向平移 */}
				<Img
					src={staticFile('img/shot01-graveside.png')}
					style={{position: 'absolute', left: '-10%', top: '-10%', width: '120%', height: '120%', objectFit: 'cover', transform: `translateX(${-pan * 180}px)`}}
				/>
				<ParallaxStars seed={21} pan={pan} />
				{/* 远山（中层视差） */}
				<div
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						bottom: 190,
						height: 300,
						transform: `translateX(${-pan * 105}px)`,
						background: 'radial-gradient(ellipse 900px 220px at 30% 100%, #0d1626 0%, transparent 70%), radial-gradient(ellipse 1100px 260px at 75% 100%, #0b1322 0%, transparent 70%)',
					}}
				/>
				<TitleCard title="黑暗森林" sub="最后一次看见太阳" frame={frame} inAt={30} outAt={175} size={110} />
				<Sub text={LINES[0]!} frame={frame} inAt={150} outAt={dur} />
			</AbsoluteFill>
		</Fade>
	);
};
