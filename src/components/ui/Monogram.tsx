// Stand-in for the logo in the mockup. Replace with the real artwork.
export default function Monogram() {
	return (
		<svg viewBox="0 0 56 76" width="56" height="76" aria-hidden="true">
			<ellipse cx="28" cy="38" rx="26" ry="36" fill="#f5f2ed" stroke="#75705a" strokeWidth="1.5" />
			<text
				x="21"
				y="38"
				textAnchor="middle"
				fontSize="28"
				fill="#4f4f4f"
				style={{ fontFamily: 'var(--font-script)' }}
			>
				R
			</text>
			<text
				x="33"
				y="50"
				textAnchor="middle"
				fontSize="24"
				fill="#4f4f4f"
				style={{ fontFamily: 'var(--font-display)' }}
			>
				A
			</text>
		</svg>
	);
}
