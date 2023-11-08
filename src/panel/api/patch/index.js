import superAgentPatch from "./superAgentPatch";
import agentPatch from "./agentPatch";
import superAgentUpdateUserToAgent from "./superAgentUpdateUserToAgent";
import makeDriver from "./makeDriver";
import adminUpdateUserToAgent from "./adminUpdateUserToAgent";

const patch = {
	superAgentPatch,
	superAgentUpdateUserToAgent,
	makeDriver,
	agentPatch,
	adminUpdateUserToAgent,
};
export default patch;
