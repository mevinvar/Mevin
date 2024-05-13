// Filename: server.js
import express from 'express'
const app = new express();
const Web3 = import('web3');
const contractABI = import('./ThreatDetectorABI.json');


const web3 = new Web3('http://localhost:8545'); 


const contractAddress = 'CONTRACT_ADDRESS'; 
const contract = new web3.eth.Contract(contractABI, contractAddress);


app.get('/api/threats', async (req, res) => {
    try {
        const threatCount = await contract.methods.threatCount().call();
        const threats = [];
        for (let i = 1; i <= threatCount; i++) {
            const threat = await contract.methods.threats(i).call();
            threats.push(threat);
        }
        res.json({ success: true, threats });
    } catch (error) {
        console.error('Error fetching threats:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch threats' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
