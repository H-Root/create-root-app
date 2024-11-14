import { useRecoilState } from "recoil";
import { userData } from "../../store/user";

const Header = () => {
	const [, setUserData] = useRecoilState(userData);

	const handleLogout = () => {
		setUserData(null);
	};

	return (
		<header className="p-5 bg-blue-600 text-white flex justify-between items-center">
			Header
			<button onClick={handleLogout}>Logout</button>
		</header>
	);
};

export default Header;
