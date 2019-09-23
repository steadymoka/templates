import { createConnection } from "dynamom"
import { Provider } from "@graphity/container"

export const dynamom: Provider = {
  register(app) {
    app.resolver("dynamom.connection", () => {
      return createConnection({ })
    })
  },
}
