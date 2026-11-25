import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Fade} from '../components/Cine';
import {Sub, Tag} from '../components/space';
import {mulberry32, clamp} from '../utils';
import {LINES, C} from '../layout';

// 镜 04 24–33s 咒语：三张星图旋转对齐，31s（镜内 210 帧）标出 187J3X1
const PANEL = {w: 400, h: 400};
const Chart: React.FC<{label: string; proj: (x: number, y: number, z: number) => [number, number]; rot: number; align: number; target: [number, number, number]}> = ({
	label,
	proj,
	rot,
	align,
	target,
}) => {
	const pts = useMemo(() => {
		const rnd = mulberry32(77);
		return Array.from({length: 30}, () => [rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1] as [number, number, number]);
	}, []);
	const [tx, ty] = proj(...target);
	const show = align >= 1;
	return (
		<div style={{width: PANEL.w, height: PANEL.h, position: 'relative'}}>
			<div style={{position: 'absolute', inset: 0, border: '1px solid rgba(140,213,218,0.35)', backgroundColor: 'rgba(5,8,16,0.6)'}} />
			<div
				style={{
					position: 'absolute',
					inset: 0,
					transform: `rotate(${rot}deg)`,
					transformOrigin: '50% 50%',
				}}
			>
				{pts.map((p, i) => {
					const [x, y] = proj(...p);
					return (
						<div key={i} style={{position: 'absolute', left: 200 + x * 170, top: 200 + y * 170, width: 5, height: 5, borderRadius: 999, backgroundColor: '#cfe4ff', opacity: 0.85}} />
					);
				})}
				<div
					style={{
						position: 'absolute',
						left: 200 + tx * 170 - 9,
						top: 200 + ty * 170 - 9,
						width: 18,
						height: 18,
						borderRadius: 999,
						backgroundColor: show ? '#ff5d50' : C.signal,
						boxShadow: show ? '0 0 26px #ff5d50' : `0 0 18px ${C.signal}`,
					}}
				/>
				{show && (
					<div style={{position: 'absolute', left: 200 + tx * 170 - 34, top: 200 + ty * 170 - 34, width: 68, height: 68, borderRadius: '50%', border: '2px solid #ff5d50', opacity: 0.9}} />
				)}
			</div>
			<div style={{position: 'absolute', left: 14, top: 12, fontFamily: 'monospace', fontSize: 28, letterSpacing: 4, color: C.signal}}>{label}</div>
		</div>
	);
};

export const Scene04: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 270;
	// 31s = 镜内 210 帧对齐
	const align = interpolate(frame, [150, 210], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t: number) => t * t * (3 - 2 * t)});
	const rot = interpolate(align, [0, 1], [18, 0]);
	const target: [number, number, number] = [0.42, -0.18, 0.3];
	const flash = interpolate(frame, [210, 218, 240], [0, 0.9, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40}}>
				<div style={{display: 'flex', gap: 60}}>
					<Chart label="XY 投影" proj={(x, y) => [x, y]} rot={rot} align={align} target={target} />
					<Chart label="XZ 投影" proj={(x, _y, z) => [x, z]} rot={-rot} align={align} target={target} />
					<Chart label="YZ 投影" proj={(_x, y, z) => [y, z]} rot={rot * 0.6} align={align} target={target} />
				</div>
				<div style={{fontFamily: 'monospace', fontSize: 34, letterSpacing: 6, color: align >= 1 ? '#ff8a7a' : C.dim, opacity: align >= 1 ? 1 : 0.4}}>
					{align >= 1 ? '187J3X1 · 距太阳 49.5 光年' : '三张投影 · 正在对齐'}
				</div>
				<div style={{position: 'absolute', inset: 0, backgroundColor: '#fff', opacity: flash * 0.5, pointerEvents: 'none'}} />
				<Tag text="咒语 · 三张图" frame={frame} x={120} y={120} />
				<Sub text={LINES[3]!} frame={frame} inAt={20} outAt={dur} />
			</AbsoluteFill>
		</Fade>
	);
};
