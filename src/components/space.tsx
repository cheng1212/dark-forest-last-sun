import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {mulberry32, clamp} from '../utils';
import {W, H, C} from '../layout';
import {SANS} from './Cine';

// 三层星空视差：far 几乎不动，mid 慢，near 快。pan 为 0..1 的摄影机横移进度。
export const ParallaxStars: React.FC<{seed: number; pan: number; maxShift?: number}> = ({
	seed,
	pan,
	maxShift = 420,
}) => {
	const frame = useCurrentFrame();
	const layers = useMemo(() => {
		const mk = (count: number, s: number, rMin: number, rMax: number) => {
			const rnd = mulberry32(s);
			return Array.from({length: count}, () => ({
				x: rnd() * (W + 500) - 250,
				y: rnd() * H,
				r: rMin + rnd() * (rMax - rMin),
				a: 0.3 + rnd() * 0.7,
				ph: rnd() * Math.PI * 2,
			}));
		};
		return [
			{stars: mk(240, seed + 1, 0.6, 1.6), ratio: 0.03},
			{stars: mk(110, seed + 2, 1.2, 2.6), ratio: 0.25},
			{stars: mk(24, seed + 3, 1.8, 3.4), ratio: 1},
		];
	}, [seed]);
	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			{layers.map((L, li) => (
				<div
					key={li}
					style={{
						position: 'absolute',
						inset: 0,
						transform: `translateX(${-pan * maxShift * L.ratio}px)`,
					}}
				>
					{L.stars.map((s, i) => {
						const tw = 0.75 + 0.25 * Math.sin(frame * 0.05 + s.ph);
						return (
							<div
								key={i}
								style={{
									position: 'absolute',
									left: s.x,
									top: s.y,
									width: s.r * 2,
									height: s.r * 2,
									borderRadius: 999,
									backgroundColor: '#fff',
									opacity: s.a * tw,
								}}
							/>
						);
					})}
				</div>
			))}
		</AbsoluteFill>
	);
};

// 星云：低对比径向渐变团，缓慢漂移
export const Nebula: React.FC<{seed?: number; opacity?: number}> = ({seed = 11, opacity = 1}) => {
	const frame = useCurrentFrame();
	const blobs = useMemo(() => {
		const rnd = mulberry32(seed);
		return Array.from({length: 5}, (_, i) => ({
			x: 150 + rnd() * 1500,
			y: 120 + rnd() * 700,
			r: 320 + rnd() * 420,
			hue: i % 2 === 0 ? '35,56,73' : '60,80,120',
			drift: rnd() * 0.02,
		}));
	}, [seed]);
	return (
		<AbsoluteFill style={{opacity}}>
			{blobs.map((b, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						left: b.x - b.r / 2 + Math.sin(frame * 0.004 + i) * 18,
						top: b.y - b.r / 2,
						width: b.r,
						height: b.r * 0.72,
						borderRadius: '50%',
						background: `radial-gradient(ellipse at center, rgba(${b.hue},0.55) 0%, rgba(${b.hue},0.12) 55%, transparent 75%)`,
						filter: 'blur(6px)',
					}}
				/>
			))}
		</AbsoluteFill>
	);
};

// 大字幕（1080p ≥52px，底部黑边之上）
export const Sub: React.FC<{text: string; frame: number; inAt?: number; outAt?: number; color?: string}> = ({
	text,
	frame,
	inAt = 18,
	outAt = 1e9,
	color = '#f2f5fa',
}) => {
	const opacity = interpolate(frame, [inAt, inAt + 16, outAt - 16, outAt], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div
			style={{
				position: 'absolute',
				bottom: 116,
				left: 0,
				right: 0,
				textAlign: 'center',
				zIndex: 50,
				opacity,
			}}
		>
			<span
				style={{
					fontFamily: SANS,
					fontSize: 52,
					fontWeight: 700,
					color,
					letterSpacing: 4,
					textShadow: '0 2px 16px rgba(0,0,0,0.95), 0 0 3px rgba(0,0,0,0.95)',
				}}
			>
				{text}
			</span>
		</div>
	);
};

// 小字说明（纪年/舰名，等宽）
export const Tag: React.FC<{text: string; frame: number; inAt?: number; outAt?: number; x?: number; y?: number; color?: string}> = ({
	text,
	frame,
	inAt = 12,
	outAt = 1e9,
	x = 120,
	y = 130,
	color = '#a9c3e8',
}) => {
	const opacity = interpolate(frame, [inAt, inAt + 14, outAt - 14, outAt], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				zIndex: 48,
				opacity,
				fontFamily: 'monospace',
				fontSize: 30,
				letterSpacing: 4,
				color,
				textShadow: '0 2px 10px rgba(0,0,0,0.9)',
			}}
		>
			{text}
		</div>
	);
};

// 信号薄壳：只在扩散时显现的同心圆环
export const SignalRings: React.FC<{frame: number; cx: number; cy: number; startAt: number; count?: number; color?: string}> = ({
	frame,
	cx,
	cy,
	startAt,
	count = 4,
	color = C.signal,
}) => (
	<>
		{Array.from({length: count}, (_, i) => {
			const t = clamp((frame - startAt - i * 26) / 150);
			if (t <= 0) return null;
			return (
				<div
					key={i}
					style={{
						position: 'absolute',
						left: cx - t * 620,
						top: cy - t * 620,
						width: t * 1240,
						height: t * 1240,
						borderRadius: '50%',
						border: `2px solid ${color}`,
						opacity: (1 - t) * 0.75,
					}}
				/>
			);
		})}
	</>
);
