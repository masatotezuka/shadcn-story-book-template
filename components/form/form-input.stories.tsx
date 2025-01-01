import { Meta, StoryObj } from "@storybook/react"

import { FormInput } from "./form-input"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form"
import { InputProps } from "../ui/input"

type TestInputProps = InputProps & {
  label: string
}
function TestFormInput(props: TestInputProps) {
  const form = useForm<{
    name: string | number
  }>({
    disabled: props.disabled,
  })

  return (
    <Form {...form}>
      <FormInput
        {...props}
        name="name"
        control={form.control}
        label={props.label}
        defaultValue={
          props.defaultValue ? String(props.defaultValue) : undefined
        }
      />
    </Form>
  )
}

const meta: Meta<typeof TestFormInput> = {
  title: "Components/Form/FormInput",
  component: TestFormInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
      description: "The label for the input",
    },
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

export const FormTextInput: Story = {
  args: {
    type: "text",
    placeholder: "Enter your name",
  },
}

export const FormTextInputWithLabel: Story = {
  args: {
    label: "Name",
    disabled: false,
    type: "text",
    placeholder: "Enter your name",
  },
}

export const FormNumberInputWithLabel: Story = {
  args: {
    label: "Age",
    disabled: false,
    type: "number",
    placeholder: "Enter your age",
  },
}

export const DisabledFormTextInputWithLabel: Story = {
  args: {
    label: "Name",
    disabled: true,
    type: "text",
    placeholder: "Enter your name",
  },
}
