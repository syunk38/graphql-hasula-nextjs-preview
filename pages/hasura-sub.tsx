import { Layout } from '../components/Layout'
import { GET_USERS_LOCAL } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import Link from 'next/link'
import { VFC } from 'react'
import { useQuery } from '@apollo/client'

const FetchSub: VFC = () => {
  const { data } = useQuery<GetUsersQuery>(GET_USERS_LOCAL, {
    fetchPolicy: 'cache-only',
  })
  return (
    <Layout title="Hasura fetchPolicy read cache">
      <p className="mb-6 font-bold">Hasura read out from cache</p>
      {console.log(data)}
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-main">
        <a className="mt-6">Back</a>
      </Link>
    </Layout>
  )
}

export default FetchSub
