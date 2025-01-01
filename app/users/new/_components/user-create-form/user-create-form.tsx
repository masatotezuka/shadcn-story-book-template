import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreateUserForm } from "@/app/users/new/hooks/user-create-user-form"

export function UserCreateForm() {
  const { handleSubmit, form } = useCreateUserForm()
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
          <Button type="submit">作成</Button>
        </div>
      </form>
    </Form>
  )
}
