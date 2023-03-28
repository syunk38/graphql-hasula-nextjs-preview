import { GetStaticPaths, GetStaticProps } from 'next'
import { VFC } from 'react'
import { Layout } from '../../components/Layout'
import { initializeApollo } from '../../lib/apolloClinent'
import { GET_USERBY_ID, GET_USERIDS } from '../../queries/queries'
import {
  GetUserByIdQuery,
  GetUsersIdsQuery,
  Users,
} from '../../types/generated/graphql'
import Link from 'next/link'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'

interface Props {
  user: {
    __typename?: 'users'
  } & Pick<Users, 'id' | 'name' | 'created_at'>
}

const UserDetail: VFC<Props> = ({ user }) => {
  if (!user) {
    return <Layout title="loading...">loading...</Layout>
  }
  return (
    <Layout title={user.name}>
      <p className="text-xl font-bold">User Detail</p>
      <p className="mb-4">
        {'ID : '}
        {user.id}
      </p>
      <p className="mb-4 text-xl font-bold">{user.name}</p>
      <p className="mb-12">{user.created_at}</p>
      <Link href="/hasura-ssg">
        <div className="flex cursor-pointer mt-12">
          <ChevronDoubleLeftIcon
            data-testid="auth-to-main"
            className="h-5 w-5 mr-3 text-blue-500"
          />
          Back to main-ssg-page
        </div>
      </Link>
    </Layout>
  )
}

export default UserDetail
export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUsersIdsQuery>({
    query: GET_USERIDS,
  })
  const paths = data.users.map((user) => ({
    params: { id: user.id },
  }))
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (params) => {
  const aoploClient = initializeApollo()
  const { data } = await aoploClient.query<GetUserByIdQuery>({
    query: GET_USERBY_ID,
    variables: { id: params.params.id },
  })
  return {
    props: { user: data.users_by_pk },
    revalidate: 1,
  }
}
