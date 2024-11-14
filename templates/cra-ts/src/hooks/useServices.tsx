import { useAxiosInstance } from "../lib/axiosClient";
import { ENDPOINTS } from "../utils/ENDPOINT";

const useServices = () => {
	const { axiosClient } = useAxiosInstance();

	return {
		fetchAllTodos: () => {
			return axiosClient.get(ENDPOINTS.getAllTodos);
		},
		fetchSelectedTodo: (key: string | number) => {
			return axiosClient.get(ENDPOINTS.getTodoById(key));
		},
	};
};

export default useServices;
