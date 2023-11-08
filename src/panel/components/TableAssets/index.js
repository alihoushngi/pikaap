import { useLocation } from "react-router-dom";
import { DropDown, FilterDropDown, SearchDropDown } from "../../components";
import "./index.scss";

const TableAssets = ({
	childern,
	mainData,
	inputSelections,
	filterTitleData,
	footerData,
	SearchSelection,
	SearchmainData,
	SearchTitleData,
	SearchfooterData,
	haveSearch,
	haveFilter,
}) => {
	const locationName = useLocation().pathname;

	return (
		<>
			<div className='assetsWrapper'>
				<div className='breadcrumbs'>
					<h5>
						{locationName.split("/")[2] === "superAgent" && (
							<div className='textAlignRight mb-1 grayColor'>اتحادیه</div>
						)}
						{locationName.split("/")[2] === "agenacies" && (
							<div className='textAlignRight mb-1 grayColor'>آژانس ها</div>
						)}
						{locationName.split("/")[2] === "drivers" && (
							<div className='textAlignRight mb-1 grayColor'>رانندگان</div>
						)}
						{locationName.split("/")[2] === "passengers" && (
							<div className='textAlignRight mb-1 grayColor'>مسافران</div>
						)}
						{locationName.split("/")[2] === "invoice" && (
							<div className='textAlignRight mb-1 grayColor'>فیش ها</div>
						)}
						{locationName.split("/")[2] === "financialGroups" && (
							<div className='textAlignRight mb-1 grayColor'>گروه های مالی</div>
						)}
						{locationName.split("/")[2] === "travelGroups" && (
							<div className='textAlignRight mb-1 grayColor'>گروه های سفر</div>
						)}
						{locationName.split("/")[2] === "transactions" && (
							<div className='textAlignRight mb-1 grayColor'>تراکنش ها</div>
						)}
					</h5>
					<div className='breadcrumbs_container'>
						<a href='/'>
							{locationName.split("/")[1] === "administrator" && (
								<span className='grayColor'>صفحه اصلی</span>
							)}
						</a>
						<a href={locationName}>
							{locationName.split("/")[2] === "superAgent" && (
								<span className='grayColor'>اتحادیه</span>
							)}
							{locationName.split("/")[2] === "agenacies" && (
								<span className='grayColor'>آژانس ها</span>
							)}
							{locationName.split("/")[2] === "drivers" && (
								<span className='grayColor'>رانندگان</span>
							)}
							{locationName.split("/")[2] === "passengers" && (
								<span className='grayColor'>مسافران</span>
							)}
							{locationName.split("/")[2] === "invoice" && (
								<span className='grayColor'>فیش ها</span>
							)}
							{locationName.split("/")[2] === "financialGroups" && (
								<span className='grayColor'>گروه های مالی</span>
							)}
							{locationName.split("/")[2] === "travelGroups" && (
								<span className='grayColor'>گروه های سفر</span>
							)}
							{locationName.split("/")[2] === "transactions" && (
								<span className='grayColor'>تراکنش ها</span>
							)}
						</a>
					</div>
				</div>
				<div className='ButtonsWrapper'>
					{haveSearch ? (
						<DropDown
							menuLink='menu-link me-1'
							itemRow='button filterButton '
							menuIcon='menu-icon'
							svgWrapper='svg-wrapper'
							menuTitle='menu-title'
							itemSvg={
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
										d='M500.3 443.7l-119.7-119.7c-15.03 22.3-34.26 41.54-56.57 56.57l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7z'
									/>
									<path
										className='fa-secondary'
										d='M207.1 0C93.12 0-.0002 93.13-.0002 208S93.12 416 207.1 416s208-93.13 208-208S322.9 0 207.1 0zM207.1 336c-70.58 0-128-57.42-128-128c0-70.58 57.42-128 128-128s128 57.42 128 128C335.1 278.6 278.6 336 207.1 336z'
									/>
								</svg>
							}
							style={{ display: "none" }}
							itemHasSubMenu={
								<SearchDropDown
									customClassForFilter='searchDrop'
									inputSelections={SearchSelection}
									main={SearchmainData}
									filterTitle={SearchTitleData}
									footer={SearchfooterData}
								/>
							}
							boxStyle={{ position: "absolute" }}
						/>
					) : null}
					{haveFilter ? (
						<DropDown
							menuLink='menu-link '
							itemRow='button filterButton'
							menuIcon='menu-icon'
							svgWrapper='svg-wrapper'
							menuTitle='menu-title'
							itemSvg={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 448 512'
									fill='#92929f'
								>
									<defs>
										<style>{`.fa-secondary{opacity:.4}`}</style>
									</defs>
									<path
										className='fa-primary'
										d='M256 384H191.1C174.3 384 160 398.3 160 415.1S174.3 448 191.1 448h64C273.7 448 288 433.7 288 416S273.7 384 256 384zM416 64H31.1C14.33 64 0 78.33 0 95.1S14.33 128 31.1 128h384C433.7 128 448 113.7 448 96S433.7 64 416 64z'
									/>
									<path
										className='fa-secondary'
										d='M352 224H95.1C78.33 224 64 238.3 64 255.1S78.33 288 95.1 288h256C369.7 288 384 273.7 384 256S369.7 224 352 224z'
									/>
								</svg>
							}
							style={{ display: "none" }}
							itemHasSubMenu={
								<FilterDropDown
									customClassForFilter='filterDrop'
									inputSelections={inputSelections}
									main={mainData}
									filterTitle={filterTitleData}
									footer={footerData}
								/>
							}
							boxStyle={{ position: "absolute" }}
						/>
					) : null}

					{childern}
				</div>
			</div>
		</>
	);
};

export default TableAssets;
