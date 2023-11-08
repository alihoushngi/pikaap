import React from "react";
import { toast } from "react-toastify";
const Toastify = (type, text, id) => {
	if (type === "success") {
		toast.success(text, { toastId: id });
	}
	if (type === "error") {
		toast.error(text, { toastId: id });
	}
};
export default Toastify;
