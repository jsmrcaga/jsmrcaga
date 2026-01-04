import React from 'react';

const BUBBLE_COLORS = [
	[40, 14, 207],
	[117, 14, 207],
	[197, 14, 207]
];

const CanvasContext = React.createContext();

const useCanvas = () => {
	const ctx = React.useContext(CanvasContext);
	if(!ctx) {
		return null;
	}

	return ctx;
};

const CanvasProvider = ({ children, ctx, canvas, width, height }) => {
	const [state, setState] = React.useState();


	return (
		<CanvasContext.Provider value={{
			ctx,
			canvas,
			width,
			height
		}}>
			{ children }
		</CanvasContext.Provider>
	);
};

export const Canvas = ({ children }) => {	
	const canvas = React.useRef();
	const [ctx, setCtx] = React.useState(null);
	const [{ width, height }, setDimensions] = React.useState({ width:0, height: 0 });

	React.useEffect(() => {
		const ctx = canvas.current.getContext('2d');
		setCtx(ctx);

		const parent = canvas.current.parentElement;
		const { width, height } = parent.getBoundingClientRect();
		setDimensions({ width, height });
	}, [canvas.current]);

	return (
		<CanvasProvider ctx={ctx} canvas={canvas.current} width={width} height={height}>
			<canvas ref={canvas} width={`${width}px`} height={`${height}px`}/>
			{
				ctx ? <Drawing>{children}</Drawing> : null
			}
		</CanvasProvider>
	);
}

const DEFAULT_VELOCITY = 1;
const MIN_VELOCITY = 0.5;
const MIN_ADULT_LIFE_FRAMES = 200;

class Bubble {
	constructor({ x, y, radius, direction, color, on_decay }) {
		this.id = (Math.random() * 0x10000000).toString(16);
		this.x = x ?? 0;
		this.y = y ?? 0;
		this.radius = radius ?? 4;
		this.direction = direction ?? [];
		this.color = color;
		this.opacity = 0;

		this.on_decay = on_decay;

		this.__updates = 0;

		this.lifetime = (Math.random() * 250) + 150;
	}

	static generate({ max_x, max_y, on_decay }) {
		const center = {
			x: max_x / 2,
			y: max_y / 2
		};

		// Spawnable Points = Circle at center
		const spawnable_points_radius = max_y / 3;
		const random_angle_theta = Math.random() * 2 * Math.PI;

		const x = center.x + spawnable_points_radius * Math.cos(random_angle_theta);
		const y = center.y + spawnable_points_radius * Math.sin(random_angle_theta);

		const radius = Math.floor(Math.random() * 70);
		const direction_x = (Math.random() * DEFAULT_VELOCITY * 2) - DEFAULT_VELOCITY;
		const direction_y = (Math.random() * DEFAULT_VELOCITY * 2) - DEFAULT_VELOCITY;

		const color = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];

		return new Bubble({
			x,
			y,
			radius,
			direction: {x: direction_x, y: direction_y},
			color,
			on_decay
		});
	}

	update() {
		this.x = this.x + this.direction.x;
		this.y = this.y + this.direction.y;

		if(this.__updates < this.lifetime) {
			this.opacity += 0.002;
		}

		if(this.__updates > this.lifetime + MIN_ADULT_LIFE_FRAMES) {
			this.opacity -= 0.002;
		}

		if(this.opacity <= 0) {
			this.decay();
		}

		this.__updates++;
	}

	get_color() {
		const [r, g, b] = this.color;
		return `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
	}

	decay() {
		if(this.on_decay) {
			this.on_decay();
		}
	}
}

const BUBBLES = 200;

const Drawing = ({ children, quantity=BUBBLES }) => {
	const { ctx, width, height } = useCanvas();
	const [, redraw] = React.useState();

	const max_x = width;
	const max_y = height;
	// ctx is guaranteed
	const bubbles = React.useMemo(() => {
		let _bubbles = {};
		const new_bubble = () => {
			const bubble = Bubble.generate({
				max_x: width,
				max_y: height,
				on_decay: () => {
					console.log('Decaying');
					delete _bubbles[bubble.id];
					new_bubble();
				}
			});

			_bubbles[bubble.id] = bubble;
		};

		for(let i =0; i < quantity; i++) {
			new_bubble();
		}

		return _bubbles;
	}, []);

	React.useEffect(() => {
		const draw = () => {
			// Clear previous drawing
			ctx.clearRect(0, 0, width, height);

			// Draw background
			ctx.fillStyle = '#111133';
			ctx.fillRect(0, 0, width, height);

			// Draw bubbles
			for(const bubble of Object.values(bubbles)) {
				bubble.update();

				const { x, y, radius } = bubble;
				const fillStyle = bubble.get_color();

				ctx.beginPath();
				ctx.arc(x, y, radius, 0, Math.PI * 2);
				ctx.fillStyle = fillStyle;
				ctx.fill();
			}
		};

		const loop = () => {
			draw();
			window.requestAnimationFrame(loop);
		};

		loop();
	}, []);

	return null;


};
