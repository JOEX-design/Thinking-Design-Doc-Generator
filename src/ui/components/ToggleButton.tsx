import * as React from "react";

export const ToggleButton = () => {
	const [selectedItem, setSelectedItem] = React.useState(1);
	const containerRef = React.useRef(null);
	const [activeWidth, setActiveWidth] = React.useState({ height: 0, width: 0 });
	const handleItemClick = (itemId) => {
		setSelectedItem(itemId);
		const docContainer = document.getElementById('doc-container');
		const targetMode = itemId === 1 ? 'light' : 'dark';
		docContainer.setAttribute('data-mode', targetMode);

	};

	function calcWidth(columns) {
		const elWidth = containerRef.current.clientWidth;
		const elHeight = containerRef.current.clientHeight;

		return {
			width: elWidth / columns,
			height: elHeight
		};
	}
	

	React.useEffect(() => {
		setActiveWidth(calcWidth(2));
	}, []);

	return (
		<div className="doc-toggle-button">
			<div className="button-group" ref={containerRef}>
				<div
					role="button"
					className={`toggle-button-item ${selectedItem === 1 ? "active" : ""}`}
					onClick={() => handleItemClick(1)}
				>
					☼ 浅色
				</div>
				<div
					role="button"
					className={`toggle-button-item ${selectedItem === 2 ? "active" : ""}`}
					onClick={() => handleItemClick(2)}
				>
					☽ 深色
				</div>
			</div>
			<div
				className="slide-animation"
				style={{
					transform: `translateX(calc(${selectedItem - 1} * 100%))`,
					width: `${activeWidth.width}px`,
					height: `${activeWidth.height}px`
				}}
			/>
		</div>
	);
};

