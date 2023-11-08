import Cookies from "js-cookie";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DropDown } from "../../components";
import { constants } from "../../values";
import "./index.scss";

export const sideBar = [
	{
		link: "dashboard",
		hasSubMenu: false,
		svg: (
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='#92929F'>
				<defs>
					<style>{`.fa-secondary{ opacity: 0.4}`}</style>
				</defs>
				<path
					className='fa-primary'
					d='M176 0h-128C21.49 0 0 21.49 0 48v128C0 202.5 21.49 224 48 224h128C202.5 224 224 202.5 224 176v-128C224 21.49 202.5 0 176 0zM464 288h-128C309.5 288 288 309.5 288 336v128c0 26.51 21.49 48 48 48h128c26.51 0 48-21.49 48-48v-128C512 309.5 490.5 288 464 288z'
				/>
				<path
					className='fa-secondary'
					d='M464 0h-128C309.5 0 288 21.49 288 48v128C288 202.5 309.5 224 336 224h128C490.5 224 512 202.5 512 176v-128C512 21.49 490.5 0 464 0zM176 288h-128C21.49 288 0 309.5 0 336v128C0 490.5 21.49 512 48 512h128C202.5 512 224 490.5 224 464v-128C224 309.5 202.5 288 176 288z'
				/>
			</svg>
		),
		title: "داشبورد",
	},
	{
		id: "list1",
		link: "users",
		svg: (
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512' fill='#92929F'>
				<defs>
					<style>{`.fa-secondary{opacity:.4}`}</style>
				</defs>
				<path
					className='fa-primary'
					d='M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z'
				/>
				<path
					className='fa-secondary'
					d='M479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z'
				/>
			</svg>
		),
		title: "کاربران",
		hasSubMenu: true,
		subMenu: [
			{
				link: "superAgent",
				title: "اتحادیه",
				access: ["ADMIN", "SUPER_AGENT"],
			},
			{
				link: "agenacies",
				title: "آژانس ها",
				access: ["ADMIN", "SUPER_AGENT"],
			},
			{
				link: "drivers",
				title: "رانندگان",
				access: ["ADMIN", "SUPER_AGENT"],
			},
			{
				link: "passengers",
				title: "مسافران",
				access: ["ADMIN", "SUPER_AGENT"],
			},
		],
	},
	{
		id: "list2",
		link: "#",
		hasSubMenu: true,
		svg: (
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' fill='#92929F'>
				<defs>
					<style>{`.fa-secondary{opacity:.4}`}</style>
				</defs>
				<path
					className='fa-primary'
					d='M240 160V32h-32v128H0v272C0 458.5 21.49 480 48 480h352c26.51 0 48-21.49 48-48V160H240zM276.2 356.4c-3.08 17.81-16.84 29.38-36.19 33.22L240 400c0 8.844-7.146 16-15.99 16s-16.01-7.156-16.01-16l.0104-10.72c-7.844-1.635-15.71-4.24-22.75-6.783l-3.547-1.266C173.4 378.3 169 369.1 172 360.8c2.953-8.344 12.08-12.67 20.42-9.734l3.703 1.328C203 354.9 210.8 357.7 216.1 358.6c12.75 2.047 26.39 .0156 27.73-7.688c.9531-5.531 .3802-8.26-25.03-15.54l-5.083-1.474c-14.66-4.297-49-14.39-42.8-50.28c3.096-17.91 16.74-29.76 36.25-33.55V240c0-8.844 7.156-16 16-16s16 7.156 16 16v10.86c5.541 1.17 11.28 2.586 16.88 4.52c8.359 2.891 12.8 12 9.906 20.34c-2.875 8.359-12.06 12.73-20.34 9.906c-5.156-1.781-10.59-3.484-15.52-4.25c-12.84-2.062-26.31 0-27.64 7.703C202.5 293.6 201.1 296.9 223.6 303.2l4.745 1.37C248.6 310.4 282.5 320.1 276.2 356.4z'
				/>
				<path
					className='fa-secondary'
					d='M56.75 53.88L.375 158.8C.75 159.3 .875 159.5 1.25 160H208V32H87.13C73.25 32 61.13 40.75 56.75 53.88zM391.3 53.88C386.9 40.75 374.8 32 360.9 32H240v128h206.8c.375-.5 .5-.75 .875-1.25L391.3 53.88z'
				/>
			</svg>
		),
		title: "مالی",
		subMenu: [
			{
				link: "invoice",
				title: "فیش ها",
				access: ["ADMIN", "SUPER_AGENT"],
			},
			{
				link: "trip",
				title: "سفر ها",
				access: ["ADMIN", "SUPER_AGENT"],
			},
			// {
			// 	link: "monthlyMembership",
			// 	title: "عضویت ماهانه",
			// },

			{
				link: "transactions",
				title: "تراکنش ها",
				access: ["ADMIN", "SUPER_AGENT"],
			},
			{
				link: "financialGroups",
				title: "گروه های مالی",
				access: ["ADMIN", "SUPER_AGENT"],
			},
			{
				link: "travelGroups",
				title: "گروه های سفر",
				access: ["ADMIN", "SUPER_AGENT"],
			},
		],
	},
	// {
	// 	link: "setting",
	// 	hasSubMenu: false,

	// 	svg: (
	// 		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='#92929F'>
	// 			<defs>
	// 				<style>{`.fa-secondary{opacity:.4}`}</style>
	// 			</defs>
	// 			<path
	// 				className='fa-primary'
	// 				d='M499.5 332c0-5.66-3.112-11.13-8.203-14.07l-46.61-26.91C446.8 279.6 448 267.1 448 256s-1.242-23.65-3.34-35.02l46.61-26.91c5.092-2.941 8.203-8.411 8.203-14.07c0-14.1-41.98-99.04-63.86-99.04c-2.832 0-5.688 .7266-8.246 2.203l-46.72 26.98C362.9 94.98 342.4 83.1 320 75.16V21.28c0-7.523-5.162-14.28-12.53-15.82C290.8 1.977 273.7 0 256 0s-34.85 1.977-51.48 5.461C197.2 7.004 192 13.76 192 21.28v53.88C169.6 83.1 149.1 94.98 131.4 110.1L84.63 83.16C82.08 81.68 79.22 80.95 76.39 80.95c-19.72 0-63.86 81.95-63.86 99.04c0 5.66 3.112 11.13 8.203 14.07l46.61 26.91C65.24 232.4 64 244 64 256s1.242 23.65 3.34 35.02l-46.61 26.91c-5.092 2.941-8.203 8.411-8.203 14.07c0 14.1 41.98 99.04 63.86 99.04c2.832 0 5.688-.7266 8.246-2.203l46.72-26.98C149.1 417 169.6 428.9 192 436.8v53.88c0 7.523 5.162 14.28 12.53 15.82C221.2 510 238.3 512 255.1 512s34.85-1.977 51.48-5.461C314.8 504.1 320 498.2 320 490.7v-53.88c22.42-7.938 42.93-19.82 60.65-34.97l46.72 26.98c2.557 1.477 5.416 2.203 8.246 2.203C455.3 431 499.5 349.1 499.5 332zM256 336c-44.11 0-80-35.89-80-80S211.9 176 256 176s80 35.89 80 80S300.1 336 256 336z'
	// 			/>
	// 			<path
	// 				className='fa-secondary'
	// 				d='M256 288C238.4 288 224 273.6 224 256s14.36-32 32-32s32 14.35 32 32S273.6 288 256 288z'
	// 			/>
	// 		</svg>
	// 	),
	// 	title: "تنظیمات",
	// },
	// {
	// 	link: "access",
	// 	hasSubMenu: false,
	// 	svg: (
	// 		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='#92929F'>
	// 			<defs>
	// 				<style>{`.fa-secondary{opacity:.4}`}</style>
	// 			</defs>
	// 			<path
	// 				className='fa-primary'
	// 				d='M499.5 332c0-5.66-3.112-11.13-8.203-14.07l-46.61-26.91C446.8 279.6 448 267.1 448 256s-1.242-23.65-3.34-35.02l46.61-26.91c5.092-2.941 8.203-8.411 8.203-14.07c0-14.1-41.98-99.04-63.86-99.04c-2.832 0-5.688 .7266-8.246 2.203l-46.72 26.98C362.9 94.98 342.4 83.1 320 75.16V21.28c0-7.523-5.162-14.28-12.53-15.82C290.8 1.977 273.7 0 256 0s-34.85 1.977-51.48 5.461C197.2 7.004 192 13.76 192 21.28v53.88C169.6 83.1 149.1 94.98 131.4 110.1L84.63 83.16C82.08 81.68 79.22 80.95 76.39 80.95c-19.72 0-63.86 81.95-63.86 99.04c0 5.66 3.112 11.13 8.203 14.07l46.61 26.91C65.24 232.4 64 244 64 256s1.242 23.65 3.34 35.02l-46.61 26.91c-5.092 2.941-8.203 8.411-8.203 14.07c0 14.1 41.98 99.04 63.86 99.04c2.832 0 5.688-.7266 8.246-2.203l46.72-26.98C149.1 417 169.6 428.9 192 436.8v53.88c0 7.523 5.162 14.28 12.53 15.82C221.2 510 238.3 512 255.1 512s34.85-1.977 51.48-5.461C314.8 504.1 320 498.2 320 490.7v-53.88c22.42-7.938 42.93-19.82 60.65-34.97l46.72 26.98c2.557 1.477 5.416 2.203 8.246 2.203C455.3 431 499.5 349.1 499.5 332zM256 336c-44.11 0-80-35.89-80-80S211.9 176 256 176s80 35.89 80 80S300.1 336 256 336z'
	// 			/>
	// 			<path
	// 				className='fa-secondary'
	// 				d='M256 288C238.4 288 224 273.6 224 256s14.36-32 32-32s32 14.35 32 32S273.6 288 256 288z'
	// 			/>
	// 		</svg>
	// 	),
	// 	title: "سطوح دسترسی",
	// },
];

