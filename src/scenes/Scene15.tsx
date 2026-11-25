import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Fade} from '../components/Cine';
import {C} from '../layout';

// 镜 15 114–120s 重拍片头：与镜 01 同速同向横移，无旁白无字幕
// 关键：窗框、划痕仍有视差，窗外太阳系作为同一幅画整体移动——深度已消失
export const Scene15: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 180;
	const pan = interpolate(frame, [0, dur], [0, 1], {extrapolateRight: 'clamp'});
	// 窗外整幅画：单一图层，整体移动（内部无视差）
	const flatShift = -pan * 200;
	// 窗框：前景，移动更快（仍有视差）——与画作速度不同，对比才可见
	const frameShift = -pan * 420;
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: '#02040a'}}>
				{/* ChatGPT 生图背景：圆形舷窗外的太阳系——作为同一幅画整体移动（内部无视差），放大 15% 留横移裁剪余量 */}
				<div style={{position: 'absolute', inset: 0, transform: `translateX(${flatShift}px)`}}>
					<Img
						src={staticFile('img/shot15-porthole.png')}
						style={{position: 'absolute', left: '-7.5%', top: '-7.5%', width: '115%', height: '115%', objectFit: 'cover'}}
					/>
				</div>
				{/* 舷窗框：生图自带圆形金属舷窗框，代码不再叠矩形框（会与圆框冲突）。
				    前景视差由两道窗上划痕承担，与画作速度不同 */}
				<div style={{position: 'absolute', left: 420 + frameShift, top: 220, width: 180, height: 3, backgroundColor: 'rgba(255,255,255,0.28)', transform: 'rotate(-18deg)'}} />
				<div style={{position: 'absolute', left: 1400 + frameShift, top: 760, width: 120, height: 3, backgroundColor: 'rgba(255,255,255,0.2)', transform: 'rotate(24deg)'}} />
				{/* 最后余光消退 */}
				<div style={{position: 'absolute', inset: 0, backgroundColor: '#000', opacity: interpolate(frame, [150, dur], [0, 0.85], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}} />
			</AbsoluteFill>
		</Fade>
	);
};
