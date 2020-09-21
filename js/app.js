document.addEventListener('DOMContentLoaded', function () {

	// Format question
	function FormatQuestion(text, options, answer) {
		this.text = text;
		this.options = options;
		this.answer = answer;
	}
	// If option is correct answer then return true
	FormatQuestion.prototype.correctAnswer = function (option) {
		return this.answer === option;
	};
	// Format questionnaire
	function Questionnaire(questions) {
		// Array of questions
		this.questions = questions;
		// Start quiz with the first question
		this.questionIndex = 0;
		this.score = 0;
	}
	Questionnaire.prototype.currentQuestion = function () {
		return this.questions[this.questionIndex];
	};
	Questionnaire.prototype.checkAnswer = function (answer) {
		if (this.currentQuestion().correctAnswer(answer)) {
			this.score++;
		}
		this.questionIndex++;
	};
	// Check if quiz end is reached
	Questionnaire.prototype.isOver = function () {
		// Return TRUE only after last question
		return this.questionIndex >= this.questions.length;
	};
	// Format questionnaire
	var QuestionnaireFormat = {
		displayNext: function () {
			if (quiz.isOver()) {
				this.showResults();
			} else {
				this.displayQuestion();
				this.displayOptions();
				this.displayState();
				this.displayScore();
			}
		},
		displayQuestion: function () {
			this.fillingWithText('table', quiz.currentQuestion().text);
		},
		displayOptions: function () {
			var options = quiz.currentQuestion().options;
			// Display all options
			for (var i = 0; i < options.length; i++) {
				var optionId = 'option' + i;
				var optionText = options[i];
				this.fillingWithText(optionId, optionText);
				this.checkAnswerOrganizer(optionId, optionText);
			}
		},
		checkAnswerOrganizer: function (id, guess) {
			var button = document.getElementById(id);
			button.onclick = function () {
				quiz.checkAnswer(guess);
				QuestionnaireFormat.displayNext();
			}
		},
		displayScore: function () {
			var scoreText = 'Score: ' + quiz.score;
			this.fillingWithText('score', scoreText);
		},
		displayState: function () {
			var questionNumber = quiz.questionIndex + 1;
			var totalQuestions = quiz.questions.length;
			var showState = 'Page ' + questionNumber + ' of ' + totalQuestions;
			this.fillingWithText('page', showState);
		},
		showResults: function () {
			var grade = quiz.score / quiz.questions.length;
			var results = '<h1>';

			results += '<h1>Final score: <br><br>' + quiz.score + ' puncte</h1>';
			if (grade >= 0.8) {
				results += '<h2><br>Felicitari!<br>Rezultatul obtinut demonstreaza ca ai invatat bine la Religie!</h2>';
			} else if (grade < 0.8 && grade > 0.5) {
				results += '<h2><br>Rezultatul obtinut demonstreaza ca nu prea ai invatat bine la Religie!</h2>';
			} else {
				results += '<h2><br>Rezultatul obtinut demonstreaza ca nu ai invatat nimic la Religie!</h2>';
			}
			results += '<br><button id="reset">Try Again?</button>';
			this.fillingWithText('questionnaire', results);
			this.resetQuestionnaire();
		},
		resetQuestionnaire: function () {
			var resetBtn = document.getElementById('reset');
			// Restart from the beginning
			resetBtn.onclick = function () {
				window.location.reload(false);
			}
		},
		fillingWithText: function (id, content) {
			var element = document.getElementById(id);
			element.innerHTML = content;
		}
	};
	// Create questions
	var questions = [
		new FormatQuestion('Cine a creat lumea vazuta si pe cea nevazuta?', ['Dumnezeu', 'Oamenii', 'Ingerii', 'A aparut de sine'], 'Dumnezeu'),
		new FormatQuestion('In cate zile a creat Dumnezeu lumea aceasta?', ['4 zile', '5 zile', '6 zile', '7 zile'], '6 zile'),
		new FormatQuestion('Din ce a fost creata lumea vazuta si nevazuta?', ['Apa', 'Pamant', 'Aer', 'Nimic'], 'Nimic'),
		new FormatQuestion('Dar oare ce a creat Dumnezeu la final?', ['Animalele', 'Pestii', 'Pasarile', 'Primii oameni'], 'Primii oameni'),
		new FormatQuestion('Ce fel de fiinte sunt oare ingerii din cer?', ['Materiale si muritoare', 'Materiale si nemuritoare', 'Imateriale si nemuritoare', 'Imateriale si muritoare'], 'Imateriale si nemuritoare'),
		new FormatQuestion('Cui i-a spus Dumnezeu sa construiasca o corabie?', ['Sfantului Patriarh Avraam', 'Sfantului Prooroc Ioan', 'Sfantului Prooroc David', 'Sfantului Patriarh Noe'], 'Sfantului Patriarh Noe'),
		new FormatQuestion('Cine era evreul care a ajuns guvernator in Egipt?', ['Iacov', 'Iosif', 'Adam', 'David'], 'Iosif'),
		new FormatQuestion('Cine a primit de la Dumnezeu cele zece porunci?', ['Avraam', 'Moise', 'David', 'Iacov'], 'Moise'),
		new FormatQuestion('Cine e cel ridicat de Dumnezeu la cer inainte de a muri?', ['Sfantul Proroc Daniel', 'Sfantul Proroc Ilie', 'Sfantul Proroc David', 'Sfantul Proroc Ioan'], 'Sfantul Proroc Ilie'),
		new FormatQuestion('Cine este prorocul ce a fost aruncat intr-o groapa cu lei?', ['Sfantul Proroc Daniel', 'Sfantul Proroc David', 'Sfantul Proroc Isaia', 'Sfantul Proroc Ieremia'], 'Sfantul Proroc Daniel')
	];
	// Questionnaire initialization
	var quiz = new Questionnaire(questions);
	QuestionnaireFormat.displayNext();

});