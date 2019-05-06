import Layout from "../client/components/Layout";
import { ApolloConsumer } from "react-apollo";
import { SEARCH_BY_TITLE } from "../queries";
import LoadingModule from "../client/components/LoadingModule";
import MovieCard from "../client/components/MovieCard";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: "",
			page: 1,
			results: null,
			total: null
		};
	}

	handleChange = e => {
		const {name, value} = e.target;
		this.setState({
			[name]: value,
		});
	}

	handleSearch = async (e, client) => {
		e.preventDefault();
		const { searchTerm, page } = this.state;
		const { data } = await client.query({
			query: SEARCH_BY_TITLE,
			variables: {searchTerm, page}
		});
		this.setState({
			page: data.searchByTitle.page,
			totalPages: data.searchByTitle.totalPages,
			results: data.searchByTitle.results,
			total: data.searchByTitle.total
		});
	}

	render() {
		const { searchTerm, page, totalPages, results, total } = this.state;
		return (
			<Layout session={this.props.session} title="Search">
				<h2>Search</h2>
				<hr/>
				<ApolloConsumer>
					{client => (
						<form onSubmit={e=>this.handleSearch(e, client)}>
							<div className="form-group">
								<p>Search through over 400,000 movie titles.</p>
								<input type="search" className="form-control" id="searchTerm" name="searchTerm" value={searchTerm} onChange={this.handleChange} placeholder="Title, keywords, release data, etc." />
							</div>
							<button type="submit" className="btn btn-primary" disabled={searchTerm === ""}>Go!</button>
							{/*error && <div className="errMsg">{error.message}</div>*/}
						</form>
					)}
				</ApolloConsumer>
				<div id="searchResults">
					{results && results.length ?
						<div>
							<div className="total lead">
								There are {total} matching results.
							</div>
							<div className="row">
								{results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
							</div>
						</div> :
						<p className="text-center">{total === 0 ? "There are no matching results." : "Please enter a search term."}</p>
					}
				</div>
				<style jsx>{`
					h2 {
						margin: 0;
					}
					hr {
						margin-bottom: 40px;
					}
					#searchResults {
						margin-top: 40px;
					}
					.total {
						margin-bottom: 20px;
					}
				`}</style>
			</Layout>
		);
	}
}

export default Search;
