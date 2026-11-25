import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Fade} from '../components/Cine';
import {Sub, Tag} from '../components/space';
import {LINES, C} from '../layout';

// 镜 08 55–62s 四年后的眼睛：广播纪元 7 年·地球，瞳孔承接上一镜高光
export const Scene08: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 210;
	const zoom = interpolate(frame, [0, dur], [1, 1.18], {extrapolateRight: 'clamp'});
	// 高光在 90 帧落入瞳孔：瞳孔中心在成片帧坐标约 (1129, 492)，即 58.8% x / 45.6% y
	const light = interpolate(frame, [60, 110], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const lightX = interpolate(frame, [60, 110], [1500, 1129], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const lightY = interpolate(frame, [60, 110], [120, 492], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: '#02040a', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				{/* ChatGPT 生图背景：观察者眼部特写，推镜以瞳孔锚点为中心，放大 18% 留裁剪余量 */}
				<div style={{position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: '58.8% 45.6%'}}>
					<Img
						src={staticFile('img/shot08-eye.png')}
						style={{position: 'absolute', left: '-9%', top: '-9%', width: '118%', height: '118%', objectFit: 'cover'}}
					/>
				</div>
				{/* 迟到的光落入瞳孔 */}
				<div
					style={{
						position: 'absolute',
						left: 1129,
						top: 492,
						width: 90,
						height: 90,
						borderRadius: '50%',
						transform: 'translate(-50%,-50%)',
						backgroundColor: C.strike,
						opacity: light * 0.95,
						boxShadow: `0 0 ${60 * light}px rgba(255,243,215,0.9)`,
					}}
				/>
				{/* 飞来的光点 */}
				{frame < 110 && (
					<div style={{position: 'absolute', left: lightX, top: lightY, width: 16, height: 16, borderRadius: 999, backgroundColor: '#fff', boxShadow: '0 0 34px #fff', opacity: 1 - light}} />
				)}
				<Tag text="广播纪元 7 年 · 地球" frame={frame} x={120} y={130} />
				<div style={{position: 'absolute', right: 140, top: 130, fontFamily: 'monospace', fontSize: 28, letterSpacing: 4, color: C.dim}}>同一颗星 · 两个“现在”</div>
				<Sub text={LINES[7]!} frame={frame} inAt={20} outAt={dur} />
			</AbsoluteFill>
		</Fade>
	);
};
