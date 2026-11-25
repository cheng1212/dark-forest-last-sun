import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Fade} from '../components/Cine';
import {Sub, Tag} from '../components/space';
import {clamp, lerp} from '../utils';
import {LINES, C} from '../layout';

// 镜 12 85–95s 失去“里面”：太空艇剖视展开，部件在平面上各就其位
const ITEMS = [
	{label: '座椅', x: 420, y3: 380, y2: 620, w: 120, h: 90, color: '#8a6a4a'},
	{label: '管线', x: 700, y3: 300, y2: 620, w: 200, h: 26, color: '#5a7a8a'},
	{label: '人影', x: 1020, y3: 420, y2: 620, w: 70, h: 150, color: '#2a3a55'},
	{label: '仪表', x: 1300, y3: 340, y2: 620, w: 150, h: 80, color: '#3a5a4a'},
	{label: '怀表', x: 1560, y3: 460, y2: 620, w: 80, h: 80, color: '#c9a86a'},
];

export const Scene12: React.FC = () => {
	const frame = useCurrentFrame();
	const dur = 300;
	const sweep = interpolate(frame, [0, dur], [0, 1], {extrapolateRight: 'clamp'});
	return (
		<Fade duration={dur}>
			<AbsoluteFill style={{backgroundColor: C.bg}}>
				{/* ChatGPT 生图背景：星舰艇舱内景（三层纵深），压暗 35% 让展开图解保持可读 */}
				<Img
					src={staticFile('img/shot12-cabin.png')}
					style={{position: 'absolute', left: '-5%', top: '-5%', width: '110%', height: '110%', objectFit: 'cover', opacity: 0.65}}
				/>
				<div style={{position: 'absolute', inset: 0, backgroundColor: 'rgba(5,8,16,0.35)'}} />
				{/* 跌落边界扫过 */}
				<div style={{position: 'absolute', left: 150 + sweep * 1620, top: 0, bottom: 0, width: 4, backgroundColor: C.signal, boxShadow: '0 0 30px rgba(140,213,218,0.8)'}} />
				{/* 二维平面 */}
				<div style={{position: 'absolute', left: 120, right: 120, top: 600, height: 8, backgroundColor: 'rgba(140,213,218,0.35)'}} />
				{ITEMS.map((it, i) => {
					const p = clamp((sweep * 1.3 - (it.x / 1920) * 0.3) / 1);
					const y = lerp(it.y3, it.y2 - it.h / 2, p);
					return (
						<div key={i} style={{position: 'absolute', left: it.x, top: y, width: it.w, height: it.h, backgroundColor: it.color, borderRadius: it.label === '怀表' || it.label === '人影' ? '50%' : 8, opacity: 0.35 + 0.65 * p, border: '1px solid rgba(255,255,255,0.25)'}}>
							<div style={{position: 'absolute', left: 0, top: -36, fontFamily: 'monospace', fontSize: 24, letterSpacing: 3, color: C.dim, whiteSpace: 'nowrap'}}>{it.label}</div>
						</div>
					);
				})}
				<Tag text="检验标准 · 怀表：厚度消失，面积变大" frame={frame} x={120} y={130} />
				<Sub text={LINES[11]!} frame={frame} inAt={20} outAt={dur} />
			</AbsoluteFill>
		</Fade>
	);
};
