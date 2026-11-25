import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Fade} from '../components/Cine';
import {Sub, Tag} from '../components/space';
import {LINES, C} from '../layout';

// 镜 10 70–76s 清理者：星图死角亮一次，薄片转过边缘；75–76s 切黑
export const Scene10: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 180;
	const blink = interpolate(frame, [60, 75, 90], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const foilRot = interpolate(frame, [90, 150], [0, 42], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const black = interpolate(frame, [150, 170], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{position: 'relative', width: 1000, height: 700, border: '1px solid rgba(140,213,218,0.35)'}}>
					<div style={{position: 'absolute', left: 120, top: 90, width: 760, height: 520, borderRadius: '50%', border: '1px dashed rgba(140,213,218,0.25)'}} />
					{/* 死角亮一次 */}
					<div style={{position: 'absolute', left: 700, top: 480, width: 22, height: 22, borderRadius: 999, backgroundColor: '#ff5d50', boxShadow: '0 0 34px #ff5d50', opacity: blink}} />
					<div style={{position: 'absolute', left: 730, top: 470, fontFamily: 'monospace', fontSize: 26, color: '#ff8a7a', opacity: blink}}>死角 · 有东西</div>
					{/* 薄片转过边缘 */}
					<div
						style={{
							position: 'absolute',
							left: 430,
							top: 300,
							width: 180,
							height: 10,
							backgroundColor: '#dfeaff',
							boxShadow: '0 0 24px rgba(223,234,255,0.8)',
							transform: `rotate(${foilRot}deg)`,
							transformOrigin: '50% 50%',
						}}
					/>
					<div style={{position: 'absolute', left: 120, top: 620, fontFamily: 'monospace', fontSize: 28, letterSpacing: 4, color: C.dim}}>归属留白 · 不断定是谁投出的</div>
				</div>
				<Tag text="掩体纪元 67 年 · 清理者" frame={frame} x={120} y={130} />
				<Sub text={LINES[9]!} frame={frame} inAt={20} outAt={150} />
				{/* 75–76s 切黑 */}
				<div style={{position: 'absolute', inset: 0, backgroundColor: '#000', opacity: black, zIndex: 60}} />
			</AbsoluteFill>
		</Fade>
	);
};
