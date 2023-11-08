import Navigation from "./routes";
import Cookie from "js-cookie";
import "./panel/themes/dark.scss";
import "./panel/themes/index.scss";
import UnionContextProvider from "./panel/context/UnionContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContextProvider from "./panel/context/UserContextProvider";
import "./App.scss";

const App = () => {
	return (
		<UnionContextProvider>
			<UserContextProvider>
				<Navigation />
				<ToastContainer
					theme='dark'
					position='top-right'
					autoClose={1500}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={true}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</UserContextProvider>
		</UnionContextProvider>
	);
};

export default App;
