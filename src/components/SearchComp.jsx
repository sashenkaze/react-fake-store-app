import { TextInput } from "flowbite-react"
import { IoIosSearch } from "react-icons/io";

export default function SearchComp({processSearch}) {
    return (
        <TextInput id="email4" type="email" icon={IoIosSearch} placeholder="Search something..." required className="w-3xl" onKeyUp={processSearch}/>
    )
}