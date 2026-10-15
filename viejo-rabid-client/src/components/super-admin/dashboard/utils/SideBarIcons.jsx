// https://tabler.io/icons?icon=home

export const HomeIcon = ({ size = 24 }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M5 12l-2 0l9 -9l9 9l-2 0" />
			<path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
			<path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
		</svg>
	);
};

export const ProductIcon = ({ size = 24 }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-box">
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
			<path d="M12 12l8 -4.5" />
			<path d="M12 12l0 9" />
			<path d="M12 12l-8 -4.5" />
		</svg>

	);
};

export const StockIcon = ({ size = 24 }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-warehouse">
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M3 21v-13l9 -4l9 4v13" />
			<path d="M13 13h4v8h-10v-6h6" />
			<path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3" />
		</svg>

	);
};

export const PurchasesIcon = ({ size = 24 }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-cog">
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
			<path d="M12 17h-6v-14h-2" />
			<path d="M6 5l14 1l-.79 5.526m-3.21 1.474h-10" />
			<path d="M17.001 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
			<path d="M19.001 15.5v1.5" />
			<path d="M19.001 21v1.5" />
			<path d="M22.032 17.25l-1.299 .75" />
			<path d="M17.27 20l-1.3 .75" />
			<path d="M15.97 17.25l1.3 .75" />
			<path d="M20.733 20l1.3 .75" />
		</svg>

	);
};

export const SalesIcon = ({ size = 24 }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-dollar">
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M13 21h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
			<path d="M16 3v4" />
			<path d="M8 3v4" />
			<path d="M4 11h12.5" />
			<path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
			<path d="M19 21v1m0 -8v1" />
		</svg>
	);

}
