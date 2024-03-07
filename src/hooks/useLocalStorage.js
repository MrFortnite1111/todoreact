import React, {useEffect, useState} from "react";

const useLocalStorage = (id, defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const setLocalState = (localValue) => {
        localStorage.setItem(id, JSON.stringify(localValue));
        setValue(localValue);
    }

    useEffect(() => {
      const item = localStorage.getItem(id);
      if (item) {
        setValue(JSON.parse(item));
      } else {
        setValue(defaultValue);
      }
    }, [id]);

    return [
        value,
        setLocalState
    ];
}

export default useLocalStorage;