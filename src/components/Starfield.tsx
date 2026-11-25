import React, {useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {mulberry32} from '../utils';
import {W, H} from '../layout';

type Star = {
	x: number;
	y: number;
	r: number;
	alpha: number;
	phase: number;
	speed: number;
	tint: string;
};

const TINTS = ['#ffffff', '#cfe4ff', '#ffe9c9', '#ffffff', '#bcd2ff'];

// 星空：支持慢速漂移（drift）与曲速拉伸（warp 0~1）
export const Starfield: React.FC<{
	seed?: number;
	count?: number;
	warp?: number;
	drift?: number; // 每帧 x 漂移像素
	twinkle?: boolean;
}> = ({seed = 7, count = 260, warp = 0, drift = 0.15, twinkle = true}) => {
	const frame = useCurrentFrame();

	const stars = useMemo<Star[]>(() => {
		const rnd = mulberry32(seed);
		return Array.from({length: count}, () => ({
			x: rnd() * (W + 400) - 200,
			y: rnd() * (H + 200) - 100,
			r: 0.6 + rnd() * 1.9,
			alpha: 0.35 + rnd() * 0.65,
			phase: rnd() * Math.PI * 2,
			speed: 0.4 + rnd() * 1.6,
			tint: TINTS[Math.floor(rnd() * TINTS.length)],
		}));
	}, [seed, count]);

	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			{stars.map((s, i) => {
				const x = (((s.x - frame * drift * s.speed * (1 + warp * 22)) % (W + 400)) + (W + 400)) % (W + 400) - 200;
				const tw = twinkle ? 0.72 + 0.28 * Math.sin(frame * 0.06 + s.phase) : 1;
				const streak = 1 + warp * 26 * s.speed;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: x,
							top: s.y,
							width: s.r * streak,
							height: s.r * (warp > 0.02 ? 0.7 : 1.6),
							borderRadius: 999,
							backgroundColor: s.tint,
							opacity: s.alpha * tw * (0.35 + 0.65 * (1 - warp * 0.45)),
							boxShadow: warp > 0.05 ? `0 0 ${6 * warp}px ${s.tint}` : undefined,
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};
