export const user = {
  state: {
    token: null,
    email: null,
  },
  reducers: {
    connect(state, payload) {
      return {
        email: payload.email,
        token: payload.token,
      };
    },
  },
};
