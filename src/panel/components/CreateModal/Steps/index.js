import React, { memo } from "react";

const Steps = ({ step, type }) => {
	return (
		<>
			{type === "SuperAgent" && (
				<div className='stepper_nav'>
					<div className='stepper_item'>
						<div className='stepper_line'></div>
						<div className={`stepper_icon ${step === 1 && "active-step"}  `}>
							<div className='svgWrapper'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 512 512'
									fill='#fff'
									width='20px'
								>
									<defs>
										<style>{`.fa-secondary{opacity:.4}`}</style>
									</defs>
									<path
										className='fa-primary'
										d='M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z'
									/>
								</svg>
							</div>
							<span className='stepper_number'>1</span>
						</div>
						<div className='stepper_label'>
							<h3 className='stepper_title'>شماره موبایل</h3>
						</div>
					</div>
					<div className='stepper_item'>
						<div className='stepper_line'></div>
						<div className={`stepper_icon ${step === 2 && "active-step"}  `}>
							<div className='svgWrapper'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 512 512'
									fill='#fff'
									width='20px'
								>
									<defs>
										<style>{`.fa-secondary{opacity:.4}`}</style>
									</defs>
									<path
										className='fa-primary'
										d='M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z'
									/>
								</svg>
							</div>
							<span className='stepper_number'>2</span>
						</div>
						<div className='stepper_label'>
							<h3 className='stepper_title'>اطلاعات شخصی</h3>
						</div>
					</div>
					<div className='stepper_item'>
						<div className={`stepper_icon ${step === 3 && "active-step"}  `}>
							<div className='svgWrapper'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 512 512'
									fill='#fff'
									width='20px'
								>
									<defs>
										<style>{`.fa-secondary{opacity:.4}`}</style>
									</defs>
									<path
										className='fa-primary'
										d='M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z'
									/>
								</svg>
							</div>
							<span className='stepper_number'>3</span>
						</div>
						<div className='stepper_label'>
							<h3 className='stepper_title'>اطلاعات تخصصی</h3>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default memo(Steps);
