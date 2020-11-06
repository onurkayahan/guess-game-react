import React from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardTitle, Alert, Modal, ModalBody, ModalFooter } from 'reactstrap';
import ResultList from "./ResultList";

class GuessGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guess: "",
            oldGuesses: [],
            solution: "",
            errorAlertVisible: false,
            winModalVisible: false
        }
    }

    componentDidMount() {
        let solution = this.createFourDigitRandomNumber();
        console.log(solution);
        this.setState({ solution: solution });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleInputChange = (event) => {
        let guess = event.target.value.replace(/\D/, ''); // only numbers allowed 
        this.setState({ guess: guess });
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.isValid ? this.checkGuess() : this.showErrorAlert();
        }
    }

    isValid = (value) => {
        return value.length === 4 && value[0] !== "0" ? true : false;  //checking number length
    }

    showErrorAlert = () => {
        this.setState({ errorAlertVisible: true }, () => {
            window.setTimeout(() => { this.setState({ errorAlertVisible: false }) }, 3000)
        })
    }


    checkGuess = () => {
        let { solution, guess, oldGuesses } = this.state;
        let solutionStr = solution.toString();
        let isWin = true;
        let result = "";
        for (let i = 0; i < 4; i++) {
            if (guess[i] === solutionStr[i])
                result += "+";
            else {
                result += "-";
                isWin = false;
            }
        }

        if (isWin) this.showWinModal();

        let oldGuess = {
            guess: guess,
            result: result
        }

        this.setState({ oldGuesses: [oldGuess].concat(oldGuesses), guess: "" })
    }

    showWinModal = () => {
        this.setState({ winModalVisible: true });
    }

    openNewGame = () => {
        let newSolution = this.createFourDigitRandomNumber();
        console.log(newSolution)
        this.setState({ winModalVisible: false, oldGuesses: [], solution: newSolution })
    }

    createFourDigitRandomNumber = () => {return Math.floor(1000 + Math.random() * 9000);}

    render() {
        const { guess, errorAlertVisible, oldGuesses, winModalVisible } = this.state;

        return <div className="game-board w-25">
            <Card body>
                <CardTitle className="text-center">
                    Sayı Tahmin Oyunu
                </CardTitle>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="guess">Tahmininiz: </Label>
                        <Input type="text" name="guess" value={guess}
                            onChange={this.handleInputChange}
                            onKeyPress={this.handleKeyPress}
                            maxLength="4" className="text-center"/>
                    </FormGroup>
                </Form>
            </Card>
            <ResultList oldGuesses={oldGuesses} />
            <Button color="primary" onClick={this.openNewGame} block>Yeni Oyun</Button>
            <small>*Sonuç konsoldan bakılabilir</small>
            <Alert className="alert" color="danger" isOpen={errorAlertVisible}>
                Lütfen 4 haneli bir sayı giriniz.
            </Alert>
            <Modal isOpen={winModalVisible}>
                <ModalBody className="m-auto">
                    Sayıyı başarıyla tahmin ettiniz!
                </ModalBody>
                <ModalFooter className="m-auto">
                    <Button color="primary" onClick={this.openNewGame}>Yeni Oyun</Button>
                </ModalFooter>
            </Modal>
        </div>
    }

}

export default GuessGame;