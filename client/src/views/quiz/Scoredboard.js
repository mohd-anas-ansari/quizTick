import React, { Component } from "react";
// import "../../assets/stylesheets/";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

class ScoreBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			correctedQuestions: null,
			totalQuestions: null,
			player: null,
		};
	}

	//I should use componentDidMount here.
	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			var correctedQuestions = this.props.questions.filter(
				(question) => question.isCorrect
			);
			var result = correctedQuestions.length;
			this.setState({
				correctedQuestions: result,
				player: this.props.player,
				totalQuestions: this.props.questions.length,
			});
		}
	}
	render() {
		return (
			<>
				{this.state.totalQuestions ? (
					<div className="card_container">
						<div className="contact-card">
							<div className="contact-card__header-image">
								<div className="contact-card__avatar"></div>
							</div>
							<div className="contact-card__name">
								<h4>
									<span role="img" aria-label="name">
										📛 {this.state.player}
									</span>
								</h4>
							</div>
							<ul className="contact-card__footer">
								<li className="contact-card__footer__link contact-card__footer__link--codepen font-weight-bold">
									Score: {this.state.correctedQuestions} /{" "}
									{this.state.totalQuestions}
								</li>
							</ul>
						</div>

						<Link to="/" className="btn btn-primary">
							Attempt another one.
						</Link>
					</div>
				) : (
					<div>
						<p>
							Ooops ! Nothing to see here. Take a <Link to="/">Quiz</Link>
						</p>
					</div>
				)}
			</>
		);
	}
}
function mapStateToProps(state) {
	if (state.quiz.result.attempt) {
		var questions = state.quiz.result.attempt.questions;
		return { questions, player: state.currentUser.userInfo.name };
	}
	return { questions: null, player: state.currentUser.userInfo.name };
}
export default connect(mapStateToProps)(ScoreBoard);
