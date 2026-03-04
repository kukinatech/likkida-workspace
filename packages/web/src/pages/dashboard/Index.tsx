import { useUserStore } from "../../stores/useUserStore"

export default function Dashboard() {
  const user = useUserStore(state => state.user)
  return (
    <div className="h-full w-full content-center mx-auto">
      <span>
        {user?.email}
        <br />
        {user?.empresa.id}
        <br />
        {user?.username}
      </span>
    </div>
  )
}