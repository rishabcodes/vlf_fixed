// Axios stub for build
const axiosInstance = {
  interceptors: {
    request: { use: () => {} },
    response: { use: () => {} },
  },
  get: async (url: string) => ({ data: {} }),
  post: async (url: string, data?: any) => ({ data: {} }),
  put: async (url: string, data?: any) => ({ data: {} }),
  delete: async (url: string) => ({ data: {} }),
};

const axios = {
  create: () => axiosInstance,
  ...axiosInstance,
};

export default axios;
