import { isAfter } from "date-fns";
import { IDateFns } from "../models/IDateFns";

export default class DateFns implements IDateFns {
    public isAfterAtCurrentDate(dateToCompare: number | Date): boolean {
        return isAfter(new Date(), dateToCompare);
    }
}