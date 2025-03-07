import { JsonRpcProvider, Contract } from "ethers";
import db from "../db";
import logger from "../logger";

const mlucks = ["0x54Ff657C58A343BF093Fdd927217219eD9f107b5"];

const rpcEndpoint = "https://bsc-dataseed.bnbchain.org";
const chainId = 56;
const provider = new JsonRpcProvider(rpcEndpoint, chainId);
const abi = [
    "function ownerOf(uint256 tokenId) public view returns (address)",
    "function totalSupply() external view returns(uint256)",
    "function maxSupply() external view returns(uint256)",
    "function name() external view returns(string memory)",
    "function ownedBy(uint256 tokenId) public view returns (address)",
];

async function main(): Promise<void> {
    logger.info("START SAVING DAILY SLOT OWNERS RECORDS");
    const date = new Date();
    logger.info("DATE: ", date);
    logger.info(`MLUCKS COUNT: ${mlucks.length}`);
    logger.info(`MLUCKS TO BE LOOPED THROUGH: `);
    mlucks.forEach((mluck) => {
        logger.info(`ADDRESS: ${mluck}`);
    });

    for (let mluck of mlucks) {
        logger.info(`current mluck: ${mluck}`);
        logger.info(`getting contract instance`);
        const contract = new Contract(mluck, abi, provider);
        logger.info(`successfully got contract instance`);
        logger.info(`getting total supply of slots of the mluck`);
        let totalSupply = await contract.maxSupply();
        logger.info(`total supply of slots: ${totalSupply}`);
        logger.info("going through slots");
        for (let slotId = 1; slotId < totalSupply; slotId++) {
            logger.info(`slot id: ${slotId}`);
            logger.info(`getting owner of the slot: ${slotId}`);
            const slotOwner = await contract.ownerOf(slotId);
            logger.info(`slot (${slotId}) owner: ${slotOwner}`);
            logger.info("storing slot owner record to database");
            await db("daily_slot_owners_record").insert({
                property: mluck,
                slot_id: slotId,
                holder: slotOwner,
                date,
            });
            logger.info("successfully stored!");
        }
        logger.info("successfully finished for mluck: " + mluck);
    }
    logger.info("SUCCESS!");
    logger.info(`FINISHED DAILY RECORDS FOR: ${date}`);
}

main()
    .then()
    .catch((e) => console.error(e));
