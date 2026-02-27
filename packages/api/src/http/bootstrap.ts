import { bootstrap } from "./config"

export default bootstrap(() => {
  return {
    routes: {
      auth: {
        endepointPlural: false,
      }
    }
  }
})
