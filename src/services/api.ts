export const apiRequest = async (
  url = "",
  optionObj = {},
  errMsg = ""
): Promise<string | void> => {
  try {
    const response = await fetch(url, optionObj);

    // Optional chaining to avoid potential undefined errors
    if (!response?.ok) {
      throw new Error("Error");
    }

    // Assuming you are expecting JSON data in the response
    const responseData = await response.json();

    // Return the parsed data on success
    return responseData;
  } catch (err) {
    console.error("Error in apiRequest:", errMsg);
  }
};
