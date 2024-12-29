import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"

import { action } from "@storybook/addon-actions"

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onClick: { action: "clicked" },
    variant: {
      control: "select",
      description: "The variant of the button",
      options: ["default", "outline", "destructive", "secondary", "ghost"],
    },
    size: {
      control: "select",
      description: "The size of the button",
      options: ["sm", "default", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
      description: "If the button is disabled",
    },
    children: {
      control: "text",
      description: "The content of the button",
    },
    className: {
      control: "text",
      description: "Custom tailwind CSS classes to apply to the button",
    },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default",
    size: "sm",
    disabled: false,
    onClick: action("default click"),
    children: "Default Button",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "sm",
    disabled: false,
    onClick: action("outline click"),
    children: "Outline Button",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "sm",
    disabled: false,
    onClick: action("destructive click"),
    children: "Destructive Button",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "sm",
    disabled: false,
    onClick: action("secondary click"),
    children: "Secondary Button",
  },
  play: () => {
    console.log("play")
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "sm",
    disabled: false,
    onClick: action("ghost click"),
    children: "Ghost Button",
  },
}
