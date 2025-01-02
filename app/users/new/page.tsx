import { UserCreateForm } from "./_components/user-create-form"

export default function Page() {
  return (
    <div className="max-w-lg mx-auto mt-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">ユーザー作成</h1>
      <UserCreateForm />
    </div>
  )
}
