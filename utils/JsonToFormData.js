 const jsonToFormData =async (jsonObject) => {
    const formData = new FormData();

    function appendFormData(key, value) {
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                appendFormData(`${key}[${index}]`, item);
            });
        } else if (value instanceof File || value instanceof Blob) {
            formData.append(key, value);
        } else if (typeof value === "object" && value !== null) {
            formData.append(key, JSON.stringify(value)); // Handle objects as JSON strings
        } else {
            formData.append(key, value);
        }
    }

    Object.keys(jsonObject).forEach((key) => {
        appendFormData(key, jsonObject[key]);
    });

    return formData;
}

export default jsonToFormData