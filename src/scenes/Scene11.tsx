import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Fade} from '../components/Cine';
import {ParallaxStars, Sub, Tag} from '../components/space';
import {clamp} from '../utils';
import {LINES, C} from '../layout';

// 镜 11 76–85s 纸条与倒退的船：“启示”号全功率推进却倒退；84s 白Ice 对白“光速”
export const Scene11: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 270;
	// 船头朝右、尾焰向左，但整船向左倒退（84s = 镜内 240 帧时对白）
	const shipX = interpolate(frame, [0, dur], [1150, 760], {extrapolateRight: 'clamp'});
	const flame = 1 + 0.25 * Math.sin(frame * 0.9);
	const dialogue = interpolate(frame, [240, 248], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: C.bg}}>
				<ParallaxStars seed={31} pan={0.3} maxShift={140} />
				{/* 二向箔薄片（一线反光） */}
				<div style={{position: 'absolute', left: 300, top: 300, width: 260, height: 8, backgroundColor: '#dfeaff', boxShadow: '0 0 30px rgba(223,234,255,0.9)', transform: 'rotate(12deg)'}} />
				<div style={{position: 'absolute', left: 300, top: 330, fontFamily: 'monospace', fontSize: 26, letterSpacing: 3, color: C.dim}}>薄片 · 一线反光</div>
				{/* 跌落边界 */}
				<div style={{position: 'absolute', left: 620, top: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg, transparent, rgba(140,213,218,0.7), transparent)'}} />
				{/* 船体：朝右，尾焰向左，却向左倒退 */}
				<div style={{position: 'absolute', left: shipX, top: 500}}>
					<div style={{width: 340, height: 44, backgroundColor: '#1a2636', borderRadius: 22}} />
					<div style={{position: 'absolute', left: 300, top: 6, width: 70, height: 32, backgroundColor: '#1a2636', clipPath: 'polygon(0 20%, 100% 50%, 0 80%)'}} />
					<div style={{position: 'absolute', left: -90 * flame, top: 8, width: 90 * flame, height: 28, background: 'linear-gradient(90deg, transparent, #ffb03a)', borderRadius: 14}} />
				</div>
				<div style={{position: 'absolute', left: shipX + 40, top: 580, fontFamily: 'monospace', fontSize: 28, letterSpacing: 4, color: C.signal}}>“启示”号 · 全功率推进</div>
				<div style={{position: 'absolute', left: shipX + 40, top: 620, fontFamily: 'monospace', fontSize: 28, letterSpacing: 4, color: '#ff8a7a'}}>← 正在倒退</div>
				<Tag text="第一批近距离证据" frame={frame} x={120} y={130} />
				<Sub text={LINES[10]!} frame={frame} inAt={20} outAt={235} />
				{frame >= 240 && (
					<div style={{position: 'absolute', bottom: 116, left: 0, right: 0, textAlign: 'center', zIndex: 50, opacity: dialogue}}>
						<span style={{fontFamily: '"Noto Sans CJK SC", sans-serif', fontSize: 56, fontWeight: 700, color: '#fff', letterSpacing: 8, textShadow: '0 2px 16px rgba(0,0,0,0.95)'}}>“光速。”</span>
					</div>
				)}
			</AbsoluteFill>
		</Fade>
	);
};
