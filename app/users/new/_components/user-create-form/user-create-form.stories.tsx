import type { Meta, StoryObj } from "@storybook/react"
import { UserCreateFormPresentation } from "./presentation"
import { userEvent, within, expect, fn } from "@storybook/test"
import { waitFor } from "@testing-library/react"

const meta: Meta<typeof UserCreateFormPresentation> = {
  title: "App/Users/New/Components/UserCreateForm",
  component: UserCreateFormPresentation,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    createUser: async (params) => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(params)
        }, 1000)
      })
    },
    isLoading: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const EmptyForm: Story = {}

const fillForm: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(canvas.getByLabelText("性"), "山田")
  await userEvent.type(canvas.getByLabelText("名"), "太郎")
  await userEvent.type(
    canvas.getByLabelText("メールアドレス"),
    "test@example.com"
  )
  await userEvent.type(canvas.getByLabelText("パスワード"), "password123")
}

const fillName: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(canvas.getByLabelText("性"), "山田")
  await userEvent.type(canvas.getByLabelText("名"), "太郎")
}

const fillEmail: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(
    canvas.getByLabelText("メールアドレス"),
    "test@example.com"
  )
}

const fillPassword: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(canvas.getByLabelText("パスワード"), "password123")
}

const submit: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole("button", { name: "作成" }))
}

export const Valid: Story = {
  name: "正常な値を入力して作成",
  args: {
    createUser: fn(
      async (params: {
        firstName: string
        lastName: string
        email: string
        password: string
      }) => {
        console.log(params)
      }
    ),
  },
  play: async (arg) => {
    await fillForm(arg)
    await submit(arg)

    await waitFor(() =>
      expect(arg.args.createUser).toHaveBeenCalledWith({
        firstName: "山田",
        lastName: "太郎",
        email: "test@example.com",
        password: "password123",
      })
    )
  },
}

export const InvalidAllEmpty: Story = {
  name: "未入力で作成",
  play: async (arg) => {
    const canvas = within(arg.canvasElement)

    await waitFor(async () => {
      await submit(arg)
    })

    await waitFor(() => {
      expect(canvas.getByText("性を入力してください")).toBeInTheDocument()
      expect(canvas.getByText("名を入力してください")).toBeInTheDocument()
      expect(
        canvas.getByText("パスワードは8文字以上で入力してください")
      ).toBeInTheDocument()
      expect(
        canvas.getByText("メールアドレスが正しくありません")
      ).toBeInTheDocument()
    })
  },
}

export const InvalidEmail: Story = {
  name: "メールアドレスでない値を入力",
  play: async (arg) => {
    const canvas = within(arg.canvasElement)

    await fillName(arg)
    await userEvent.type(canvas.getByLabelText("メールアドレス"), "test")
    await fillPassword(arg)
    await submit(arg)

    expect(
      canvas.getByText("メールアドレスが正しくありません")
    ).toBeInTheDocument()
  },
}

export const InvalidPassword: Story = {
  name: "不正なパスワードを入力",
  play: async (arg) => {
    const canvas = within(arg.canvasElement)

    await fillName(arg)
    await fillEmail(arg)
    await userEvent.type(canvas.getByLabelText("パスワード"), "pass")
    await submit(arg)

    expect(
      canvas.getByText("パスワードは8文字以上で入力してください")
    ).toBeInTheDocument()
  },
}
