import { apiSlice } from "../api/apiSlice";

export const listingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createListing: builder.mutation({
            query: (data) => ({
                url: `add-listing`,
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
        }),
        deleteListingUser: builder.mutation({
            query: (id) => ({
                url: `delete-listing-user/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            }),
        }),
        updateListing: builder.mutation({
            query: ({data,id}) => ({
                url: `edit-listing/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            }),
        }),
        getAllListings: builder.query({
            query: () => ({
                url: `listings`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        singleListing: builder.query({
            query: (id) => ({
                url: `listing/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),

    })
});

export const { useCreateListingMutation, useDeleteListingUserMutation, useUpdateListingMutation,useGetAllListingsQuery ,useSingleListingQuery} = listingApi;