import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  useCreateUserForm,
  CreateUserSchema,
} from "@/app/users/new/hooks/use-create-user-form"

type UserCreateFormPresentationProps = {
  createUser: (params: CreateUserSchema) => Promise<void>
  isLoading: boolean
}

export function UserCreateFormPresentation({
  createUser,
  isLoading,
}: UserCreateFormPresentationProps) {
  const { handleSubmit, form } = useCreateUserForm({ createUser })
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <FormInput control={form.control} name="firstName" label="性" />
          </div>
          <div>
            <FormInput control={form.control} name="lastName" label="名" />
          </div>
          <div>
            <FormInput
              control={form.control}
              name="email"
              label="メールアドレス"
            />
          </div>
          <div>
            <FormInput
              control={form.control}
              name="password"
              label="パスワード"
              type="password"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="submit" disabled={isLoading}>
            作成
          </Button>
        </div>
      </form>
    </Form>
  )
}
