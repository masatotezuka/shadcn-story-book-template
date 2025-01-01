import type { Meta, StoryObj } from "@storybook/react"
import { UserCreateForm } from "./user-create-form"
import { userEvent, within, expect } from "@storybook/test"

const meta: Meta<typeof UserCreateForm> = {
  title: "App/Users/New/Components/UserCreateForm",
  component: UserCreateForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const EmptyForm: Story = {}

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
  name: "正常入力で送信",
  play: async (arg) => {
    await fillName(arg)
    await fillEmail(arg)
    await fillPassword(arg)
    await submit(arg)
  },
}

export const InvalidName: Story = {
  name: "名が未入力",
  play: async (arg) => {
    const canvas = within(arg.canvasElement)
    await userEvent.type(canvas.getByLabelText("性"), "山田")
    await fillEmail(arg)
    await fillPassword(arg)
    await submit(arg)

    expect(canvas.getByText("名を入力してください")).toBeInTheDocument()
  },
}

export const InvalidEmail: Story = {
  name: "不正なメールアドレス",
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
  name: "不正なパスワード",
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
