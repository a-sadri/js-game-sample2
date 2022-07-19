import {Sequence, Series, useCurrentFrame} from 'remotion';
import {spring} from 'remotion';
import {interpolate} from 'remotion';
import {useVideoConfig} from 'remotion';
import {Box} from './Box';

import {DATA, PRIMARY_COLOR, YELLOW_COLOR} from './constants';

export const Titles: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	// Set range of value for opacity property to animate fading of beginning the video
	const opacity = interpolate(frame, [0, 1], [0, 1]);

	const progress = spring({
		frame: frame - 15,
		fps,
		config: {
			damping: 200,
			// Stiffness: 500,
		},
		// DurationInFrames: 50,
	});

	const words = DATA.text.start_text[0].split(' ');

	const move = interpolate(progress, [0, 1], [100, 1]);
	const animateWidth = interpolate(progress, [0, 1], [0, 400]);
	const animateHeight = interpolate(progress, [0, 1], [0, 600]);

	return (
		<>
			<Sequence from={0} durationInFrames={60}>
				<div
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						fontSize: '1rem',
						color: PRIMARY_COLOR,
						display: 'flex',
						justifyContent: 'center',
						alignContent: 'center',
						flexDirection: 'column',
						textAlign: 'center',
						opacity,
						zIndex: 1,
						// Transform: `translateX(${move}px)`,
					}}
				>
					{words.map((word, index) => {
						const delay = index * 7;

						const scale = spring({
							fps,
							frame: frame - delay,
							config: {
								damping: 200,
							},
						});
						return (
							<>
								<h1
									key={word + index}
									style={{
										transform: `scale(${scale})`,
									}}
								>
									{word}
								</h1>
							</>
						);
					})}
				</div>

				<div
					style={{
						width: '100%',
						// Height: animateHeight,
						// background: 'red',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						// Position: 'absolute',
						// TextAlign: 'center',
						// Transform: `translateY(${wi}px)`,
					}}
				>
					<div
						style={{
							width: '150px',
							height: animateHeight,
							// Background: 'blue',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							backdropFilter: 'blur(10px)',
							// Position: 'absolute',
						}}
					/>
				</div>
			</Sequence>

			<Sequence
				from={60}
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '5px',
				}}
			>
				<Box
					text={DATA.text.middle_text[0].main}
					radius="up"
					color={YELLOW_COLOR}
					font="30px"
				/>

				<Box
					text={DATA.text.middle_text[0].secondary}
					radius="down"
					color={YELLOW_COLOR}
					font="20px"
				/>
			</Sequence>

			<Sequence
				from={110}
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '5px',
				}}
			>
				<Box
					text={DATA.text.middle_text[1].product_id}
					radius="up"
					color={YELLOW_COLOR}
					font="30px"
				/>

				<Box
					text={DATA.text.middle_text[1].quantity}
					radius="down"
					color={YELLOW_COLOR}
					font="20px"
				/>
			</Sequence>
		</>
	);
};
