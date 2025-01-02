import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const createUserSchema = z.object({
  firstName: z.string().nonempty({ message: "性を入力してください" }),
  lastName: z.string().nonempty({
    message: "名を入力してください",
  }),
  email: z.string().email({
    message: "メールアドレスが正しくありません",
  }),
  password: z.string().min(8, {
    message: "パスワードは8文字以上で入力してください",
  }),
})
type CreateUserSchema = z.infer<typeof createUserSchema>

export function useCreateUserForm() {
  const form = useForm<CreateUserSchema>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(createUserSchema),
  })

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return { handleSubmit, form }
}
