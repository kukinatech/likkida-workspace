import { bootstrap } from "./config"

export default bootstrap(() => {
  return {
    auth: {
      endepointPlural: false,
    }
  }
})
