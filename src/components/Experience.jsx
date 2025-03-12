"use client";

import { Group, Layer, Rect, Stage, Star, Text } from "react-konva";
import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CONFIG = {
	seatSize: { width: 20, height: 20 },
	seatGap: 5,
	zoomScale: 2,
	colors: {
		seatAvailable: "#a3ff0f",
		seatObtained: "#ff462e",
	},
};

function Experience() {
	const containerRef = useRef(null);
	const stageRef = useRef(null);
	const [containerSizes, setContainerSizes] = useState({ width: 0, height: 0 });
	const floatInfoRef = useRef(null);
	const [floatInfo, setFloatInfo] = useState({
		name: "Default",
		description: "Default",
		textColor: "#fff",
		bgColor: "#000",
	});
	const [selectedAreaInfo, setSelectedArea] = useState(null);
	const [sceneToggle, setSceneToggle] = useState(true);

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
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
						{
							name: "s2",
							x: 0,
							y: 0,
							width: 10,
							height: 10,
							isObtianed: false,
						},
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
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
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
					],
				},
				{
					name: "middle",
					x: 0,
					y: 10,
					seats: [
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
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
						{
							name: "s2",
							x: 0,
							y: 0,
							width: 10,
							height: 10,
							isObtianed: false,
						},
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
					],
				},
				{
					name: "middle",
					x: 0,
					y: 10,
					seats: [
						{
							name: "s2",
							x: 0,
							y: 0,
							width: 10,
							height: 10,
							isObtianed: false,
						},
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
						{
							name: "s2",
							x: 0,
							y: 0,
							width: 10,
							height: 10,
							isObtianed: false,
						},
						{
							name: "s2",
							x: 0,
							y: 0,
							width: 10,
							height: 10,
							isObtianed: false,
						},
					],
				},
				{
					name: "back",
					x: 0,
					y: 10,
					seats: [
						{
							name: "s2",
							x: 0,
							y: 0,
							width: 10,
							height: 10,
							isObtianed: false,
						},
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
						{
							name: "s2",
							x: 0,
							y: 0,
							width: 10,
							height: 10,
							isObtianed: false,
						},
						{ name: "s2", x: 0, y: 0, width: 10, height: 10, isObtianed: true },
						{
							name: "s2",
							x: 0,
							y: 0,
							width: 10,
							height: 10,
							isObtianed: false,
						},
						{
							name: "s2",
							x: 0,
							y: 0,
							width: 10,
							height: 10,
							isObtianed: false,
						},
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

	useEffect(() => {
		console.dir(stageRef.current);
	}, [stageRef.current]);
	useEffect(() => {
		console.dir(selectedAreaInfo);
	}, [selectedAreaInfo]);

	return (
		<div className="grid grid-cols-6 gap-4">
			<div className="aspect-video col-span-5 relative" ref={containerRef}>
				<div
					className="info absolute pointer-events-none z-10 bg-white shadow-lg rounded-2xl overflow-hidden opacity-0"
					ref={floatInfoRef}
				>
					<div className="px-8 py-2 flex gap-2">
						<div>{floatInfo.name}</div>
						{!sceneToggle && (
							<>
								<div>[row]</div>
								<div>[seat]</div>
							</>
						)}
					</div>
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
						ref={stageRef}
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
						<Layer visible={sceneToggle}>
							{stageAreas.map((area, i) => (
								<Group
									key={i}
									draggable
									onDragEnd={(e) =>
										console.log(e.currentTarget.x(), e.currentTarget.y())
									}
									onClick={(e) => {
										setSelectedArea(area);
										alert("change scene");
										setSceneToggle(!sceneToggle);
									}}
									onMouseEnter={(e) => {
										// e.currentTarget.stopPropagation();
										// e.currentTarget.scale({ x: 1.2, y: 1.2 });
										// e.currentTarget.draw();
										stageRef.current.container().style.cursor = "pointer";
										setFloatInfo(area);

										gsap.fromTo(
											floatInfoRef.current,
											{
												opacity: 0,
												yPercent: 50,
											},
											{
												opacity: 1,
												yPercent: 0,
											}
										);
									}}
									onMouseLeave={(e) => {
										// e.currentTarget.stopPropagation();
										// e.currentTarget.scale({ x: 1, y: 1 });
										stageRef.current.container().style.cursor = "default";

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
										width={area.width}
										height={area.height}
										fontSize={18}
										align="center"
									/>
								</Group>
							))}
						</Layer>

						{/* seat config */}
						<Layer visible={!sceneToggle}>
							<Rect
								fill={"#ff0000"}
								width={50}
								height={50}
								onClick={(e) => {
									alert("back scene");
									setSelectedArea(null);
									setSceneToggle(!sceneToggle);
								}}
							/>
							{selectedAreaInfo && (
								<Group>
									<Rect
										fill={selectedAreaInfo.bgColor}
										width={selectedAreaInfo.width}
										height={selectedAreaInfo.height}
										x={
											containerSizes.width / 2 -
											(selectedAreaInfo.width / 2) * CONFIG.zoomScale
										}
										y={
											containerSizes.height / 2 -
											(selectedAreaInfo.height / 2) * CONFIG.zoomScale
										}
										// x={stageRef.current.container().attrs.width / 2}
										// y={0}
										scale={{ x: CONFIG.zoomScale, y: CONFIG.zoomScale }}
									/>

									{/* render seats */}
									<Group>
										{selectedAreaInfo.rows.map((row, i) => (
											<Group
												key={i}
												x={
													containerSizes.width / 2 -
													(selectedAreaInfo.width / 2) * CONFIG.zoomScale
												}
												y={
													containerSizes.height / 2 -
													(selectedAreaInfo.height / 2) * CONFIG.zoomScale +
													i * CONFIG.seatSize.height +
													CONFIG.seatGap * i
												}
											>
												{row?.seats.map((seat, j) => (
													<Rect
														key={j}
														fill={
															seat.isObtianed
																? CONFIG.colors.seatObtained
																: CONFIG.colors.seatAvailable
														}
														width={CONFIG.seatSize.width}
														height={CONFIG.seatSize.height}
														// x={CONFIG.seatGap + j * CONFIG.seatSize.width}
														// y={CONFIG.seatSize.height}

														x={CONFIG.seatSize.width * j + CONFIG.seatGap * j}
														y={0}
														stroke={"#000"}
														strokeWidth={1}
														draggable
													/>
												))}
											</Group>
										))}
									</Group>
								</Group>
							)}
						</Layer>
					</Stage>
				)}
			</div>
			<div>[ctrl]</div>
		</div>
	);
}

export default Experience;
