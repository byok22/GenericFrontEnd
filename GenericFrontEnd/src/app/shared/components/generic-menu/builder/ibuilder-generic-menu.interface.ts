import { GenericMenuInterface } from "../interfaces/generic-menu-item.interface";

export interface IBuilderGenericMenu{
    Reset(): void;
    SetDropDown(dropDown: GenericMenuInterface): void;
    SetMultiSelectDropDown(multiselectDropDown: GenericMenuInterface): void;
    SetCalendar(calendar: GenericMenuInterface): void;
    SetButton(button: GenericMenuInterface): void;
    SetTextBox(textBox: GenericMenuInterface): void;
    Generate(): void;
}