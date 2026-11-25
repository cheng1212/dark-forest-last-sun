import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Fade} from '../components/Cine';
import {Sub, Tag} from '../components/space';
import {LINES, C} from '../layout';

// 镜 14 105–114s 搬画的人：冥王星馆藏通道，程心与艾AA带走《星空》，罗辑留下
export const Scene14: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 270;
	// 缓慢推近：向画芯漩涡（生图主漩涡约 49% x / 38% y）靠近
	const push = interpolate(frame, [0, dur], [1, 1.06], {extrapolateRight: 'clamp'});
	const glow = 0.5 + 0.3 * Math.sin(frame * 0.03);
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: '#04060c'}}>
				{/* ChatGPT 生图背景：搬运《星空》的人，放大 12% 留推镜裁剪余量 */}
				<div style={{position: 'absolute', inset: 0, transform: `scale(${push})`, transformOrigin: '49% 38%'}}>
					<Img
						src={staticFile('img/shot14-carrying-starry-night.png')}
						style={{position: 'absolute', left: '-6%', top: '-6%', width: '112%', height: '112%', objectFit: 'cover'}}
					/>
				</div>
				{/* 漩涡处的微光呼吸，呼应画芯 */}
				<div
					style={{
						position: 'absolute',
						left: 941,
						top: 410,
						width: 220,
						height: 220,
						borderRadius: '50%',
						transform: 'translate(-50%,-50%)',
						background: 'radial-gradient(circle, rgba(255,243,215,0.35) 0%, transparent 70%)',
						opacity: glow,
					}}
				/>
				{/* 留下的罗辑：静止剪影 */}
				<div style={{position: 'absolute', left: 1560, top: 620, width: 56, height: 150, backgroundColor: '#02040a', borderRadius: '28px 28px 4px 4px', border: '1px solid rgba(140,180,230,0.3)'}} />
				<div style={{position: 'absolute', left: 1520, top: 790, fontFamily: 'monospace', fontSize: 26, letterSpacing: 3, color: C.dim}}>罗辑 · 留下</div>
				<Tag text="冥王星 · 馆藏通道" frame={frame} x={120} y={130} />
				<Sub text={LINES[13]!} frame={frame} inAt={20} outAt={dur} />
			</AbsoluteFill>
		</Fade>
	);
};
