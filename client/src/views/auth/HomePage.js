import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { quizList, deleteQuiz } from "../../state/actions/quizActions";
import { log } from "debug";

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
		};
	}
	componentDidMount() {
		this.props.dispatch(quizList());
	}
	handleDeleteQuiz = (id) => {
		console.log(id);
		this.props.dispatch(deleteQuiz(id));
	};
	render() {
		var currentUser = this.props.currentUser;
		console.log(currentUser, "currentUser in Homepage");
		return (
			<>
				{this.props.quizzes && this.props.quizzes.length ? (
					<div className="container mt-6">
						{currentUser ? (
							<>
								<div>
									<Link to={`/quiz/new`} className="btn btn-success mb-3">
										Create Quiz
									</Link>
								</div>
								<div className="row ">
									{this.props.quizzes.map((quiz, i) => {
										return (
											<div className="col-6 col-md-4 mb-6" key={i}>
												<div className="card" style={{ width: "18rem" }}>
													<img
														className="card-img-top"
														style={{
															height: "160px",
															objectFit: "cover",
															filter: " opacity(.7)",
														}}
														src="https://thumbs.dreamstime.com/z/quiz-test-survey-exam-vector-concept-online-laptop-education-illustration-80657742.jpg"
														alt="Card image cap"
													/>

													<div className="card-body">
														<h5 className="card-title">{quiz.title}</h5>
														<Link
															to={`/quiz/${quiz._id}`}
															className="btn btn-primary"
														>
															Play
														</Link>
														{currentUser.id === quiz.authorId ? (
															<>
																<Link
																	to={`/quiz/${quiz._id}/edit`}
																	className="btn btn-warning mx-1"
																>
																	Edit
																</Link>
																<button
																	onClick={() =>
																		this.handleDeleteQuiz(quiz._id)
																	}
																	className="btn btn-danger mx-1"
																>
																	Delete
																</button>
															</>
														) : null}
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</>
						) : (
							<div className="d-flex flex-column">
								<center>
									<h1>Welcome to QuizTick</h1>
									<p>
										Please <Link to="/login">Login</Link> to continue.
									</p>
								</center>
							</div>
						)}
					</div>
				) : (
					<h1>Loading</h1>
				)}
			</>
		);
	}
}

const mapStateToProps = ({ quiz, currentUser }) => {
	return {
		quizzes: quiz.quizList.quizzes,
		currentUser: currentUser.userInfo,
	};
};

export default connect(mapStateToProps)(HomePage);
