import apiClient from ".";

export const getDashboard = async () => {
  try {
    const response = await apiClient.get("/dashboard", {});

    if (response.status === 200) {
      return [true, response.data];
    } else {
      return [false, response.status];
    }
    //TODO 401?
  } catch (e) {
    return [false, e.toString()];
  }
};

export const getTats = async (after = null, before = null) => {
  try {
    const response = await apiClient.get("/dashboard/tats", {
      params: {
        before,
        after,
      },
    });

    if (response.status === 200) {
      return [true, response.data];
    } else {
      return [false, response.status];
    }
    //TODO 401?
  } catch (e) {
    return [false, e.toString()];
  }
};
