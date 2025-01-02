type CreateUser = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export async function createUser(params: CreateUser) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
        data: {
          id: "1",
          ...params,
        },
      })
    }, 1000)
  })
}
