import { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";

export default function AutoCompleteInput() {
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    const search = (event) => {
        setItems([...Array(10).keys()].map(item => event.query + '-' + item));
    }

    return (
        <AutoComplete 
            value={value} 
            suggestions={items} 
            completeMethod={search} 
            onChange={(e) => setValue(e.value)}
            className="p-autocomplete-custom" 
            id="p-autocomplete-custom"
            />
    )
}
        