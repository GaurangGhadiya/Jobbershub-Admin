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

const objectToFormData = (obj, formData = new FormData(), parentKey = "") => {
    if (obj && typeof obj === "object" && !(obj instanceof File)) {
      if (Array.isArray(obj)) {
        // Handle arrays (keep proper index keys for nested structure)
        obj.forEach((value, index) => {
          objectToFormData(value, formData, `${parentKey}[${index}]`);
        });
      } else {
        // Handle objects
        Object.entries(obj).forEach(([key, value]) => {
          const newKey = parentKey ? `${parentKey}[${key}]` : key;
          objectToFormData(value, formData, newKey);
        });
      }
    } else {
      // Handle primitive values and files
      formData.append(parentKey, obj);
    }
  
    return formData;
  }
  

// export default jsonToFormData
export default objectToFormData