import { memo, useState } from "react";
import SuperAgentForm from "./Forms/SuperAgentForm";
import AgentForm from "./Forms/AgentForm";
import DriverForm from "./Forms/DriverForm";
import FinancialGroupsForm from "./Forms/FinancialGroupsForm";
import { Modal } from "../../components";
import "./index.scss";
import Steps from "./Steps";
import TravelGroupForm from "./Forms/TravelGroupForm";

function CreateModal({ type, setData }) {
	const [step, setStep] = useState(1);
	const [SuperAgentFormData, setSuperAgentFormData] = useState({
		superAgentName: "",
		phoneNumber: "",
		currency: "IRR",
		countryCode: "0098",
		language: "fa",
		code: "",
		firstName: "",
		lastName: "",
		financialGroup: "",
		travelGroup: "",
		nationalCode: "",
		city: "",
		address: "",
		shabaNumber: "",
		kartNumber: "",
	});

	const [SuperAgentFormPatchData, setSuperAgentFormPatchData] = useState({
		userId: "",
		superAgentName: "",
		code: "",
		financialGroup: "",
		travelGroup: "",
		nationalCode: "",
		city: "",
		address: "",
		shabaNumber: "",
		kartNumber: "",
	});

	const [AgentFormData, setAgentFormData] = useState({
		agentName: "",
		firstName: "",
		lastName: "",
		phoneNumber: "",
		type: "AGENCY",
		code: "",
		superAgentId: "",
		nationalCode: "",
		address: "",
		shabaNumber: "",
		kartNumber: "",
	});

	const [AgentFormPatchData, setAgentFormPatchData] = useState({
		userId: "",
		code: "",
		superAgentId: "",
		agentName: "",
		nationalCode: "",
		address: "",
		shabaNumber: "",
		kartNumber: "",
		type: "AGENCY",
	});

	const [DriverFormData, setDriverFormData] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		gender: "",
		agentId: "",
		nationalCode: "",
		address: "",
		shabaNumber: "",
		kartNumber: "",
		carBrand: "",
		vin: "",
		insuranceExpiryDate: "",
		insuranceNumber: "",
		carModel: "",
		plateNumber: {
			twoDigit: "",
			letter: "",
			threeDigit: "",
			iran: "",
		},
		driverLicenseNumber: "",
		carSystem: "",
		carColor: "",
		uniqueCodeThirdPartyInsurance: "",
	});

	const [FinancialGroupsFormData, setFinancialGroupsFormData] = useState({
		name: "",
		groupType: "TRAVEL",
		travelShare: {
			admin: "",
			driver: "",
			agent: "",
			superAgent: "",
			tax: "",
		},
		subscription: {
			share: {
				admin: "",
				agent: "",
				superAgent: "",
				tax: "",
			},
			cycle: "",
			fee: "",
		},
	});

	const [TravelGroupFormData, setTravelGroupFormData] = useState({
		name: "",
		leastDist: "",
		costForExtraKm: "",
		formulaRatio: "",
		ratioConstant: "",
		startCost: "",
		perExtraMin: "",
		percentForNight: "",
		percentRoundTrip: "",
		pauseInTripPerMinute: "",
	});

	return (
		<Modal openButtonClass='button addButton' buttonType='button' openButtonContent='افزودن'>
			<div className='row-wrapper'>
				<div className='right'>
					<Steps step={step} type={type} />
				</div>
				<div className='left'>
					{type === "SuperAgent" && (
						<SuperAgentForm
							step={step}
							setStep={setStep}
							SuperAgentFormData={SuperAgentFormData}
							setSuperAgentFormData={setSuperAgentFormData}
							SuperAgentFormPatchData={SuperAgentFormPatchData}
							setSuperAgentFormPatchData={setSuperAgentFormPatchData}
						/>
					)}
					{type === "Agent" && (
						<AgentForm
							step={step}
							setStep={setStep}
							AgentFormData={AgentFormData}
							setAgentFormData={setAgentFormData}
							AgentFormPatchData={AgentFormPatchData}
							setAgentFormPatchData={setAgentFormPatchData}
						/>
					)}
					{type === "Driver" && (
						<DriverForm
							step={step}
							setStep={setStep}
							DriverFormData={DriverFormData}
							setDriverFormData={setDriverFormData}
						/>
					)}
					{type === "FinancialGroups" && (
						<FinancialGroupsForm
							step={step}
							setStep={setStep}
							FinancialGroupsFormData={FinancialGroupsFormData}
							setFinancialGroupsFormData={setFinancialGroupsFormData}
						/>
					)}
					{type === "TravelGroups" && (
						<TravelGroupForm
							step={step}
							setStep={setStep}
							TravelGroupFormData={TravelGroupFormData}
							setTravelGroupFormData={setTravelGroupFormData}
							setData={setData}
						/>
					)}
				</div>
			</div>
		</Modal>
	);
}

export default memo(CreateModal);
