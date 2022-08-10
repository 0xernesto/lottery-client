import Web3 from "web3";

// Metamask requires permission to connect
window.ethereum.request({ method: "eth_requestAccounts" });

// Since Metamask injects the web3 library to web pages,
// we want to use the "window" global variable to access
// the provider from the web3 library that Metamask injected.
const web3 = new Web3(window.ethereum);

export default web3;
