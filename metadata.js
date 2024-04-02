const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');

// Create interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt user for the number of NFTs, name, and description
rl.question('Enter the number of NFTs you want to generate: ', (numNFTsInput) => {
    // Convert user input to a number
    const numNFTs = parseInt(numNFTsInput, 10);

    rl.question('Enter the name for the NFTs: ', (name) => {
        rl.question('Enter the description for the NFTs: ', (description) => {
            // Generate NFT metadata
            const metadata = generateNFTMetadata(name, description, numNFTs);

            // Get the path to the user's "Downloads" folder
            const downloadsPath = path.join(os.homedir(), 'Downloads');

            // Write metadata to JSON file in the "Downloads" folder
            const filePath = path.join(downloadsPath, `${name}_nft_metadata.json`);
            fs.writeFile(filePath, JSON.stringify(metadata, null, 2), (err) => {
                if (err) throw err;
                console.log('NFT metadata file has been saved to:', filePath);
                rl.close();
            });
        });
    });
});

// Function to generate NFT metadata
function generateNFTMetadata(name, description, numNFTs) {
    const nfts = [];
    for (let i = 1; i <= numNFTs; i++) {
        const nft = {
            name: `${name} #${i}`,
            description
        };
        nfts.push(nft);
    }
    return nfts;
}
