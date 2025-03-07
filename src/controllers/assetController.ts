import { ClaimableRequestParams } from "../types/requestTypes";
import { Request, Response } from "express";
import db from "../db";

async function claimable(req: Request<ClaimableRequestParams, {}, {}, {}>, res: Response) {
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

// needs to a signature which signs the incoming data: { holder, property, slot[] }
async function claim(req: Request, res: Response): Promise<void> {
    try {
        const { body } = req;
        const { holder, property, slot } = body;
        // check if the signature is valid
        // check if the holder has the right to claim the slots
        // check if the slots are claimable
        // check if the slots are not claimed already
        // check if the slots are not claimed by another holder
        // update the slots to be claimed by the holder
        // return the updated slots
        res.json({ message: "Not implemented yet" });
    } catch (e: any) {
        let message = "Somethink went wrong!";
        res.json({ message }).status(500);
    }
}

async function claimHistory(req: Request, res: Response): Promise<void> {}

export default {
    claimable,
    claim,
    claimHistory,
};
