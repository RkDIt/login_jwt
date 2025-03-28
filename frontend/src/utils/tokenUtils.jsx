export const getId = () => {
  const token = localStorageUtil.get("token");
  

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.id || null;
  } catch (error) {
    console.error("Invalid  token ", error);
    return null;
  }
};
