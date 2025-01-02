"use client"
import { UserCreateFormPresentation } from "@/app/users/new/_components/user-create-form/presentation"
import { useCreateUserMutation } from "@/services/users/hooks"

export function UserCreateForm() {
  const createUserMutation = useCreateUserMutation()
  return (
    <UserCreateFormPresentation
      createUser={async (params) => {
        createUserMutation.mutate(params, {
          onSuccess: () => {
            alert("ユーザーを作成しました")
          },
          onError: () => {
            alert("ユーザーの作成に失敗しました")
          },
        })
      }}
      isLoading={createUserMutation.isPending}
    />
  )
}
