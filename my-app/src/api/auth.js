import { useUserStore } from "store/useUserStore";
import secureLocalStorage from "react-secure-storage";
import { StorageKeys } from "utils/StorageKeys";

export const login = async (user) => {
  if (!user.email || !user.password)
    return alert("이메일과 비밀번호를 입력해주세요");

  const token = btoa(`${user.email}:${user.password}`);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/auth/login/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message) || "로그인에 실패했습니다.";
    } else {
      useUserStore.getState().setAccessToken(data.accessToken);
      useUserStore.getState().setRefreshToken(data.refreshToken);
      useUserStore.getState().setUser(data.userInfo);
      secureLocalStorage.setItem(StorageKeys.REFRESH_TOKEN, data.refreshToken);
    }
    return { data: data.userInfo, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const signup = async (user) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/auth/register/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message) || "회원가입에 실패했습니다.";
    } else {
      useUserStore.getState().setAccessToken(data.accessToken);
      useUserStore.getState().setRefreshToken(data.refreshToken);
      useUserStore.getState().setUser(data.userInfo);
      secureLocalStorage.setItem(StorageKeys.REFRESH_TOKEN, data.refreshToken);
    }
    return { data: data.userInfo, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const logout = async () => {
  useUserStore.getState().setAccessToken(null);
  useUserStore.getState().setRefreshToken(null);
  useUserStore.getState().setUser(null);
  secureLocalStorage.removeItem(StorageKeys.ACCESS_TOKEN);
  secureLocalStorage.removeItem(StorageKeys.REFRESH_TOKEN);
  location.replace("/admin/dev5/admin/login");
};

export const userMe = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useUserStore.getState().accessToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.statusCode === 200 || data.statusCode === 201) {
      useUserStore.getState().setUser(data.userInfo);
    }
    return { data: data.userInfo };
  } catch (error) {
    console.error(error);
  }
};
export async function refreshAccessToken() {
  const refreshToken = secureLocalStorage.getItem(StorageKeys.REFRESH_TOKEN); // Refresh Token 가져오기
  if (!refreshToken) {
    console.error("No refresh token available");
    window.location.replace("/admin/dev5/admin/login");
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/auth/token/access`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    useUserStore.getState().setAccessToken(data.accessToken); // 새로운 accessToken으로 상태 업데이트
    return data.accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}
