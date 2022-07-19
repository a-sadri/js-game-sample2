import {Sequence, Series, useCurrentFrame} from 'remotion';
import {spring} from 'remotion';
import {interpolate} from 'remotion';
import {useVideoConfig} from 'remotion';

import {DATA, PRIMARY_COLOR} from './constants';

export const Box: React.FC = ({text, radius, color, font}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		frame: frame - 15,
		fps,
		config: {
			damping: 200,
			// Stiffness: 500,
		},
		// DurationInFrames: 50,
	});

	const opacityProgress = spring({
		frame: frame - 25,
		fps,
		config: {
			damping: 200,
			// Stiffness: 500,
		},
		// DurationInFrames: 50,
	});

	// Set range of value for opacity property to animate fading of beginning the video
	const opacity = interpolate(opacityProgress, [0, 1], [0, 1]);

	const words = DATA.text.start_text[0].split(' ');
	const words2 = DATA.text.middle_text[0].main;

	const move = interpolate(progress, [0, 1], [100, 1]);
	const animateWidth = interpolate(progress, [0, 1], [0, 400]);
	const animateHeight = interpolate(progress, [0, 1], [0, 600]);

	return (
		<div
			style={{
				width: animateWidth,
				height: '100px',
				background: color,
				opacity: '.7',
				color: 'blue',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				// BorderRadius: radius === 'up' ? '70% 50% 30% 10%' : '10% 30% 50% 70%',
				borderRadius: '30px',
				textAlign: 'center',
			}}
		>
			<h1
				style={{
					opacity,
					fontSize: font,
				}}
			>
				{text}
			</h1>
		</div>
	);
};
