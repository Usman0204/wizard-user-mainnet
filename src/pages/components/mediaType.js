
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function MediaType({ hash, classNameD }) {
    let newHash = hash
    console.log(hash);
    const [contentType, setContentType] = useState('image');
    const [fallbackUrls, setFallbackUrls] = useState([]);
    hash = hash?.replace(
        /(https:\/\/(ipfs\.io\/ipfs|copper-central-halibut-875|gateway.pinata.cloud\.mypinata\.cloud\/ipfs)|ipfs:\/\/)/,
        '/'
    );
    hash = hash?.replace(/^https:\/\/gateway\.pinata\.cloud\/ipfs/, '')
   hash= hash?.includes('//') ? hash.replace('//','/') : hash;
    console.log(hash);
    useEffect(() => {
        const fetchIPFS = async () => {
            const gatewayUrls = [
                `https://due-ever-anywhere.quicknode-ipfs.com/ipfs${hash}`,
                hash,
                newHash,
                `https://ipfs.io/ipfs${hash}`,
                `https://gateway.pinata.cloud/ipfs${hash}`,
                `https://cf-ipfs.com/ipfs${hash}`,
                `https://dweb.link/ipfs${hash}`,
                `https://4everland.io/ipfs${hash}`,
                `https://w3s.link/ipfs${hash}`,
                `https://nftstorage.link/ipfs${hash}`,
                `https://storry.tv/ipfs${hash}`,
               
                `https://cloudflare-ipfs.com/ipfs${hash}`,
                `https://gateway.originprotocol.com/ipfs${hash}`,
                `https://gateway.temporal.cloud/ipfs${hash}`,
                `https://gateway.ipfs.io/ipfs${hash}`,
                `https://ipfs.eternum.io/ipfs${hash}`,
                `https://gateway.serph.network/ipfs${hash}`,
                `https://hardbin.com/ipfs${hash}`,
                `https://ipfs.jes.xxx/ipfs${hash}`,
                `https://gateway.blocksec.com/ipfs${hash}`,
                `https://ipfs.mrh.io/ipfs${hash}`,
                `https://gateway.fleek.co/ipfs${hash}`,
                `https://ipfs.stibarc.com/ipfs${hash}`,
                `https://xmine128.tk/ipfs${hash}`,
                `https://ipfs.lelux.fi/ipfs${hash}`,
                `https://ipfs.pixura.io/ipfs${hash}`,
                `https://ipfs.dappnode.net/ipfs${hash}`,
                `https://ipfs.lukeroge.com/ipfs${hash}`,
                `https://ipfs.depa.digital/ipfs${hash}`,
                `https://ipfs.sloppyta.co/ipfs${hash}`,
                `https://gateway.masto.host/ipfs${hash}`,
                `https://ipfs-prod.ams3.cdn.prod.digitaloceanspaces.com/ipfs${hash}`,
                `https://gateways.netlify.com/ipfs${hash}`,
                `https://ipfs.covalenthq.com/ipfs${hash}`,
                `https://ipfs.coingate.com/ipfs${hash}`,
                `https://ipfs.risksense.io/ipfs${hash}`,
                `https://gateway.aletheia.icu/ipfs${hash}`,
            ];
            setFallbackUrls(gatewayUrls);
            for (const url of gatewayUrls) {
                try {
                    const response = await axios.get(url, { responseType: 'blob' });
                    console.log(response.status)
                    if (response.status === 200) {
                        setContentType(response.headers['content-type']);
                        // If successful, no need to try other URLs
                        break;
                    } else {
                        console.error('Non-200 response', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching IPFS content:', error);
                    // Handle specific error e.g., network error, timeout, etc.
                }
            }
        };

        if (hash) {
            fetchIPFS();
        }
    }, [hash]);
    console.log(contentType.startsWith('image'));
    return (
        <>
            {contentType.startsWith('image') && <img src={`https://due-ever-anywhere.quicknode-ipfs.com/ipfs${hash}`} alt="nftimginner" className={classNameD} onError={(e) => {
                e.target.onerror = null; // Prevents looping
                e.target.src = fallbackUrls.shift(); // Try next fallback URL
            }} />}
            {contentType.startsWith('video') && <video src={`https://due-ever-anywhere.quicknode-ipfs.com/ipfs${hash}`} alt="nftimginner" className={classNameD} controls muted autoPlay onError={(e) => {
                e.target.onerror = null; // Prevents looping
                e.target.src = fallbackUrls.shift(); // Try next fallback URL
            }} />}
            {contentType.startsWith('audio') && <audio src={`https://due-ever-anywhere.quicknode-ipfs.com/ipfs${hash}`} alt="nftimginner" className={classNameD} controls onError={(e) => {
                e.target.onerror = null; // Prevents looping
                e.target.src = fallbackUrls.shift(); // Try next fallback URL
            }} />}
        </>
    );
}

export default MediaType;











// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// function MediaType({ hash, classNameD }) {
//     const [contentType, setContentType] = useState('');
//     console.log(`https://ipfs.io/ipfs${hash}`); //'/QmeJHC7HHv7aLYwyD7h2Ax36NGVn7dLHm7iwV5w2WR72XR'
//     useEffect(() => {
//         const fetchIPFS = async () => {
//             const gatewayUrl = `https://ipfs.io/ipfs${hash}`;
//             try {
//                 const response = await axios.get(gatewayUrl, { responseType: 'blob' });
//                 if (response.status === 200) {
//                     setContentType(response.headers['content-type']);
//                 } else {
//                     console.error('Non-200 response', response.status);
//                 }
//             } catch (error) {
//                 console.error('Error fetching IPFS content:', error);
//                 // Handle specific error e.g., network error, timeout, etc.
//             }
//         };

//         if (hash) {
//             fetchIPFS();
//         }
//     }, [hash]);
//   return (
//        <>
//           {contentType.startsWith('image') && <img src={'https://ipfs.io/ipfs' + hash || '/assets/profile.png'} alt="nftimginner" className={classNameD} onError={(e) => {
//               e.target.onerror = null; // Prevents looping
//               e.target.src = `https://gateway.pinata.cloud/ipfs${hash}`; // Fallback URL
//           }} />}
//           {contentType.startsWith('video') && <video src={'https://ipfs.io/ipfs' + hash} alt="nftimginner" className={classNameD} controls
//               muted
//               autoPlay onError={(e) => {
//               e.target.onerror = null; // Prevents looping
//               e.target.src = `https://gateway.pinata.cloud/ipfs${hash}`; // Fallback URL
//           }} />}
//           {contentType.startsWith('audio') && <audio src={'https://ipfs.io/ipfs' + hash} alt="nftimginner" className={classNameD} controls onError={(e) => {
//               e.target.onerror = null; // Prevents looping
//               e.target.src = `https://gateway.pinata.cloud/ipfs${hash}`; // Fallback URL
//           }} />}

//        </>
//   )
// }

// export default MediaType