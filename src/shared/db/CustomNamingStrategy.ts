import { DefaultNamingStrategy, NamingStrategyInterface, Table } from "typeorm";

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {

    foreignKeyName(
        tableOrName: Table | string,
        columnNames: string[],
        referencedTablePath?: string,
        referencedColumnNames?: string[]): string {

        tableOrName = typeof tableOrName === "string" ? tableOrName : tableOrName.name;

        const named = columnNames.reduce(
            (name) => `${name}`,
            `${tableOrName}_${referencedTablePath}`,
        );

        return `FK_${named}`;
    }

}