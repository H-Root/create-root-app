import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import useServices from "../hooks/useServices";

const SelectedTodo = () => {
	const { id } = useParams();
	const { fetchSelectedTodo } = useServices();

	const { data, isError, isLoading } = useQuery({
		queryKey: ["fetchATodo", id],
		queryFn: () => fetchSelectedTodo(id ? id : ""),
		select: (data) => {
			console.log(data);
			return data;
		},
	});

	if (isLoading) {
		return (
			<div className="flex items-center justify-center my-10">
				<FaSpinner className="animate-spin duration-700" />
			</div>
		);
	}

	if (isError) {
		return <div>error</div>;
	}

	return <div>{data && data.data.title}</div>;
};

export default SelectedTodo;
