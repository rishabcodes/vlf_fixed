// This file provides axios globally
if (typeof window !== 'undefined') {
  window.axios = {
    create: () => ({
      get: async () => ({ data: {} }),
      post: async () => ({ data: {} }),
      put: async () => ({ data: {} }),
      delete: async () => ({ data: {} }),
    })
  };
}
