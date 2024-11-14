/* eslint-disable no-param-reassign */
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userData as _userData } from "../store/user";

const axiosClient = axios.create();
export const useAxiosInstance = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [userData, setUserData] = useRecoilState(_userData);

	axiosClient.defaults.baseURL = process.env.REACT_APP_BASE_URL;

	axiosClient.interceptors.response.use(
		(response) => response,
		(error) => {
			if (location.pathname !== "/login" && error.response.status === 401) {
				if (userData) setUserData(null);
				setTimeout(() => navigate("/login"), 500);
				setTimeout(() => navigate(0), 500);
			}

			return Promise.reject(error);
		}
	);

	axiosClient.interceptors.request.use((config) => {
		const token = userData?.token;
		if (config.headers && token) {
			if (!config?.headers?.Authorization) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	});

	return { axiosClient };
};
