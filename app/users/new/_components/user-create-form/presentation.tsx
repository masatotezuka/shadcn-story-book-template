import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const createUserSchema = z.object({
  firstName: z.string().nonempty({ message: "名を入力してください" }),
  lastName: z.string().nonempty({
    message: "性を入力してください",
  }),
  email: z.string().email({
    message: "メールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "パスワードは8文字以上で入力してください",
  }),
})

export type CreateUserSchema = z.infer<typeof createUserSchema>

type UserCreateFormPresentationProps = {
  createUser: (params: CreateUserSchema) => Promise<void>
  isLoading: boolean
}

export function UserCreateFormPresentation({
  createUser,
  isLoading,
}: UserCreateFormPresentationProps) {
  const form = useForm<CreateUserSchema>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(createUserSchema),
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    await createUser(data)
  })

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
