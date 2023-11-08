import React, { useContext } from "react";
import { NavBarButton } from "../../components";
import "./index.scss";
import avatar from "../../assets/Images/avatar.png";
import logo from "../../assets/Images/Pikaap.png";
import { logOuthandler } from "../../../helpers/function";
import { UserContext } from "../../context/UserContextProvider";

const NavBar = () => {
	const { user } = useContext(UserContext);

	// const location = useLocation().pathname;

	// const navItem = [
	//   {
	//     id: 1,
	//     title: "داشبورد",
	//     link: "/dashboard",
	//   },
	//   {
	//     id: 2,
	//     title: "گالری",
	//     link: "/dashboard/gallery",
	//   },
	//   {
	//     id: 3,
	//     title: "حساب کاربری",
	//     link: "/dashboard/users",
	//   },
	//   {
	//     id: 4,
	//     title: "صفحه اصلی",
	//     link: "/",
	//   },
	// ];

	return (
		<div className='Navbar_Wrapper'>
			<div className='Left_Navbar_Side'>
				<div className='Button_Navbar_Wrapper'>
					<NavBarButton ButtonContent={<img src={avatar} alt='Avatar' />} />
					<NavBarButton
						ButtonContent={
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 48 48'
								width='48px'
								height='48px'
							>
								<path fill='#FF9800' d='M11 11H37V37H11z' />
								<path
									fill='#FF9800'
									d='M11.272 11.272H36.728V36.728H11.272z'
									transform='rotate(-45.001 24 24)'
								/>
								<path
									fill='#FFEB3B'
									d='M13,24c0,6.077,4.923,11,11,11c6.076,0,11-4.923,11-11s-4.924-11-11-11C17.923,13,13,17.923,13,24'
								/>
							</svg>
						}
					/>
					<NavBarButton
						ButtonContent={
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 640 512'
								fill='#92929f'
							>
								<defs>
									<style>{`.fa-secondary{opacity:.4}`}</style>
								</defs>
								<path
									className='fa-primary'
									d='M88 168h-64C10.75 168 0 178.8 0 192s10.75 24 24 24h64C101.3 216 112 205.3 112 192S101.3 168 88 168zM131.1 55.25l-55.5-32c-7.375-4.5-16.62-4.625-24.25-.375c-7.5 4.375-12.13 12.38-12.13 21c.125 8.75 4.875 16.75 12.38 20.88l55.5 32c7.375 4.5 16.63 4.625 24.25 .375c7.5-4.375 12.12-12.38 12.12-21C143.4 67.38 138.6 59.37 131.1 55.25zM588.4 64.75c11.25-6.75 14.88-21.25 8.375-32.5c-6.5-11.38-21-15.38-32.38-9l-55.38 32c-9.5 5.375-14 16.5-11.25 27C500.6 92.75 510.1 100 521 100c4.125 0 8.25-1.125 12-3.25L588.4 64.75zM319.1 512C355.4 512 384 483.4 384 448H256C256 483.4 284.6 512 319.1 512zM616 168h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64C629.3 216 640 205.3 640 192S629.3 168 616 168z'
								/>
								<path
									className='fa-secondary'
									d='M544 384.1c-.125 16.38-13 31.98-32.13 31.98H128.1c-19.13 0-32-15.61-32.13-31.98c0-8.125 3-15.86 8.625-21.74C124 341.6 160.1 310.3 160.1 208C160.1 130.3 214.5 68.13 288 52.88V32c0-17.62 14.25-32 32-32c17.62 0 32 14.38 32 32v20.88C425.5 68.13 479.9 130.3 479.9 208c0 102.3 36.13 133.6 55.5 154.3C541 368.2 544 375.9 544 384.1z'
								/>
							</svg>
						}
					/>
					<NavBarButton
						href={"#"}
						ButtonContent={
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 512 512'
								fill='#92929f'
							>
								<defs>
									<style>{`.fa-secondary{opacity:.4}`}</style>
								</defs>
								<path
									className='fa-primary'
									d='M303.2 399.6C289.1 410.6 272.5 416.1 256 416.1s-33.06-5.458-47.16-16.44L0 237.2v226.8C0 490.5 21.49 512 48 512h416c26.51 0 48-21.49 48-47.1V237.2L303.2 399.6zM495.9 209.1c12.94-10.2 13.89-30.14 2.389-41.95c-1.451-1.492-3.014-2.891-4.686-4.184C481.4 153.4 470.2 144.6 448 128.1V246.4C448 246.4 495.9 209.2 495.9 209.1zM256.4 0H255.6c-18.44 0-42.96 18.33-60.66 32h122.2C299.4 18.33 274.9 0 256.4 0zM16.18 209.2L64 246.4V128.1C41.8 144.6 30.56 153.4 18.38 163C16.7 164.3 15.14 165.7 13.69 167.2C2.191 178.1 3.24 199 16.18 209.2C16.25 209.3 16.11 209.2 16.18 209.2zM176 223.1h160c8.836 0 16-7.164 16-16c0-8.838-7.164-15.1-16-15.1h-160c-8.836 0-16 7.162-16 15.1C160 216.8 167.2 223.1 176 223.1zM176 159.1h160c8.836 0 16-7.164 16-15.1c0-8.838-7.164-15.1-16-15.1h-160c-8.836 0-16 7.162-16 15.1C160 152.8 167.2 159.1 176 159.1z'
								/>
								<path
									className='fa-secondary'
									d='M416 32H96c-17.67 0-32 14.33-32 31.1V246.4l164.5 127.9c16.2 12.6 38.87 12.6 55.06 0L448 246.4V64C448 46.33 433.7 32 416 32zM336 223.1h-160c-8.836 0-16-7.164-16-16c0-8.838 7.164-15.1 16-15.1h160c8.836 0 16 7.162 16 15.1C352 216.8 344.8 223.1 336 223.1zM336 159.1h-160c-8.836 0-16-7.164-16-15.1c0-8.838 7.164-15.1 16-15.1h160c8.836 0 16 7.162 16 15.1C352 152.8 344.8 159.1 336 159.1z'
								/>
							</svg>
						}
					/>
					<NavBarButton
						href={"#"}
						ButtonContent={
							<div className='NavbuttonsWrapper'>
								<span className='tooltip'>خروج</span>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 512 512'
									fill='#92929f'
									onClick={() => logOuthandler()}
								>
									<defs>
										<style>{`.fa-secondary{opacity:.4}`}</style>
									</defs>
									<path
										className='fa-primary'
										d='M504.8 273.5l-144.1 136c-6.975 6.578-17.2 8.375-26 4.594c-8.803-3.797-14.51-12.47-14.51-22.05l-.0918-71.1l-128-.001c-17.69 0-32.02-14.33-32.02-32v-64c0-17.67 14.34-32 32.02-32l128 .001l.0918-72c0-9.578 5.707-18.25 14.51-22.05c8.803-3.781 19.03-1.984 26 4.594l144.1 136C514.4 247.6 514.4 264.4 504.8 273.5z'
									/>
									<path
										className='fa-secondary'
										d='M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480z'
									/>
								</svg>
							</div>
						}
					/>
				</div>
				<div className='infoWrapperDashboard'>
					<span>
						{user.name} {user.lastName}
					</span>
					<span>{user.type === "SUPER_AGENT" && "اتحادیه"}</span>
					<span>{user.type === "AGENT" && "آژانس"}</span>
					<span>{user.type === "ADMIN" && "ادمین"}</span>
				</div>
				{/* <div>
          <ul className="Navbar">
            {navItem.map((navItem, index) => (
              <span className="link_wrapper">
                <Link
                  key={index}
                  to={navItem.link}
                  className={`Navbar_item ${
                    location === navItem.link && "active"
                  }`}
                >
                  {navItem.title}
                </Link>
              </span>
            ))}
          </ul>
        </div> */}
			</div>

			<div>
				<div className='logo_wrapper'>
					<img src={logo} alt='logo' />
				</div>
			</div>
		</div>
	);
};

export default NavBar;
