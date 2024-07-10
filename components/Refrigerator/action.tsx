"use server";
const API_URL = process.env.API_URL;
const OCR_URL = process.env.OCR_API_URL;

export async function addRefrigerator(formData: FormData) {
  function getStorageType(storage: string | null): number {
    switch (storage) {
      case "냉장":
        return 1;
      case "냉동":
        return 2;
      case "실온":
        return 3;
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

export async function getOCRNaverText(formData: FormData) {
  try {
    const response = await fetch(`${OCR_URL}/naver/`, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    return responseData.result;
  } catch (error) {
    console.error("Error:", error);
    return "텍스트 가져오기 실패 했습니다.";
  }
}

export async function getOCRCoupangText(formData: FormData) {
  try {
    const response = await fetch(`${OCR_URL}/coupang/`, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    return responseData.result;
  } catch (error) {
    console.error("Error:", error);
    return "네이버 OCR인식에 실패 했습니다.";
  }
}

export async function getMultiSearch(ingInfo: string[]) {
  const ing_info = {
    ing_search: ingInfo,
  };

  try {
    const response = await fetch(`${API_URL}/search/getMultiSearchList`, {
      method: "POST",
      body: JSON.stringify(ing_info),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    //console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return "쿠팡 OCR인식에 실패 했습니다.";
  }
}

export async function deleteRefrigerator(id: number, user_id: string) {
  const ing_info = {
    user_id: user_id,
    refrigerator_id: id,
  };

  try {
    const response = await fetch(`${API_URL}/refrig/delRefrig`, {
      method: "POST",
      body: JSON.stringify(ing_info),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    //console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return "냉장고 칸 삭제에 실패 했습니다.";
  }
}

export async function deleteNote(id: number, user_id: string) {
  const ing_info = {
    user_id: user_id,
    refrigerator_ing_ids: [id],
  };

  try {
    const response = await fetch(`${API_URL}/refrig/delIngredient`, {
      method: "POST",
      body: JSON.stringify(ing_info),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return "노트 삭제에 실패했습니다.";
  }
}

export async function addNote(user_id: string, refrig_ing: any) {
  const ing_info = {
    user_id: user_id,
    refrigerators: refrig_ing,
  };

  try {
    const response = await fetch(`${API_URL}/refrig/addIngredient`, {
      method: "POST",
      body: JSON.stringify(ing_info),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return "노트 추가를 실패했습니다.";
  }
}
