import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Fade} from '../components/Cine';
import {Sub, Tag} from '../components/space';
import {LINES, C} from '../layout';

// 镜 13 95–105s 二维太阳：冥王星望去，地球海洋雪花状、太阳单边金光
// 关键：所有天体作为同一幅画整体缓慢移动（无视差），只有金边在呼吸
export const Scene13: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 300;
	const drift = interpolate(frame, [0, dur], [0, 90], {extrapolateRight: 'clamp'});
	const edgeGlow = 0.7 + 0.3 * Math.sin(frame * 0.06);
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: '#02040a'}}>
				<div style={{position: 'absolute', inset: 0, transform: `translateX(${-drift}px)`}}>
					{/* 二维太阳：扁圆盘 + 单边金光 */}
					<div
						style={{
							position: 'absolute',
							left: 700,
							top: 330,
							width: 520,
							height: 300,
							borderRadius: '50%',
							background: 'radial-gradient(ellipse at center, #fff3d7 0%, #ffd27a 55%, #e8a83a 100%)',
							boxShadow: `0 0 ${140 * edgeGlow}px rgba(228,196,119,0.55)`,
						}}
					/>
					<div style={{position: 'absolute', left: 700, top: 330, width: 520, height: 300, borderRadius: '50%', border: `6px solid ${C.edge}`, opacity: 0.9}} />
					{/* 地球：扁圆盘，海洋雪花状 */}
					<div style={{position: 'absolute', left: 1380, top: 560, width: 220, height: 130, borderRadius: '50%', backgroundColor: '#2a5a8a', border: '2px solid rgba(255,255,255,0.4)'}}>
						{Array.from({length: 6}, (_, i) => (
							<div key={i} style={{position: 'absolute', left: 30 + i * 28, top: 20, width: 3, height: 90, backgroundColor: 'rgba(255,255,255,0.75)', transform: `rotate(${i * 30}deg)`, transformOrigin: '50% 50%'}} />
						))}
					</div>
					{/* 其他行星扁圆盘 */}
					<div style={{position: 'absolute', left: 300, top: 620, width: 120, height: 70, borderRadius: '50%', backgroundColor: '#b5a58f'}} />
					<div style={{position: 'absolute', left: 520, top: 660, width: 90, height: 52, borderRadius: '50%', backgroundColor: '#d1603a'}} />
					<div style={{position: 'absolute', left: 1660, top: 420, width: 150, height: 88, borderRadius: '50%', backgroundColor: '#5b7fe0'}} />
					<div style={{position: 'absolute', left: 240, top: 300, fontFamily: 'monospace', fontSize: 28, letterSpacing: 4, color: C.dim}}>从冥王星望去</div>
				</div>
				<Tag text="地球的海 · 开成了雪花" frame={frame} x={120} y={130} />
				<Sub text={LINES[12]!} frame={frame} inAt={20} outAt={dur} />
			</AbsoluteFill>
		</Fade>
	);
};
