/* eslint-disable no-unused-vars */
import { getCurrentUser, loginUser, logout } from "@/api/auth.api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => loginUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries("currentUser");
    },
    retry: 0,
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
    staleTime: 1000 * 60 * 1, //mean 1 minute
    retry: 1,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => logout(),
  });
};
