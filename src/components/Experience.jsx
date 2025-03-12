"use client";

import { Group, Layer, Rect, Stage, Star, Text } from "react-konva";
import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CONFIG = {
	seatSize: { width: 10, height: 10 },
	seatGap: 2,
};

function Experience() {
	const containerRef = useRef(null);
	const [containerSizes, setContainerSizes] = useState({ width: 0, height: 0 });
	const floatInfoRef = useRef(null);
	const [floatInfo, setFloatInfo] = useState({
		name: "Default",
		description: "Default",
		textColor: "#fff",
		bgColor: "#000",
	});

	const stageAreas = [
		{
			name: "D&B",
			description: "abc",
			x: 62,
			y: 127,
			width: 100,
			height: 100,
			bgColor: "#007888",
			textColor: "#ffffff",
			rows: [
				{
					name: "front",
					x: 0,
					y: 10,
					seats: [
						{ name: "s2", x: 0, y: 0, width: 10, height: 10 },
						{ name: "s2", x: 0, y: 0, width: 10, height: 10 },
					],
				},
			],
		},
		{
			name: "Trap",
			description: "abc",
			x: 122,
			y: 246,
			width: 100,
			height: 80,
			bgColor: "#ce3a00",
			textColor: "#ffffff",
			rows: [
				{
					name: "front",
					x: 0,
					y: 10,
					seats: [
						{ name: "s2", x: 0, y: 0, width: 10, height: 10 },
						{ name: "s2", x: 0, y: 0, width: 10, height: 10 },
					],
				},
			],
		},
		{
			name: "Mor Lam",
			description: "abc",
			x: 481,
			y: 45,
			width: 200,
			height: 80,
			bgColor: "#19eb24",
			textColor: "#131313",
			rows: [
				{
					name: "front",
					x: 0,
					y: 10,
					seats: [
						{ name: "s2", x: 0, y: 0, width: 10, height: 10 },
						{ name: "s2", x: 0, y: 0, width: 10, height: 10 },
					],
				},
			],
		},
	];

	useEffect(() => {
		// console.dir(containerRef.current);

		setContainerSizes({
			width: containerRef.current.clientWidth,
			height: containerRef.current.clientHeight,
		});
	}, [containerRef.current]);

	return (
		<div className="grid grid-cols-6 gap-4">
			<div className="aspect-video col-span-5 relative" ref={containerRef}>
				<div
					className="info absolute pointer-events-none z-10"
					ref={floatInfoRef}
				>
					<div className="px-8 py-2">{floatInfo.name}</div>
					<div
						className="px-8 py-2"
						style={{
							backgroundColor: floatInfo.bgColor,
							color: floatInfo.textColor,
						}}
					>
						{floatInfo.description}
					</div>
				</div>
				{containerRef.current && (
					<Stage
						width={containerSizes.width}
						height={containerSizes.height}
						onMouseMove={(e) => {
							// console.log(e.evt.x, e.evt.y);
							gsap.to(floatInfoRef.current, {
								x: e.evt.x,
								y: e.evt.y,
							});
						}}
					>
						<Layer>
							{stageAreas.map((area, i) => (
								<Group
									key={i}
									draggable
									onDragEnd={(e) =>
										console.log(e.currentTarget.x(), e.currentTarget.y())
									}
									onMouseEnter={(e) => {
										// e.currentTarget.stopPropagation();
										// e.currentTarget.scale({ x: 1.2, y: 1.2 });
										// e.currentTarget.draw();

										gsap.to(floatInfoRef.current, {
											opacity: 1,
										});
									}}
									onMouseLeave={(e) => {
										// e.currentTarget.stopPropagation();
										// e.currentTarget.scale({ x: 1, y: 1 });
										gsap.to(floatInfoRef.current, { opacity: 0 });
									}}
								>
									<Rect
										fill={area.bgColor}
										width={area.width}
										height={area.height}
										x={area.x}
										y={area.y}
									/>
									<Text
										text={area.name}
										fill={area.textColor}
										x={area.x}
										y={area.y}
										fontSize={18}
									/>
								</Group>
							))}
							{/* <Group>
								<Text text="Try to drag a star" fill={"#000"} />
								<Rect
									fill="#89b717"
									width={containerSizes.width}
									height={containerSizes.height}
									x={0}
									y={0}

								/>
							</Group> */}
						</Layer>

						{/* seat config */}
						<Layer></Layer>
					</Stage>
				)}
			</div>
			<div>[ctrl]</div>
		</div>
	);
}

export default Experience;
