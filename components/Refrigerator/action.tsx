"use server";
const API_URL = process.env.API_URL;

export async function addRefrigerator(formData: FormData) {
  function getStorageType(storage: string | null): number {
    switch (storage) {
      case "냉장":
        return 0;
      case "냉동":
        return 1;
      case "실온":
        return 2;
      default:
        throw new Error("Invalid storage type");
    }
  }
  const rType = formData.get("refrig_type");
  const favoriteInfo = {
    user_id: formData.get("user_id"),
    refrigerator_name: formData.get("refrig_name"),
    refrigerator_type: getStorageType(rType as string),
  };
  console.log(favoriteInfo);
  try {
    const response = await fetch(`${API_URL}/refrig/addRefrig`, {
      method: "POST",
      body: JSON.stringify(favoriteInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return "냉장고 가져오기 실패 했습니다.";
  }
}
