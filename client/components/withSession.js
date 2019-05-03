import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../../queries";
import LoadingModule from "./LoadingModule";

const withSession = Component => props => (
	<Query query={GET_CURRENT_USER}>
		{({data, loading, refetch}) => {
			if (loading) return <LoadingModule />;
			console.log(data);
			return (
				<Component {...props} refetch={refetch} session={data} />
			);
		}}
	</Query>
);

export default withSession;
