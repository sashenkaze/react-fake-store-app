import { Dropdown, DropdownItem } from "flowbite-react";

export default function DropdownComp({ processSort }) {
    return (
        <Dropdown color="alternative" label="Urutkan..." dismissOnClick={false}>
            <DropdownItem onClick={() => processSort("harga termurah")}>Harga Termurah</DropdownItem>
            <DropdownItem onClick={() => processSort("harga termahal")}>Harga Termahal</DropdownItem>
            <DropdownItem onClick={() => processSort("alfabet menurun")} className="justify-center">A-Z</DropdownItem>
            <DropdownItem onClick={() => processSort("alfabet menaik")} className="justify-center">Z-A</DropdownItem>
        </Dropdown>
    )
}