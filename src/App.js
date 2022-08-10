import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
	// Equivalent to useState hook when using function component
	state = {
		// Account address
		manager: "",

		// Array of addresses
		participants: [],

		// Object wrapped in bignumber.js, so we initialize it to an empty string
		balance: "",

		// String for value Input
		value: "",

		// String for status message
		message: "",
	};

	// componentDidMount is a lifecycle method that will be automatically
	// called after our component is rendered on the screen.
	// It's great to use when loading some data or doing any other
	// type of activity that needs to be done one time.
	// Similar to the useEffect hook when using function component
	async componentDidMount() {
		// Because we are working with React and Metamask, the
		// we do not have to specify "from: accounts[0]" inside
		// the .call() because the provider already has a default
		// account already set.
		// Retrieve the manager's address form the lottery contract
		const manager = await lottery.methods.manager().call();

		// Retrieve the array of addresses of all participants
		const participants = await lottery.methods.getParticipants().call();

		// Retrieve how much money is in the contract (pot)
		// Since we defined a function to do this in the contract,
		// another option would be lottery.methods.getLotteryPotBalance().call();
		const balance = await web3.eth.getBalance(lottery.options.address);

		// We update the state of "manager" to the retrieved address
		this.setState({ manager, participants, balance });
	}

	// We also could do onSubmit(){}, but this would require us to use
	// the "this" keyword in the function, and we would have to bind
	// the onSubmit function down in the render() function
	onSubmit = async (event) => {
		event.preventDefault();

		// Check if user entered enough ETH
		if (this.state.value < 0.01) {
			this.setState({
				message: "You need to at least 0.01 ETH to enter!",
			});
			return;
		}

		// Get list of our accounts
		const accounts = await web3.eth.getAccounts();

		this.setState({
			message: "Waiting on transaction to complete... Please be patient.",
		});

		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei(this.state.value, "ether"),
		});

		this.setState({
			message: "Success! You have been entered into the lottery!",
		});
	};

	onClick = async () => {
		// Get list of our accounts
		const accounts = await web3.eth.getAccounts();

		// Check if the manager is the one calling this function
		if (accounts[0] != this.state.manager) {
			this.setState({
				message:
					"You are not the manager! Only the manager can select a winner.",
			});
			return;
		}

		this.setState({
			message: "Waiting on transaction to complete... Please be patient.",
		});

		await lottery.methods.selectWinner().send({
			from: accounts[0],
		});

		const lastWinner = await lottery.methods.lastWinner().call();

		this.setState({
			message: `Success! A winner has been picked! The winning address is: ${lastWinner}`,
		});
	};

	render() {
		return (
			<div>
				<h2>Lottery Contract</h2>
				<p>This contract is managed by {this.state.manager}.</p>
				<p>
					There are currently {this.state.participants.length} people
					entered, competing to win{" "}
					{web3.utils.fromWei(this.state.balance, "ether")} ETH.
				</p>
				<hr />
				<form onSubmit={this.onSubmit}>
					<h4>Want to try your luck?</h4>
					<div>
						<label>Amount of ETH to enter: </label>
						<input
							value={this.state.value}
							onChange={(event) =>
								this.setState({ value: event.target.value })
							}
						/>
					</div>
					<button>Enter</button>
				</form>
				<hr />
				<h1>{this.state.message}</h1>
				<hr />
				<h4>** For lottery manager use ONLY **</h4>
				<button onClick={this.onClick}>Select a winner.</button>
				<hr />
			</div>
		);
	}
}
export default App;
