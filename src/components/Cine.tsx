import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {clamp} from '../utils';
import {W, H} from '../layout';

export const SERIF = '"Noto Serif CJK SC", "Noto Serif CJK", serif';
export const SANS = '"Noto Sans CJK SC", "Noto Sans CJK", sans-serif';

// 黑边
export const Letterbox: React.FC = () => (
	<>
		<div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 88, backgroundColor: '#000', zIndex: 40}} />
		<div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 88, backgroundColor: '#000', zIndex: 40}} />
	</>
);

// 暗角
export const Vignette: React.FC<{strength?: number}> = ({strength = 0.55}) => (
	<AbsoluteFill
		style={{
			background: `radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,${strength}) 100%)`,
			zIndex: 41,
			pointerEvents: 'none',
		}}
	/>
);

// 胶片颗粒（静态 SVG 噪点）
const GRAIN_URI =
	"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export const Grain: React.FC = () => (
	<AbsoluteFill
		style={{
			backgroundImage: GRAIN_URI,
			opacity: 0.055,
			zIndex: 42,
			pointerEvents: 'none',
		}}
	/>
);

// 场景首尾淡入淡出
export const Fade: React.FC<{children: React.ReactNode; duration: number; fade?: number}> = ({
	children,
	duration,
	fade = 10,
}) => {
	const frame = useCurrentFrame();
	const opacity = clamp(Math.min(frame / fade, (duration - frame) / fade));
	return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

// 底部字幕
export const Subtitle: React.FC<{text: string; frame: number; inAt?: number; outAt?: number}> = ({
	text,
	frame,
	inAt = 24,
	outAt = 1e9,
}) => {
	const opacity = interpolate(frame, [inAt, inAt + 18, outAt - 18, outAt], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div
			style={{
				position: 'absolute',
				bottom: 118,
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
					fontSize: 40,
					color: '#f2f5fa',
					letterSpacing: 6,
					textShadow: '0 2px 14px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.9)',
				}}
			>
				{text}
			</span>
		</div>
	);
};

// 大标题卡
export const TitleCard: React.FC<{
	title: string;
	sub?: string;
	frame: number;
	inAt: number;
	outAt: number;
	size?: number;
}> = ({title, sub, frame, inAt, outAt, size = 120}) => {
	const p = interpolate(frame, [inAt, inAt + 40, outAt - 30, outAt], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const scale = interpolate(frame, [inAt, inAt + 60], [1.12, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 45,
				opacity: p,
				transform: `scale(${scale})`,
				pointerEvents: 'none',
			}}
		>
			<div
				style={{
					fontFamily: SERIF,
					fontWeight: 700,
					fontSize: size,
					color: '#eef3fb',
					letterSpacing: size * 0.28,
					textIndent: size * 0.28,
					textShadow: '0 0 42px rgba(140,190,255,0.45), 0 4px 24px rgba(0,0,0,0.8)',
				}}
			>
				{title}
			</div>
			{sub ? (
				<div
					style={{
						marginTop: 26,
						fontFamily: SANS,
						fontSize: 34,
						color: '#a9c3e8',
						letterSpacing: 14,
						textIndent: 14,
						textShadow: '0 2px 12px rgba(0,0,0,0.8)',
					}}
				>
					{sub}
				</div>
			) : null}
		</AbsoluteFill>
	);
};

// 全屏闪光
export const Flash: React.FC<{frame: number; at: number; dur?: number; peak?: number}> = ({
	frame,
	at,
	dur = 26,
	peak = 0.85,
}) => {
	const o = interpolate(frame, [at, at + 5, at + dur], [0, peak, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return <AbsoluteFill style={{backgroundColor: '#dfeaff', opacity: o, zIndex: 46, pointerEvents: 'none'}} />;
};
