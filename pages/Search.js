import { Component } from "react";
import Layout from "../client/components/Layout";
import { ApolloConsumer } from "@apollo/client";
import { SEARCH_BY_TITLE } from "../queries";
import MovieCard from "../client/components/MovieCard";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: "",
			page: 1,
			results: null,
			total: null,
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	handleSearch = async (e, client) => {
		if (e.target.nodeName === "FORM") {
			e.preventDefault();
		}
		const { searchTerm, page } = this.state;
		const { data } = await client.query({
			query: SEARCH_BY_TITLE,
			variables: { searchTerm, page },
		});
		this.setState({
			page: data.searchByTitle.page,
			totalPages: data.searchByTitle.totalPages,
			results: data.searchByTitle.results,
			total: data.searchByTitle.total,
		});
	};

	render() {
		const { searchTerm, page, totalPages, results, total } = this.state;
		return (
			<Layout session={this.props.session} title="Search">
				<h2>Search</h2>
				<hr />
				<ApolloConsumer>
					{(client) => (
						<div>
							<form onSubmit={(e) => this.handleSearch(e, client)}>
								<div className="form-group">
									<p>Search through over 400,000 movie titles.</p>
									<input
										type="search"
										className="form-control"
										id="searchTerm"
										name="searchTerm"
										value={searchTerm}
										onChange={this.handleChange}
										placeholder="Title, keywords, release data, etc."
									/>
								</div>
								<button
									type="submit"
									className="btn btn-primary"
									disabled={searchTerm === ""}
								>
									Search <i className="fas fa-search"></i>
								</button>
							</form>
							{results && results.length && (
								<div className="pagination">
									<button
										onClick={async (e) => {
											e.persist();
											await this.setState({ page: page - 1 });
											this.handleSearch(e, client);
										}}
										className="btn btn-success"
										disabled={page === 1}
									>
										<i className="fas fa-angle-left"> </i>Prev Page
									</button>
									<span>
										Page {page} of {totalPages}
									</span>
									<button
										onClick={async (e) => {
											e.persist();
											await this.setState({ page: page + 1 });
											this.handleSearch(e, client);
										}}
										className="btn btn-success"
										disabled={page >= totalPages}
									>
										Next Page <i className="fas fa-angle-right"></i>
									</button>
								</div>
							)}
						</div>
					)}
				</ApolloConsumer>
				<div id="searchResults">
					{results && results.length ? (
						<div>
							<div className="total lead">
								There are {total} matching results.
							</div>
							<div className="row">
								{results.map((movie) => (
									<MovieCard key={movie.id} movie={movie} />
								))}
							</div>
						</div>
					) : (
						<p className="text-center">
							{total === 0
								? "There are no matching results."
								: "Please enter a search term."}
						</p>
					)}
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
					.pagination {
						display: flex;
						align-items: center;
						justify-content: space-between;
						max-width: 300px;
						margin: 20px auto;
					}
					form .btn {
						width: 100px;
					}
				`}</style>
			</Layout>
		);
	}
}

export default Search;
