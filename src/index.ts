import express, { Request, Response, Express, NextFunction } from "express";
import { ethers, keccak256, toUtf8Bytes, AbiCoder } from "ethers";
import { config } from "dotenv";
import db from "./db";
import { PromoCode } from "./types/PromoCode";
import { ClaimableRequestParams } from "./types/requestTypes";

config();

const app: Express = express();
const port = 3000;
const abiEncoder = new AbiCoder();
let privateKey: string = process.env.MLUCK_PRIVATE_KEY || "";
let wallet = new ethers.Wallet(privateKey);

app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log(`${req.ip} ${req.url}`);
    next();
});

app.get("/helloworld", (req: Request, res: Response) => {
    res.json({ message: "Hello World!" });
});

interface PromocodeMessageArguements {
    word: string;
    address: string;
}
// promo codes
app.get("/promocode", async function (req: Request<{}, {}, {}, PromocodeMessageArguements>, res: Response) {
    try {
        const { query } = req;

        if (!query.address || !ethers.isAddress(query.address)) {
            res.status(query.address ? 400 : 422).json({
                message: `invalid value for required query parameter (address=${query.address}), required a valid EVM address`,
            });
            return;
        }
        const promoHash = keccak256(toUtf8Bytes(query.word));
        const promoCodeExists = (await db.select("*").from("promo_codes").where({ word: promoHash })) as PromoCode[];
        if (promoCodeExists.length == 0) {
            res.status(400).json({ message: "Promocode does not exist (word=" + query.word + ")" });
            return;
        }

        const messageHash = keccak256(
            toUtf8Bytes(abiEncoder.encode(["bytes32", "address"], [promoHash, query.address]))
        );
        const signature = await wallet.signMessage(toUtf8Bytes(messageHash));
        res.json({
            data: {
                promoHash,
                signature,
            },
        });
    } catch (e: any) {
        let message;
        let status;
        if (e.code == "INVALID_ARGUMENT") {
            message = "query parameter `word` should be provided and a valid string";
            status = 400;
            console.log(e.message);
        } else {
            message = "An unknown error happend!";
            status = 500;
            console.error(e);
        }
        res.json({ message }).status(status);
    }
});

app.get(
    "/claimable/:holder",
    async function (req: Request<ClaimableRequestParams, {}, {}, {}, { property: string | undefined }>, res: Response) {
        try {
            const { params } = req;
            const claimables = await db
                .select("so.holder")
                .select("so.property")
                .select("so.slot_id as slot")
                .sum("pdr.daily_return as claimable")
                .from("slot_owners as so")
                .join("property_daily_return as pdr", "so.property", "pdr.property")
                .where({
                    "so.holder": params.holder,
                })
                .groupBy(["so.holder", "so.property", "so.slot_id"]);
            res.json({ data: claimables });
        } catch (e: any) {
            let message = "Somethink went wrong!";
            res.json({ message }).status(500);
        }
    }
);

app.listen(port, () => {
    console.log("Listening on " + port);
});
