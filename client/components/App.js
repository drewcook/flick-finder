const { ApolloProvider } = require("react-apollo");
import Layout from "./Layout";
import { client } from "../client";

const App = (props) => (
	<ApolloProvider client={client}>
		<Layout {...props} />
	</ApolloProvider>
)

export default App;
