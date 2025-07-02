import { useRouter } from "next/router"

const slug = () => {
const {query} = useRouter();




  return (
    <div>
     <h1>
      this is {query?.username} page
     </h1>
    </div>
  )
}

export default slug
