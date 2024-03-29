import { apiSlice } from "../api/apiSlice";
import { userRegistration, userLoggedIn,userLoggedOut } from "./authSlice";

type RegistrationResponse = {
  message: string,
  activationToken: string
};
type RegistrationData = {}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userRegistration({
              token: result.data.activationToken
            })
          );

        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activate",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),
    check: builder.mutation({
      query: (data) => ({
        url: "check",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user
            })
          );

        } catch (error: any) {
          console.log(error)
        }
      },
    }),
    socialAuth: builder.mutation({
      query: ({ email, name }) => ({
        url: "social-auth",
        method: "POST",
        body: { email, name },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user
            })
          );

        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logout: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {

          dispatch(
            userLoggedOut()
          );

        } catch (error: any) {
          console.log(error);
        }
      },
    }),


  }),
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation, useCheckMutation, useSocialAuthMutation, useLogoutQuery } = authApi;
