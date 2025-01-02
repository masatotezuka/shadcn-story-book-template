import { useMutation } from "@tanstack/react-query"
import { createUser } from "@/services/users/functions"

export function useCreateUserMutation() {
  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: createUser,
  })
}
