import web3 from "./web3";

const address = "0x86Dc69F370C899Ba63dFfE55ACA0662F28Ed1033";

const abi = [
	{
		constant: false,
		inputs: [],
		name: "selectWinner",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [{ name: "", type: "uint256" }],
		name: "participants",
		outputs: [{ name: "", type: "address" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "manager",
		outputs: [{ name: "", type: "address" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "getParticipants",
		outputs: [{ name: "", type: "address[]" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "getLotteryPotBalance",
		outputs: [{ name: "", type: "uint256" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [],
		name: "enter",
		outputs: [],
		payable: true,
		stateMutability: "payable",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "lastWinner",
		outputs: [{ name: "", type: "address" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor",
	},
];

export default new web3.eth.Contract(abi, address);
