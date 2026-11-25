export const FPS = 30;
export const W = 1920;
export const H = 1080;

// 15 镜时长（帧），与 STORYBOARD.md 一致
export const SHOTS = [210, 240, 270, 270, 210, 210, 240, 210, 240, 180, 270, 300, 300, 270, 180];
export const TOTAL = SHOTS.reduce((a, b) => a + b, 0); // 3600 帧 = 120 秒
export const SHOT_START: number[] = SHOTS.reduce<number[]>(
	(acc, d, i) => [...acc, (acc[i - 1] ?? 0) + (i === 0 ? 0 : SHOTS[i - 1])],
	[],
);

// 配色（方案视觉系统）
export const C = {
	bg: '#050810',
	nebula: '#233849',
	lights: '#E7A869',
	signal: '#8CD5DA',
	strike: '#FFF3D7',
	edge: '#E4C477',
	ink: '#eef3fb',
	dim: '#a9c3e8',
	red: '#E05D50',
};

// 每镜旁白（镜 15 无旁白）
export const LINES: (string | null)[] = [
	'每个文明，首先都想活下去。',
	'宇宙的物质不会变多，文明却一直在长大。',
	'一句话发出去，要等很多年，才有回音。',
	'三张图叠在一起，就是一颗星的地址。',
	'那颗星，真的消失了。',
	'我们把三体的坐标，广播给了宇宙。',
	'一颗恒星，被一粒光击穿了。',
	'四年后，那道光才落进人的眼睛。',
	'我们躲到巨行星的背面，以为这样就安全了。',
	'清理者看了一眼，换了一个工具。',
	'全速前进的船，正在倒退。',
	'座椅、管线、人影，都在平面上找到了自己的位置。',
	'太阳变成了一幅画，地球的海，开成了雪花。',
	'有人留下，有人把星空搬上了船。',
	null,
];
