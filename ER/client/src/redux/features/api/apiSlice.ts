import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";
require("dotenv").config();


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://8000-husnainseo-super-7kshv9vjans.ws-us110.gitpod.io/api/v1",
  }),
  endpoints: (builder) => ({
    loadUser: builder.query({
      query: (data) => ({
        url: "me",
        method: "GET",
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
        } catch (error) {
          console.error("Error in loadUser query");
        }
      },
    })

  }),

});

export const { useLoadUserQuery } = apiSlice;

