"use client";

import { Circle, Group, Layer, Line, Rect, Stage, Text } from "react-konva";
import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CONFIG = {
	seatSize: { width: 20, height: 20 },
	seatGap: 5,
	zoomScale: 2,
	colors: {
		seatAvailable: "#d2ff68",
		seatObtained: "#949494",
		seatHover: "#76c70d",
	},
};

function Experience() {
	const containerRef = useRef(null);
	const stageRef = useRef(null);
	const [containerSizes, setContainerSizes] = useState({ width: 0, height: 0 });
	const floatInfoRef = useRef(null);
	const floatSeatInfoRef = useRef(null);
	const [floatInfo, setFloatInfo] = useState({
		name: "Default",
		description: "Default",
		textColor: "#fff",
		bgColor: "#000",
	});
	const [floatSeatInfo, setFloatSeatInfo] = useState({
		name: "Default",
		description: "Default",
		textColor: "#fff",
		bgColor: "#000",
	});
	const [selectedAreaInfo, setSelectedArea] = useState(null);
	const [sceneToggle, setSceneToggle] = useState(true);
	const [createToggle, setCreateToggle] = useState(false);

	const [coordDraft, setCoordDraft] = useState([0, 0, 0, 0]);
	const [newSeats, setNewSeats] = useState([]);

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
						{ name: "s2", isObtianed: true },
						{
							name: "s2",
							isObtianed: false,
						},
						{ name: "s2", isObtianed: true },
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
						{ name: "s2", isObtianed: true },
						{ name: "s2", isObtianed: true },
					],
				},
				{
					name: "middle",
					x: 0,
					y: 10,
					seats: [
						{ name: "s2", isObtianed: true },
						{ name: "s2", isObtianed: true },
						{ name: "s2", isObtianed: true },
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
							isObtianed: false,
						},
						{ name: "s2", isObtianed: true },
						{ name: "s2", isObtianed: true },
						{ name: "s2", isObtianed: true },
					],
				},
				{
					name: "middle",
					x: 0,
					y: 10,
					seats: [
						{
							name: "s2",
							isObtianed: false,
						},
						{ name: "s2", isObtianed: true },
						{ name: "s2", isObtianed: true },
						{ name: "s2", isObtianed: true },
						{
							name: "s2",
							isObtianed: false,
						},
						{
							name: "s2",
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
							isObtianed: false,
						},
						{ name: "s2", isObtianed: true },
						{
							name: "s2",
							isObtianed: false,
						},
						{ name: "s2", isObtianed: true },
						{
							name: "s2",
							isObtianed: false,
						},
						{
							name: "s2",
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

	useEffect(() => {
		if (coordDraft.length < 1) {
			return;
		}

		for (let i = 0; i < coordDraft.length; i++) {}
	}, [coordDraft]);

	return (
		<div className="grid grid-cols-6 gap-4">
			<div className="aspect-video col-span-5 relative" ref={containerRef}>
				{/* stage info */}
				<div
					className="info absolute pointer-events-none z-10 bg-white shadow-lg rounded-2xl overflow-hidden opacity-0"
					ref={floatInfoRef}
				>
					<div className="px-8 py-2 flex gap-2">
						<div>{floatInfo.name}</div>
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
				{/* seat info */}
				<div
					className="info absolute pointer-events-none z-10 bg-white shadow-lg rounded-2xl overflow-hidden opacity-0 -translate-x-1/2 -translate-y-full origin-center"
					ref={floatSeatInfoRef}
				>
					<div className="px-8 py-2 flex gap-4">
						<div className="flex flex-col items-center gap-2">
							<div className="text-sm opacity-80">Stage</div>
							<div>{selectedAreaInfo?.name ?? "N/A"}</div>
						</div>
						<div className="flex flex-col items-center gap-2">
							<div className="text-sm opacity-80">Row</div>
							<div>{floatSeatInfo?.group?.name}</div>
						</div>
						<div className="flex flex-col items-center gap-2">
							<div className="text-sm opacity-80">Seat</div>
							<div>{floatSeatInfo?.name}</div>
						</div>
					</div>
					<div
						className="px-8 py-2"
						style={{
							backgroundColor: selectedAreaInfo?.bgColor ?? "#000",
							color: selectedAreaInfo?.textColor ?? "#FFF",
						}}
					>
						{selectedAreaInfo?.description ?? "-"}
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
										// alert("change scene");
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
							<Text
								text="Back"
								fill={"#ff0000"}
								x={20}
								y={20}
								fontSize={20}
								onClick={(e) => {
									// alert("back scene");
									setSelectedArea(null);
									setSceneToggle(!sceneToggle);
									setCoordDraft([0, 0, 0, 0]);
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
										onClick={(e) => {
											console.log(e.evt);
											if (createToggle) {
												setCoordDraft((prev) => [
													prev[0],
													prev[1],
													e.evt.offsetX,
													e.evt.offsetY,
												]);
												setCreateToggle(false);

												// alert("end");
											} else {
												if (confirm("create seat?")) {
													// alert("start");

													setCoordDraft((prev) => [
														e.evt.offsetX,
														e.evt.offsetY,
														e.evt.offsetX,
														e.evt.offsetY,
														// prev[2],
														// prev[3],
													]);

													setCreateToggle(true);

													alert("select endpoint");
												}
											}
										}}
									/>

									{/* render create */}
									<Line
										stroke={1}
										strokeWidth={1}
										points={[...coordDraft]}
										fill="#ff0000"
									/>

									{/* render seats */}
									<Group>
										{selectedAreaInfo.rows.map((row, i) => (
											<Group
												key={i}
												x={
													containerSizes.width / 2 -
													(selectedAreaInfo.width / 2) * CONFIG.zoomScale +
													CONFIG.seatSize.width
												}
												y={
													containerSizes.height / 2 -
													(selectedAreaInfo.height / 2) * CONFIG.zoomScale +
													i * CONFIG.seatSize.height +
													CONFIG.seatGap * i +
													CONFIG.seatSize.height
												}
												draggable
											>
												{row?.seats.map((seat, j) => (
													<Group
														key={j}
														x={CONFIG.seatSize.width * j + CONFIG.seatGap * j}
														y={0}
														onMouseEnter={(e) => {
															// console.log(e.evt);

															const current = {
																...seat,
																group: {
																	...row,
																},
															};
															console.log(current);
															setFloatSeatInfo(current);

															if (!seat.isObtianed) {
																stageRef.current.container().style.cursor =
																	"pointer";
															}
															gsap.set(floatSeatInfoRef.current, {
																x: e.evt.clientX,
																y: e.evt.clientY,
															});
															gsap.fromTo(
																floatSeatInfoRef.current,
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
															stageRef.current.container().style.cursor =
																"default";

															gsap.to(floatSeatInfoRef.current, {
																opacity: 0,
															});
														}}
													>
														<Circle
															fill={
																seat.isObtianed
																	? CONFIG.colors.seatObtained
																	: CONFIG.colors.seatAvailable
															}
															radius={CONFIG.seatSize.width}
															width={CONFIG.seatSize.width}
															height={CONFIG.seatSize.height}
															// x={CONFIG.seatGap + j * CONFIG.seatSize.width}
															// y={CONFIG.seatSize.height}

															stroke={"#000"}
															strokeWidth={1}
															onClick={() => {
																alert("selected event", seat);
															}}
														/>
														{/* <Text
															text={seat.name}
															align="center"
															fontSize={10}
														/> */}
													</Group>
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

			<div className="gap-4 grid">
				<div>[info]</div>
				<div>[seat labeling]</div>
				<div>[row labeling]</div>
			</div>
			<div>
				[debug]
				{JSON.stringify(coordDraft).toString()}
			</div>
		</div>
	);
}

export default Experience;
