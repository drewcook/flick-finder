import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../queries";
import LoadingModule from "./LoadingModule";

const withSession = (Component) => (props) => {
	const { data, error, refetch } = useQuery(GET_CURRENT_USER);

	if (error) return <p>Uh Oh, an error occurred.</p>;

	if (data) return <Component {...props} refetch={refetch} session={data} />;

	return <LoadingModule style={{ width: "100vw", height: "100vh" }} />;
};

export default withSession;