const SideBarMenu = ({ setOpen }) => {
	const location = useLocation().pathname;

	return (
		<div className='aside-menu'>
			<div className='aside-menu-container'>
				<div className='aside-menu-items'>
					<div className='item'>
						{sideBar.map((item, i) => {
							if (item.hasSubMenu === true) {
								const newSubMenu = item.subMenu.filter((subMenu) =>
									subMenu.access.includes(Cookies.get(constants.USER_TYPE))
								);
								return (
									<DropDown
										key={i}
										menuLink={`menu-link`}
										itemRow='item-row'
										itemText={item.title}
										menuIcon='menu-icon'
										svgWrapper='svg-wrapper'
										menuTitle='menu-title'
										itemSvg={item.svg}
										itemHasSubMenu={newSubMenu.map((subMenu, i) => (
											<Link
												onClick={() => setOpen(false)}
												to={subMenu.link}
												key={i}
												className={`menu-link subMenu ${
													location.includes(subMenu.link) ? "active" : ""
												}`}
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 256 512'
													fill='#92929F'
												>
													<defs>
														<style>{`.fa-secondary{opacity:.4}`}</style>
													</defs>
													<path
														className='fa-secondary'
														d='M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z'
													/>
												</svg>
												{subMenu.title}
											</Link>
										))}
									/>
								);
							} else {
								return (
									<Link
										to={item.link}
										className={`menu-link ${
											location.includes(item.link) ? "active" : ""
										}`}
										key={i}
									>
										<div className='item-row'>
											<div className='menu-icon'>
												<div className='svg-wrapper'>{item.svg}</div>
											</div>
											<span className='menu-title'>{item.title}</span>
										</div>
									</Link>
								);
							}
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideBarMenu;
