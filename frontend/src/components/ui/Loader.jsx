import "./Loader.css";

const Loader = ({ small = false }) => {
	return (
		<div className={`loader-wrapper${small ? " loader-sm" : ""}`}>
			<div className="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loader;