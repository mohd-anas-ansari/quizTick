import React, { Component } from "react";
import { connect } from "react-redux";
import { showQuiz } from "../../state/actions/quizActions";

class AttemptQuiz extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log(this.props.match.params.id);
		this.props.dispatch(showQuiz(this.props.match.params.id));
	}
	render() {
		var questions = this.props.quiz.questions;
		return (
			<>
				{!this.props.currentUser ? (
					<h1>Please login or Signup to play the quiz</h1>
				) : null}
				{this.props.quiz ? (
					<>
						<div className="container mt-4">
							<h1 className="display-5">{this.props.quiz.title}</h1>
							<div className="jumbotron mt-6 ml-6 mr-6">
								<div className="row">
									<div className="col mx-auto">
										{questions.map((question, i) => {
											return (
												<div className="col-md-6" key={i}>
													<h4> Q: {question.title}</h4>
													<div className="row">
														{question.options.map((option, i) => {
															return (
																<div className="col-6">
																	<div className="form-check">
																		<input
																			className="form-check-input"
																			type="checkbox"
																			value=""
																			id="defaultCheck1"
																		/>
																		<label
																			className="form-check-label"
																			for="defaultCheck1"
																		>
																			{option}
																		</label>
																	</div>
																</div>
															);
														})}
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<h1>Loading...</h1>
				)}
			</>
		);
	}
}
function mapStateToProps({ quiz, currentUser }) {
	console.log(quiz.quiz);
	return {
		quiz: quiz.quiz,
		currentUser: currentUser.userInfo,
	};
}

export default connect(mapStateToProps)(AttemptQuiz);
