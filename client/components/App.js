const { ApolloProvider } = require("react-apollo");
import Layout from "./Layout";
import { client } from "../client";
import withSession from "./withSession";

const LayoutWithSession = withSession(Layout);

const App = (props) => (
	<ApolloProvider client={client}>
		<LayoutWithSession {...props} />
	</ApolloProvider>
)

export default App;
