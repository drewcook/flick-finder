import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../queries";
import LoadingModule from "./LoadingModule";

const withSession = (Component) => (props) => {
	const { data, loading, refetch } = useQuery(GET_CURRENT_USER);

	if (loading)
		return <LoadingModule style={{ width: "100vw", height: "100vh" }} />;

	return <Component {...props} refetch={refetch} session={data} />;
};

export default withSession;
