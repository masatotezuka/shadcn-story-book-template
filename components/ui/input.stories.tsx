import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "Components/UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "If the input is disabled",
    },
    className: {
      control: "text",
      description: "Custom tailwind CSS classes to apply to the input",
    },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const TextInput: Story = {
  args: {
    placeholder: "Enter your name",
    disabled: false,
  },
}

export const NumberInput: Story = {
  args: {
    placeholder: "Enter your age",
    disabled: false,
    type: "number",
  },
}
