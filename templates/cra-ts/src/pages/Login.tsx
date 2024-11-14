import { useRecoilState } from "recoil";
import { userData } from "../store/user";

const Login = () => {
	const [, setUserData] = useRecoilState(userData);

	const handleLogin = () => {
		setUserData({
			username: "A Name",
			id: "id",
			token: "token",
		});
	};

	return (
		<div className="flex items-center justify-center h-dvh">
			<button
				className="px-4 py-2 rounded bg-blue-600 text-white"
				onClick={handleLogin}
			>
				Login
			</button>
		</div>
	);
};

export default Login;
