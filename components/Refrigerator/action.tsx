"use server";
const API_URL = process.env.API_URL;
const OCR_URL = process.env.OCR_API_URL;
import { infoLog, errLog, successLog } from "@/utils/Logger";

/**
 * **REFRIG_02**
 *
 * API Path: /refrig/addIngredient
 *
 * 냉장고에 노트 추가
 */

export async function addNote(user_id: string, refrig_ing: any) {
  const ing_info = {
    user_id: user_id,
    refrigerators: refrig_ing,
  };
  infoLog("REFRIG_02", ing_info);

  try {
    const response = await fetch(`${API_URL}/refrig/addIngredient`, {
      method: "POST",
      body: JSON.stringify(ing_info),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("REFRIG_02", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("REFRIG_02", error);
    return "노트 추가를 실패했습니다.";
  }
}

/**
 * **REFRIG_03**
 *
 * API Path: /refrig/delIngredient
 *
 * 냉장고에 노트 삭제
 */

export async function deleteNote(id: number, user_id: string) {
  const ing_info = {
    user_id: user_id,
    refrigerator_ing_ids: [id],
  };
  infoLog("REFRIG_03", ing_info);

  try {
    const response = await fetch(`${API_URL}/refrig/delIngredient`, {
      method: "POST",
      body: JSON.stringify(ing_info),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("REFRIG_03", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("REFRIG_03", error);
    return "노트 삭제에 실패했습니다.";
  }
}

/**
 * **REFRIG_04**
 *
 * API Path: /refrig/updateRefrig
 *
 * 냉장고 칸 업데이트
 */

export async function updateRefrigerator(
  user_id: string,
  refrig_id: number,
  new_name: string,
  new_type: number
) {
  const refrigInfo = {
    user_id: user_id,
    refrigerator_id: refrig_id,
    new_name: new_name,
    new_type: new_type,
  };
  infoLog("REFRIG_04", refrigInfo);
  try {
    const response = await fetch(`${API_URL}/refrig//updateRefrig`, {
      method: "POST",
      body: JSON.stringify(refrigInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("REFRIG_04", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("REFRIG_04", error);
    return "냉장고 가져오기 실패 했습니다.";
  }
}

/**
 * **REFRIG_05**
 *
 * API Path: /refrig/addRefrig
 *
 * 냉장고 가져오기
 */

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
  const refrigInfo = {
    user_id: formData.get("user_id"),
    refrigerator_name: formData.get("refrig_name"),
    refrigerator_type: getStorageType(rType as string),
  };
  infoLog("REFRIG_05", refrigInfo);
  try {
    const response = await fetch(`${API_URL}/refrig/addRefrig`, {
      method: "POST",
      body: JSON.stringify(refrigInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("REFRIG_05", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("REFRIG_05", error);
    return "냉장고 가져오기 실패 했습니다.";
  }
}

/**
 * **REFRIG_06**
 *
 * API Path: /refrig/delRefrig
 *
 * 냉장고 칸 업데이트
 */

export async function deleteRefrigerator(id: number, user_id: string) {
  const refrigInfo = {
    user_id: user_id,
    refrigerator_id: id,
  };
  infoLog("REFRIG_06", refrigInfo);
  try {
    const response = await fetch(`${API_URL}/refrig/delRefrig`, {
      method: "POST",
      body: JSON.stringify(refrigInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("REFRIG_06", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("REFRIG_06", error);
    return "냉장고 칸 삭제에 실패 했습니다.";
  }
}

/**
 * **OCR_01**
 *
 * API Path: /naver/
 *
 * 네이버 주문내역 OCR
 */

export async function getOCRNaverText(formData: FormData) {
  try {
    const response = await fetch(`${OCR_URL}/naver/`, {
      method: "POST",
      body: formData,
    });
    infoLog("OCR_01", formData);

    const responseData = await response.json();
    successLog("OCR_01", response.status, responseData);
    return responseData.result;
  } catch (error) {
    errLog("OCR_01", error);
    return "텍스트 가져오기 실패 했습니다.";
  }
}

/**
 * **OCR_02**
 *
 * API Path: /coupang/
 *
 * 쿠팡 주문내역 OCR
 */

export async function getOCRCoupangText(formData: FormData) {
  try {
    const response = await fetch(`${OCR_URL}/coupang/`, {
      method: "POST",
      body: formData,
    });
    infoLog("OCR_02", formData);

    const responseData = await response.json();
    successLog("OCR_02", response.status, responseData);
    return responseData.result;
  } catch (error) {
    errLog("OCR_02", error);
    return "네이버 OCR인식에 실패 했습니다.";
  }
}

/**
 * **SEARCH_04**
 *
 * API Path: /search/getMultiSearchList
 *
 * 다중 재료로 검색하기 (for 냉장고속 재료 검색)
 */

export async function getMultiSearch(ingInfo: string[]) {
  const ing_info = {
    ing_search: ingInfo,
  };

  infoLog("SEARCH_04", ing_info);

  try {
    const response = await fetch(`${API_URL}/search/getMultiSearchList`, {
      method: "POST",
      body: JSON.stringify(ing_info),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    successLog("SEARCH_04", response.status, responseData);
    return responseData;
  } catch (error) {
    errLog("SEARCH_04", error);
    return {};
  }
}
