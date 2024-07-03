"use client"
import { useEvmNativeBalance } from '@moralisweb3/next';
import {useAccount, useChainId } from 'wagmi';
import Moralis from 'moralis';


function HomePage(){
    const account = useAccount();
    const address = account.address;
    const chainId = useChainId()

    const apikey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
    console.log("addr", address, chainId, apikey);

    const fetch = async() => {

    try {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY
      });
    
    //   const response = await Moralis.EvmApi.balance.getNativeBalance({
    //     "chain": chainId,
    //     "address": address
    //   });

      const assets = await Moralis.EvmApi.nft.getWalletNFTs({
        "chain": chainId,
        "format": "decimal",
        "mediaItems": false,
        "address": address
      });

      const collections = await Moralis.EvmApi.nft.getWalletNFTCollections({
        "chain": chainId,
        "address": address
      });

      const response = await Moralis.EvmApi.events.getContractEvents({
        "chain": chainId,
        "order": "DESC",
        "topic": "0x328ff68d0e66694e405c9f8fc906a346b345aa1f87ec216eaa82f2c654d0d34a",
        "address": "0x2FB88a490b12B5bb5fD22d73D4bCD4B2F888b94d",
        "abi": {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "currentIndex",
          "type": "uint256",
          "internal_type": "uint256"
        },
        {
          "indexed": false,
          "name": "quantity",
          "type": "uint256",
          "internal_type": "uint256"
        },
        {
          "indexed": true,
          "name": "creator",
          "type": "address",
          "internal_type": "address"
        }
      ],
      "name": "PhygitalAAssetCreated",
      "type": "event"
    }
      });
    
    
      console.log("response", assets.raw, collections.raw, response.raw);
    } catch (e) {
      console.error(e);
    }


  }

  fetch();

    // const { data: nativeBalance } = useEvmNativeBalance({ address });

    // console.log("balance", nativeBalance);
    return (
        <div>
            <h3>Wallet: {address}</h3>
            {/* <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3> */}
        </div>
    );
}

export default HomePage;

