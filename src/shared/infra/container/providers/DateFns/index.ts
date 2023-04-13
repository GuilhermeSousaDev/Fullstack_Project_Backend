import { container } from "tsyringe";
import DateFns from "./implementations/DateFns";
import { IDateFns } from "./models/IDateFns";

container.registerSingleton<IDateFns>(
    'datefnsProvider',
    DateFns,
);