import {
	AbsoluteFill,
	Audio,
	Sequence,
	staticFile,
	Video,
	interpolateColors,
	useCurrentFrame,
	spring,
	interpolate,
	useVideoConfig,
} from 'remotion';

import {Titles} from './Titles';

import {DATA} from './constants';

export const MyComposition = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const color2 = interpolateColors(frame, [0, 100], ['#ff0000', '#ea07ff']);

	// Splite text to animate them separatly
	const words = DATA.text.middle_text[0].main.split(' ');

	// Define scale animation primitive and also it works for opacity animation over time
	const scaleProgress = spring({
		frame: frame - 20,
		fps,
		config: {
			damping: 200,
		},
	});

	// Set range of value for scale transform property to animate
	const scale = interpolate(scaleProgress, [0, 1], [3, 0.9]);
	const rotate = interpolate(scaleProgress, [0, 1], [0, 45]);

	return (
		<>
			<AbsoluteFill style={{background: '#000'}}>
				<Sequence from={0}>
					<Titles />
					<div
						style={{
							background: color2,
						}}
					>
						<Video
							muted
							src={staticFile(`input_data/footage/${DATA.footage[6]}`)}
						/>
					</div>
				</Sequence>
				<Sequence from={300}>
					<div style={{transform: `rotate(${rotate})`}}>
						<Video
							muted
							src={staticFile(`input_data/footage/${DATA.footage[7]}`)}
							style={{width: '100%'}}
						/>
					</div>
				</Sequence>
				<Sequence from={600}>
					<Video
						muted
						src={staticFile(`input_data/footage/${DATA.footage[9]}`)}
					/>
				</Sequence>
			</AbsoluteFill>
			<Audio src={staticFile('assets/Background.wav')} />
		</>
	);
};
