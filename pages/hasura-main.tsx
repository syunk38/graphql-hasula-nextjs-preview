import { useQuery } from '@apollo/client'
import { VFC } from 'react'
import { Layout } from '../components/Layout'
import Link from 'next/link'
import { GetUsersQuery } from '../types/generated/graphql'
import { GET_USERS } from '../queries/queries'

const FetchMain: VFC = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    // fetchPolicy: 'network-only', // 最新のデータを取得してキャッシュする。通信が完了するまで待つ
    fetchPolicy: 'cache-and-network', // 最新のデータを取得してキャッシュする。通信が完了するまで待たずにキャッシュを返し、通信が終われば最新の値を返す
    // fetchPolicy: 'cache-first', // キャッシュを優先的に返す
    // fetchPolicy: 'no-cache', // 常に最新のデータを取得する
  })
  if (error) {
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    )
  }
  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>
      {console.log(data)}
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  )
}
export default FetchMain
