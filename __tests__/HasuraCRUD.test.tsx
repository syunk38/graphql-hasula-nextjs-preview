import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { getPage, initTestHelpers } from 'next-page-tester'
import { handlers } from '../mock/handlers'

initTestHelpers()

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

describe('Hasura CRUD Test Cases', () => {
  it('should render the list of users by useQuery', async () => {
    const { page } = await getPage({
      route: '/hasura-crud',
    })
    render(page)
    expect(await screen.findByText('Hasura CRUD')).toBeInTheDocument()
    expect(await screen.findByText('Test user A')).toBeInTheDocument()
    expect(
      screen.getByText('2021-01-13718:06:46.412969+00:00')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('edit-b6137849-7f1d-c2db-e609-22056fb86db3')
    ).toBeTruthy()
    expect(
      screen.getByTestId('delete-b6137849-7f1d-c2db-e609-22056fb86db3')
    ).toBeTruthy()

    expect(await screen.findByText('Test user B')).toBeInTheDocument()
    expect(
      screen.getByText('2021-02-13718:06:46.412969+00:00')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('edit-2607950f-9959-1bc7-834d-5656e4aeaac2')
    ).toBeTruthy()
    expect(
      screen.getByTestId('delete-2607950f-9959-1bc7-834d-5656e4aeaac2')
    ).toBeTruthy()

    expect(await screen.findByText('Test user B')).toBeInTheDocument()
    expect(
      screen.getByText('2021-03-13718:06:46.412969+00:00')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('edit-7fe58619-10ec-5239-6f43-1da15a634aba')
    ).toBeTruthy()
    expect(
      screen.getByTestId('delete-7fe58619-10ec-5239-6f43-1da15a634aba')
    ).toBeTruthy()
  })
})
